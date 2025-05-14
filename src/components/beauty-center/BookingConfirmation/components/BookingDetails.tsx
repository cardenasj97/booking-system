import { Service } from "@/types";
import { formatDateDisplay, formatTimeDisplay, formatPrice } from "../utils";

interface BookingDetailsProps {
  service: Service;
  date: string;
  time: string;
}

export default function BookingDetails({ service, date, time }: BookingDetailsProps) {
  return (
    <>
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-1">Service</h3>
        <div className="flex justify-between items-center">
          <p className="text-lg text-pink-600">{service.name}</p>
          <p className="text-lg font-medium text-gray-800">{formatPrice(service.price)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Date</h3>
          <p className="text-gray-700">{formatDateDisplay(date)}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Time</h3>
          <p className="text-gray-700">{formatTimeDisplay(time)}</p>
        </div>
      </div>
    </>
  );
}
