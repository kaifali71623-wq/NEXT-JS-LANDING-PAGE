"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, EyeOff, Gauge, Wrench } from "lucide-react";
import { RevealGroup, staggerItem, TiltCard } from "@/components/site/animations";

const SYMPTOMS = [
  {
    icon: EyeOff,
    title: "Business not clearly explained",
    body: "Visitors land, look around, and still don't know what you actually do.",
  },
  {
    icon: Gauge,
    title: "Looks fine, performs poorly",
    body: "It might look expensive. Strip away the design and the structure isn't helping.",
  },
  {
    icon: Wrench,
    title: "Needs a developer to change a sentence",
    body: "Every small update becomes a ticket. The site has a job title, not the job.",
  },
];

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="problem"
      ref={ref}
      className="relative overflow-hidden bg-ink py-20 text-paper md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
      {/* Animated gradient mesh */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-brand/20 blur-[140px] animate-mesh-1"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[350px] w-[350px] rounded-full bg-brand-soft/10 blur-[140px] animate-mesh-2"
        aria-hidden="true"
      />

      <div className="container-site relative max-w-4xl">
        {/* Header */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-paper/85"
          >
            <AlertTriangle className="h-3 w-3 text-brand-soft" aria-hidden="true" />
            The pattern I keep seeing
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-section text-balance mt-4"
          >
            A business can be{" "}
            <span className="text-brand-soft">genuinely good</span> — and its
            website can still do a poor job.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 max-w-lg font-sans text-base leading-relaxed text-paper/65 md:text-lg"
          >
            After 7 years and 500+ sites reviewed, one thing is hard to ignore:
            most website problems aren&apos;t really design problems. They&apos;re{" "}
            <span className="font-semibold text-paper">thinking problems</span>.
          </motion.p>
        </div>

        {/* Symptoms — 3 cards with stagger + tilt + interactive hover */}
        <RevealGroup className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {SYMPTOMS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={staggerItem}>
                <TiltCard
                  className="glow-card group h-full rounded-2xl border border-paper/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-brand-soft/30 hover:bg-white/[0.06] md:p-6"
                  maxTilt={5}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft/10 text-brand-soft transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-soft/20">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-base leading-snug tracking-[0.02em] text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-paper/60">
                    {s.body}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </RevealGroup>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 flex flex-col items-start gap-5 rounded-2xl border border-brand-soft/20 bg-gradient-to-br from-brand/10 to-transparent p-6 md:flex-row md:items-center md:p-7"
        >
          <div className="flex-1">
            <p className="font-display text-base leading-snug text-paper md:text-lg">
              Not the &ldquo;24/7 salesperson&rdquo; stuff.
              <br />
              <span className="text-brand-soft">
                Just websites that actually do their job.
              </span>
            </p>
          </div>
          <a
            href="#fit-score"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("fit-score");
              if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:bg-brand-soft"
          >
            See if yours is one of them
            <span className="text-brand" aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
