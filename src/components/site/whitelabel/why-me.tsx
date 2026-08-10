"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, EyeOff, Award, MessageSquare, Maximize2 } from "lucide-react";
import { RevealGroup, staggerItem, TiltCard } from "@/components/site/animations";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Reliable Delivery",
    body: "7 years. 200+ sites shipped. Zero missed deadlines. When I say it ships Friday, it ships Friday.",
  },
  {
    icon: EyeOff,
    title: "Truly White-Label",
    body: "Your brand, your client, your credit. I stay invisible. No watermarks, no footprints, no poaching.",
  },
  {
    icon: Award,
    title: "WP Specialist",
    body: "7 years of WordPress specifically — not a generalist who dabbles. I know the CMS inside out.",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    body: "You talk to me, not an account manager. Quick questions get quick answers. No layers.",
  },
  {
    icon: Maximize2,
    title: "Scalable Capacity",
    body: "Need 1 site this month and 5 next? I scale up and down with your workload. No retainers required.",
  },
];

export function WhitelabelWhyMe() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="why-me"
      ref={ref}
      className="border-y border-ink/8 bg-paper py-20 md:py-24"
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl"
        >
          <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            Why work with me
          </div>
          <h2 className="h-section mt-3 text-ink">
            Not just another
            <br />
            freelancer.
          </h2>
          <p className="mt-4 max-w-lg font-sans text-sm text-ink/55 md:text-base">
            The difference between a dev who costs you clients and one who
            helps you grow.
          </p>
        </motion.div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                variants={staggerItem}
                className={r.title === "Scalable Capacity" ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <TiltCard
                  className="glow-card group h-full rounded-2xl border border-ink/10 bg-white p-5 transition-colors duration-300 hover:border-brand/30 hover:bg-paper md:p-6"
                  maxTilt={4}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-paper">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg tracking-[0.02em] text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/55">
                    {r.body}
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
