"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
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

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      const { data, error } = await supabase
        .from("reviews")
        .select(
          "id, name, location, review, rating, image_url, source, is_published, is_featured"
        )
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load reviews:", error);
        setLoading(false);
        return;
      }

      const allReviews = (data ?? []) as Review[];

      const customerReviews = allReviews.filter(
        (review) => review.source === "customer"
      );

      const starterReviews = allReviews.filter(
        (review) => review.source === "starter"
      );

      let displayReviews: Review[];

      if (customerReviews.length >= 3) {
        displayReviews = customerReviews;
      } else {
        const starterSlots = Math.max(
          0,
          3 - customerReviews.length
        );

        displayReviews = [
          ...customerReviews,
          ...starterReviews.slice(0, starterSlots),
        ];
      }

      setReviews(displayReviews);
      setLoading(false);
    }

    loadReviews();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f8f6f2] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-48 animate-pulse rounded bg-black/10" />
          <div className="mt-6 h-16 max-w-xl animate-pulse rounded bg-black/10" />
        </div>
      </section>
    );
  }

  if (!reviews.length) {
    return null;
  }

  const featured =
    reviews.find((review) => review.is_featured) ?? reviews[0];

  const secondary = reviews
    .filter((review) => review.id !== featured.id)
    .slice(0, 2);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#f8f6f2] px-6 py-24 sm:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#D4A373]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-[#D4A373]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9a704b]">
              Guest Experiences
            </span>
          </div>

          <h2 className="font-serif text-4xl leading-tight text-[#171717] sm:text-5xl lg:text-6xl">
            Memories worth
            <span className="block italic text-[#9a704b]">
              coming back to.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-black/60 sm:text-lg">
            Discover what makes the MALX experience different —
            from thoughtful hospitality to spaces designed around
            your comfort.
          </p>
        </motion.div>

        {/* Featured review */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-16 overflow-hidden rounded-[32px] bg-[#111111] p-8 text-white shadow-2xl sm:p-12 lg:p-16"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Quote
                size={48}
                strokeWidth={1}
                className="mb-8 text-[#D4A373]"
              />

              <div className="mb-6 flex gap-1">
                {Array.from({
                  length: featured.rating,
                }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="currentColor"
                    className="text-[#D4A373]"
                  />
                ))}
              </div>

              <blockquote className="max-w-4xl text-2xl leading-relaxed text-white/90 sm:text-3xl lg:text-4xl">
                “{featured.review}”
              </blockquote>

              <div className="mt-10">
                <p className="font-semibold text-white">
                  {featured.name}
                </p>

                {featured.location && (
                  <p className="mt-1 text-sm text-white/50">
                    {featured.location}
                  </p>
                )}
              </div>
            </div>

            <div className="hidden h-28 w-28 items-center justify-center rounded-full border border-[#D4A373]/30 bg-[#D4A373]/10 lg:flex">
              <Quote
                size={38}
                strokeWidth={1}
                className="text-[#D4A373]"
              />
            </div>
          </div>
        </motion.div>

        {/* Secondary reviews */}
        {secondary.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {secondary.map((review, index) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                className="rounded-[28px] border border-black/5 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-9"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({
                      length: review.rating,
                    }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={15}
                        fill="currentColor"
                        className="text-[#D4A373]"
                      />
                    ))}
                  </div>

                  <Quote
                    size={24}
                    strokeWidth={1}
                    className="text-[#D4A373]"
                  />
                </div>

                <p className="text-lg leading-8 text-black/70">
                  “{review.review}”
                </p>

                <div className="mt-8 border-t border-black/5 pt-6">
                  <p className="font-semibold text-[#171717]">
                    {review.name}
                  </p>

                  {review.location && (
                    <p className="mt-1 text-sm text-black/40">
                      {review.location}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto mb-5 h-px w-16 bg-[#D4A373]" />

          <p className="font-serif text-2xl italic text-black/70 sm:text-3xl">
            Your comfort is our highest standard.
          </p>
        </motion.div>
      </div>
    </section>
  );
}