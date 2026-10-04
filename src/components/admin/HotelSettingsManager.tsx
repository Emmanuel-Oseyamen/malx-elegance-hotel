"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Loader2,
  Save,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type HotelSettings = {
  id: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
};

export default function HotelSettingsManager() {
  const [settings, setSettings] =
    useState<HotelSettings | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadSettings() {
    setLoading(true);
    setError("");
    setSuccess("");

    const { data, error } = await supabase
      .from("hotel_settings")
      .select("id, phone, whatsapp, email, address")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Failed to load hotel settings:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!data) {
      setError("Hotel settings could not be found.");
      setLoading(false);
      return;
    }

    setSettings({
      id: data.id,
      phone: data.phone ?? "",
      whatsapp: data.whatsapp ?? "",
      email: data.email ?? "",
      address: data.address ?? "",
    });

    setLoading(false);
  }

  useEffect(() => {
    loadSettings();
  }, []);

  function updateField(
    field: keyof Omit<HotelSettings, "id">,
    value: string
  ) {
    if (!settings) return;

    setSettings({
      ...settings,
      [field]: value,
    });

    setSuccess("");
    setError("");
  }

  async function handleSave() {
    if (!settings) return;

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      phone: settings.phone.trim(),
      whatsapp: settings.whatsapp.trim(),
      email: settings.email.trim(),
      address: settings.address.trim(),
    };

    console.log("SAVING HOTEL SETTINGS:", payload);
    console.log("SETTINGS ID:", settings.id);

    try {
      const { data, error } = await supabase
        .from("hotel_settings")
        .update(payload)
        .eq("id", settings.id)
        .select("id, phone, whatsapp, email, address")
        .maybeSingle();

      console.log("UPDATED HOTEL SETTINGS:", data);
      console.log("UPDATE ERROR:", error);

      if (error) {
        setError(error.message);
        return;
      }

      if (!data) {
        setError(
          "No hotel settings row was updated. Please check your Supabase permissions and hotel settings ID."
        );
        return;
      }

      setSettings({
        id: data.id,
        phone: data.phone ?? "",
        whatsapp: data.whatsapp ?? "",
        email: data.email ?? "",
        address: data.address ?? "",
      });

      setSuccess("Hotel details updated successfully.");
    } catch (error) {
      console.error(
        "Unexpected error while saving hotel settings:",
        error
      );

      setError(
        "Unable to connect to the database. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[350px] items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <Loader2
            size={20}
            className="animate-spin"
          />

          Loading hotel details...
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <p className="text-sm text-red-300">
          Failed to load hotel details.
        </p>

        {error && (
          <p className="mt-2 text-sm text-red-300/70">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={loadSettings}
          className="mt-5 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4a373]">
            Hotel Information
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Contact & Location
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/40">
            These details can be used throughout the public
            hotel website.
          </p>
        </div>

        <div className="space-y-6 p-6">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm text-white/60"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              value={settings.phone}
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value
                )
              }
              placeholder="+234..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-[#d4a373]"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label
              htmlFor="whatsapp"
              className="mb-2 block text-sm text-white/60"
            >
              WhatsApp Number
            </label>

            <input
              id="whatsapp"
              type="tel"
              value={settings.whatsapp}
              onChange={(event) =>
                updateField(
                  "whatsapp",
                  event.target.value
                )
              }
              placeholder="+234..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-[#d4a373]"
            />

            <p className="mt-2 text-xs text-white/30">
              Use the full international number, e.g.
              +2347072350040.
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-white/60"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={settings.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
              placeholder="hotel@example.com"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-[#d4a373]"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm text-white/60"
            >
              Hotel Address
            </label>

            <textarea
              id="address"
              rows={4}
              value={settings.address}
              onChange={(event) =>
                updateField(
                  "address",
                  event.target.value
                )
              }
              placeholder="Enter the hotel's full physical address..."
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-[#d4a373]"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <Check size={16} />

              {success}
            </div>
          )}

          {/* Save */}
          <div className="flex justify-end border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4a373] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e0b589] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />

                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}