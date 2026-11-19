"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroTactileObjects from "@/components/landing/HeroTactileObjects";
import StartArenas from "@/components/landing/StartArenas";
import OpenBookLesson from "@/components/landing/OpenBookLesson";
import MoreThanLessons from "@/components/landing/MoreThanLessons";
import MembershipPass from "@/components/landing/MembershipPass";
import FAQAccordion from "@/components/landing/FAQAccordion";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-[#13213B] relative selection:bg-[#d9b3a9] selection:text-[#1d1c1a] overflow-x-hidden w-full max-w-full">
      {/* ── MAIN WARM PARCHMENT CANVAS (ROUNDED BOTTOM SURFACING OVER NAVY FOOTER) ── */}
      <div className="bg-[#F6F5F1] text-[#1D1C1A] rounded-b-[40px] sm:rounded-b-[56px] shadow-[0_24px_64px_rgba(0,0,0,0.38)] overflow-hidden relative z-10 pb-16 w-full max-w-full">
        {/* TOP FLOATING PILL NAVBAR */}
        <Navbar />

        {/* 1. HERO SECTION WITH PHYSICAL TACTILE OBJECTS */}
        <HeroTactileObjects />

        {/* 2. CHOOSE WHERE TO START (3 CARDS) */}
        <StartArenas />

        {/* 3. SEE A LESSON FROM THE INSIDE (OPEN BOOK SPREAD) */}
        <OpenBookLesson />

        {/* 4. MORE THAN LESSONS (3 CARDS + SOCIAL PROOF LOGO MARQUEE) */}
        <MoreThanLessons />

        {/* 5. GET YOUR PASS (3D MEMBERSHIP PASS WITH GUILLOCHE & ODOMETER) */}
        <MembershipPass />

        {/* 6. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
        <FAQAccordion />
      </div>

      {/* ── 7. NAVY BLUEPRINT GRID FOOTER ── */}
      <Footer />
    </div>
  );
}
