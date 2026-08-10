"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Audience switch — links between B2C (/) and white-label (/whitelabel).
 * Simple, robust, works with Next.js routing. No state, no localStorage.
 */
export function AudienceSwitch({
  current,
  variant = "navbar",
}: {
  current: "b2c" | "agency";
  variant?: "navbar" | "mobile";
}) {
  const isB2C = current === "b2c";
  const target = isB2C ? "/whitelabel" : "/";
  const label = isB2C ? "For Agencies" : "For Business Owners";

  if (variant === "mobile") {
    return (
      <Link
        href={target}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        {label}
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <Link
      href={target}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/60 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-ink/70 backdrop-blur transition-colors hover:border-ink/30 hover:bg-white hover:text-ink"
      aria-label={`Switch to ${label}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
      </span>
      {label}
    </Link>
  );
}
