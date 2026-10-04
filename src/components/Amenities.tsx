"use client";

import { motion } from "framer-motion";
import {
  Waves,
  Utensils,
  Dumbbell,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const amenities = [
  {
    icon: Waves,
    number: "01",
    title: "Infinity Pool",
    description:
      "Unwind in our elegant infinity pool, designed to provide a serene atmosphere for relaxation, leisure, and quiet moments.",
  },
  {
    icon: Utensils,
    number: "02",
    title: "Fine Dining",
    description:
      "Experience exceptional cuisine crafted by talented chefs using carefully selected local and international ingredients.",
  },
  {
    icon: Dumbbell,
    number: "03",
    title: "Fitness Center",
    description:
      "Maintain your wellness routine with modern fitness equipment in a refined and comfortable environment.",
  },
];

export default function Amenities() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] py-28 text-white sm:py-36">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#D4A373]/[0.035] blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#D4A373]/[0.025] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4A373]" />

              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#D4A373]">
                The MALX Experience
              </p>
            </div>

            <h2 className="mt-6 max-w-xl text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              More than a stay.
              <span className="block font-semibold text-[#D4A373]">
                An experience.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
              From moments of quiet relaxation to exceptional dining
              and wellness, every detail at MALX Elegance Hotel is
              designed around the way you want to experience your stay.
            </p>
          </motion.div>
        </div>

        {/* Decorative divider */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-20" />

        {/* Amenity cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {amenities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
                className="group relative"
              >
                <div className="relative h-full min-h-[430px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-7 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#D4A373]/30 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-9">
                  {/* Card glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A373]/[0.06] blur-3xl transition-all duration-700 group-hover:bg-[#D4A373]/[0.12]" />

                  {/* Number */}
                  <div className="relative flex items-start justify-between">
                    <span className="text-xs font-medium tracking-[0.3em] text-white/25">
                      {item.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:border-[#D4A373]/40 group-hover:bg-[#D4A373]/10">
                      <ArrowUpRight
                        size={17}
                        className="text-white/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D4A373]"
                      />
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative mt-14 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#D4A373]/20 bg-[#D4A373]/[0.07]">
                    <Icon
                      size={34}
                      strokeWidth={1.3}
                      className="text-[#D4A373]"
                    />

                    <div className="absolute inset-0 rounded-2xl border border-[#D4A373]/0 transition-all duration-500 group-hover:scale-110 group-hover:border-[#D4A373]/20" />
                  </div>

                  {/* Content */}
                  <div className="relative mt-10">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/40">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#D4A373] to-transparent transition-all duration-700 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom experience statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex flex-col gap-6 rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4A373]/20 bg-[#D4A373]/10">
              <Sparkles
                size={18}
                className="text-[#D4A373]"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Thoughtfully designed for your comfort
              </p>

              <p className="mt-1 text-xs text-white/35">
                Discover the details that make your stay exceptional.
              </p>
            </div>
          </div>

          <a
            href="#rooms"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D4A373] transition hover:text-white"
          >
            Explore our rooms
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}