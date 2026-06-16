"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SiteOverrides } from "@/lib/site-content";

export async function saveSiteContent(
  overrides: SiteOverrides
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const { error } = await supabase
    .from("site_content")
    .update({ data: overrides, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/");
  return { ok: true };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
