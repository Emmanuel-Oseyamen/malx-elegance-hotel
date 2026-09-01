"use client";

import { buildWhatsAppBookingUrl } from "@/lib/booking";

export default function CTA() {
  const handleCTA = () => {
    const url = buildWhatsAppBookingUrl({});
    window.open(url, "_blank");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-900 to-black" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        <p className="mb-3 uppercase tracking-[6px] text-[#D4A373]">
          Reserve Today
        </p>

        <h2 className="text-4xl font-bold text-white md:text-6xl">
          Experience Luxury Without Compromise
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
          Book your stay at Malx Elegance Hotel and enjoy
          exceptional comfort, premium amenities, and
          world-class hospitality.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {/* 🔥 NOW CONNECTED CTA */}
          <button
            onClick={handleCTA}
            className="rounded-xl bg-[#D4A373] px-8 py-4 font-semibold text-black transition hover:bg-[#C08A5C]"
          >
            Book via WhatsApp
          </button>

          <a
            href="#rooms"
            className="rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Explore Rooms
          </a>

        </div>

      </div>
    </section>
  );
}