"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Code, Rocket, Headphones } from "lucide-react";
import { RevealGroup, staggerItem, TiltCard } from "@/components/site/animations";

const STEPS = [
  {
    n: "01",
    icon: FileText,
    title: "Brief",
    body: "You send the design files, specs, or client requirements. I review and confirm scope, timeline, and deliverables.",
  },
  {
    n: "02",
    icon: Code,
    title: "Build",
    body: "I build the site on WordPress. You get progress updates at key milestones. No surprises, no going dark.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Deliver",
    body: "Launched under your brand. I stay invisible — your client never knows I existed. You take the credit.",
  },
  {
    n: "04",
    icon: Headphones,
    title: "Support",
    body: "Ongoing edits, updates, and fixes. I'm your dev team for as long as you need one. Scale up or down anytime.",
  },
];

export function WhitelabelProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="process"
      ref={ref}
      className="bg-white py-20 md:py-24"
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl"
        >
          <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            How it works
          </div>
          <h2 className="h-section mt-3 text-ink">
            Simple process.
            <br />
            Reliable delivery.
          </h2>
        </motion.div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.n} variants={staggerItem}>
                <TiltCard
                  className="glow-card group h-full rounded-2xl border border-ink/10 bg-paper p-5 transition-colors duration-300 hover:border-brand/30 hover:bg-white md:p-6"
                  maxTilt={5}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs tracking-[0.1em] text-brand font-bold">
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
