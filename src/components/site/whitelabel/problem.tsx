"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Ghost, Clock, TrendingDown } from "lucide-react";
import { RevealGroup, staggerItem, TiltCard } from "@/components/site/animations";

const PROBLEMS = [
  {
    icon: Ghost,
    title: "Your dev ghosted",
    body: "The freelancer vanished. The client's waiting. You're left explaining why nothing's shipped.",
  },
  {
    icon: Clock,
    title: "Edits take weeks",
    body: "Simple changes become tickets that sit. Clients churn because they can't get basic updates.",
  },
  {
    icon: TrendingDown,
    title: "You're turning down work",
    body: "No dev capacity means no new clients. You're saying no to revenue you could capture.",
  },
];

export function WhitelabelProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="problem"
      ref={ref}
      className="relative overflow-hidden bg-ink py-20 text-paper md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-brand/20 blur-[140px] animate-mesh-1" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[350px] w-[350px] rounded-full bg-brand-soft/10 blur-[140px] animate-mesh-2" aria-hidden="true" />

      <div className="container-site relative max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <h2 className="h-section text-paper">
            Finding a dev
            <br />
            <span className="text-brand-soft">who actually delivers</span>
            <br />
            is harder than it should be.
          </h2>
        </motion.div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {PROBLEMS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} variants={staggerItem}>
                <TiltCard
                  className="glow-card group h-full rounded-2xl border border-paper/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-brand-soft/30 hover:bg-white/[0.06] md:p-6"
                  maxTilt={5}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft/10 text-brand-soft transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-soft/20">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-base leading-snug tracking-[0.02em] text-paper">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-paper/60">
                    {p.body}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </RevealGroup>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="font-display text-lg leading-snug text-paper md:text-xl">
            No ghosting. No missed deadlines.
            <br />
            <span className="text-brand-soft">Just reliable dev that ships.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
