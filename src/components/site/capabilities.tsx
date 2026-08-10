"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Code2, Palette } from "lucide-react";
import { RevealGroup, staggerItem, TiltCard } from "@/components/site/animations";

const CAPABILITIES = [
  {
    title: "Strategy & UX",
    icon: Compass,
    summary: "Structure before pixels. The thinking that makes the rest work.",
    items: [
      "Conversion-focused layouts",
      "Information architecture",
      "Trust-driven page structure",
      "Wireframing",
    ],
    accent: "from-brand/15",
  },
  {
    title: "Development",
    icon: Code2,
    summary: "Built on WordPress. Fast, maintainable, editable by your team.",
    items: [
      "WordPress development",
      "Responsive development",
      "Speed optimization",
      "Technical SEO",
      "Ongoing maintenance",
    ],
    accent: "from-brand-soft/25",
  },
  {
    title: "Brand & Trust",
    icon: Palette,
    summary: "Consistency across every page. The stuff that builds trust fast.",
    items: [
      "Brand consistency",
      "Visual identity",
      "Messaging & positioning",
      "First-impression design",
    ],
    accent: "from-ink/8",
  },
];

export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="border-y border-ink/8 bg-paper py-16 md:py-20"
    >
      <div className="container-site">
        <div className="max-w-2xl">
          <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            Skills &amp; services
          </div>
          <h2 className="h-section mt-3 text-ink">
            What I bring to the table.
          </h2>
        </div>

        {/* Cards — with icons, gradient accents, tilt + glow on hover */}
        <RevealGroup className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div key={cap.title} variants={staggerItem}>
                <TiltCard
                  className={`glow-card group h-full overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br ${cap.accent} to-white p-5 md:p-6`}
                  maxTilt={4}
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-paper transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 font-display text-lg tracking-[0.02em] text-ink">
                    {cap.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/55">
                    {cap.summary}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-ink/8 pt-4">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-sans text-sm text-ink/70"
                      >
                        <span
                          className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-soft/40 text-[8px] font-bold text-brand"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
