"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { ArrowRight, RefreshCw, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Check = {
  id: string;
  prompt: string;
  howToCheck: string;
  passHint: string;
  failHint: string;
};

/**
 * Objective, observable checks — not self-assessment.
 * Each question tells the user HOW to verify the answer themselves,
 * so the result is a fact, not an opinion.
 */
const CHECKS: Check[] = [
  {
    id: "clarity",
    prompt: "A stranger can tell what you do in 5 seconds",
    howToCheck: "Open your homepage. Set a 5-second timer. Can a first-time visitor name your service and who it's for before the timer ends?",
    passHint: "Headline says what you do and who it's for",
    failHint: "Vague tagline or industry jargon",
  },
  {
    id: "answers",
    prompt: "Your top 3 buyer questions are answered on the page",
    howToCheck: "List the 3 questions customers ask you most (price, timing, process, etc.). Are the answers visible without scrolling past 2 screens?",
    passHint: "Pricing, process, timing all visible",
    failHint: "Buried in FAQ or missing entirely",
  },
  {
    id: "mobile",
    prompt: "Loads in under 3 seconds on a phone",
    howToCheck: "Open your site on your phone with wifi off (cellular only). Count the seconds until it's usable. Over 3 = fail.",
    passHint: "Loads fast on cellular",
    failHint: "Takes 4+ seconds or stalls",
  },
  {
    id: "cta",
    prompt: "Every page has ONE clear next step",
    howToCheck: "Visit your homepage, about page, and a service page. On each, what's the single action you want a visitor to take? If there are 3+ buttons competing, it fails.",
    passHint: "One obvious CTA per page",
    failHint: "Multiple competing buttons or no CTA",
  },
  {
    id: "trust",
    prompt: "A first-time visitor would trust you enough to reach out",
    howToCheck: "Pretend you've never heard of your business. Within 30 seconds, can you find: proof of past work, a real person/team, and a way to contact a human?",
    passHint: "Proof, people, and contact visible",
    failHint: "Anonymous, no proof, contact buried",
  },
  {
    id: "edit",
    prompt: "Your team can update a headline without a developer",
    howToCheck: "Ask yourself: could your marketing lead change a homepage headline today without filing a dev ticket? If no, it fails.",
    passHint: "Editable by non-devs",
    failHint: "Every change needs a developer",
  },
];

type ResultBand = {
  min: number;
  max: number;
  band: string;
  title: string;
  summary: string;
  tone: "strong" | "solid" | "underperforming" | "risk";
  cta: string;
};

const BANDS: ResultBand[] = [
  {
    min: 5,
    max: 6,
    band: "STRONG",
    title: "Your site is doing its job.",
    summary:
      "You're in the top 10%. A Fit Call will surface the 1-2 leverage points that turn a good site into a quietly excellent one.",
    tone: "strong",
    cta: "Book Fit Call — sharpen the edges",
  },
  {
    min: 4,
    max: 4,
    band: "SOLID",
    title: "Solid foundation. Money left on the table.",
    summary:
      "You're above average but a few specific fixes would compound. The Fit Call will map the gaps and prioritize what to ship first.",
    tone: "solid",
    cta: "Book Fit Call — find the gaps",
  },
  {
    min: 2,
    max: 3,
    band: "UNDERPERFORMING",
    title: "Your site is underperforming.",
    summary:
      "This is the most common band. The good news: the fixes are usually structural, not aesthetic. The Fit Call will give you a clear roadmap.",
    tone: "underperforming",
    cta: "Book Fit Call — get the roadmap",
  },
  {
    min: 0,
    max: 1,
    band: "AT RISK",
    title: "Your site is working against you.",
    summary:
      "Every day it stays like this costs you. The Fit Call is the fastest way to understand exactly what's broken and what to do first.",
    tone: "risk",
    cta: "Book Fit Call — stop the bleed",
  },
];

const TONE_CONFIG: Record<
  ResultBand["tone"],
  { color: string; textClass: string; bgClass: string; glow: string }
> = {
  strong: {
    color: "#16a34a",
    textClass: "text-emerald-600",
    bgClass: "from-emerald-500/10",
    glow: "rgba(22,163,74,0.3)",
  },
  solid: {
    color: "#2c64a1",
    textClass: "text-brand",
    bgClass: "from-brand/10",
    glow: "rgba(44,100,161,0.3)",
  },
  underperforming: {
    color: "#b45309",
    textClass: "text-amber-600",
    bgClass: "from-amber-500/10",
    glow: "rgba(245,158,11,0.3)",
  },
  risk: {
    color: "#b91c1c",
    textClass: "text-red-600",
    bgClass: "from-red-500/10",
    glow: "rgba(220,38,38,0.3)",
  },
};

