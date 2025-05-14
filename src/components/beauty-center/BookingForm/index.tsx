import { useState } from "react";
import { BookingFormData, Service } from "@/types";
import FormField from "./components/FormField";
import FormButtons from "./components/FormButtons";
import useFormValidation from "./hooks/useFormValidation";

interface BookingFormProps {
  service: Service;
  centerId: string;
  onSubmit: (formData: BookingFormData) => void;
  onCancel: () => void;
}

export default function BookingForm({ service, centerId, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    date: "",
    time: "",
    serviceId: service.id,
    centerId: centerId,
  });

  const { errors, validateForm, clearError } = useFormValidation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is changed
    clearError(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm(formData)) {
      onSubmit(formData);
    }
  };

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto" aria-label="booking-form">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Book {service.name}</h2>

      <form onSubmit={handleSubmit}>
        <FormField
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          type="text"
          placeholder="Your full name"
          error={errors.name}
          onChange={handleChange}
        />

        <FormField
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          type="email"
          placeholder="your.email@example.com"
          error={errors.email}
          onChange={handleChange}
        />

        <FormField
          id="date"
          name="date"
          label="Date"
          value={formData.date}
          type="date"
          error={errors.date}
          min={today}
          onChange={handleChange}
        />

        <FormField
          id="time"
          name="time"
          label="Time"
          value={formData.time}
          type="time"
          error={errors.time}
          onChange={handleChange}
        />

        <FormButtons onCancel={onCancel} />
      </form>
    </div>
  );
}
