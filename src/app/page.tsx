"use client";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { Problem } from "@/components/site/problem";
import { FitCalculator } from "@/components/site/fit-calculator";
import { Approach } from "@/components/site/approach";
import { Capabilities } from "@/components/site/capabilities";
import { About } from "@/components/site/about";
import { FAQ } from "@/components/site/faq";
import { Booking } from "@/components/site/booking";
import { Footer } from "@/components/site/footer";
import { CookieNotice } from "@/components/site/cookie-notice";
import { ScrollProgress } from "@/components/site/animations";

export default function Home() {
  return (
    <div className="page-enter relative flex min-h-screen flex-col overflow-x-hidden bg-paper">
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <TrustBar />
        <Problem />
        <FitCalculator />
        <Approach />
        <Capabilities />
        <About />
        <FAQ />
        <Booking />
      </main>
      <Footer />
      <CookieNotice />
    </div>
  );
}
