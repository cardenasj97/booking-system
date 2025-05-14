import { Service } from "@/types";

interface ServiceDetailsProps {
  service: Service;
  formatDuration: (minutes: number) => string;
  formatPrice: (price: number) => string;
}

export default function ServiceDetails({
  service,
  formatDuration,
  formatPrice,
}: ServiceDetailsProps) {
  return (
    <>
      <h3 className="font-bold text-xl mb-2 text-pink-600">{service.name}</h3>
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-700 text-sm">{formatDuration(service.duration)}</span>
        <span className="font-bold text-lg text-gray-700">{formatPrice(service.price)}</span>
      </div>
      <p className="text-gray-700 mb-4 text-sm">{service.description}</p>
    </>
  );
}
