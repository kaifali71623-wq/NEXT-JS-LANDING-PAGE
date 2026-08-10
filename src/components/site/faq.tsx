"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What exactly is a Fit Call?",
    a: "A 15-minute conversation where we look at your current website together, talk through what's working and what isn't, and decide if there's a real fit to work together. It's a diagnosis, not a sales pitch. You'll leave with clarity either way.",
  },
  {
    q: "Is the Fit Call free?",
    a: "Yes. The call itself is free. I'd rather spend 15 minutes helping you see your site clearly than pitch you something you don't need. If there's a fit, we'll talk about next steps. If there isn't, you still walk away with a clearer picture.",
  },
  {
    q: "Do you build from scratch or fix existing sites?",
    a: "Both. A lot of my work is rebuilding B2C service business websites that 'look fine but aren't doing their job.' Sometimes that's a full rebuild on WordPress. Sometimes it's a strategic restructure of what you already have. The Fit Call is where we figure out which.",
  },
  {
    q: "What kind of businesses do you work with?",
    a: "B2C service businesses — agencies, local service providers, founder-led teams, and growing companies that rely on their website to drive real business outcomes. If your website is supposed to bring in customers (not just exist), we're probably a fit.",
  },
  {
    q: "I've worked with agencies before and got burned. How is this different?",
    a: "You're not hiring an account manager who hands off to a junior dev. You're working directly with the person who builds, ships, and owns the work. No layers. No babysitting. The site gets built right the first time and your team can actually run it after.",
  },
  {
    q: "What's your typical timeline?",
    a: "Most marketing-site builds land between 2–5 weeks depending on scope. Landing pages and restructures can be faster. After the Fit Call, you'll get a clear timeline with milestones — no vague 'we'll get to it when we get to it.'",
  },
  {
    q: "Can I see examples of your work?",
    a: "Most of my work has been delivered under agency partnerships or directly for clients, so I don't display it publicly. On the Fit Call, I'll share relevant examples that match your situation so you can judge the work, not the marketing around it.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      ref={ref}
      className="bg-paper py-20 md:py-24"
    >
      <div className="container-site max-w-2xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/70 backdrop-blur"
          >
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-section mt-4 text-ink"
          >
            Questions that
            <br />
            usually come up.
          </motion.h2>
        </div>

        <div className="mt-8 space-y-2.5">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors",
                  isOpen
                    ? "border-ink/15 bg-white shadow-[0_8px_24px_-12px_rgba(10,10,10,0.1)]"
                    : "border-ink/8 bg-white/50 hover:bg-white"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left md:gap-4 md:p-5"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "font-display text-base tracking-[0.02em] transition-colors md:text-lg",
                      isOpen ? "text-brand" : "text-ink"
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all md:h-8 md:w-8",
                      isOpen ? "bg-ink text-paper" : "bg-ink/5 text-ink"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-5 font-sans text-sm leading-relaxed text-ink/65 md:px-5 md:text-base">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
