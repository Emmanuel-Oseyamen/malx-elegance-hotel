"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { buildWhatsAppBookingUrl } from "@/lib/booking";

export default function CTA() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCTA() {
    setError("");

    try {
      setLoading(true);

      const url = await buildWhatsAppBookingUrl({});

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
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 py-20 sm:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-900 to-black" />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6">

        <p className="mb-3 uppercase tracking-[5px] text-[#D4A373] sm:tracking-[6px]">
          Reserve Today
        </p>

        <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Experience Luxury Without Compromise
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Book your stay at MALX Elegance Hotel and enjoy
          exceptional comfort, premium amenities, and
          memorable hospitality.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <button
            type="button"
            onClick={handleCTA}
            disabled={loading}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#D4A373] px-8 py-4 font-semibold text-black transition hover:bg-[#C08A5C] disabled:cursor-not-allowed disabled:opacity-60"
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
              "Book via WhatsApp"
            )}
          </button>

          <a
            href="#rooms"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Explore Rooms
          </a>

        </div>

        {error && (
          <p className="mt-5 text-sm text-red-300">
            {error}
          </p>
        )}

      </div>
    </section>
  );
}