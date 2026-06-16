import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SiteOverrides } from "@/lib/site-content";
import { signOutAction } from "./actions";
import AdminEditor from "@/components/cms/AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // Allowlist check (RLS lets a user read only their own admin row).
  const { data: adminRow } = await supabase
    .from("site_admins")
    .select("email")
    .ilike("email", user.email ?? "")
    .maybeSingle();

  if (!adminRow) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="font-display text-3xl">Not authorised</p>
        <p className="max-w-sm text-sm text-muted">
          <span className="font-semibold text-fg">{user.email}</span> isn’t on
          the CMS allowlist. Ask an admin to add you to <code>site_admins</code>.
        </p>
        <form action={signOutAction}>
          <button className="press rounded-full border border-line-strong px-5 py-2.5 text-sm font-bold">
            Sign out
          </button>
        </form>
      </div>
    );
  }

  const { data: content } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", 1)
    .maybeSingle();

  return (
    <AdminEditor
      initial={(content?.data ?? {}) as SiteOverrides}
      email={user.email ?? ""}
    />
  );
}
