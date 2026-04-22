export const getPriceTotal = (bookings) => {
  return bookings.reduce((acc, booking) => booking.totalPrices + acc, 0);
};
