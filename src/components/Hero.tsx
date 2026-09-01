"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const slides = [
  "/hero1.png",
  "/hero2.png",
  "/hero3.png",
  "/hero4.png",
  "/hero5.png",
];

export default function Hero() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
  <>
  <section className="relative min-h-screen overflow-hidden">
    
    <AnimatePresence mode="sync">

      <motion.div
        key={current}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${slides[current]})`,
          filter:
            current === 0
              ? "brightness(.78) blur(2px) contrast(1.08)"
              : "brightness(.82) contrast(1.12) saturate(1.08)",
        }}
        initial={{
          opacity: 0,
          scale: 1.08,
        }}
        animate={{
          opacity: 1,
          scale: 1.02,
        }}
        exit={{
          opacity: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
        }}
      />

    </AnimatePresence>

    {/* Main Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

    {/* Bottom Fade */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

    {/* Luxury Vignette */}
    <div className="absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,.55)]" />

    {/* Grain */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/grain.png')]" />

    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-24">

      <div className="w-full">

        {/* FIRST SLIDE */}
        <AnimatePresence>

          {current === 0 && (

            <motion.div
              key="opening"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: .9,
              }}
            >

              <p className="text-sm uppercase tracking-[8px] text-[#D4A373]">
                Luxury Hospitality
              </p>

              <h1 className="mt-6 text-5xl font-light text-white md:text-7xl">
                Malx
              </h1>

              <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[5px] text-white">
                Elegance Hotel
              </h2>

              <div className="mt-12 flex flex-wrap gap-5">

                <a
                  href="#contact"
                  className="rounded-full bg-[#D4A373] px-9 py-4 font-semibold text-black transition hover:-translate-y-1"
                >
                  Book Your Stay
                </a>

                <a
                  href="#rooms"
                  className="rounded-full border border-white/30 bg-white/5 px-9 py-4 font-semibold text-white backdrop-blur-sm"
                >
                  Explore Rooms
                </a>

              </div>

              <div className="mt-12 flex flex-wrap gap-4 text-xs uppercase tracking-[3px] text-white/75">

                <span>Luxury Rooms</span>

                <span className="text-[#D4A373]">•</span>

                <span>Fine Dining</span>

                <span className="text-[#D4A373]">•</span>

                <span>Conference Hall</span>

                <span className="text-[#D4A373]">•</span>

                <span>24/7 Concierge</span>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        {/* LAST SLIDE */}

        <AnimatePresence>

          {current === slides.length - 1 && (

            <motion.div
              key="closing"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="max-w-xl"
            >

              <h2 className="text-5xl font-light text-white">
                Your Next Stay
              </h2>

              <h3 className="mt-3 text-2xl text-white/90">
                Begins Here
              </h3>

              <a
                href="#contact"
                className="mt-10 inline-flex rounded-full bg-[#D4A373] px-9 py-4 font-semibold text-black"
              >
                Reserve Today
              </a>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </div>

    {/* Scroll Indicator */}
    <motion.div
      animate={{
        y: [0, 8, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/70"
    >
      <ChevronDown size={28} />
    </motion.div>

  </section>
  </>
);
}