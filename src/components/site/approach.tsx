"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Boxes, FileSearch, Hammer, ShieldCheck } from "lucide-react";
import { RevealGroup, staggerItem, TiltCard } from "@/components/site/animations";

const STEPS = [
  {
    n: "01",
    icon: FileSearch,
    title: "Understand",
    body: "Get clear on the business. Who's the customer, what's the offer, what action the site needs to drive.",
  },
  {
    n: "02",
    icon: Boxes,
    title: "Simplify",
    body: "Cut what doesn't earn its place. Make the important stuff obvious in 5 seconds.",
  },
  {
    n: "03",
    icon: Hammer,
    title: "Build",
    body: "Built on WordPress, structured for the long term. Fast, maintainable, editable by your team.",
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Own",
    body: "Documentation, training, and a system your team can run. No babysitting required.",
  },
];

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="approach"
      ref={ref}
      className="bg-white py-20 md:py-24"
    >
      <div className="container-site">
        {/* Header */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brand"
          >
            My approach
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-section mt-3 text-ink"
          >
            How I work. Four moves.
          </motion.h2>
        </div>

        {/* Steps grid — stagger + tilt + interactive hover */}
        <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.n} variants={staggerItem}>
                <TiltCard
                  className="glow-card group h-full rounded-2xl border border-ink/10 bg-paper p-5 transition-colors duration-300 hover:border-brand/30 hover:bg-white md:p-6"
                  maxTilt={5}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs tracking-[0.1em] text-brand">
                      {step.n}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft/30 text-brand transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-paper">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-lg tracking-[0.02em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/55">
                    {step.body}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
