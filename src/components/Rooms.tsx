"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { buildRoomWhatsAppUrl } from "@/lib/booking";

type RoomPrice = {
  id: string;
  room_id: string;
  ac_type: "night_ac" | "24h_ac";
  price: number;
};

type Room = {
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

const ROOM_DURATION = 10000;
const IMAGE_TRANSITION_DURATION = 0.9;

/*
 * =========================================================
 * DEFAULT ROOM IMAGES
 * =========================================================
 *
 * These are the original images already used by the website.
 *
 * If an administrator uploads a new image from the admin
 * panel, the Supabase image_url will take priority.
 *
 * The two smoking-room categories intentionally share the
 * same image because they use one single image file.
 */

const DEFAULT_ROOM_IMAGES: Record<string, string> = {
  "Down Room": "/rooms/room-1.png",
  "Up Room": "/rooms/room-2.png",
  "Deluxe Suite": "/rooms/room-3.png",
  "Executive Deluxe Suite": "/rooms/room-4.png",

  // Both smoking rooms use the same original image.
  "Standard Room": "/rooms/room-5.png",
  "Executive Suite": "/rooms/room-5.png",
};

/*
 * =========================================================
 * ROOM IMAGE HELPER
 * =========================================================
 *
 * Priority:
 *
 * 1. Admin-uploaded Supabase image
 * 2. Original website image
 * 3. Generic fallback image
 */

function getRoomImage(room: Room) {
  return (
    room.image_url?.trim() ||
    DEFAULT_ROOM_IMAGES[room.name] ||
    "/rooms/room-1.png"
  );
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookingRoomId, setBookingRoomId] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, setError] = useState("");

  /*
   * =========================================================
   * LOAD ROOMS FROM SUPABASE
   * =========================================================
   */

  useEffect(() => {
    let mounted = true;

    async function loadRooms() {
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
        .order("sort_order");

      if (!mounted) return;

      if (error) {
        console.error("Failed to load rooms:", error);
        setError("Unable to load our rooms at the moment.");
        setLoading(false);
        return;
      }

      setRooms(data ?? []);
      setLoading(false);
    }

    loadRooms();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * =========================================================
   * PRELOAD ROOM IMAGES
   * =========================================================
   */

  useEffect(() => {
    if (!rooms.length) {
      setImagesLoaded(false);
      return;
    }

    let mounted = true;

    const preloadImages = async () => {
      const promises = rooms.map(
        (room) =>
          new Promise<void>((resolve) => {
            const imageUrl = getRoomImage(room);

            const img = new window.Image();

            img.onload = () => resolve();
            img.onerror = () => resolve();

            img.src = imageUrl;

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
  }, [rooms]);

  /*
   * =========================================================
   * KEEP CURRENT INDEX VALID
   * =========================================================
   */

  useEffect(() => {
    if (current >= rooms.length && rooms.length > 0) {
      setCurrent(0);
    }
  }, [current, rooms.length]);

  /*
   * =========================================================
   * AUTOMATIC SLIDESHOW
   * =========================================================
   */

  useEffect(() => {
    if (!imagesLoaded || rooms.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % rooms.length);
    }, ROOM_DURATION);

    return () => window.clearInterval(timer);
  }, [imagesLoaded, rooms.length]);

  /*
   * =========================================================
   * PRICE HELPERS
   * =========================================================
   */

  function getPrice(
    room: Room,
    type: "night_ac" | "24h_ac"
  ) {
    return room.room_prices?.find(
      (price) => price.ac_type === type
    )?.price;
  }

  function formatPrice(price?: number) {
    if (price === undefined) {
      return "Not set";
    }

    return `₦${Number(price).toLocaleString("en-NG")}`;
  }

  async function handleRoomBooking(room: Room) {
    try {
      setBookingRoomId(room.id);

      const nightPrice = getPrice(room, "night_ac");
      const dayPrice = getPrice(room, "24h_ac");

      const url = await buildRoomWhatsAppUrl({
        roomType: room.name,
        nightPrice,
        dayPrice,
      });

      window.open(url, "_blank");
    } catch (error) {
      console.error(
        "Failed to create room booking:",
        error
      );

      alert(
        "Unable to open WhatsApp right now. Please try again."
      );
    } finally {
      setBookingRoomId(null);
    }
  }

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (loading) {
    return (
      <section
        className="bg-[#faf8f5] py-20 sm:py-24"
        id="rooms"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-12 text-center sm:mb-16">
            <p className="text-xs uppercase tracking-[5px] text-[#D4A373] sm:text-sm sm:tracking-[7px]">
              Luxury Accommodation
            </p>

            <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
              Signature Rooms
            </h2>
          </div>

          <div className="flex h-[500px] items-center justify-center rounded-[28px] bg-slate-900 sm:rounded-[40px]">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#D4A373]" />

              <p className="mt-4 text-sm text-white/50">
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
        className="bg-[#faf8f5] py-20 sm:py-24"
        id="rooms"
      >
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="text-xs uppercase tracking-[5px] text-[#D4A373]">
            Luxury Accommodation
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            Signature Rooms
          </h2>

          <p className="mt-6 text-sm text-slate-500">
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
        className="bg-[#faf8f5] py-20 sm:py-24"
        id="rooms"
      >
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="text-xs uppercase tracking-[5px] text-[#D4A373]">
            Luxury Accommodation
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            Signature Rooms
          </h2>

          <p className="mt-6 text-sm text-slate-500">
            Room information will be available shortly.
          </p>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * CURRENT ROOM DATA
   * =========================================================
   */

  const room = rooms[current];

  const nightPrice = getPrice(room, "night_ac");
  const dayPrice = getPrice(room, "24h_ac");

  const features =
    room.features && room.features.length > 0
      ? room.features
      : [
          "Comfortable Stay",
          "Free WiFi",
          "Room Service",
        ];

  /*
   * =========================================================
   * ROOM SHOWCASE
   * =========================================================
   */

  return (
    <section
      className="bg-[#faf8f5] py-20 sm:py-24"
      id="rooms"
    >
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
            Beautifully designed spaces offering comfort, elegance
            and exceptional hospitality.
          </p>
        </div>

        {/* ================================================= */}
        {/* ROOM SHOWCASE                                     */}
        {/* ================================================= */}

        <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,.18)] sm:rounded-[40px]">

          <div className="relative h-[620px] sm:h-[750px]">

            {/* ================================================= */}
            {/* ROOM IMAGES                                        */}
            {/* ================================================= */}

            {rooms.map((roomItem, index) => (
              <motion.div
                key={roomItem.id}
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
                <img
                  src={getRoomImage(roomItem)}
                  alt={roomItem.name}
                  className="h-full w-full object-cover object-center"
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
              className="absolute left-4 right-4 top-1/2 z-20 w-auto -translate-y-1/2 rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-xl sm:left-auto sm:right-8 sm:w-[440px] sm:rounded-[30px] sm:p-10"
            >
              <p className="text-xs uppercase tracking-[5px] text-[#D4A373] sm:tracking-[6px]">
                Malx Elegance
              </p>

              <h3 className="mt-4 text-3xl font-light text-white sm:text-4xl">
                {room.name}
              </h3>

              {room.room_numbers && (
                <p className="mt-2 text-sm text-white/50">
                  Rooms {room.room_numbers}
                </p>
              )}

              {/* ================================================= */}
              {/* PRICES                                            */}
              {/* ================================================= */}

              <div className="mt-5 grid grid-cols-2 gap-2">

                <div className="rounded-2xl bg-[#D4A373] px-4 py-3 text-black">
                  <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">
                    8PM – 6AM AC
                  </p>

                  <p className="mt-1 text-base font-semibold sm:text-lg">
                    {formatPrice(nightPrice)}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                    24H AC
                  </p>

                  <p className="mt-1 text-base font-semibold sm:text-lg">
                    {formatPrice(dayPrice)}
                  </p>
                </div>

              </div>

              {/* ================================================= */}
              {/* DESCRIPTION                                       */}
              {/* ================================================= */}

              {room.description && (
                <p className="mt-7 text-sm leading-7 text-white/90 sm:mt-8 sm:text-base sm:leading-8">
                  {room.description}
                </p>
              )}

              {/* ================================================= */}
              {/* FEATURES                                          */}
              {/* ================================================= */}

              <div className="mt-7 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                {features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-white/15 px-3.5 py-2 text-xs text-white backdrop-blur-sm sm:px-4 sm:text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* ================================================= */}
              {/* RESERVATION                                      */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={() => handleRoomBooking(room)}
                disabled={bookingRoomId === room.id}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4A373] px-5 py-3 font-semibold text-black transition hover:bg-[#C08A5C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {bookingRoomId === room.id ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Opening WhatsApp...
                  </>
                ) : (
                  "Reserve This Room"
                )}
              </button>
            </motion.div>

            {/* ================================================= */}
            {/* PROGRESS BAR                                      */}
            {/* ================================================= */}

            {imagesLoaded && rooms.length > 1 && (
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

        {rooms.length > 1 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {rooms.map((roomItem, index) => (
              <button
                key={roomItem.id}
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
        )}
      </div>
    </section>
  );
}