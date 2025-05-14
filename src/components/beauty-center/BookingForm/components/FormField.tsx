import React from "react";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  type: "text" | "email" | "date" | "time";
  placeholder?: string;
  min?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  id,
  name,
  label,
  value,
  type,
  placeholder = "",
  min,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-gray-700 ${
          error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-pink-200"
        }`}
        placeholder={placeholder}
        min={min}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
