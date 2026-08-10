"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail } from "lucide-react";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-white py-20 md:py-24"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-[0_20px_50px_-20px_rgba(10,10,10,0.2)]">
                { }
                <img
                  src="https://kaif.selvinx.com/wp-content/uploads/2026/03/kaif-ali-15-1-1-scaled.webp"
                  alt="Kaif Ali — working on a website project"
                  className="aspect-[5/6] w-full object-cover object-center"
                />
              </div>

              {/* Small floating image — positioned to not overlap content */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-4 hidden w-28 overflow-hidden rounded-xl border-4 border-white shadow-lg sm:block md:w-36"
              >
                { }
                <img
                  src="https://kaif.selvinx.com/wp-content/uploads/2026/03/image-9.webp"
                  alt="Kaif Ali at his desk"
                  className="aspect-square w-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              About me
            </div>
            <h2 className="h-section mt-3 text-ink">
              Built for owners tired
              <br />
              of babysitting
              <br />
              <span className="text-gradient-brand">their website.</span>
            </h2>

            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-ink/65 md:text-lg">
              <p>
                I&apos;ve spent the last 7 years living more inside websites
                than most people ever will. Building them. Fixing them.
                Improving them. Delivered 200+ projects and led website
                delivery for marketing agencies in the B2C service space.
              </p>
              <p>
                I care about creating websites that communicate clearly, build
                trust, and support real business outcomes. Not the usual
                website talk. Not pretty-for-the-sake-of-it. Just websites
                that actually do their job.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("book");
                  if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-sans text-sm font-semibold text-paper transition-colors hover:bg-brand"
              >
                Book a Fit Call
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="https://www.linkedin.com/in/kaif-ali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-3 font-sans text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="mailto:kaif@selvinx.com"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-3 font-sans text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
