"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AudienceSwitch } from "@/components/site/audience-switch";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Problem", href: "#problem" },
  { label: "Fit Score", href: "#fit-score" },
  { label: "Approach", href: "#approach" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);

        const sections = NAV_ITEMS.map((n) => n.href.slice(1));
        let current = "";
        for (const id of sections) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = id;
            break;
          }
        }
        setActiveSection(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-3"
        )}
      >
        <div className="container-site">
          <nav
            className={cn(
              "glass-nav flex items-center justify-between rounded-full px-3 py-2 transition-all duration-300 md:px-5",
              scrolled ? "shadow-[0_8px_32px_-8px_rgba(10,10,10,0.15)]" : "shadow-none"
            )}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#top");
              }}
              className="group flex items-center gap-2"
              aria-label="Kaif Ali — home"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper">
                <span className="font-display text-sm">K</span>
              </span>
              <span className="font-display text-sm tracking-[0.08em] text-ink">
                Kaif Ali
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-0.5 md:flex">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav(item.href);
                      }}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-brand-soft/30 text-brand"
                          : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* CTA + audience switch + mobile menu */}
            <div className="flex items-center gap-1.5">
              <div className="hidden lg:block">
                <AudienceSwitch current="b2c" />
              </div>
              <a
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav("#book");
                }}
                className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-sans text-[13px] font-semibold text-paper transition-colors hover:bg-brand md:inline-flex"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-soft" />
                </span>
                Book Fit Call
              </a>

              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink md:hidden"
              >
                <div className="relative h-3 w-4">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-0.5 w-4 bg-ink transition-all",
                      open && "top-1.5 rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 h-0.5 w-4 bg-ink transition-all",
                      open && "opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-3 h-0.5 w-4 bg-ink transition-all",
                      open && "top-1.5 -rotate-45"
                    )}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 overflow-hidden transition-all duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[78%] max-w-sm bg-paper p-6 pt-24 shadow-2xl transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.href);
                  }}
                  className="block rounded-xl px-4 py-3 font-display text-base tracking-[0.04em] text-ink hover:bg-ink/5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#book");
            }}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-sans text-sm font-semibold text-paper"
          >
            Book Fit Call
          </a>
          <div className="mt-3">
            <AudienceSwitch current="b2c" variant="mobile" />
          </div>
        </div>
      </div>
    </>
  );
}
