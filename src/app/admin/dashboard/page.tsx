"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Hotel,
  Settings,
  ArrowUpRight,
  ExternalLink,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setEmail(user.email ?? "");
      setLoading(false);
    }

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d4a373]" />
          <p className="mt-4 text-sm text-white/40">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d4a373]/[0.04] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#d4a373]/[0.025] blur-3xl" />
      </div>

      <main className="relative p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <header className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#d4a373]" />

                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d4a373]">
                  MALX Elegance Hotel
                </p>
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Dashboard
              </h1>

              <p className="mt-2 text-sm text-white/40">
                Manage your hotel's rooms, pricing and contact details.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] sm:flex">
                <ShieldCheck
                  size={18}
                  className="text-[#d4a373]"
                />
              </div>

              <div>
                <p className="text-xs text-white/30">
                  Signed in as
                </p>

                <p className="mt-1 max-w-[240px] truncate text-sm text-white/70">
                  {email}
                </p>
              </div>
            </div>
          </header>

          {/* Overview */}
          <section className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a373]/10">
                    <Hotel
                      size={18}
                      className="text-[#d4a373]"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Management
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Rooms & Pricing
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a373]/10">
                    <Settings
                      size={18}
                      className="text-[#d4a373]"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Management
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Hotel Details
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Globe
                      size={18}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Website
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-emerald-400">
                      Live
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main management cards */}
          <section className="mt-10">
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">
                Quick Management
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                What would you like to manage?
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {/* Rooms */}
              <Link
                href="/admin/dashboard/rooms"
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d4a373]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#d4a373]/[0.05] blur-3xl transition duration-500 group-hover:bg-[#d4a373]/[0.09]" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4a373]/10 bg-[#d4a373]/10">
                      <Hotel
                        size={24}
                        strokeWidth={1.6}
                        className="text-[#d4a373]"
                      />
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-[#d4a373]/30 group-hover:bg-[#d4a373]/10">
                      <ArrowUpRight
                        size={18}
                        className="text-white/40 transition group-hover:text-[#d4a373]"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#d4a373]/70">
                      Accommodation
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                      Rooms & Prices
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/45">
                      Manage room names, descriptions, room numbers,
                      images and both AC pricing options from one place.
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/50 transition group-hover:text-[#d4a373]">
                    Manage rooms
                    <ArrowUpRight
                      size={15}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>

              {/* Settings */}
              <Link
                href="/admin/dashboard/settings"
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d4a373]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#d4a373]/[0.05] blur-3xl transition duration-500 group-hover:bg-[#d4a373]/[0.09]" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4a373]/10 bg-[#d4a373]/10">
                      <Settings
                        size={24}
                        strokeWidth={1.6}
                        className="text-[#d4a373]"
                      />
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-[#d4a373]/30 group-hover:bg-[#d4a373]/10">
                      <ArrowUpRight
                        size={18}
                        className="text-white/40 transition group-hover:text-[#d4a373]"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#d4a373]/70">
                      Hotel Information
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                      Hotel Details
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/45">
                      Update the hotel's phone, WhatsApp number,
                      email address and physical location shown
                      throughout the website.
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/50 transition group-hover:text-[#d4a373]">
                    Manage details
                    <ArrowUpRight
                      size={15}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Bottom website panel */}
          <section className="mt-6">
            <div className="flex flex-col gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
                  <Globe
                    size={19}
                    className="text-white/50"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Public Hotel Website
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Changes made here are reflected on the live website.
                  </p>
                </div>
              </div>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 transition hover:border-[#d4a373]/30 hover:text-[#d4a373]"
              >
                View Website
                <ExternalLink size={15} />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}