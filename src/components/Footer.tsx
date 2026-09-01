import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-20">

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
              Experience luxury accommodations, exceptional service,
              and unforgettable hospitality designed around your comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">

              <a href="#about" className="hover:text-[#D4A373]">
                About
              </a>

              <a href="#rooms" className="hover:text-[#D4A373]">
                Rooms
              </a>

              <a href="#gallery" className="hover:text-[#D4A373]">
                Gallery
              </a>

              <a href="#contact" className="hover:text-[#D4A373]">
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

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+234 707 235 0040</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>info@malxelegancehotel.com</span>
              </div>

            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Location
            </h3>

            <div className="flex items-start gap-3 text-slate-400">

              <MapPin
                size={18}
                className="mt-1 flex-shrink-0"
              />

              <span>
                Malx Elegance
                <br />
                Premium Hospitality District
                <br />
                Nigeria
              </span>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center md:flex-row">

          <p className="text-sm text-slate-500">
            © 2026 Grand Cuba Hotel. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Website designed by Osas Web Studio.
          </p>

        </div>

      </div>

    </footer>
  );
}