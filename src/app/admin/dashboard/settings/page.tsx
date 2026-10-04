import HotelSettingsManager from "@/components/admin/HotelSettingsManager";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a373]">
            MALX Elegance Hotel
          </p>

          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
            Hotel Details
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Manage the hotel's contact information and
            physical address.
          </p>
        </div>

        <div className="mt-10">
          <HotelSettingsManager />
        </div>
      </div>
    </div>
  );
}