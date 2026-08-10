"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MagneticButton } from "@/components/site/animations";
import Link from "next/link";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-paper">
      {/* Final CTA — everything centered */}
      <div className="relative border-t border-ink/8 bg-paper py-20 text-center md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft/20 blur-[120px]" />

        <div className="container-site relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/70 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            Your move
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-section mt-5 text-ink"
          >
            Your website should be
            <br />
            <span className="text-gradient-brand">working harder</span>
            <br />
            than this.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 max-w-lg font-sans text-base text-ink/60 md:text-lg"
          >
            15 minutes. Honest read on where your site stands. Clear next steps
            either way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row"
          >
            <MagneticButton
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("book");
                if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
              }}
              className="shine-on-hover items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-sans text-sm font-semibold text-paper transition-colors hover:bg-brand"
              ariaLabel="Book your Fit Call"
            >
              Book your Fit Call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton
              href="#fit-score"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("fit-score");
                if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
              }}
              className="items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3.5 font-sans text-sm font-semibold text-ink backdrop-blur transition-colors hover:text-ink"
              ariaLabel="Score my site first"
            >
              Score my site first →
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink/8 bg-ink py-6 text-paper/60">
        <div className="container-site flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper text-ink">
              <span className="font-display text-xs">K</span>
            </span>
            <div className="font-sans text-xs">
              <div className="font-display tracking-[0.06em] text-paper">
                Kaif Ali
              </div>
              <div className="text-paper/60">B2C Service Business Websites</div>
            </div>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-4 font-sans text-xs"
            aria-label="Footer"
          >
            <a
              href="mailto:kaif@selvinx.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-paper"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              kaif@selvinx.com
            </a>
            <a
              href="https://www.linkedin.com/in/kaif-ali"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper"
            >
              LinkedIn ↗
            </a>
            <Link
              href="/whitelabel"
              className="transition-colors hover:text-paper"
            >
              For Agencies ↗
            </Link>
            <button
              onClick={() => setShowPrivacy(true)}
              className="transition-colors hover:text-paper"
            >
              Privacy
            </button>
          </nav>

          <div className="font-sans text-xs text-paper/60">
            © {new Date().getFullYear()} Kaif Ali
          </div>
        </div>
      </div>

      {/* Privacy modal */}
      {showPrivacy && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={() => setShowPrivacy(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Privacy notice"
        >
          <div
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-paper p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl tracking-[0.02em] text-ink">Privacy</h2>
              <button
                onClick={() => setShowPrivacy(false)}
                aria-label="Close privacy notice"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink/10"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-ink/65">
              <p>
                <strong className="text-ink">What we collect:</strong> This page
                itself does not store any personal data. The Fit Score
                Calculator runs entirely in your browser — your answers never
                leave your device.
              </p>
              <p>
                <strong className="text-ink">Booking:</strong> When you book a
                Fit Call, the booking is handled by Selvinx (selvinx.com). Your
                name, email, and selected time are processed by Selvinx to
                schedule and confirm your appointment. Kaif receives these
                details directly.
              </p>
              <p>
                <strong className="text-ink">Analytics:</strong> This page does
                not currently run third-party analytics or tracking pixels.
              </p>
              <p>
                <strong className="text-ink">Accessibility:</strong> This page
                aims to meet WCAG 2.1 AA. If you encounter a barrier, email{" "}
                <a
                  href="mailto:kaif@selvinx.com"
                  className="font-semibold text-brand underline"
                >
                  kaif@selvinx.com
                </a>
                .
              </p>
              <p>
                <strong className="text-ink">Contact:</strong> Questions about
                your data? Email{" "}
                <a
                  href="mailto:kaif@selvinx.com"
                  className="font-semibold text-brand underline"
                >
                  kaif@selvinx.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
