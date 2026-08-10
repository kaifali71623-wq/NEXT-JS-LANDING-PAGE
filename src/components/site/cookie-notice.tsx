"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "kaif-cookie-consent";

export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setTimeout(() => {
      const consent = window.localStorage.getItem(STORAGE_KEY);
      if (!consent) setShow(true);
    }, 2500);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "dismissed");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-3 top-16 z-30 mx-auto max-w-md rounded-2xl border border-ink/10 bg-white p-3 shadow-[0_8px_32px_-8px_rgba(10,10,10,0.15)] md:inset-x-4 md:max-w-lg md:p-4"
          role="dialog"
          aria-label="Cookie notice"
          aria-live="polite"
        >
          <div className="flex items-start gap-2.5 md:items-center">
            <p className="flex-1 font-sans text-[11px] leading-relaxed text-ink/65 md:text-xs">
              This page embeds a booking calendar (Selvinx). No tracking pixels.{" "}
              <button
                onClick={() => {
                  const el = document.querySelector('[aria-label="Privacy"]') as HTMLButtonElement;
                  el?.click();
                }}
                className="font-semibold text-brand underline"
              >
                Privacy
              </button>
            </p>
            <button
              onClick={dismiss}
              className="shrink-0 rounded-full bg-ink px-4 py-2 font-sans text-xs font-semibold text-paper transition-colors hover:bg-brand"
              style={{ minHeight: "36px" }}
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
