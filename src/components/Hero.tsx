
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const slides = [
  "/hero1.png",
  "/hero2.png",
  "/hero3.png",
  "/hero4.png",
];

const SLIDE_DURATION = 6000;
const IMAGE_TRANSITION_DURATION = 1.1;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  /*
   * =========================================================
   * PRELOAD ALL HERO IMAGES
   * =========================================================
   *
   * We preload every image before starting the slideshow.
   *
   * This means:
   *
   * Page loads
   *      ↓
   * All 5 images begin downloading
   *      ↓
   * We wait until all 5 are ready
   *      ↓
   * Slideshow begins
   *      ↓
   * Smooth transitions with no image-loading delay
   *
   * The timeout prevents a broken/missing image from
   * permanently preventing the slideshow from starting.
   */

  useEffect(() => {
    let mounted = true;

    const preloadImages = async () => {
      const imagePromises = slides.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();

            img.src = src;

            if (img.complete) {
              resolve();
              return;
            }

            img.onload = () => resolve();

            img.onerror = () => {
              console.warn(`Hero image failed to load: ${src}`);
              resolve();
            };
          })
      );

      await Promise.all(imagePromises);

      if (mounted) {
        setImagesLoaded(true);
      }
    };

    preloadImages();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * =========================================================
   * START SLIDESHOW ONLY AFTER IMAGES ARE READY
   * =========================================================
   */

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* ================================================= */}
      {/* HERO IMAGES                                      */}
      {/* ================================================= */}

      <div className="absolute inset-0">
        {slides.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: current === index ? 1 : 0,
              scale: current === index ? 1.02 : 1.06,
            }}
            transition={{
              opacity: {
                duration: IMAGE_TRANSITION_DURATION,
                ease: "easeInOut",
              },
              scale: {
                duration: 2,
                ease: "easeOut",
              },
            }}
            style={{
              filter:
                index === 0
                  ? "brightness(.78) contrast(1.08)"
                  : "brightness(.82) contrast(1.12) saturate(1.08)",
              willChange: "opacity, transform",
            }}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              loading="eager"
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        ))}
      </div>

      {/* ================================================= */}
      {/* OVERLAYS                                          */}
      {/* ================================================= */}

      {/* Main Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

      {/* Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

      {/* Luxury Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,.55)]" />

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/grain.png')] opacity-[0.05] mix-blend-overlay" />

      {/* ================================================= */}
      {/* CONTENT                                           */}
      {/* ================================================= */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="w-full">

          {/* ================================================= */}
          {/* FIRST SLIDE                                      */}
          {/* ================================================= */}

          <AnimatePresence mode="wait">
            {current === 0 && (
              <motion.div
                key="opening"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
              >
                {/* Eyebrow */}
                <p className="text-xs uppercase tracking-[5px] text-[#D4A373] sm:text-sm sm:tracking-[8px]">
                  Luxury Hospitality
                </p>

                {/* Hotel Name */}
                <h1 className="mt-4 text-5xl font-light text-white sm:mt-6 sm:text-6xl md:text-7xl">
                  Malx
                </h1>

                {/* Hotel Type */}
                <h2 className="mt-2 text-xl font-semibold uppercase tracking-[4px] text-white sm:mt-3 sm:text-2xl sm:tracking-[5px]">
                  Elegance Hotel
                </h2>

                {/* ================================================= */}
                {/* BUTTONS                                           */}
                {/* ================================================= */}

                <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
                  <a
                    href="#contact"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#D4A373] px-8 py-3.5 font-semibold text-black transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-9 sm:py-4"
                  >
                    Book Your Stay
                  </a>

                  <a
                    href="#rooms"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/10 sm:px-9 sm:py-4"
                  >
                    Explore Rooms
                  </a>
                </div>

                {/* ================================================= */}
                {/* FEATURES                                          */}
                {/* ================================================= */}

                <div className="mt-8 flex max-w-2xl flex-wrap gap-x-3 gap-y-2 text-[10px] uppercase tracking-[2px] text-white/75 sm:mt-12 sm:gap-4 sm:text-xs sm:tracking-[3px]">
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

          {/* ================================================= */}
          {/* LAST SLIDE                                       */}
          {/* ================================================= */}

          <AnimatePresence mode="wait">
            {current === slides.length - 1 && (
              <motion.div
                key="closing"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="max-w-xl"
              >
                <h2 className="text-4xl font-light text-white sm:text-5xl">
                  Your Next Stay
                </h2>

                <h3 className="mt-2 text-xl text-white/90 sm:mt-3 sm:text-2xl">
                  Begins Here
                </h3>

                <a
                  href="#contact"
                  className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#D4A373] px-8 py-3.5 font-semibold text-black transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:mt-10 sm:px-9 sm:py-4"
                >
                  Reserve Today
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================================================= */}
      {/* SCROLL INDICATOR                                  */}
      {/* ================================================= */}

      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white/70 sm:bottom-8"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
