"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="bg-white py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl">

            <Image
              src="/about.png"
              alt="Bisyl Suites"
              width={700}
              height={900}
              className="h-[650px] w-full object-cover transition duration-700 hover:scale-105"
              priority
            />

          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <p className="text-sm font-medium uppercase tracking-[6px] text-[#D4A373]">
            About Us
          </p>

          <h2 className="mt-4 text-4xl font-bold text-black md:text-5xl">
            Welcome to Malx Elegance Hotel
          </h2>

          <h3 className="mt-5 text-xl font-medium text-slate-700">
            A New Standard of Luxury Hospitality
          </h3>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Malx Elegance Hotel combines refined elegance,
            exceptional hospitality, and modern comfort to create
            memorable experiences for every guest. Every space has
            been thoughtfully designed to provide relaxation,
            sophistication, and personalized service.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whether you're visiting for business meetings,
            family vacations, romantic getaways, or special
            celebrations, our commitment is to exceed your
            expectations with impeccable accommodation,
            premium amenities, and warm hospitality.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">

            <div>
              <h3 className="text-4xl font-bold text-[#8B1E2D]">
                50+
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Luxury Rooms
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#8B1E2D]">
                24/7
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Concierge
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#8B1E2D]">
                5★
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Hospitality
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}