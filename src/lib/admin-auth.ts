import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ss_admin";
const SALT = "sidestreet-cms-v1";

/** Deterministic session token derived from the admin password. */
export function adminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return crypto.createHash("sha256").update(pw + SALT).digest("hex");
}

/** True if the request carries a valid admin session cookie. */
export async function isAdminAuthed(): Promise<boolean> {
  const token = adminToken();
  if (!token) return false;
  const store = await cookies();
  const got = store.get(ADMIN_COOKIE)?.value;
  if (!got || got.length !== token.length) return false;
  return crypto.timingSafeEqual(Buffer.from(got), Buffer.from(token));
}
