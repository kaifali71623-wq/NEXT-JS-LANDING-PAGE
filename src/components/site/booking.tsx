"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock, Mail, UserCheck } from "lucide-react";

/**
 * FluentBooking calendar URL.
 * The iframe loads the live booking page directly.
 */
const BOOKING_URL =
  "https://selvinx.com/?fluent-booking=calendar&host=selvinx&event=30min-3";

const WHAT_YOU_GET = [
  "Honest read on where your site stands today",
  "Top 3 friction points, pointed out live",
  "Clear next steps — whether we work together or not",
];

export function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [fitScore, setFitScore] = useState<{
    score: number;
    band: string;
    total?: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem("fitScore");
    if (raw) {
      try {
        const t = window.setTimeout(() => setFitScore(JSON.parse(raw)), 0);
        return () => window.clearTimeout(t);
      } catch {
        // ignore
      }
    }
  }, []);

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
      {/* Animated gradient mesh */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-brand/25 blur-[140px] animate-mesh-1"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-soft/10 blur-[140px] animate-mesh-2"
        aria-hidden="true"
      />

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
              {currentMonth ? `Now booking ${currentMonth} Fit Calls` : "Now booking Fit Calls"}
            </div>

            <h2 className="h-section mt-4">
              Book your
              <br />
              <span className="text-brand-soft">Fit Call.</span>
            </h2>

            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-paper/65 md:text-lg">
              15 minutes. We look at your site together, talk through
              what&apos;s working and what isn&apos;t, and decide if there&apos;s
              a real fit to work together.
            </p>

            {/* What you get */}
            <div className="mt-6 space-y-2.5">
              {WHAT_YOU_GET.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm text-paper/80 md:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Fit score badge */}
            {fitScore && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center gap-3 rounded-xl border border-brand-soft/30 bg-brand/10 p-3.5"
              >
                <span className="font-display text-2xl text-brand-soft">
                  {fitScore.score}<span className="text-base text-brand-soft/60">/{fitScore.total ?? 6}</span>
                </span>
                <div className="font-sans text-xs leading-snug text-paper/75">
                  <div className="font-semibold text-paper">Your Site Check</div>
                  <div>Band: {fitScore.band} — bring it to the call.</div>
                </div>
              </motion.div>
            )}

            {/* Trust row — with icon */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-paper/10 bg-white/[0.03] p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft/15 text-brand-soft">
                <UserCheck className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
              <div className="font-sans text-xs text-paper/60">
                <div className="font-semibold text-paper">
                  7 years · 500+ sites reviewed
                </div>
                <div>You&apos;ll talk to Kaif directly.</div>
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

            {/* Privacy note */}
            <p className="mt-5 font-sans text-[11px] leading-relaxed text-paper/60">
              Booking handled by Selvinx. Your details go directly to Kaif —
              not stored on this page. You&apos;ll get an instant confirmation
              with the meeting link.
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
              {/* Header strip */}
              <div className="flex items-center justify-between border-b border-ink/8 bg-paper px-5 py-3.5 md:px-6">
                <div className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-ink/70">
                  <Clock className="h-3.5 w-3.5 text-brand" />
                  Pick a time
                </div>
                <div className="flex items-center gap-1.5 font-sans text-[11px] text-ink/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live calendar
                </div>
              </div>

              {/* FluentBooking iframe */}
              <iframe
                src={BOOKING_URL}
                title="Book your Fit Call — Selvinx calendar"
                className="w-full"
                style={{ height: "680px", border: "none", minHeight: "600px" }}
                loading="lazy"
                aria-label="Booking calendar"
              />
            </div>

            {/* Below-embed row */}
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-paper/10 bg-white/[0.03] px-4 py-2.5 font-sans text-xs text-paper/55">
              <span>Showing real, up-to-date availability.</span>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-paper/70 hover:text-paper"
              >
                Open in new tab
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
