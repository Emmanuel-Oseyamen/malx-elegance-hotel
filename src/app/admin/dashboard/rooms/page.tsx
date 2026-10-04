import RoomsManager from "@/components/admin/RoomsManager";

export default function RoomsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a373]">
            MALX Elegance Hotel
          </p>

          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
            Rooms & Prices
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Manage room information and accommodation pricing.
          </p>
        </div>

        <div className="mt-10">
          <RoomsManager />
        </div>
      </div>
    </div>
  );
}