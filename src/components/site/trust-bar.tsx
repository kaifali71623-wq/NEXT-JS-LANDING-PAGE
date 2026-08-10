"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RevealGroup, staggerItem } from "@/components/site/animations";

const STATS = [
  { value: 7, suffix: "yrs", label: "in the trenches" },
  { value: 500, suffix: "+", label: "sites reviewed" },
  { value: 200, suffix: "+", label: "projects delivered" },
  { value: 8, suffix: "", label: "teams partnered" },
];

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="trust"
      ref={ref}
      className="border-y border-ink/8 bg-white py-14 md:py-16"
    >
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-start justify-between gap-3 md:mb-10 md:flex-row md:items-end"
        >
          <h2 className="h-section max-w-xl text-ink">
            Trusted by agencies
            <br />
            &amp; founder-led teams
          </h2>
          <p className="max-w-xs font-sans text-sm text-ink/55">
            Built and led website delivery across marketing agencies, service
            businesses, and growing companies.
          </p>
        </motion.div>

        {/* Stats — staggered reveal */}
        <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STATS.map((s, i) => (
            <motion.div key={s.label} variants={staggerItem}>
              <StatCard stat={s} inView={inView} />
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  inView,
}: {
  stat: { value: number; suffix: string; label: string };
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(stat.value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  return (
    <div className="glow-card group h-full rounded-2xl border border-ink/8 bg-paper p-4 transition-colors duration-300 hover:border-brand/20 hover:bg-white md:p-5">
      <div className="flex items-baseline gap-1">
        <span className="font-display text-3xl text-ink transition-colors duration-300 group-hover:text-brand md:text-4xl">
          {display}
        </span>
        {stat.suffix && (
          <span className="font-display text-base text-brand">
            {stat.suffix}
          </span>
        )}
      </div>
      <div className="mt-1 font-sans text-[11px] font-medium uppercase tracking-wider text-ink/55">
        {stat.label}
      </div>
    </div>
  );
}
