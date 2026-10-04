import { getHotelSettings } from "@/lib/hotelSettings";

export function buildWhatsAppMessage(data: {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  roomType?: string;
}) {
  return `Hello MALX Elegance Hotel,

I would like to check availability / make a reservation.

Room Type: ${data.roomType ?? "Not selected"}
Check-in: ${data.checkIn ?? "Not selected"}
Check-out: ${data.checkOut ?? "Not selected"}
Guests: ${data.guests ?? "Not selected"}

Please confirm availability.`;
}

export async function buildWhatsAppBookingUrl(data: {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  roomType?: string;
}) {
  const settings = await getHotelSettings();

  const whatsapp = settings?.whatsapp?.replace(/\D/g, "");

  if (!whatsapp) {
    throw new Error(
      "Hotel WhatsApp number is not configured."
    );
  }

  const message = buildWhatsAppMessage(data);

  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    message
  )}`;
}

export async function buildRoomWhatsAppUrl(data: {
  roomType: string;
  nightPrice?: number;
  dayPrice?: number;
}) {
  const settings = await getHotelSettings();

  const whatsapp = settings?.whatsapp?.replace(/\D/g, "");

  if (!whatsapp) {
    throw new Error(
      "Hotel WhatsApp number is not configured."
    );
  }

  const formatPrice = (price?: number) => {
    if (price === undefined) {
      return "Not set";
    }

    return `₦${Number(price).toLocaleString("en-NG")}`;
  };

  const message = `Hello MALX Elegance Hotel,

I would like to check availability for the ${data.roomType}.

8PM–6AM AC: ${formatPrice(data.nightPrice)}
24H AC: ${formatPrice(data.dayPrice)}

Please confirm availability.`;

  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    message
  )}`;
}