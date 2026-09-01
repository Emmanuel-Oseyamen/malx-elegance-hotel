"use client";

import { useState } from "react";
import { buildWhatsAppBookingUrl } from "@/lib/booking";

type RoomType = "Standard" | "Deluxe" | "Executive Suite";

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState<RoomType>("Standard");

  const buildWhatsAppUrl = () => {
    const message = `Hello Fergmond Luxury Hotel,

I would like to check availability / make a reservation.

Room Type: ${roomType}
Check-in: ${checkIn}
Check-out: ${checkOut}
Guests: ${guests}

Please confirm availability.`;

    return `https://wa.me/2349066477122?text=${encodeURIComponent(message)}`;
  };

  // 🔥 SINGLE SOURCE OF TRUTH FOR CTA ACTION
  const handleCTA = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out must be after check-in.");
      return;
    }

    const url = buildWhatsAppBookingUrl({
      checkIn,
      checkOut,
      guests,
      roomType,
    });

    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-2xl">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Book Your Stay
        </h2>
        <p className="text-white/60 mt-1">
          Check availability and reserve your luxury experience
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Check-in */}
        <div>
          <label className="text-xs text-white/60 mb-2 block">Check-In</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-[#8B0015]"
          />
        </div>

        {/* Check-out */}
        <div>
          <label className="text-xs text-white/60 mb-2 block">Check-Out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-[#8B0015]"
          />
        </div>

        {/* Guests */}
        <div>
          <label className="text-xs text-white/60 mb-2 block">Guests</label>
          <input
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-[#8B0015]"
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="text-xs text-white/60 mb-2 block">Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value as RoomType)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-[#8B0015]"
          >
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Executive Suite</option>
          </select>
        </div>
      </div>

      {/* CTA BUTTON (single unified action) */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCTA}
          className="bg-[#8B0015] hover:bg-[#A3001A] transition-all duration-300 px-8 py-3 rounded-lg font-semibold tracking-wide shadow-lg hover:scale-105"
        >
          Check Availability
        </button>
      </div>
    </div>
  );
}