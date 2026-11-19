"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/NavbarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f6f5f1] text-[#1d1c1a]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT REGION */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* DASHBOARD TOP BAR */}
        <div className="shrink-0 sticky top-0 z-30">
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 px-4 sm:px-8 lg:px-10 py-8 pt-20 md:pt-8 bg-tactile-dots-subtle">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
