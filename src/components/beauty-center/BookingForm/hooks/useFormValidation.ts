import { useState } from "react";
import { BookingFormData } from "@/types";

export default function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (name: string) => {
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (formData: BookingFormData): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Date and time validation
    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    // Combined date and time validation for future dates
    if (formData.date && formData.time) {
      const now = new Date();
      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);

      if (selectedDateTime < now) {
        // If selected time is in the past
        newErrors.time = "Please select a future date and time";
      }
    } else if (formData.date) {
      // Only validate date if time isn't provided yet
      const selectedDate = new Date(formData.date);
      const today = new Date();

      // Reset hours to compare just the dates
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Date must be today or in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm, clearError };
}
