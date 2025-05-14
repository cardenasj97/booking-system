"use client";

import { useParams } from "next/navigation";
import { useCenterPage } from "@/hooks/useCenterPage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CenterHeader from "@/components/beauty-center/CenterHeader";
import ServiceCard from "@/components/beauty-center/ServiceCard";
import BookingForm from "@/components/beauty-center/BookingForm";
import BookingConfirmation from "@/components/beauty-center/BookingConfirmation";
import CenterNotFound from "@/components/beauty-center/CenterNotFound";
import Error from "@/components/ui/Error";

export default function CenterPage() {
  const params = useParams();
  const centerId = params.center as string;

  const {
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
  } = useCenterPage(centerId);

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
    return <Error message={error} />;
  }

  // Render center not found
  if (!center && !isLoading) {
    return <CenterNotFound />;
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
              <div className="mb-12" ref={bookingFormRef}>
                <BookingForm
                  service={selectedService}
                  centerId={centerId}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
            )}

            {bookingState === BookingState.CONFIRMED && confirmationData && selectedService && (
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Services</h2>

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
