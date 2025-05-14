/**
 * Formats date string to a more readable display format
 */
export function formatDateDisplay(dateString: string): string {
  // Create a date object with the date part only to prevent timezone issues
  const [year, month, day] = dateString.split("-").map(Number);
  const localDate = new Date(year, month - 1, day); // month is 0-indexed in JS Date

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return localDate.toLocaleDateString(undefined, options);
}

/**
 * Formats time string to a more readable 12-hour display format
 */
export function formatTimeDisplay(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

/**
 * Formats price to a currency string with dollar sign and two decimal places
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
