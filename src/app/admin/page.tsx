import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/admin-dashboard";
import { isAdminAuthenticated } from "@/lib/auth";
import { getLeads, getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [content, leads] = await Promise.all([getSiteContent(), getLeads()]);

  return <AdminDashboard initialContent={content} initialLeads={leads} />;
}
