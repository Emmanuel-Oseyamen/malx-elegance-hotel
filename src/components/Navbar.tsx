"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getHotelSettings } from "@/lib/hotelSettings";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      const settings = await getHotelSettings();

      if (!mounted) return;

      setWhatsapp(
        settings?.whatsapp?.replace(/\D/g, "") ?? ""
      );
    }

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  function getWhatsAppUrl() {
    if (!whatsapp) {
      return "#contact";
    }

    const message = encodeURIComponent(
      "Hello MALX Elegance Hotel,\n\nI would like to make an inquiry about booking a room."
    );

    return `https://wa.me/${whatsapp}?text=${message}`;
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/70 py-3 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">

        {/* Logo */}
        <h1 className="text-base font-bold tracking-wider text-white sm:text-xl">
          MALX ELEGANCE{" "}
          <span className="text-[#D4A373]">
            HOTEL
          </span>
        </h1>

        {/* Navigation */}
        <nav className="hidden gap-8 text-sm text-white/80 md:flex">
          <a
            className="transition hover:text-[#D4A373]"
            href="#about"
          >
            About
          </a>

          <a
            className="transition hover:text-[#D4A373]"
            href="#rooms"
          >
            Rooms
          </a>

          <a
            className="transition hover:text-[#D4A373]"
            href="#gallery"
          >
            Gallery
          </a>

          <a
            className="transition hover:text-[#D4A373]"
            href="#contact"
          >
            Contact
          </a>
        </nav>

        {/* CTA */}
        <a
          href={getWhatsAppUrl()}
          target={whatsapp ? "_blank" : undefined}
          rel={whatsapp ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 rounded-lg bg-[#D4A373] px-3.5 py-2 text-sm font-semibold text-black transition hover:bg-[#C08A5C] sm:px-5"
        >
          <MessageCircle
            size={16}
            className="sm:hidden"
          />

          <span>Reserve Now</span>
        </a>
      </div>
    </header>
  );
}