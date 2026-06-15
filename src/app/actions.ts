"use server";

import { getSupabaseClient, LEADS_TABLE } from "@/lib/supabase";
import { FORMATS, type FormatId } from "@/lib/content";

export interface LeadInput {
  name: string;
  email: string;
  company?: string;
  role?: string;
  phone?: string;
  headaches?: string[];
  recommendedFormats?: FormatId[];
  budget?: string;
  timeline?: string;
  message?: string;
  referrer?: string;
  userAgent?: string;
}

export interface LeadResult {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: string | undefined, max = 2000): string | null {
  if (!value) return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length ? trimmed : null;
}

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const name = clean(input.name, 200);
  const email = clean(input.email, 320);

  if (!name) return { ok: false, error: "Please tell us your name." };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const validFormatIds = new Set(FORMATS.map((f) => f.id));
  const recommended = (input.recommendedFormats ?? [])
    .filter((id): id is FormatId => validFormatIds.has(id))
    .map((id) => FORMATS.find((f) => f.id === id)?.name ?? id);

  const row = {
    name,
    email,
    company: clean(input.company, 200),
    role: clean(input.role, 200),
    phone: clean(input.phone, 60),
    headaches: (input.headaches ?? []).slice(0, 20).map((h) => h.slice(0, 200)),
    recommended_formats: recommended.slice(0, 12),
    budget: clean(input.budget, 120),
    timeline: clean(input.timeline, 120),
    message: clean(input.message, 4000),
    referrer: clean(input.referrer, 500),
    user_agent: clean(input.userAgent, 500),
    source: "rate-card-landing",
  };

  const supabase = getSupabaseClient();
  if (!supabase) {
    // Fail loud in dev, but don't crash the page if env isn't configured.
    console.error("Supabase env vars not configured — lead not stored:", row);
    return {
      ok: false,
      error: "Submissions aren’t configured yet. Please email hello@sidestreetmalta.com.",
    };
  }

  const { error } = await supabase.from(LEADS_TABLE).insert(row);

  if (error) {
    console.error("Failed to store lead:", error.message);
    return { ok: false, error: "Something went wrong. Please try again or email us directly." };
  }

  return { ok: true };
}
