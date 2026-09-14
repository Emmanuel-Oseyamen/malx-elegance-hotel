"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const rooms = [
  {
    name: "Deluxe Room",
    price: "From ₦25,000",
    image: "/rooms/room-1.png",
    description:
      "Elegant accommodation featuring a king-size bed, premium bathroom, complimentary breakfast and high-speed WiFi for a truly relaxing stay.",
    features: ["King Bed", "Free WiFi", "Breakfast"],
  },
  {
    name: "Executive Room",
    price: "From ₦30,000",
    image: "/rooms/room-2.png",
    description:
      "Spacious executive accommodation with refined interiors, smart entertainment, dedicated workspace and personalized hospitality.",
    features: ["Workspace", "Smart TV", "Room Service"],
  },
];

const ROOM_DURATION = 10000;
const IMAGE_TRANSITION_DURATION = 0.9;

export default function Rooms() {
  const [current, setCurrent] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  /*
   * =========================================================
   * PRELOAD ALL ROOM IMAGES
   * =========================================================
   */

  useEffect(() => {
    let mounted = true;

    const preloadImages = async () => {
      const promises = rooms.map(
        (room) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();

            img.onload = () => resolve();
            img.onerror = () => resolve();

            img.src = room.image;

            if (img.complete) {
              resolve();
            }
          })
      );

      await Promise.all(promises);

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
   * AUTOMATIC SLIDESHOW
   * =========================================================
   */

  useEffect(() => {
    if (!imagesLoaded) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % rooms.length);
    }, ROOM_DURATION);

    return () => window.clearInterval(timer);
  }, [imagesLoaded]);

  const room = rooms[current];

  return (
    <section className="bg-[#faf8f5] py-20 sm:py-24" id="rooms">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* ================================================= */}
        {/* HEADER                                            */}
        {/* ================================================= */}

        <div className="mb-12 text-center sm:mb-16">
          <p className="text-xs uppercase tracking-[5px] text-[#D4A373] sm:text-sm sm:tracking-[7px]">
            Luxury Accommodation
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            Signature Rooms
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Beautifully designed spaces offering comfort, elegance and
            exceptional hospitality.
          </p>
        </div>

        {/* ================================================= */}
        {/* ROOM SHOWCASE                                     */}
        {/* ================================================= */}

        <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,.18)] sm:rounded-[40px]">

          {/* ================================================= */}
          {/* PERMANENTLY MOUNTED IMAGES                       */}
          {/* ================================================= */}

          <div className="relative h-[700px] sm:h-[750px]">

            {rooms.map((roomItem, index) => (
              <motion.div
                key={roomItem.image}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: current === index ? 1 : 0,
                  scale: current === index ? 1 : 1.04,
                }}
                transition={{
                  opacity: {
                    duration: IMAGE_TRANSITION_DURATION,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 1.4,
                    ease: "easeOut",
                  },
                }}
                style={{
                  zIndex: current === index ? 2 : 1,
                  willChange: "opacity, transform",
                }}
              >
                <Image
                  src={roomItem.image}
                  alt={roomItem.name}
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 640px) 100vw, 1280px"
                  className="object-cover object-center"
                />
              </motion.div>
            ))}

            {/* ================================================= */}
            {/* OVERLAYS                                          */}
            {/* ================================================= */}

            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* ================================================= */}
            {/* ROOM INFORMATION                                   */}
            {/* ================================================= */}

            <motion.div
              key={current}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="absolute left-5 right-5 top-1/2 z-20 w-auto -translate-y-1/2 rounded-[26px] border border-white/20 bg-white/10 p-7 backdrop-blur-xl sm:left-auto sm:right-8 sm:w-[420px] sm:rounded-[30px] sm:p-10"
            >
              <p className="text-xs uppercase tracking-[5px] text-[#D4A373] sm:tracking-[6px]">
                Malx Elegance
              </p>

              <h3 className="mt-4 text-3xl font-light text-white sm:text-4xl">
                {room.name}
              </h3>

              <div className="mt-5 inline-block rounded-full bg-[#D4A373] px-5 py-2 text-sm font-semibold text-black sm:text-base">
                {room.price}/Night
              </div>

              <p className="mt-7 text-sm leading-7 text-white/90 sm:mt-8 sm:text-base sm:leading-8">
                {room.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                {room.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-white/15 px-3.5 py-2 text-xs text-white backdrop-blur-sm sm:px-4 sm:text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-8 inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#D4A373] px-8 py-4 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:mt-10 sm:w-auto sm:text-base"
              >
                Reserve This Room
              </a>
            </motion.div>

            {/* ================================================= */}
            {/* PROGRESS BAR                                      */}
            {/* ================================================= */}

            {imagesLoaded && (
              <motion.div
                key={`progress-${current}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: ROOM_DURATION / 1000,
                  ease: "linear",
                }}
                className="absolute bottom-0 left-0 z-30 h-1 bg-[#D4A373]"
              />
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* ROOM INDICATORS                                   */}
        {/* ================================================= */}

        <div className="mt-6 flex justify-center gap-2">
          {rooms.map((roomItem, index) => (
            <button
              key={roomItem.name}
              type="button"
              aria-label={`View ${roomItem.name}`}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                current === index
                  ? "w-10 bg-[#D4A373]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}