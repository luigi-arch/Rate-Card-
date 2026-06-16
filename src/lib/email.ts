import "server-only";
import nodemailer from "nodemailer";

export interface BriefEmailData {
  name: string;
  email: string;
  company?: string | null;
  role?: string | null;
  phone?: string | null;
  headaches: string[];
  recommendedFormats: string[];
  activeFormat?: string | null;
  package?: string | null;
  addOns: string[];
  budget?: string | null;
  timeline?: string | null;
  message?: string | null;
  /** Internal recipients that receive the brief. */
  recipients: string[];
  /** Booking page URL for the client's "book a call" CTA (empty = fallback). */
  bookingUrl: string;
}

const GOLD = "#ffb600";
const INK = "#0b0b0c";

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.GMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.GMAIL_PORT ?? 465),
    secure: true,
    auth: { user, pass },
  });
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 0;color:#8c8c93;font-size:12px;text-transform:uppercase;letter-spacing:.08em;width:160px;vertical-align:top">${esc(label)}</td>
    <td style="padding:6px 0;color:${INK};font-size:14px">${esc(value)}</td>
  </tr>`;
}

function listRow(label: string, items: string[]) {
  if (!items.length) return "";
  return row(label, items.join(", "));
}

function shell(title: string, inner: string) {
  return `<div style="background:#f5f5f2;padding:24px;font-family:Helvetica,Arial,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #eee">
      <div style="background:${INK};padding:20px 28px">
        <span style="color:#fff;font-weight:800;letter-spacing:.06em;font-size:18px">SIDE<span style="color:${GOLD}">STREET</span></span>
      </div>
      <div style="padding:28px">
        <h1 style="margin:0 0 16px;color:${INK};font-size:22px">${esc(title)}</h1>
        ${inner}
      </div>
    </div>
  </div>`;
}

export async function sendBriefEmails(data: BriefEmailData): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    console.warn("Email not configured (GMAIL_USER/GMAIL_APP_PASSWORD) — skipping send.");
    return;
  }

  const from = `"SideStreet" <${process.env.GMAIL_FROM ?? process.env.GMAIL_USER}>`;

  const briefTable = `<table style="width:100%;border-collapse:collapse">
    ${row("Name", data.name)}
    ${row("Email", data.email)}
    ${row("Company", data.company)}
    ${row("Role", data.role)}
    ${row("Phone", data.phone)}
    ${listRow("Headaches", data.headaches)}
    ${listRow("Recommended", data.recommendedFormats)}
    ${row("Exploring format", data.activeFormat)}
    ${row("Package", data.package)}
    ${listRow("Add-ons", data.addOns)}
    ${row("Budget", data.budget)}
    ${row("Timeline", data.timeline)}
    ${row("Message", data.message)}
  </table>`;

  const internalHtml = shell(
    `New brief — ${data.name}${data.company ? ` · ${data.company}` : ""}`,
    `<p style="color:#56565d;font-size:14px;margin:0 0 16px">A new rate-card brief just came in.</p>${briefTable}
     <p style="margin:20px 0 0"><a href="mailto:${esc(data.email)}" style="background:${GOLD};color:#000;text-decoration:none;font-weight:700;padding:10px 18px;border-radius:999px;font-size:14px">Reply to ${esc(data.name)}</a></p>`
  );

  const bookingBtn = data.bookingUrl
    ? `<p style="margin:20px 0 0"><a href="${esc(data.bookingUrl)}" style="background:${GOLD};color:#000;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:999px;font-size:15px">Book your call →</a></p>`
    : `<p style="color:#56565d;font-size:14px;margin:20px 0 0">We’ll be in touch shortly to set up a call.</p>`;

  const clientHtml = shell(
    "Thanks — we’ve got your brief",
    `<p style="color:#56565d;font-size:15px;margin:0 0 16px">Hi ${esc(data.name.split(" ")[0])}, thanks for telling us your headache. Here’s what we noted — we’ll come back with a tailored recommendation, usually within one working day.</p>
     ${briefTable}
     <p style="color:${INK};font-size:15px;margin:24px 0 0;font-weight:700">Want to move faster? Book a call now:</p>
     ${bookingBtn}`
  );

  const results = await Promise.allSettled([
    transport.sendMail({
      from,
      to: data.recipients,
      replyTo: data.email,
      subject: `New brief — ${data.name}${data.company ? ` · ${data.company}` : ""}`,
      html: internalHtml,
    }),
    transport.sendMail({
      from,
      to: data.email,
      subject: "Thanks — your SideStreet brief",
      html: clientHtml,
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`Brief email ${i === 0 ? "(internal)" : "(client)"} failed:`, r.reason);
    }
  });
}