export function FitCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const total = CHECKS.length;
  const isResult = step >= total;

  const passedCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers]
  );

  const band = useMemo(
    () =>
      BANDS.find((b) => passedCount >= b.min && passedCount <= b.max) ??
      BANDS[BANDS.length - 1],
    [passedCount]
  );

  const selectAnswer = useCallback(
    (qid: string, passed: boolean) => {
      setAnswers((prev) => ({ ...prev, [qid]: passed }));
      window.setTimeout(() => {
        setStep((s) => Math.min(s + 1, total));
      }, 350);
    },
    [total]
  );

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const goToBooking = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "fitScore",
        JSON.stringify({
          score: passedCount,
          band: band.band,
          total,
        })
      );
    }
    const el = document.getElementById("book");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };

  const currentCheck = CHECKS[step];
  const progress = isResult ? 100 : (step / total) * 100;

  return (
    <section
      id="fit-score"
      ref={ref}
      className="relative overflow-hidden bg-paper py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-brand-soft/20 blur-[120px]" />

      <div className="container-site relative max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/70 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            90-second site check
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-section mt-4 text-ink"
          >
            Run these 6 checks
            <br />
            on your own site.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-3 max-w-md font-sans text-sm text-ink/55 md:text-base"
          >
            Objective checks you can verify yourself. No email required.
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-[0_20px_60px_-20px_rgba(10,10,10,0.15)]"
        >
          <div className="h-1 w-full bg-ink/5" role="progressbar" aria-label="Progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full bg-brand"
            />
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!isResult ? (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center justify-between font-sans text-[11px] font-semibold uppercase tracking-wider text-ink/55">
                    <span>Check {step + 1} of {total}</span>
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="text-ink/55 transition-colors hover:text-ink disabled:opacity-30"
                      aria-label="Go back"
                    >
                      ← Back
                    </button>
                  </div>

                  {/* The claim to verify */}
                  <h3 className="mt-4 font-display text-lg leading-snug text-ink md:text-xl">
                    {currentCheck.prompt}
                  </h3>

                  {/* How to check — the neutralizer */}
                  <div className="mt-4 rounded-xl bg-paper p-4">
                    <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink/60">
                      How to check
                    </div>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/70">
                      {currentCheck.howToCheck}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => selectAnswer(currentCheck.id, true)}
                      className="group flex flex-col items-start gap-1 rounded-xl border-2 border-ink/10 bg-paper px-4 py-3.5 text-left transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-50"
                      aria-label="Yes, this check passes"
                    >
                      <span className="font-display text-base text-emerald-600">Pass</span>
                      <span className="font-sans text-[11px] text-ink/50">{currentCheck.passHint}</span>
                    </button>
                    <button
                      onClick={() => selectAnswer(currentCheck.id, false)}
                      className="group flex flex-col items-start gap-1 rounded-xl border-2 border-ink/10 bg-paper px-4 py-3.5 text-left transition-all duration-200 hover:border-red-500/40 hover:bg-red-50"
                      aria-label="No, this check fails"
                    >
                      <span className="font-display text-base text-red-600">Fail</span>
                      <span className="font-sans text-[11px] text-ink/50">{currentCheck.failHint}</span>
                    </button>
                  </div>

                  {/* Progress dots */}
                  <div className="mt-6 flex items-center justify-center gap-2">
                    {CHECKS.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          i === step
                            ? "w-6 bg-brand"
                            : i < step
                            ? "w-2 bg-brand/50"
                            : "w-2 bg-ink/15"
                        )}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <ResultView
                  key="result"
                  passedCount={passedCount}
                  total={total}
                  band={band}
                  onRestart={restart}
                  onBook={goToBooking}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="mt-4 text-center font-sans text-xs text-ink/55">
          Objective self-check, not a full audit. The real diagnosis happens on
          the Fit Call.
        </p>
      </div>
    </section>
  );
}

function ResultView({
  passedCount,
  total,
  band,
  onRestart,
  onBook,
}: {
  passedCount: number;
  total: number;
  band: ResultBand;
  onRestart: () => void;
  onBook: () => void;
}) {
  const tone = TONE_CONFIG[band.tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className={cn("relative overflow-hidden rounded-xl bg-gradient-to-br to-transparent p-6 md:p-8", tone.bgClass)}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
        style={{ background: tone.glow }}
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Score */}
        <div className="flex items-baseline gap-1.5">
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="font-display text-5xl text-ink md:text-6xl"
          >
            {passedCount}
          </motion.span>
          <span className="font-display text-2xl text-ink/55">/ {total}</span>
        </div>
        <div className="font-sans text-[11px] font-medium uppercase tracking-wider text-ink/60">
          checks passed
        </div>

        <div className={cn("mt-3 font-display text-sm tracking-[0.2em]", tone.textClass)}>
          {band.band}
        </div>

        <h3 className="mt-4 font-display text-lg leading-snug text-ink md:text-xl">
          {band.title}
        </h3>

        <p className="mt-2.5 max-w-md font-sans text-sm leading-relaxed text-ink/65 md:text-base">
          {band.summary}
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            onClick={onBook}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-sans text-sm font-semibold text-paper transition-colors hover:bg-brand"
          >
            <Zap className="h-4 w-4 text-brand-soft" aria-hidden="true" />
            {band.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-3.5 font-sans text-sm font-medium text-ink/70 transition-colors hover:text-ink"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            Retake
          </button>
        </div>
      </div>
    </motion.div>
  );
}
