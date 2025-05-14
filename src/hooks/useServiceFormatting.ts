export function useServiceFormatting() {
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"}`;
    }

    return `${hours} ${hours === 1 ? "hour" : "hours"} ${remainingMinutes} min`;
  };

  return {
    formatPrice,
    formatDuration,
  };
}
