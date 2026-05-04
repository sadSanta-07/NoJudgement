"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/NavbarDashboard";
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <div className="shrink-0 bg-white/70 backdrop-blur-md border-b border-gray-200">
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 px-6 md:px-10 py-6 pt-20 md:pt-6">
          {children}
        </main>

        {/* FOOTER (NOW CORRECT) */}
        <Footer />

      </div>
    </div>
  );
}