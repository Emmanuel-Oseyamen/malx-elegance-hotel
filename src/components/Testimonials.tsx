const testimonials = [
  {
    name: "Michael A.",
    location: "Abuja",
    review:
      "An exceptional experience from arrival to departure. The rooms were elegant, the staff attentive, and the atmosphere truly luxurious.",
  },
  {
    name: "Sarah O.",
    location: "Lagos",
    review:
      "One of the finest hotel experiences I've had. Beautiful facilities, outstanding service, and excellent dining.",
  },
  {
    name: "David E.",
    location: "Port Harcourt",
    review:
      "The perfect blend of comfort and sophistication. I will definitely return for future stays.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="text-center">

          <p className="mb-3 uppercase tracking-[6px] text-[#D4A373]">
            Guest Experiences
          </p>

          <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
            What Our Guests Say
          </h2>

        </div>

        {/* Reviews */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >

              <div className="mb-4 text-2xl text-[#D4A373]">
                ★★★★★
              </div>

              <p className="leading-relaxed text-slate-600">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-semibold text-slate-900">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.location}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* Recognition Section */}
        <div className="mt-20 rounded-3xl bg-slate-950 p-10 text-white">

          <div className="grid gap-10 text-center md:grid-cols-4">

            <div>
              <h3 className="text-4xl font-bold text-[#D4A373]">
                500+
              </h3>

              <p className="mt-2 text-slate-300">
                Happy Guests
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#D4A373]">
                50+
              </h3>

              <p className="mt-2 text-slate-300">
                Luxury Rooms
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#D4A373]">
                24/7
              </h3>

              <p className="mt-2 text-slate-300">
                Guest Support
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#D4A373]">
                5★
              </h3>

              <p className="mt-2 text-slate-300">
                Service Standard
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}