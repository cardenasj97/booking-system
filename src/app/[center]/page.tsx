"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Center, Service, BookingFormData } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CenterHeader from "@/components/CenterHeader";
import ServiceCard from "@/components/ServiceCard";
import BookingForm from "@/components/BookingForm";
import BookingConfirmation from "@/components/BookingConfirmation";
import { showConfetti } from "@/utils/confetti";

enum BookingState {
  BROWSING,
  BOOKING,
  CONFIRMED,
}

export default function CenterPage() {
  const params = useParams();
  const router = useRouter();
  const centerId = params.center as string;

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
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Render loading state
  if (isLoading && !center) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <LoadingSpinner />
      </div>
    );
  }

  // Render error state
  if (error && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-red-50 p-6 rounded-lg text-center text-red-600">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Render center not found
  if (!center && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-yellow-50 p-6 rounded-lg text-center text-yellow-700">
          <h2 className="text-xl font-bold mb-2">Center Not Found</h2>
          <p>The beauty center you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {center && (
          <>
            {/* Center Header */}
            <CenterHeader center={center} />

            {/* Booking Form or Confirmation */}
            {bookingState === BookingState.BOOKING && selectedService && (
              <div className="mb-12">
                <BookingForm
                  service={selectedService}
                  centerId={centerId}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
            )}

            {bookingState === BookingState.CONFIRMED &&
              confirmationData &&
              selectedService && (
                <div className="mb-12">
                  <BookingConfirmation
                    service={selectedService}
                    name={confirmationData.name}
                    email={confirmationData.email}
                    date={confirmationData.date}
                    time={confirmationData.time}
                    centerId={centerId}
                    onReturnClick={handleReturnToCenter}
                  />
                </div>
              )}

            {/* Services Section (hidden when showing confirmation) */}
            {bookingState !== BookingState.CONFIRMED && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Our Services
                </h2>

                {isLoading ? (
                  <LoadingSpinner />
                ) : services.length === 0 ? (
                  <p className="text-gray-700 text-center py-10">
                    No services available at this time.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onBookClick={handleBookClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
