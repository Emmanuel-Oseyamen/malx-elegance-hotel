"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Edit3,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Upload,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Category = {
  id: string;
  name: string;
  description: string;
  sort_order: number;
};

type RoomPrice = {
  id: string;
  room_id: string;
  ac_type: "night_ac" | "24h_ac";
  price: number;
};

type Room = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  image_url: string;
  features: string[];
  room_numbers: string;
  sort_order: number;
  is_active: boolean;
  room_prices: RoomPrice[];
};

type CategoryWithRooms = Category & {
  rooms: Room[];
};

type EditingRoom = {
  id: string;
  name: string;
  description: string;
  room_numbers: string;
  nightPrice: string;
  dayPrice: string;
  image_url: string;
};

export default function RoomsManager() {
  const [categories, setCategories] = useState<CategoryWithRooms[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingRoom, setEditingRoom] =
    useState<EditingRoom | null>(null);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  async function loadRooms() {
    setLoading(true);
    setError("");

    const { data: categoryData, error: categoryError } =
      await supabase
        .from("room_categories")
        .select("*")
        .order("sort_order");

    if (categoryError) {
      setError(categoryError.message);
      setLoading(false);
      return;
    }

    const { data: roomData, error: roomError } =
      await supabase
        .from("rooms")
        .select(`
          *,
          room_prices (
            id,
            room_id,
            ac_type,
            price
          )
        `)
        .order("sort_order");

    if (roomError) {
      setError(roomError.message);
      setLoading(false);
      return;
    }

    const grouped = (categoryData ?? []).map((category) => ({
      ...category,
      rooms: (roomData ?? []).filter(
        (room) => room.category_id === category.id
      ),
    }));

    setCategories(grouped);
    setLoading(false);
  }

  useEffect(() => {
    loadRooms();
  }, []);

  function getPrice(
    room: Room,
    type: "night_ac" | "24h_ac"
  ) {
    return room.room_prices.find(
      (price) => price.ac_type === type
    )?.price;
  }

  function formatPrice(price?: number) {
    if (price === undefined) return "Not set";

    return `₦${Number(price).toLocaleString("en-NG")}`;
  }

  function openEditor(room: Room) {
    setSaveError("");
    setSaveSuccess("");
    setSelectedImage(null);
    setImagePreview(room.image_url ?? "");

    setEditingRoom({
      id: room.id,
      name: room.name,
      description: room.description ?? "",
      room_numbers: room.room_numbers ?? "",
      nightPrice: String(
        getPrice(room, "night_ac") ?? ""
      ),
      dayPrice: String(
        getPrice(room, "24h_ac") ?? ""
      ),
      image_url: room.image_url ?? "",
    });
  }

  function closeEditor() {
    if (saving) return;

    setEditingRoom(null);
    setSelectedImage(null);
    setImagePreview("");
    setSaveError("");
    setSaveSuccess("");
  }

  async function handleSave() {
    if (!editingRoom) return;

    setSaving(true);
    setSaveError("");
    setSaveSuccess("");

    /*
     * =========================================================
     * VALIDATE ROOM INFORMATION
     * =========================================================
     */

    const nightPrice = Number(
      editingRoom.nightPrice.replace(/,/g, "")
    );

    const dayPrice = Number(
      editingRoom.dayPrice.replace(/,/g, "")
    );

    if (!editingRoom.name.trim()) {
      setSaveError("Room name is required.");
      setSaving(false);
      return;
    }

    if (
      !editingRoom.nightPrice ||
      Number.isNaN(nightPrice) ||
      nightPrice < 0
    ) {
      setSaveError(
        "Please enter a valid 8PM–6AM AC price."
      );
      setSaving(false);
      return;
    }

    if (
      !editingRoom.dayPrice ||
      Number.isNaN(dayPrice) ||
      dayPrice < 0
    ) {
      setSaveError(
        "Please enter a valid 24H AC price."
      );
      setSaving(false);
      return;
    }

    /*
     * =========================================================
     * PREPARE IMAGE URL
     * =========================================================
     *
     * If no new image is selected, keep the existing image.
     *
     * If a new image is selected, upload it first and use the
     * newly generated public URL for the database update.
     */

    let imageUrl = editingRoom.image_url;
    let newImagePath: string | null = null;

    if (selectedImage) {
      const fileExtension =
        selectedImage.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      const filePath = `${editingRoom.id}/${crypto.randomUUID()}.${fileExtension}`;

      const { error: uploadError } =
        await supabase.storage
          .from("room-images")
          .upload(filePath, selectedImage, {
            cacheControl: "3600",
            upsert: false,
            contentType: selectedImage.type,
          });

      if (uploadError) {
        setSaveError(
          `Image upload failed: ${uploadError.message}`
        );
        setSaving(false);
        return;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("room-images")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
      newImagePath = filePath;
    }

    /*
     * =========================================================
     * UPDATE ROOM
     * =========================================================
     */

    const { error: roomError } = await supabase
      .from("rooms")
      .update({
        name: editingRoom.name.trim(),
        description: editingRoom.description.trim(),
        room_numbers: editingRoom.room_numbers.trim(),
        image_url: imageUrl,
      })
      .eq("id", editingRoom.id);

    if (roomError) {
      /*
       * If the new image was successfully uploaded but the
       * database update failed, remove the new image so we
       * don't leave an orphaned file in storage.
       */

      if (newImagePath) {
        await supabase.storage
          .from("room-images")
          .remove([newImagePath]);
      }

      setSaveError(roomError.message);
      setSaving(false);
      return;
    }

    /*
     * =========================================================
     * UPDATE NIGHT PRICE
     * =========================================================
     */

    const { error: nightPriceError } = await supabase
      .from("room_prices")
      .update({
        price: nightPrice,
      })
      .eq("room_id", editingRoom.id)
      .eq("ac_type", "night_ac");

    if (nightPriceError) {
      setSaveError(nightPriceError.message);
      setSaving(false);
      return;
    }

    /*
     * =========================================================
     * UPDATE 24H PRICE
     * =========================================================
     */

    const { error: dayPriceError } = await supabase
      .from("room_prices")
      .update({
        price: dayPrice,
      })
      .eq("room_id", editingRoom.id)
      .eq("ac_type", "24h_ac");

    if (dayPriceError) {
      setSaveError(dayPriceError.message);
      setSaving(false);
      return;
    }

    /*
     * =========================================================
     * DELETE OLD IMAGE
     * =========================================================
     *
     * Only delete the old image after the new image has been
     * successfully stored in the database.
     */

    if (
      selectedImage &&
      editingRoom.image_url.includes(
        "/storage/v1/object/public/room-images/"
      )
    ) {
      const oldPath =
        editingRoom.image_url.split(
          "/storage/v1/object/public/room-images/"
        )[1];

      if (oldPath) {
        const { error: deleteError } =
          await supabase.storage
            .from("room-images")
            .remove([oldPath]);

        if (deleteError) {
          console.warn(
            "Room updated, but old image could not be deleted:",
            deleteError.message
          );
        }
      }
    }

    /*
     * =========================================================
     * SUCCESS
     * =========================================================
     */

    setSaveSuccess("Room updated successfully.");

    await loadRooms();

    setTimeout(() => {
      setEditingRoom(null);
      setSelectedImage(null);
      setImagePreview("");
      setSaveSuccess("");
    }, 900);

    setSaving(false);
  }

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <Loader2
            className="animate-spin"
            size={20}
          />
          Loading rooms...
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * ERROR STATE
   * =========================================================
   */

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <p className="text-sm text-red-300">
          Failed to load rooms.
        </p>

        <p className="mt-2 text-sm text-red-300/70">
          {error}
        </p>

        <button
          type="button"
          onClick={loadRooms}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category.id}>
            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                {category.name}
              </h2>

              {category.description && (
                <p className="mt-1 text-sm text-white/40">
                  {category.description}
                </p>
              )}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {category.rooms.map((room) => (
                <div
                  key={room.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {room.name}
                      </h3>

                      {room.room_numbers && (
                        <p className="mt-1 text-sm text-white/40">
                          Room {room.room_numbers}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => openEditor(room)}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/60 transition hover:border-[#d4a373]/30 hover:text-[#d4a373]"
                    >
                      <Edit3 size={15} />
                      Edit
                    </button>
                  </div>

                  {room.description && (
                    <p className="mt-4 text-sm leading-6 text-white/50">
                      {room.description}
                    </p>
                  )}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-wider text-white/30">
                        8PM – 6AM AC
                      </p>

                      <p className="mt-2 text-xl font-semibold text-[#d4a373]">
                        {formatPrice(
                          getPrice(
                            room,
                            "night_ac"
                          )
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-wider text-white/30">
                        24H AC
                      </p>

                      <p className="mt-2 text-xl font-semibold text-[#d4a373]">
                        {formatPrice(
                          getPrice(
                            room,
                            "24h_ac"
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {editingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#151515] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#d4a373]">
                  Room Management
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Edit Room
                </h2>
              </div>

              <button
                type="button"
                onClick={closeEditor}
                disabled={saving}
                className="rounded-xl p-2 text-white/40 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* ================================================= */}
              {/* ROOM IMAGE                                        */}
              {/* ================================================= */}

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Room Image
                </label>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  {imagePreview ? (
                    <div className="relative aspect-[16/9] w-full">
                      <img
                        src={imagePreview}
                        alt={editingRoom.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center">
                      <div className="text-center text-white/30">
                        <ImageIcon
                          size={32}
                          className="mx-auto mb-2"
                        />

                        <p className="text-sm">
                          No room image
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-white/10 p-4">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/70 transition hover:border-[#d4a373]/30 hover:text-[#d4a373]">
                      <Upload size={16} />

                      {selectedImage
                        ? "Choose Different Image"
                        : "Change Image"}

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(event) => {
                          const file =
                            event.target.files?.[0];

                          if (!file) return;

                          if (file.size > 5 * 1024 * 1024) {
                            setSaveError(
                              "Image must be smaller than 5MB."
                            );
                            return;
                          }

                          setSaveError("");
                          setSelectedImage(file);

                          const previewUrl =
                            URL.createObjectURL(file);

                          setImagePreview(previewUrl);
                        }}
                      />
                    </label>

                    <p className="mt-2 text-xs text-white/30">
                      JPG, PNG or WebP. Maximum 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* ================================================= */}
              {/* ROOM NAME                                          */}
              {/* ================================================= */}

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Room Name
                </label>

                <input
                  type="text"
                  value={editingRoom.name}
                  onChange={(event) =>
                    setEditingRoom({
                      ...editingRoom,
                      name: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#d4a373]"
                />
              </div>

              {/* ================================================= */}
              {/* ROOM NUMBERS                                       */}
              {/* ================================================= */}

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Room Numbers
                </label>

                <input
                  type="text"
                  value={editingRoom.room_numbers}
                  onChange={(event) =>
                    setEditingRoom({
                      ...editingRoom,
                      room_numbers:
                        event.target.value,
                    })
                  }
                  placeholder="e.g. 301-307"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#d4a373]"
                />

                <p className="mt-2 text-xs text-white/30">
                  Leave empty if the room type does not
                  have specific room numbers.
                </p>
              </div>

              {/* ================================================= */}
              {/* DESCRIPTION                                        */}
              {/* ================================================= */}

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={editingRoom.description}
                  onChange={(event) =>
                    setEditingRoom({
                      ...editingRoom,
                      description:
                        event.target.value,
                    })
                  }
                  placeholder="Describe this room..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#d4a373]"
                />
              </div>

              {/* ================================================= */}
              {/* PRICING                                            */}
              {/* ================================================= */}

              <div>
                <p className="mb-3 text-sm font-medium text-white/70">
                  Accommodation Pricing
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs text-white/40">
                      8PM – 6AM AC
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                        ₦
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={editingRoom.nightPrice}
                        onChange={(event) =>
                          setEditingRoom({
                            ...editingRoom,
                            nightPrice:
                              event.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-9 pr-4 text-white outline-none transition focus:border-[#d4a373]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-white/40">
                      24H AC
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                        ₦
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={editingRoom.dayPrice}
                        onChange={(event) =>
                          setEditingRoom({
                            ...editingRoom,
                            dayPrice:
                              event.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-9 pr-4 text-white outline-none transition focus:border-[#d4a373]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================= */}
              {/* MESSAGES                                           */}
              {/* ================================================= */}

              {saveError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {saveError}
                </div>
              )}

              {saveSuccess && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  <Check size={16} />
                  {saveSuccess}
                </div>
              )}

              {/* ================================================= */}
              {/* ACTIONS                                            */}
              {/* ================================================= */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditor}
                  disabled={saving}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
                >
                  Cancel
                </button>

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
                      <Check size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
