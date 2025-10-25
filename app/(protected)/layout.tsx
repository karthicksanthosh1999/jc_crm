import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Navbar } from "@/components/navbar/layout";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar on the left */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 px-0 overflow-y-auto w-full">
          <Navbar />
          <div className="mt-5">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
