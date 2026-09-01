"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wider text-white">
          MALX ELEGANCE <span className="text-[#D4A373]">HOTEL</span>
        </h1>

        {/* Nav */}
        <nav className="hidden gap-8 md:flex text-white/80 text-sm">
          <a className="hover:text-[#D4A373] transition" href="#about">About</a>
          <a className="hover:text-[#D4A373] transition" href="#rooms">Rooms</a>
          <a className="hover:text-[#D4A373] transition" href="#gallery">Gallery</a>
          <a className="hover:text-[#D4A373] transition" href="#contact">Contact</a>
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="rounded-lg bg-[#D4A373] px-5 py-2 text-black font-semibold hover:bg-[#C08A5C] transition"
        >
          Reserve Now
        </a>

      </div>
    </header>
  );
}