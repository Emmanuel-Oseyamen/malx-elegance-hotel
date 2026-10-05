"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Loader2,
  MessageCircle,
  X,
} from "lucide-react";

import { buildRoomWhatsAppUrl } from "@/lib/booking";
import type { Room } from "./room-card";

type RoomDetailsModalProps = {
  room: Room | null;
  onClose: () => void;
};

function formatPrice(price?: number) {
  if (price === undefined) {
    return "Not set";
  }

  return `₦${Number(price).toLocaleString("en-NG")}`;
}

function getPrice(
  room: Room,
  type: "night_ac" | "24h_ac"
) {
  return room.room_prices?.find(
    (price) => price.ac_type === type
  )?.price;
}

export function RoomDetailsModal({
  room,
  onClose,
}: RoomDetailsModalProps) {
  const [booking, setBooking] = useState(false);

  /*
   * Lock page scrolling while modal is open.
   */
  useEffect(() => {
    if (!room) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [room]);

  /*
   * Allow Escape to close the modal.
   */
  useEffect(() => {
    if (!room) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [room, onClose]);

  async function handleBooking() {
    if (!room) return;

    try {
      setBooking(true);

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
      setBooking(false);
    }
  }

  const nightPrice = room
    ? getPrice(room, "night_ac")
    : undefined;

  const dayPrice = room
    ? getPrice(room, "24h_ac")
    : undefined;

  const features =
    room?.features && room.features.length > 0
      ? room.features
      : [
          "Comfortable stay",
          "Free Wi-Fi",
          "Room service",
        ];

  return (
    <AnimatePresence>
      {room && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ================================================= */}
          {/* BACKDROP                                          */}
          {/* ================================================= */}

          <motion.button
            type="button"
            aria-label="Close room details"
            onClick={onClose}
            className="fixed inset-0 h-full w-full cursor-default bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ================================================= */}
          {/* MODAL WRAPPER                                     */}
          {/* ================================================= */}

          <div className="relative z-10 flex min-h-full items-center justify-center p-3 sm:p-6 lg:p-10">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="room-modal-title"
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[28px] bg-[#faf8f5] shadow-2xl sm:rounded-[36px]"
            >
              {/* ================================================= */}
              {/* CLOSE BUTTON                                      */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition hover:bg-[#D4A373] hover:text-black sm:right-6 sm:top-6"
              >
                <X size={19} strokeWidth={1.5} />
              </button>

              {/* ================================================= */}
              {/* CONTENT GRID                                      */}
              {/* ================================================= */}

              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* ================================================= */}
                {/* IMAGE                                             */}
                {/* ================================================= */}

                <div className="relative min-h-[340px] overflow-hidden sm:min-h-[460px] lg:min-h-[680px]">
                  <img
                    src={room.image_url}
                    alt={room.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4A373]">
                      MALX Elegance
                    </p>

                    <h2 className="mt-2 text-4xl font-light tracking-tight text-white sm:text-5xl">
                      {room.name}
                    </h2>
                  </div>
                </div>

                {/* ================================================= */}
                {/* DETAILS                                           */}
                {/* ================================================= */}

                <div className="flex flex-col p-6 sm:p-9 lg:p-12">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#D4A373]">
                      Room details
                    </p>

                    <h3
                      id="room-modal-title"
                      className="mt-3 text-3xl font-light leading-tight tracking-tight text-slate-900 sm:text-4xl"
                    >
                      {room.name}
                    </h3>

                    {room.room_numbers && (
                      <p className="mt-3 text-xs uppercase tracking-[0.15em] text-slate-400">
                        Rooms {room.room_numbers}
                      </p>
                    )}

                    <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                      {room.description ||
                        "A beautifully appointed space designed around comfort, privacy and an effortless stay."}
                    </p>
                  </div>

                  {/* ================================================= */}
                  {/* PRICING                                           */}
                  {/* ================================================= */}

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#D4A373] p-5 text-black">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] opacity-65">
                        8PM – 6AM AC
                      </p>

                      <p className="mt-2 text-xl font-semibold">
                        {formatPrice(nightPrice)}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.1em] opacity-55">
                        Night rate
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400">
                        24H AC
                      </p>

                      <p className="mt-2 text-xl font-semibold text-slate-900">
                        {formatPrice(dayPrice)}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-slate-400">
                        Full-day rate
                      </p>
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* FEATURES                                          */}
                  {/* ================================================= */}

                  <div className="mt-9">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                      Included features
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A373]/15 text-[#D4A373]">
                            <Check size={12} strokeWidth={2} />
                          </span>

                          <span className="text-sm leading-5 text-slate-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* RESERVATION CTA                                   */}
                  {/* ================================================= */}

                  <div className="mt-auto pt-10">
                    <button
                      type="button"
                      onClick={handleBooking}
                      disabled={booking}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#D4A373] px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#c49365] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {booking ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />
                          Opening WhatsApp...
                        </>
                      ) : (
                        <>
                          <MessageCircle size={18} />
                          Reserve This Room
                        </>
                      )}
                    </button>

                    <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                      Reservations are confirmed directly with the MALX
                      Elegance Hotel team via WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}