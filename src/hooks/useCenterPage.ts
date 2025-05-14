import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Center, Service, BookingFormData } from "@/types";
import { showConfetti } from "@/utils/confetti";

enum BookingState {
  BROWSING,
  BOOKING,
  CONFIRMED,
}

export const useCenterPage = (centerId: string) => {
  const router = useRouter();
  const bookingFormRef = useRef<HTMLDivElement | null>(null);

  const [center, setCenter] = useState<Center | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>(
    BookingState.BROWSING
  );
  const [confirmationData, setConfirmationData] =
    useState<BookingFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Monitor booking state changes
  useEffect(() => {
    if (bookingState === BookingState.CONFIRMED) {
      // Trigger confetti when booking is confirmed
      showConfetti();
    }
  }, [bookingState]);

  useEffect(() => {
    const fetchCenterData = async () => {
      try {
        setIsLoading(true);

        // Fetch center details
        const centerData = await api.getCenter(centerId);
        if (!centerData) {
          router.push("/");
          return;
        }
        setCenter(centerData);

        // Fetch services for this center
        const servicesData = await api.getServicesByCenter(centerId);
        setServices(servicesData);

        setError(null);
      } catch (err) {
        console.error("Error fetching center data:", err);
        setError("Failed to load beauty center data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCenterData();
  }, [centerId, router]);

  const handleBookClick = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setBookingState(BookingState.BOOKING);

      // Wait for state update and DOM to render before scrolling
      setTimeout(() => {
        bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleFormSubmit = async (formData: BookingFormData) => {
    try {
      setIsLoading(true);

      // Create booking via API
      await api.createBooking(
        formData.name,
        formData.email,
        formData.serviceId,
        formData.date,
        formData.time
      );

      // Store confirmation data
      setConfirmationData(formData);

      // Update booking state
      setBookingState(BookingState.CONFIRMED);

      // Don't scroll to top when showing confirmation
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create your booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormCancel = () => {
    setSelectedService(null);
    setBookingState(BookingState.BROWSING);
  };

  const handleReturnToCenter = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link navigation
    setBookingState(BookingState.BROWSING);
    setSelectedService(null);
    setConfirmationData(null);

    // Scroll to top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    center,
    services,
    selectedService,
    bookingState,
    confirmationData,
    isLoading,
    error,
    bookingFormRef,
    handleBookClick,
    handleFormSubmit,
    handleFormCancel,
    handleReturnToCenter,
    BookingState,
  };
};
