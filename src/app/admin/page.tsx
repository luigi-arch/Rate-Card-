import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getSiteContent } from "@/lib/site-content";
import AdminEditor from "@/components/cms/AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const content = await getSiteContent();
  return <AdminEditor initial={content} />;
}
