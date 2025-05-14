import { Service } from "@/types";
import { useEffect } from "react";
import { showConfetti } from "@/utils/confetti";
import BookingHeader from "./components/BookingHeader";
import BookingDetails from "./components/BookingDetails";
import CustomerInfo from "./components/CustomerInfo";
import ReturnButton from "./components/ReturnButton";

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

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <BookingHeader />

      <div className="border-t border-b py-4 mb-6">
        <BookingDetails service={service} date={date} time={time} />
        <CustomerInfo name={name} email={email} />
      </div>

      <ReturnButton centerId={centerId} onReturnClick={onReturnClick} />
    </div>
  );
}
