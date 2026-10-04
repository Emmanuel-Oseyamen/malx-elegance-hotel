import { supabase } from "@/lib/supabase";

export type HotelSettings = {
  id: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
};

export async function getHotelSettings(): Promise<HotelSettings | null> {
  const { data, error } = await supabase
    .from("hotel_settings")
    .select("id, phone, whatsapp, email, address")
    .limit(1)
    .maybeSingle();

  console.log("HOTEL SETTINGS DATA:", data);
  console.log("HOTEL SETTINGS ERROR:", error);

  if (error) {
    console.error("Failed to load hotel settings:", error);
    return null;
  }

  if (!data) {
    console.warn("No hotel settings row returned.");
    return null;
  }

  return {
    id: data.id,
    phone: data.phone ?? "",
    whatsapp: data.whatsapp ?? "",
    email: data.email ?? "",
    address: data.address ?? "",
  };
}