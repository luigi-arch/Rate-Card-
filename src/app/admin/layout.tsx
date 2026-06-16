import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SideStreet CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-paper text-fg">{children}</div>;
}
