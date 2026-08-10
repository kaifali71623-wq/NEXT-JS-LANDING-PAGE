"use client";

import { WhitelabelNavbar } from "@/components/site/whitelabel/navbar";
import { WhitelabelHero } from "@/components/site/whitelabel/hero";
import { WhitelabelProblem } from "@/components/site/whitelabel/problem";
import { WhitelabelServices } from "@/components/site/whitelabel/services";
import { WhitelabelWhyMe } from "@/components/site/whitelabel/why-me";
import { WhitelabelProcess } from "@/components/site/whitelabel/process";
import { WhitelabelFAQ } from "@/components/site/whitelabel/faq";
import { WhitelabelBooking } from "@/components/site/whitelabel/booking";
import { WhitelabelFooter } from "@/components/site/whitelabel/footer";
import { CookieNotice } from "@/components/site/cookie-notice";
import { ScrollProgress } from "@/components/site/animations";

export default function WhitelabelPage() {
  return (
    <div className="page-enter relative flex min-h-screen flex-col overflow-x-hidden bg-paper">
      <ScrollProgress />
      <WhitelabelNavbar />
      <main id="main-content" className="flex-1">
        <WhitelabelHero />
        <WhitelabelProblem />
        <WhitelabelServices />
        <WhitelabelWhyMe />
        <WhitelabelProcess />
        <WhitelabelFAQ />
        <WhitelabelBooking />
      </main>
      <WhitelabelFooter />
      <CookieNotice />
    </div>
  );
}
