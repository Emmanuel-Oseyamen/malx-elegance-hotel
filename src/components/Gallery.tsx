import Image from "next/image";

const galleryImages = [
  "/gallery/gallery-1.png",
  "/gallery/gallery-2.png",
  "/gallery/gallery-3.png",
  "/gallery/gallery-4.png",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-14 text-center">

          <p className="mb-3 uppercase tracking-[6px] text-[#D4A373]">
            Visual Experience
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Explore Malx Elegance
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-slate-400">
            Discover luxurious spaces, elegant interiors,
            and unforgettable experiences.
          </p>

        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 md:grid-cols-4">

          {/* MAIN IMAGE (BIG LEFT) */}
          <div className="relative h-[500px] overflow-hidden rounded-3xl md:col-span-2 md:row-span-2">
            <Image
              src="/gallery/gallery-1.png"
              alt="Test"
              width={800}
              height={600}
              className="object-cover"
            />
          </div>

          {/* TOP RIGHT */}
          <div className="relative h-[240px] overflow-hidden rounded-3xl md:col-span-2">
            <Image
              src={galleryImages[1]}
              alt="Luxury Room"
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>

          {/* BOTTOM LEFT */}
          <div className="relative h-[240px] overflow-hidden rounded-3xl">
            <Image
              src={galleryImages[2]}
              alt="Pool"
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>

          {/* BOTTOM RIGHT */}
          <div className="relative h-[240px] overflow-hidden rounded-3xl">
            <Image
              src={galleryImages[3]}
              alt="Lobby"
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>

        </div>

      </div>
    </section>
  );
}