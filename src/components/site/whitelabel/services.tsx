"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, PenTool, Lightbulb, Wrench } from "lucide-react";
import { RevealGroup, staggerItem, TiltCard } from "@/components/site/animations";

const SERVICES = [
  {
    icon: Code2,
    title: "WordPress Development",
    body: "Full site builds from your design files. Custom themes, Elementor, responsive, SEO-ready. Pixel-perfect, every time.",
  },
  {
    icon: PenTool,
    title: "Design Help",
    body: "Don't have a designer? I can take wireframes to finished designs, or polish what you have. Not just a code monkey.",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    body: "Page structure, user flow, conversion logic. I'll tell you what works and what doesn't before you build it.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    body: "Ongoing edits, updates, security patches, and priority support. Your dev team for as long as you need one.",
  },
];

export function WhitelabelServices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="services"
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
            What you get
          </div>
          <h2 className="h-section mt-3 text-ink">
            Full service.
            <br />
            Your brand.
          </h2>
          <p className="mt-4 max-w-lg font-sans text-sm text-ink/55 md:text-base">
            Everything your agency needs under the hood. I stay invisible —
            your clients never know I existed.
          </p>
        </motion.div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={staggerItem}>
                <TiltCard
                  className="glow-card group h-full rounded-2xl border border-ink/10 bg-paper p-5 transition-colors duration-300 hover:border-brand/30 hover:bg-white md:p-6"
                  maxTilt={4}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-paper transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg tracking-[0.02em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/55">
                    {s.body}
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
