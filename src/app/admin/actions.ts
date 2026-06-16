"use server";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminToken, isAdminAuthed } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase/admin";
import type { SiteOverrides } from "@/lib/site-content";

export async function login(
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const expected = process.env.ADMIN_PASSWORD;
  const token = adminToken();
  if (!expected || !token) {
    return { ok: false, error: "Admin password isn’t configured on the server." };
  }
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!match) return { ok: false, error: "Incorrect password." };

  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return { ok: true };
}

export async function signOutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function saveSiteContent(
  overrides: SiteOverrides
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdminAuthed())) return { ok: false, error: "Not signed in." };
  const supabase = getAdminClient();
  if (!supabase) {
    return { ok: false, error: "SUPABASE_SERVICE_ROLE_KEY isn’t set on the server." };
  }
  const { error } = await supabase
    .from("site_content")
    .update({ data: overrides, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  return { ok: true };
}

export async function uploadAsset(
  formData: FormData
): Promise<{ ok: boolean; url?: string; error?: string }> {
  if (!(await isAdminAuthed())) return { ok: false, error: "Not signed in." };
  const supabase = getAdminClient();
  if (!supabase) {
    return { ok: false, error: "SUPABASE_SERVICE_ROLE_KEY isn’t set on the server." };
  }
  const file = formData.get("file");
  const slot = String(formData.get("slot") ?? "asset");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file received." };
  }

  const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const path = `${slot.replace(/\./g, "-")}/${Date.now()}-${safe}`;
  const bytes = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from("site-assets")
    .upload(path, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
      cacheControl: "3600",
    });
  if (error) return { ok: false, error: error.message };

  const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
