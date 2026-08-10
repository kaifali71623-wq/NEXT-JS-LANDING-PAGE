"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { MagneticButton } from "@/components/site/animations";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Subtle parallax — image moves down slower than text moves up
  const imageY = scrollY * 0.15;
  const textY = scrollY * -0.05;

  const currentMonth = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new Date().toLocaleString("en-US", { month: "long" });
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("trust");
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-paper pb-20 pt-28 md:pb-24 md:pt-32"
    >
      {/* Subtle backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full bg-brand-soft/20 blur-[120px]" />

      <div className="container-site relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: Text */}
          <motion.div
            style={{ y: textY }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/70 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {currentMonth ? `Now booking ${currentMonth} Fit Calls` : "Now booking Fit Calls"}
            </motion.div>

            {/* Headline — word-by-word reveal, natural line breaks */}
            <h1 className="h-hero mt-5 text-ink">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="block"
              >
                Your website
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="block"
              >
                has a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">job title</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{ originX: 0 }}
                    className="absolute -bottom-1 left-0 right-0 h-2.5 -rotate-1 bg-brand-soft/70"
                  />
                </span>
                .
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="block text-ink/55"
              >
                Not the job.
              </motion.span>
            </h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 max-w-lg font-sans text-base leading-relaxed text-ink/65 sm:text-lg"
            >
              I&apos;m{" "}
              <span className="font-semibold text-ink">Kaif Ali</span>. For 7
              years I&apos;ve built B2C service business websites that actually
              do their job — clearer, faster, and built to support real
              outcomes.
            </motion.p>

            {/* Quick stat row — inline, nowrap on each stat */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <Stat value="7" suffix="yrs" label="in the trenches" />
              <span className="h-5 w-px bg-ink/10" />
              <Stat value="500" suffix="+" label="sites reviewed" />
              <span className="h-5 w-px bg-ink/10" />
              <Stat value="200" suffix="+" label="projects shipped" />
            </motion.div>

            {/* CTAs — single primary, clear hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <MagneticButton
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("book");
                  if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
                }}
                className="shine-on-hover items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-sans text-sm font-semibold text-paper transition-colors hover:bg-brand"
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
                className="items-center justify-center gap-1.5 px-3 py-3 font-sans text-sm font-medium text-ink/60 underline-offset-4 hover:text-ink hover:underline"
                ariaLabel="Score my site in 60 seconds"
              >
                Score my site in 60s
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </MagneticButton>
            </motion.div>

            {/* Risk reversal microcopy — reduces booking anxiety */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-3 font-sans text-xs text-ink/45"
            >
              Free 15-min call · No pitch, just a honest read on your site
            </motion.p>

            {/* Social proof — single line, no avatar clutter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-7 flex items-center gap-2 font-sans text-xs text-ink/50"
            >
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-brand text-brand" aria-hidden="true" />
                ))}
              </div>
              <span>Trusted by agencies &amp; founders across 6 countries</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: Portrait */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-[0_20px_60px_-20px_rgba(10,10,10,0.2)]">
                { }
                <img
                  src="https://kaif.selvinx.com/wp-content/uploads/2026/06/kaif-ali-1-1.webp"
                  alt="Kaif Ali — Lead Web Developer"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl glass px-3.5 py-2.5">
                  <div>
                    <div className="font-display text-sm tracking-[0.04em] text-ink">
                      Kaif Ali
                    </div>
                    <div className="font-sans text-[11px] text-ink/55">
                      Lead Web Developer
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          aria-label="Scroll to next section"
          className="group absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink/55 hover:text-ink md:flex"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <span className="flex h-8 w-4.5 items-start justify-center rounded-full border border-ink/20 p-1">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-1 w-1 rounded-full bg-ink/50"
            />
          </span>
        </motion.button>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex items-baseline gap-1 whitespace-nowrap">
      <span className="font-display text-base text-ink">{value}</span>
      {suffix && (
        <span className="font-display text-xs text-brand">{suffix}</span>
      )}
      <span className="font-sans text-[11px] font-medium text-ink/55">
        {label}
      </span>
    </div>
  );
}
