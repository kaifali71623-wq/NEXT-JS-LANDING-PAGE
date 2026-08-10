"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How does white-label work?",
    a: "You send me the design files, specs, or client requirements. I build the site on WordPress. You deliver it to your client under your brand. I stay completely invisible — no watermarks, no credit, no contact with your client unless you explicitly want me to. You take all the credit.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. I'm happy to sign your NDA before we start. I work with agency partners regularly and understand the importance of confidentiality. Your clients, your designs, and your processes stay private.",
  },
  {
    q: "Can you work in our project management tool?",
    a: "Yes. I've worked in Slack, Asana, Trello, ClickUp, Notion, Basecamp, and email-only. Whatever your agency uses, I'll adapt. I prefer a single channel for communication to keep things clean.",
  },
  {
    q: "What's your typical turnaround?",
    a: "Landing pages: 2-5 days. Full WordPress builds: 1-3 weeks depending on scope. Emergency fixes: same-day if I have capacity. I'll give you an exact timeline when I review the brief, and I stick to it.",
  },
  {
    q: "Do you handle client communication?",
    a: "By default, no — you handle client comms, I handle dev. But if you want me to join client calls or communicate directly (under your email/domain), we can arrange that. Most agencies prefer to keep me behind the scenes.",
  },
  {
    q: "What if my client needs something you don't do?",
    a: "I'll tell you upfront. I focus on WordPress — I don't do custom web apps, mobile apps, or e-commerce platforms like Shopify. If a project is outside my scope, I'll refer you to someone who can help rather than fake it.",
  },
  {
    q: "How does pricing work?",
    a: "Custom quotes based on scope and complexity. No hidden fees, no surprises. Book a discovery call and I'll give you a clear quote based on your specific needs — whether that's a one-off build, ongoing maintenance, or a retainer arrangement.",
  },
];

export function WhitelabelFAQ() {
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
            Agency questions
            <br />
            that come up.
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
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
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
