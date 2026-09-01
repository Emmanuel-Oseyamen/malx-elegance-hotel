export const buildWhatsAppBookingUrl = (data: {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  roomType?: string;
}) => {
  const message = `Grand Cuba Hotel,

I would like to make a reservation.

Room Type: ${data.roomType ?? "Not selected"}
Check-in: ${data.checkIn ?? "Not selected"}
Check-out: ${data.checkOut ?? "Not selected"}
Guests: ${data.guests ?? "Not selected"}

Please confirm availability.`;

  return `https://wa.me/2347072350040?text=${encodeURIComponent(message)}`;
};