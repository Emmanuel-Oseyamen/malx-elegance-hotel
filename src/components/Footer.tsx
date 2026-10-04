"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { getHotelSettings } from "@/lib/hotelSettings";

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      const settings = await getHotelSettings();

      if (!mounted || !settings) return;

      setPhone(settings.phone);
      setWhatsapp(settings.whatsapp);
      setEmail(settings.email);
      setAddress(settings.address);
    }

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  function formatPhone(value: string) {
    return value || "Contact us";
  }

  function getWhatsAppUrl() {
    const number = whatsapp.replace(/\D/g, "");

    if (!number) {
      return "#contact";
    }

    const message = encodeURIComponent(
      "Hello MALX Elegance Hotel,\n\nI would like to make an inquiry."
    );

    return `https://wa.me/${number}?text=${message}`;
  }

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              MALX
              <span className="ml-2 text-[#D4A373]">
                ELEGANCE HOTEL
              </span>
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Experience luxury accommodations,
              exceptional service, and unforgettable
              hospitality designed around your comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">
              <a
                href="#about"
                className="transition hover:text-[#D4A373]"
              >
                About
              </a>

              <a
                href="#rooms"
                className="transition hover:text-[#D4A373]"
              >
                Rooms
              </a>

              <a
                href="#gallery"
                className="transition hover:text-[#D4A373]"
              >
                Gallery
              </a>

              <a
                href="#contact"
                className="transition hover:text-[#D4A373]"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4 text-slate-400">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition hover:text-[#D4A373]"
                >
                  <Phone size={18} />
                  <span>{formatPhone(phone)}</span>
                </a>
              )}

              {whatsapp && (
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition hover:text-[#D4A373]"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 break-all transition hover:text-[#D4A373]"
                >
                  <Mail size={18} />
                  <span>{email}</span>
                </a>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Location
            </h3>

            {address ? (
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin
                  size={18}
                  className="mt-1 flex-shrink-0"
                />

                <span className="whitespace-pre-line">
                  {address}
                </span>
              </div>
            ) : (
              <div className="flex items-start gap-3 text-slate-500">
                <MapPin
                  size={18}
                  className="mt-1 flex-shrink-0"
                />

                <span>Hotel address coming soon.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center md:flex-row sm:px-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} MALX
            Elegance Hotel. All rights reserved.
          </p>

          {/* Designer Credit */}
          <a
            href="https://osasweb-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Osas Web Studio portfolio"
            className="group relative inline-flex items-center text-sm font-medium"
          >
            <span className="relative bg-gradient-to-r from-[#D4A373] via-[#fff1d6] to-[#D4A373] bg-[length:200%_auto] bg-clip-text text-transparent transition-all duration-500 group-hover:bg-[position:100%_center] group-hover:drop-shadow-[0_0_10px_rgba(212,163,115,0.45)]">
              Website designed by Osas Web Studio
            </span>

            {/* Shimmer sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full overflow-hidden opacity-0 transition-opacity duration-300 group-hover:translate-x-full group-hover:opacity-100">
              <span className="absolute inset-y-0 w-8 -skew-x-12 bg-white/40 blur-md" />
            </span>

            {/* Gold underline */}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#D4A373] to-[#fff1d6] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </footer>
  );
}