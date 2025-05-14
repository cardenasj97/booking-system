export interface Center {
  id: string;
  name: string;
  description: string;
  logo: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description: string;
  centerId: string;
}

export interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  status: "confirmed" | "cancelled" | "completed";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  serviceId: string;
  centerId: string;
}
