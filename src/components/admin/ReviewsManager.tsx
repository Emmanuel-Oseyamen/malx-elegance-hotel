"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Edit3,
  Loader2,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  name: string;
  location: string | null;
  review: string;
  rating: number;
  image_url: string | null;
  source: "starter" | "customer";
  is_published: boolean;
  is_featured: boolean;
};

type FormState = {
  name: string;
  location: string;
  review: string;
  rating: number;
  source: "starter" | "customer";
  is_published: boolean;
  is_featured: boolean;
};

const emptyForm: FormState = {
  name: "",
  location: "",
  review: "",
  rating: 5,
  source: "customer",
  is_published: false,
  is_featured: false,
};

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>(emptyForm);

  async function loadReviews() {
    setLoading(true);

    const { data, error } = await supabase
      .from("reviews")
      .select(
        "id, name, location, review, rating, image_url, source, is_published, is_featured"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load reviews:", error);
      alert("Unable to load reviews.");
    } else {
      setReviews((data ?? []) as Review[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(review: Review) {
    setEditingId(review.id);

    setForm({
      name: review.name,
      location: review.location ?? "",
      review: review.review,
      rating: review.rating,
      source: review.source,
      is_published: review.is_published,
      is_featured: review.is_featured,
    });

    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function saveReview() {
    if (!form.name.trim()) {
      alert("Please enter the guest name.");
      return;
    }

    if (!form.review.trim()) {
      alert("Please enter the review.");
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name.trim(),
      location: form.location.trim() || null,
      review: form.review.trim(),
      rating: form.rating,
      source: form.source,
      is_published: form.is_published,
      is_featured: form.is_featured,
      updated_at: new Date().toISOString(),
    };

    let error;

    if (editingId) {
      const result = await supabase
        .from("reviews")
        .update(payload)
        .eq("id", editingId);

      error = result.error;
    } else {
      const result = await supabase
        .from("reviews")
        .insert(payload);

      error = result.error;
    }

    if (error) {
      console.error("Failed to save review:", error);
      alert(error.message || "Unable to save review.");
      setSaving(false);
      return;
    }

    await loadReviews();

    setSaving(false);
    closeForm();
  }

  async function togglePublished(review: Review) {
    const { error } = await supabase
      .from("reviews")
      .update({
        is_published: !review.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", review.id);

    if (error) {
      console.error(error);
      alert("Unable to update review.");
      return;
    }

    await loadReviews();
  }

  async function toggleFeatured(review: Review) {
    const { error } = await supabase
      .from("reviews")
      .update({
        is_featured: !review.is_featured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", review.id);

    if (error) {
      console.error(error);
      alert("Unable to update featured status.");
      return;
    }

    await loadReviews();
  }

  async function deleteReview(review: Review) {
    const confirmed = window.confirm(
      `Delete the review from "${review.name}"?`
    );

    if (!confirmed) return;

    setDeletingId(review.id);

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", review.id);

    if (error) {
      console.error(error);
      alert("Unable to delete review.");
      setDeletingId(null);
      return;
    }

    await loadReviews();
    setDeletingId(null);
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A373]">
              Reputation
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Reviews
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
              Manage guest reviews and the experience statements
              displayed on the MALX website.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4A373] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#C08A5C]"
          >
            <Plus size={18} />
            Add Review
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Reviews"
            value={reviews.length}
          />

          <StatCard
            label="Customer Reviews"
            value={
              reviews.filter(
                (review) => review.source === "customer"
              ).length
            }
          />

          <StatCard
            label="Published"
            value={
              reviews.filter(
                (review) => review.is_published
              ).length
            }
          />
        </div>

        {/* List */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          {loading ? (
            <div className="flex min-h-[240px] items-center justify-center">
              <Loader2
                size={28}
                className="animate-spin text-[#D4A373]"
              />
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center px-6 text-center">
              <p className="font-medium">
                No reviews yet
              </p>

              <p className="mt-2 text-sm text-white/40">
                Add your first review to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-5 transition hover:bg-white/[0.025] sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-semibold">
                          {review.name}
                        </h2>

                        {review.source === "starter" ? (
                          <span className="rounded-full border border-[#D4A373]/20 bg-[#D4A373]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D4A373]">
                            MALX
                          </span>
                        ) : (
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                            Customer
                          </span>
                        )}

                        {review.is_featured && (
                          <span className="rounded-full bg-[#D4A373] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                            Featured
                          </span>
                        )}
                      </div>

                      {review.location && (
                        <p className="mt-1 text-xs text-white/35">
                          {review.location}
                        </p>
                      )}

                      <div className="mt-3 flex gap-1">
                        {Array.from({
                          length: review.rating,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            fill="currentColor"
                            className="text-[#D4A373]"
                          />
                        ))}
                      </div>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">
                        {review.review}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          togglePublished(review)
                        }
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                          review.is_published
                            ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            : "bg-white/5 text-white/40 hover:bg-white/10"
                        }`}
                      >
                        {review.is_published ? (
                          <>
                            <Check size={14} />
                            Published
                          </>
                        ) : (
                          <>
                            <X size={14} />
                            Hidden
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleFeatured(review)
                        }
                        className="rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white/60 transition hover:bg-white/10"
                      >
                        {review.is_featured
                          ? "Unfeature"
                          : "Feature"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(review)
                        }
                        className="rounded-lg bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                        aria-label="Edit review"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteReview(review)
                        }
                        disabled={
                          deletingId === review.id
                        }
                        className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
                        aria-label="Delete review"
                      >
                        {deletingId === review.id ? (
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A373]">
                  {editingId
                    ? "Edit Review"
                    : "New Review"}
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {editingId
                    ? "Update review"
                    : "Add a review"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 space-y-5">
              <Field
                label="Name"
                value={form.name}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    name: value,
                  }))
                }
                placeholder="Guest name"
              />

              <Field
                label="Location"
                value={form.location}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    location: value,
                  }))
                }
                placeholder="e.g. Abuja"
              />

              <div>
                <label className="mb-2 block text-xs font-medium text-white/50">
                  Review
                </label>

                <textarea
                  value={form.review}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      review: event.target.value,
                    }))
                  }
                  rows={5}
                  placeholder="Write the guest review..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#D4A373]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white/50">
                  Rating
                </label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(
                    (rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            rating,
                          }))
                        }
                        className="rounded-lg p-2 transition hover:bg-white/5"
                      >
                        <Star
                          size={21}
                          fill={
                            rating <= form.rating
                              ? "currentColor"
                              : "none"
                          }
                          className={
                            rating <= form.rating
                              ? "text-[#D4A373]"
                              : "text-white/20"
                          }
                        />
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white/50">
                  Review Type
                </label>

                <select
                  value={form.source}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      source: event.target
                        .value as "starter" | "customer",
                    }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[#D4A373]/50"
                >
                  <option
                    value="customer"
                    className="bg-[#121212]"
                  >
                    Customer Review
                  </option>

                  <option
                    value="starter"
                    className="bg-[#121212]"
                  >
                    MALX Experience Statement
                  </option>
                </select>
              </div>

              <div className="flex flex-wrap gap-6">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-white/60">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        is_published:
                          event.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-[#D4A373]"
                  />
                  Published
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-white/60">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        is_featured:
                          event.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-[#D4A373]"
                  />
                  Featured
                </label>
              </div>

              <button
                type="button"
                onClick={saveReview}
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4A373] px-5 py-3.5 font-semibold text-black transition hover:bg-[#C08A5C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                )}

                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-white/50">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#D4A373]/50"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}