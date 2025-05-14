import { Center, Service, Booking, Customer } from "@/types";

// Mock data
const centers: Center[] = [
  {
    id: "center1",
    name: "Bella Beauty Center",
    description: "A premium beauty center offering a wide range of services.",
    logo: "/images/bella-logo.png",
  },
  {
    id: "center2",
    name: "Glow Spa & Salon",
    description: "Your one-stop destination for all beauty and wellness needs.",
    logo: "/images/glow-logo.png",
  },
];

const services: Service[] = [
  {
    id: "service1",
    name: "Haircut & Styling",
    duration: 60,
    price: 50,
    description: "Professional haircut and styling by our expert stylists.",
    centerId: "center1",
  },
  {
    id: "service2",
    name: "Manicure & Pedicure",
    duration: 90,
    price: 70,
    description: "Complete nail care for hands and feet.",
    centerId: "center1",
  },
  {
    id: "service3",
    name: "Facial Treatment",
    duration: 60,
    price: 80,
    description: "Rejuvenating facial treatment for all skin types.",
    centerId: "center1",
  },
  {
    id: "service4",
    name: "Hair Coloring",
    duration: 120,
    price: 120,
    description: "Professional hair coloring services.",
    centerId: "center2",
  },
  {
    id: "service5",
    name: "Massage Therapy",
    duration: 60,
    price: 90,
    description: "Relaxing massage to relieve stress and tension.",
    centerId: "center2",
  },
  {
    id: "service6",
    name: "Eyebrow Threading",
    duration: 30,
    price: 25,
    description: "Perfect your brows with our expert threading service.",
    centerId: "center2",
  },
];

// Mock bookings data (initially empty)
const bookings: Booking[] = [];
const customers: Customer[] = [];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API functions
export const api = {
  // Get a center by ID
  getCenter: async (centerId: string): Promise<Center | null> => {
    await delay(1500); // Artificial delay of 1.5 seconds
    const center = centers.find((c) => c.id === centerId);
    return center || null;
  },

  // Get all centers
  getAllCenters: async (): Promise<Center[]> => {
    await delay(1500);
    return [...centers];
  },

  // Get services for a specific center
  getServicesByCenter: async (centerId: string): Promise<Service[]> => {
    await delay(1500);
    return services.filter((service) => service.centerId === centerId);
  },

  // Create a new booking
  createBooking: async (
    name: string,
    email: string,
    serviceId: string,
    date: string,
    time: string
  ): Promise<Booking> => {
    await delay(1500);

    // Check if customer exists, if not create a new one
    let customer = customers.find((c) => c.email === email);
    if (!customer) {
      customer = {
        id: `customer${customers.length + 1}`,
        name,
        email,
      };
      customers.push(customer);
    }

    // Create new booking
    const booking: Booking = {
      id: `booking${bookings.length + 1}`,
      customerId: customer.id,
      serviceId,
      date,
      time,
      status: "confirmed",
    };

    bookings.push(booking);
    return booking;
  },

  // Get booking details
  getBooking: async (bookingId: string): Promise<Booking | null> => {
    await delay(1500);
    const booking = bookings.find((b) => b.id === bookingId);
    return booking || null;
  },

  // Get a service by ID
  getService: async (serviceId: string): Promise<Service | null> => {
    await delay(1500);
    const service = services.find((s) => s.id === serviceId);
    return service || null;
  },
};
