import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  onBookClick: (serviceId: string) => void;
}

export default function ServiceCard({
  service,
  onBookClick,
}: ServiceCardProps) {
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

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-pink-600">{service.name}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700 text-sm">
            {formatDuration(service.duration)}
          </span>
          <span className="font-bold text-lg text-gray-700">
            {formatPrice(service.price)}
          </span>
        </div>
        <p className="text-gray-700 mb-4 text-sm">{service.description}</p>
        <button
          onClick={() => onBookClick(service.id)}
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 w-full"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
