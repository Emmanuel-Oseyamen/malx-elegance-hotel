"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Hotel,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { MessageSquareQuote } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  const links = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/dashboard/rooms",
      label: "Rooms",
      icon: Hotel,
    },
    {
      label: "Reviews",
      href: "/admin/dashboard/reviews",
      icon: MessageSquareQuote,
    },
    {
      href: "/admin/dashboard/settings",
      label: "Hotel Details",
      icon: Settings,
    },
  ];

  return (
    <aside className="flex w-full flex-col border-b border-white/10 bg-[#111111] md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a373]/10">
            <Building2 size={20} className="text-[#d4a373]" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              MALX Elegance
            </p>

            <p className="text-xs text-white/40">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            const active =
              pathname === link.href ||
              (link.href !== "/admin/dashboard" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-[#d4a373]/10 text-[#d4a373]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/50 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}