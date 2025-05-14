import { Service } from "@/types";
import Link from "next/link";
import { useEffect } from "react";
import { showConfetti } from "@/utils/confetti";

interface BookingConfirmationProps {
  service: Service;
  name: string;
  email: string;
  date: string;
  time: string;
  centerId: string;
  onReturnClick: (e: React.MouseEvent) => void;
}

export default function BookingConfirmation({
  service,
  name,
  email,
  date,
  time,
  centerId,
  onReturnClick,
}: BookingConfirmationProps) {
  // Show confetti when component mounts
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      showConfetti();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    // Create a date object with the date part only to prevent timezone issues
    // Add the time to ensure it's treated as local time
    const [year, month, day] = dateString.split("-").map(Number);
    const localDate = new Date(year, month - 1, day); // month is 0-indexed in JS Date

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return localDate.toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
        <p className="text-gray-700 mt-1">Your appointment has been successfully booked.</p>
      </div>

      <div className="border-t border-b py-4 mb-6">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">Service</h3>
          <p className="text-lg text-pink-600">{service.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Date</h3>
            <p className="text-gray-700">{formatDate(date)}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Time</h3>
            <p className="text-gray-700">{formatTime(time)}</p>
          </div>
        </div>

        <div className="mb-1">
          <h3 className="font-semibold text-gray-700 mb-1">Customer</h3>
          <p className="text-gray-700">{name}</p>
          <p className="text-gray-700">{email}</p>
        </div>
      </div>

      <div className="text-center">
        <Link href={`/${centerId}`} onClick={onReturnClick}>
          <button className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors duration-300">
            Return to Beauty Center
          </button>
        </Link>
      </div>
    </div>
  );
}
