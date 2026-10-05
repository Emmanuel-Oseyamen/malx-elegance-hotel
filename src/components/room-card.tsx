"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble } from "lucide-react";

export type RoomPrice = {
  id: string;
  room_id: string;
  ac_type: "night_ac" | "24h_ac";
  price: number;
};

export type Room = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  image_url: string;
  features: string[] | null;
  room_numbers: string;
  sort_order: number;
  is_active: boolean;
  room_prices: RoomPrice[];
};

type RoomCardProps = {
  room: Room;
  index: number;
  nightPrice?: number;
  dayPrice?: number;
  onViewDetails: (room: Room) => void;
};

function formatPrice(price?: number) {
  if (price === undefined) {
    return "Price unavailable";
  }

  return `₦${Number(price).toLocaleString("en-NG")}`;
}

function getCategory(room: Room) {
  const name = room.name.toLowerCase();

  if (name.includes("suite")) {
    if (name.includes("executive deluxe")) {
      return "Executive Suite";
    }

    return "Suite";
  }

  if (name.includes("standard")) {
    return "Standard Room";
  }

  return "Guest Room";
}

export function RoomCard({
  room,
  index,
  nightPrice,
  dayPrice,
  onViewDetails,
}: RoomCardProps) {
  /*
   * The first room gets a wider editorial layout.
   * Every third room also gets a wider treatment.
   */
  const isFeaturedLayout = index === 0 || index % 3 === 2;

  const features =
    room.features && room.features.length > 0
      ? room.features.slice(0, 3)
      : ["Comfortable stay", "Free Wi-Fi", "Room service"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.08, 0.3),
      }}
      className={
        isFeaturedLayout
          ? "group relative overflow-hidden rounded-[28px] lg:col-span-7"
          : "group relative overflow-hidden rounded-[28px] lg:col-span-5"
      }
    >
      <div
        className={
          isFeaturedLayout
            ? "relative h-[560px] sm:h-[620px]"
            : "relative h-[500px] sm:h-[560px]"
        }
      >
        {/* Image */}
        <img
          src={room.image_url}
          alt={room.name}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          onError={(event) => {
            const target = event.currentTarget;

            if (target.src.endsWith("/rooms/room-1.png")) {
              return;
            }

            target.src = "/rooms/room-1.png";
          }}
        />

        {/* Image overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent opacity-70" />

        {/* Top label */}
        <div className="absolute left-5 top-5 z-10 sm:left-7 sm:top-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4A373]" />
            {getCategory(room)}
          </span>
        </div>

        {/* Room content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-[#D4A373]">
              <BedDouble size={16} strokeWidth={1.5} />

              <span className="text-[10px] uppercase tracking-[0.2em]">
                MALX Elegance
              </span>
            </div>

            <h3 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
              {room.name}
            </h3>

            {room.room_numbers && (
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">
                Rooms {room.room_numbers}
              </p>
            )}

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/70 sm:text-[15px]">
              {room.description ||
                "A beautifully appointed space designed for comfort, privacy and an effortless stay."}
            </p>

            {/* Features */}
            <div className="mt-5 flex flex-wrap gap-2">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] text-white/75 backdrop-blur-sm"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Bottom row */}
            <div className="mt-6 flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/40">
                  From
                </p>

                <p className="mt-1 text-xl font-medium text-white">
                  {formatPrice(
                    nightPrice !== undefined ? nightPrice : dayPrice
                  )}
                </p>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/40">
                  8PM – 6AM AC
                </p>
              </div>

              <button
                type="button"
                onClick={() => onViewDetails(room)}
                className="group/button inline-flex items-center justify-center gap-3 self-start rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:border-[#D4A373] hover:bg-[#D4A373] hover:text-black sm:self-auto"
              >
                View details

                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors group-hover/button:border-black/20">
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}