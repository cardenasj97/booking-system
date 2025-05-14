import { Service } from "@/types";
import ButtonNow from "./components/ButtonNow";
import ServiceDetails from "./components/ServiceDetails";
import { useServiceFormatting } from "@/hooks/useServiceFormatting";

interface ServiceCardProps {
  service: Service;
  onBookClick: (serviceId: string) => void;
}

export default function ServiceCard({ service, onBookClick }: ServiceCardProps) {
  const { formatPrice, formatDuration } = useServiceFormatting();

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="p-6">
        <ServiceDetails
          service={service}
          formatDuration={formatDuration}
          formatPrice={formatPrice}
        />
        <ButtonNow onClick={() => onBookClick(service.id)} />
      </div>
    </div>
  );
}
