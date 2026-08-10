"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/site/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function WhitelabelHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-paper pb-20 pt-32 md:pb-28 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full bg-brand-soft/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-brand/10 blur-[120px]" />

      <div className="container-site relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/70 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            White-label WordPress development
          </motion.div>

          {/* Headline — the DesignJoy punch */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="h-hero mt-6 text-ink"
          >
            Most devs ghost.
            <br />
            <span className="text-gradient-brand">I don&apos;t.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/65 sm:text-lg"
          >
            I&apos;m{" "}
            <span className="font-semibold text-ink">Kaif Ali</span>. 7 years
            building WordPress sites under agency brands. Your clients, your
            brand, my code. No babysitting required.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <MagneticButton
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("book");
                if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
              }}
              className="shine-on-hover items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-sans text-sm font-semibold text-paper transition-colors hover:bg-brand"
              ariaLabel="Book a discovery call"
            >
              Book a discovery call
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <p className="font-sans text-xs text-ink/55">
              Free 15-min call · NDA available · No obligation
            </p>
          </motion.div>

          {/* Stats row — inline, punchy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-3"
          >
            <Stat value="7" suffix="yrs" label="WordPress" />
            <span className="hidden h-8 w-px bg-ink/10 sm:block" />
            <Stat value="200" suffix="+" label="sites shipped" />
            <span className="hidden h-8 w-px bg-ink/10 sm:block" />
            <Stat value="8" suffix="" label="agencies partnered" />
            <span className="hidden h-8 w-px bg-ink/10 sm:block" />
            <Stat value="0" suffix="" label="missed deadlines" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex items-baseline gap-1 whitespace-nowrap">
      <span className="font-display text-2xl text-ink">{value}</span>
      {suffix && <span className="font-display text-sm text-brand">{suffix}</span>}
      <span className="font-sans text-[11px] font-medium text-ink/55">{label}</span>
    </div>
  );
}
