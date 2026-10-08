"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
} from "lucide-react";

type GalleryImage = {
  src: string;
  title: string;
  category: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/gallery-1.png",
    title: "The MALX Experience",
    category: "Hotel",
  },
  {
    src: "/gallery/gallery-2.png",
    title: "Elegant Interiors",
    category: "Interiors",
  },
  {
    src: "/gallery/gallery-3.png",
    title: "Relax & Unwind",
    category: "Leisure",
  },
  {
    src: "/gallery/gallery-4.png",
    title: "A Welcoming Arrival",
    category: "Lobby",
  },
  {
    src: "/gallery/gallery5.png",
    title: "Designed for Comfort",
    category: "Rooms",
  },
  {
    src: "/gallery/gallery-6.png",
    title: "Luxury in Every Detail",
    category: "Interiors",
  },
  {
    src: "/gallery/gallery-7.png",
    title: "Your Space to Relax",
    category: "Rooms",
  },
  {
    src: "/gallery/gallery-8.png",
    title: "The MALX Atmosphere",
    category: "Hotel",
  },
  {
    src: "/gallery/gallery-9.png",
    title: "Moments Worth Remembering",
    category: "Experience",
  },
  {
    src: "/gallery/gallery-10.png",
    title: "Comfort, Elevated",
    category: "Rooms",
  },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? galleryImages.length - 1
        : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === galleryImages.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  // Prevent page scrolling while lightbox is open
  useEffect(() => {
    if (selectedIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex]);

  return (
    <>
      <section
        id="gallery"
        className="relative overflow-hidden bg-[#0b0b0b] py-28"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#D4A373]/5 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
          >
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.45em] text-[#D4A373]">
                Visual Experience
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Explore
                <span className="font-light text-white/60">
                  {" "}
                  MALX Elegance
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                A glimpse into the spaces, details and atmosphere
                that make every stay at MALX Elegance memorable.
              </p>
            </div>

            <div className="hidden text-right md:block">
              <p className="text-sm text-white/30">
                {galleryImages.length.toString().padStart(2, "0")}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/20">
                Moments
              </p>
            </div>
          </motion.div>

          {/* Editorial Gallery */}
          <div className="grid gap-4 md:grid-cols-12">
            {/* Large Hero Image */}
            <GalleryCard
              image={galleryImages[0]}
              index={0}
              className="h-[500px] md:col-span-7 md:row-span-2 md:h-[620px]"
              onClick={() => setSelectedIndex(0)}
            />

            {/* Top Right */}
            <GalleryCard
              image={galleryImages[1]}
              index={1}
              className="h-[300px] md:col-span-5 md:h-[300px]"
              onClick={() => setSelectedIndex(1)}
            />

            {/* Middle Right */}
            <GalleryCard
              image={galleryImages[2]}
              index={2}
              className="h-[300px] md:col-span-5 md:h-[300px]"
              onClick={() => setSelectedIndex(2)}
            />

            {/* Wide Image */}
            <GalleryCard
              image={galleryImages[3]}
              index={3}
              className="h-[350px] md:col-span-5 md:h-[420px]"
              onClick={() => setSelectedIndex(3)}
            />

            <GalleryCard
              image={galleryImages[4]}
              index={4}
              className="h-[350px] md:col-span-7 md:h-[420px]"
              onClick={() => setSelectedIndex(4)}
            />

            {/* Bottom Row */}
            <GalleryCard
              image={galleryImages[5]}
              index={5}
              className="h-[300px] md:col-span-4 md:h-[360px]"
              onClick={() => setSelectedIndex(5)}
            />

            <GalleryCard
              image={galleryImages[6]}
              index={6}
              className="h-[300px] md:col-span-4 md:h-[360px]"
              onClick={() => setSelectedIndex(6)}
            />

            <GalleryCard
              image={galleryImages[7]}
              index={7}
              className="h-[300px] md:col-span-4 md:h-[360px]"
              onClick={() => setSelectedIndex(7)}
            />

            {/* Final Feature Row */}
            <GalleryCard
              image={galleryImages[8]}
              index={8}
              className="h-[420px] md:col-span-7 md:h-[500px]"
              onClick={() => setSelectedIndex(8)}
            />

            <GalleryCard
              image={galleryImages[9]}
              index={9}
              className="h-[420px] md:col-span-5 md:h-[500px]"
              onClick={() => setSelectedIndex(9)}
            />

           
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row"
          >
            <div>
              <p className="text-sm text-white/40">
                Every space tells a story.
              </p>

              <p className="mt-1 text-lg text-white">
                Discover yours at MALX Elegance.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedIndex(0)}
              className="group flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:border-[#D4A373]/50 hover:bg-[#D4A373]/10"
            >
              View full gallery

              <Maximize2
                size={15}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-8"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute left-5 top-6 z-20 text-xs tracking-[0.25em] text-white/50 md:left-8">
              {(selectedIndex + 1).toString().padStart(2, "0")}{" "}
              <span className="text-white/20">/</span>{" "}
              {galleryImages.length.toString().padStart(2, "0")}
            </div>

            {/* Previous */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-sm transition hover:border-[#D4A373]/50 hover:bg-[#D4A373]/10 md:left-8"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-sm transition hover:border-[#D4A373]/50 hover:bg-[#D4A373]/10 md:right-8"
            >
              <ArrowRight size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="relative h-[70vh] w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-contain"
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 z-20 w-full -translate-x-1/2 px-6 text-center md:bottom-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4A373]">
                {selectedImage.category}
              </p>

              <h3 className="mt-2 text-xl font-medium text-white md:text-2xl">
                {selectedImage.title}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GalleryCard({
  image,
  index,
  className,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  className: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.04, 0.25),
      }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[2rem] text-left ${className}`}
    >
      <Image
        src={image.src}
        alt={image.title}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      {/* Gold hover glow */}
      <div className="absolute inset-0 bg-[#D4A373]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Expand icon */}
      <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <Maximize2 size={16} />
      </div>

      {/* Image information */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
        <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-[#D4A373]">
          {image.category}
        </p>

        <h3 className="text-lg font-medium text-white md:text-xl">
          {image.title}
        </h3>
      </div>

      {/* Image number */}
      <span className="absolute left-5 top-5 text-[10px] tracking-[0.25em] text-white/50">
        {(index + 1).toString().padStart(2, "0")}
      </span>
    </motion.button>
  );
}
