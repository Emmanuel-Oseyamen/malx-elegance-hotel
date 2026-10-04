"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f8f6f2] py-20 sm:py-28 lg:py-36"
    >
      {/* Ambient luxury glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#D4A373]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#D4A373]/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">

          {/* ================================================= */}
          {/* IMAGE */}
          {/* ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image */}
            <div className="group relative overflow-hidden rounded-[28px] sm:rounded-[34px]">
              <Image
                src="/about.png"
                alt="MALX Elegance Hotel"
                width={900}
                height={1100}
                className="h-[520px] w-full object-cover transition duration-[1200ms] group-hover:scale-[1.04] sm:h-[650px] lg:h-[720px]"
                priority
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

              {/* Image frame */}
              <div className="absolute inset-3 rounded-[22px] border border-white/20 sm:inset-4 sm:rounded-[28px]" />

              {/* Floating brand label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/70">
                    Experience
                  </p>

                  <p className="mt-1 font-serif text-2xl italic text-white sm:text-3xl">
                    MALX Elegance
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md sm:h-14 sm:w-14">
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Floating gold detail */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
              className="absolute -right-3 -top-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#D4A373]/30 bg-[#f8f6f2] shadow-xl sm:-right-5 sm:-top-5 sm:h-24 sm:w-24"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A373]/20 sm:h-16 sm:w-16">
                <Sparkles
                  size={21}
                  strokeWidth={1.2}
                  className="text-[#D4A373]"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#D4A373] sm:w-14" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9a704b]">
                About MALX
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-6 max-w-2xl font-serif text-[2.7rem] leading-[1.05] tracking-[-0.03em] text-[#171717] sm:text-5xl lg:text-6xl">
              Where elegance
              <span className="block italic text-[#9a704b]">
                feels effortless.
              </span>
            </h2>

            {/* Intro */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-black/60 sm:text-xl sm:leading-9">
              MALX Elegance Hotel brings together refined spaces,
              thoughtful hospitality, and modern comfort to create
              an experience that feels distinctly yours.
            </p>

            {/* Divider */}
            <div className="my-8 h-px w-full max-w-xl bg-black/10 sm:my-10" />

            {/* Body */}
            <div className="max-w-xl space-y-5 text-[15px] leading-7 text-black/55 sm:text-base sm:leading-8">
              <p>
                Every detail has been thoughtfully considered —
                from the atmosphere of our spaces to the comfort
                of every room — creating an environment where
                guests can slow down, relax, and feel completely
                at ease.
              </p>

              <p>
                Whether you're travelling for business, enjoying
                time with family, planning a romantic escape, or
                celebrating something special, MALX is designed
                to make your stay memorable.
              </p>
            </div>

            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div className="mt-10 grid grid-cols-3 border-y border-black/10 py-7 sm:mt-12 sm:py-8">
              {/* Stat */}
              <div className="pr-3 sm:pr-6">
                <p className="font-serif text-3xl text-[#9a704b] sm:text-4xl">
                  50+
                </p>

                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-black/45 sm:text-xs">
                  Luxury Rooms
                </p>
              </div>

              {/* Stat */}
              <div className="border-l border-black/10 px-3 sm:px-6">
                <p className="font-serif text-3xl text-[#9a704b] sm:text-4xl">
                  24/7
                </p>

                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-black/45 sm:text-xs">
                  Guest Care
                </p>
              </div>

              {/* Stat */}
              <div className="border-l border-black/10 pl-3 sm:pl-6">
                <p className="font-serif text-3xl text-[#9a704b] sm:text-4xl">
                  5★
                </p>

                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-black/45 sm:text-xs">
                  Hospitality
                </p>
              </div>
            </div>

            {/* Closing line */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#D4A373]" />

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/40">
                Your stay. Your space. Your experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}