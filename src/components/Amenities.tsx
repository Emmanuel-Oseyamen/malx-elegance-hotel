import {
  Waves,
  Utensils,
  Dumbbell,
} from "lucide-react";

const amenities = [
  {
    icon: Waves,
    title: "Infinity Pool",
    description:
      "Unwind in our elegant infinity pool, designed to provide a serene atmosphere for relaxation and leisure.",
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    description:
      "Experience exceptional cuisine crafted by talented chefs using carefully selected local and international ingredients.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description:
      "Maintain your wellness routine with access to modern fitness equipment in a comfortable environment.",
  },
];

export default function Amenities() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 text-center">

          <p className="mb-3 uppercase tracking-[6px] text-[#D4A373]">
            Premium Amenities
          </p>

          <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Designed Around Your Comfort
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-slate-600">
            Every facility has been thoughtfully curated to deliver
            comfort, convenience, and memorable experiences.
          </p>

        </div>

        {/* Amenities */}
        <div className="grid gap-12 md:grid-cols-3">

          {amenities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="text-center"
              >

                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#F7F3EE]">
                  <Icon
                    size={42}
                    className="text-[#D4A373]"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-600">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}