"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock, Mail, UserCheck } from "lucide-react";

const BOOKING_URL =
  "https://kaif.selvinx.com/?fluent-booking=calendar&host=kaif&event=15min";

const WHAT_YOU_GET = [
  "Quick assessment of your dev needs",
  "Honest take on whether I can help",
  "Clear next steps — partnership or not",
];

export function WhitelabelBooking() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const currentMonth = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new Date().toLocaleString("en-US", { month: "long" });
  }, []);

  return (
    <section
      id="book"
      ref={ref}
      className="relative overflow-hidden bg-ink py-20 text-paper md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-brand/25 blur-[140px] animate-mesh-1" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-soft/10 blur-[140px] animate-mesh-2" aria-hidden="true" />

      <div className="container-site relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-paper/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-soft" />
              </span>
              {currentMonth ? `Now booking ${currentMonth} Discovery Calls` : "Now booking Discovery Calls"}
            </div>

            <h2 className="h-section mt-4">
              Book a
              <br />
              <span className="text-brand-soft">Discovery Call.</span>
            </h2>

            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-paper/65 md:text-lg">
              15 minutes. Tell me about your agency, your workload, and what
              you need from a dev partner. We&apos;ll see if there&apos;s a fit
              — no pressure, no pitch.
            </p>

            {/* What you get */}
            <div className="mt-6 space-y-2.5">
              {WHAT_YOU_GET.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm text-paper/80 md:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Trust row */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-paper/10 bg-white/[0.03] p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft/15 text-brand-soft">
                <UserCheck className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
              <div className="font-sans text-xs text-paper/60">
                <div className="font-semibold text-paper">
                  7 years · 200+ sites shipped for agencies
                </div>
                <div>You&apos;ll talk to Kaif directly. No account managers.</div>
              </div>
            </div>

            {/* Alt contact */}
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="mailto:kaif@selvinx.com"
                className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-4 py-2.5 font-sans text-xs text-paper/70 transition-colors hover:border-paper/30 hover:text-paper"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                kaif@selvinx.com
              </a>
            </div>

            <p className="mt-5 font-sans text-[11px] leading-relaxed text-paper/60">
              Booking handled by Selvinx. Your details go directly to Kaif —
              not stored on this page. NDA available on request.
            </p>
          </motion.div>

          {/* RIGHT: FluentBooking iframe */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-paper/10 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-ink/8 bg-paper px-5 py-3.5 md:px-6">
                <div className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-ink/70">
                  <Clock className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  Pick a time
                </div>
                <div className="flex items-center gap-1.5 font-sans text-[11px] text-ink/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live calendar
                </div>
              </div>

              <iframe
                src={BOOKING_URL}
                title="Book your Discovery Call — Selvinx calendar"
                className="w-full"
                style={{ height: "680px", border: "none", minHeight: "600px" }}
                loading="lazy"
                aria-label="Booking calendar"
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-paper/10 bg-white/[0.03] px-4 py-2.5 font-sans text-xs text-paper/55">
              <span>Showing real, up-to-date availability.</span>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-paper/70 hover:text-paper"
              >
                Open in new tab
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
