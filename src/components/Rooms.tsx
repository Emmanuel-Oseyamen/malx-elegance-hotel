"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble, Loader2, Sparkles } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { RoomCard, type Room } from "./room-card";
import { RoomDetailsModal } from "./room-details-modal";

const DEFAULT_ROOM_IMAGES: Record<string, string> = {
  "Down Room": "/rooms/room-1.png",
  "Up Room": "/rooms/room-2.png",
  "Deluxe Suite": "/rooms/room-3.png",
  "Executive Deluxe Suite": "/rooms/room-4.png",
  "Standard Room": "/rooms/room-5.png",
  "Executive Suite": "/rooms/room-5.png",
};

function getRoomImage(room: Room) {
  return (
    room.image_url?.trim() ||
    DEFAULT_ROOM_IMAGES[room.name] ||
    "/rooms/room-1.png"
  );
}

function getPrice(
  room: Room,
  type: "night_ac" | "24h_ac"
): number | undefined {
  return room.room_prices?.find(
    (price) => price.ac_type === type
  )?.price;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadRooms() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("rooms")
        .select(`
          id,
          category_id,
          name,
          description,
          image_url,
          features,
          room_numbers,
          sort_order,
          is_active,
          room_prices (
            id,
            room_id,
            ac_type,
            price
          )
        `)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!mounted) return;

      if (error) {
        console.error("Failed to load rooms:", error);
        setError("Unable to load our rooms at the moment.");
        setLoading(false);
        return;
      }

      setRooms((data as Room[]) ?? []);
      setLoading(false);
    }

    loadRooms();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (loading) {
    return (
      <section
        id="rooms"
        className="overflow-hidden bg-[#faf8f5] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="inline-flex items-center text-xs uppercase tracking-[0.25em] text-[#D4A373]">
                <span className="mr-3 inline-block h-px w-8 bg-[#D4A373]" />
                Stay with us
              </span>

              <h2 className="mt-5 max-w-xl text-5xl font-light leading-[0.95] tracking-[-0.035em] text-slate-900 sm:text-6xl lg:text-7xl">
                Rooms made for
                <span className="block italic text-[#D4A373]">
                  restful living.
                </span>
              </h2>
            </div>

            <div className="max-w-xl lg:ml-auto">
              <p className="text-base leading-7 text-slate-500 sm:text-lg">
                Discover thoughtfully designed spaces created around comfort,
                privacy and effortless hospitality.
              </p>
            </div>
          </div>

          <div className="mt-16 flex min-h-[400px] items-center justify-center rounded-[30px] bg-[#111] sm:mt-24">
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="h-7 w-7 animate-spin text-[#D4A373]" />

              <p className="text-sm text-white/45">
                Loading our rooms...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * ERROR STATE
   * =========================================================
   */

  if (error) {
    return (
      <section
        id="rooms"
        className="overflow-hidden bg-[#faf8f5] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <span className="inline-flex items-center text-xs uppercase tracking-[0.25em] text-[#D4A373]">
            <span className="mr-3 inline-block h-px w-8 bg-[#D4A373]" />
            Stay with us
          </span>

          <h2 className="mt-5 text-4xl font-light text-slate-900 sm:text-5xl">
            Our rooms
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-500">
            {error}
          </p>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  if (!rooms.length) {
    return (
      <section
        id="rooms"
        className="overflow-hidden bg-[#faf8f5] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <span className="inline-flex items-center text-xs uppercase tracking-[0.25em] text-[#D4A373]">
            <span className="mr-3 inline-block h-px w-8 bg-[#D4A373]" />
            Stay with us
          </span>

          <h2 className="mt-5 text-4xl font-light text-slate-900 sm:text-5xl">
            Our rooms
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-500">
            Room information will be available shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="rooms"
        className="overflow-hidden bg-[#faf8f5] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          {/* ================================================= */}
          {/* SECTION INTRODUCTION                              */}
          {/* ================================================= */}

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center text-xs uppercase tracking-[0.25em] text-[#D4A373]">
                <span className="mr-3 inline-block h-px w-8 bg-[#D4A373]" />
                Stay with us
              </span>

              <h2 className="mt-5 max-w-xl text-5xl font-light leading-[0.95] tracking-[-0.035em] text-slate-900 sm:text-6xl lg:text-7xl">
                Rooms made for
                <span className="block italic text-[#D4A373]">
                  restful living.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="max-w-xl lg:ml-auto"
            >
              <p className="text-base leading-7 text-slate-500 sm:text-lg">
                From comfortable rooms to spacious suites, every MALX space
                is designed around one simple idea: you should feel completely
                at ease.
              </p>

              <div className="mt-7 flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <BedDouble
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#D4A373]"
                  />

                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Thoughtful comfort
                  </span>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                  <Sparkles
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#D4A373]"
                  />

                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Quiet luxury
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================================================= */}
          {/* ROOM COLLECTION                                    */}
          {/* ================================================= */}

          <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-7">
            {rooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={{
                  ...room,
                  image_url: getRoomImage(room),
                }}
                index={index}
                nightPrice={getPrice(room, "night_ac")}
                dayPrice={getPrice(room, "24h_ac")}
                onViewDetails={setSelectedRoom}
              />
            ))}
          </div>

          {/* ================================================= */}
          {/* BOTTOM EDITORIAL STATEMENT                         */}
          {/* ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="mt-16 flex flex-col justify-between gap-6 border-t border-slate-200 pt-7 sm:flex-row sm:items-center"
          >
            <p className="max-w-lg text-sm leading-6 text-slate-500">
              Need something more specific? Our reservations team can help
              you find the room that best suits your stay.
            </p>

            <a
              href="#booking"
              className="group inline-flex shrink-0 items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-900"
            >
              Find your room

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition-all duration-300 group-hover:border-[#D4A373] group-hover:bg-[#D4A373] group-hover:text-white">
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* =================================================== */}
      {/* ROOM DETAILS MODAL                                  */}
      {/* =================================================== */}

      <RoomDetailsModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />
    </>
  );
}