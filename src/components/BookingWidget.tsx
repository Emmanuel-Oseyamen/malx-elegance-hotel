"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { buildWhatsAppBookingUrl } from "@/lib/booking";

type RoomType =
  | "Down Room"
  | "Up Room"
  | "Deluxe Suite"
  | "Executive Deluxe Suite"
  | "Standard Room 301–307"
  | "Executive Suite";

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] =
    useState<RoomType>("Down Room");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleCTA() {
    setError("");

    if (!checkIn || !checkOut) {
      setError(
        "Please select both check-in and check-out dates."
      );
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError(
        "Check-out must be after check-in."
      );
      return;
    }

    if (guests < 1 || guests > 10) {
      setError(
        "Please select between 1 and 10 guests."
      );
      return;
    }

    try {
      setLoading(true);

      const url = await buildWhatsAppBookingUrl({
        checkIn,
        checkOut,
        guests,
        roomType,
      });

      window.open(url, "_blank");
    } catch (error) {
      console.error(
        "Failed to create WhatsApp booking:",
        error
      );

      setError(
        "Unable to open WhatsApp right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-black/70 p-5 text-white shadow-2xl backdrop-blur-md sm:p-6 md:p-8">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Book Your Stay
        </h2>

        <p className="mt-1 text-sm text-white/60 sm:text-base">
          Check availability and reserve your luxury experience.
        </p>
      </div>

      {/* Booking Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

        {/* Check-in */}
        <div>
          <label
            htmlFor="check-in"
            className="mb-2 block text-xs text-white/60"
          >
            Check-In
          </label>

          <input
            id="check-in"
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(event) =>
              setCheckIn(event.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-sm outline-none transition focus:border-[#D4A373]"
          />
        </div>

        {/* Check-out */}
        <div>
          <label
            htmlFor="check-out"
            className="mb-2 block text-xs text-white/60"
          >
            Check-Out
          </label>

          <input
            id="check-out"
            type="date"
            value={checkOut}
            min={
              checkIn ||
              new Date().toISOString().split("T")[0]
            }
            onChange={(event) =>
              setCheckOut(event.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-sm outline-none transition focus:border-[#D4A373]"
          />
        </div>

        {/* Guests */}
        <div>
          <label
            htmlFor="guests"
            className="mb-2 block text-xs text-white/60"
          >
            Guests
          </label>

          <input
            id="guests"
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(event) =>
              setGuests(
                Math.min(
                  10,
                  Math.max(
                    1,
                    Number(event.target.value)
                  )
                )
              )
            }
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-sm outline-none transition focus:border-[#D4A373]"
          />
        </div>

        {/* Room Type */}
        <div>
          <label
            htmlFor="room-type"
            className="mb-2 block text-xs text-white/60"
          >
            Room Type
          </label>

          <select
            id="room-type"
            value={roomType}
            onChange={(event) =>
              setRoomType(
                event.target.value as RoomType
              )
            }
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-sm outline-none transition focus:border-[#D4A373]"
          >
            <option value="Down Room">
              Down Room
            </option>

            <option value="Up Room">
              Up Room
            </option>

            <option value="Deluxe Suite">
              Deluxe Suite
            </option>

            <option value="Executive Deluxe Suite">
              Executive Deluxe Suite
            </option>

            <option value="Standard Room 301–307">
              Standard Room 301–307
            </option>

            <option value="Executive Suite">
              Executive Suite
            </option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 flex justify-stretch sm:justify-end">
        <button
          type="button"
          onClick={handleCTA}
          disabled={loading}
          className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-lg bg-[#D4A373] px-8 py-3 font-semibold tracking-wide text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C08A5C] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Opening WhatsApp...
            </>
          ) : (
            "Check Availability"
          )}
        </button>
      </div>
    </div>
  );
}