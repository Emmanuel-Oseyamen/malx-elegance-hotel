"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export default function Rooms() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % rooms.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const room = rooms[current];

  return (
    <section className="bg-[#faf8f5] py-24" id="rooms">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="uppercase tracking-[7px] text-[#D4A373]">
            Luxury Accommodation
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Signature Rooms
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Beautifully designed spaces offering comfort,
            elegance and exceptional hospitality.
          </p>

        </div>

        <div className="relative overflow-hidden rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,.18)]">

          <AnimatePresence mode="wait">

            <motion.div
              key={current}
              initial={{
                opacity: 0,
                scale: 1.08,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.03,
              }}
              transition={{
                duration: 1.2,
              }}
              className="relative h-[750px]"
            >

              <Image
                src={room.image}
                alt={room.name}
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <motion.div
                initial={{
                  opacity: 0,
                  x: 80,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: .5,
                  duration: .8,
                }}
                className="absolute right-8 top-1/2 w-[420px] -translate-y-1/2 rounded-[30px] border border-white/20 bg-white/10 p-10 backdrop-blur-xl"
              >

                <p className="uppercase tracking-[6px] text-[#D4A373]">
                  Malx Elegance
                </p>

                <h3 className="mt-4 text-4xl font-light text-white">
                  {room.name}
                </h3>

                <div className="mt-5 inline-block rounded-full bg-[#D4A373] px-5 py-2 font-semibold text-black">
                  {room.price}/Night
                </div>

                <p className="mt-8 leading-8 text-white/90">
                  {room.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  {room.features.map((feature) => (

                    <span
                      key={feature}
                      className="rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-sm"
                    >
                      {feature}
                    </span>

                  ))}

                </div>

                <a
                  href="#contact"
                  className="mt-10 inline-flex rounded-full bg-[#D4A373] px-8 py-4 font-semibold text-black transition hover:scale-105"
                >
                  Reserve This Room
                </a>

              </motion.div>

            </motion.div>

          </AnimatePresence>

          {/* Progress Bar */}

          <motion.div
            key={current}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 10,
              ease: "linear",
            }}
            className="absolute bottom-0 left-0 h-1 bg-[#D4A373]"
          />

        </div>

      </div>
    </section>
  );
}