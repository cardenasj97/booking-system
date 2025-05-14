import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import CenterPage from "../page";
import { api } from "@/services/api";
import { showConfetti } from "@/utils/confetti";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useParams: jest.fn().mockReturnValue({ center: "test-center-id" }),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// Mock the API module
jest.mock("@/services/api", () => ({
  api: {
    getCenter: jest.fn(),
    getServicesByCenter: jest.fn(),
    createBooking: jest.fn(),
  },
}));

// Mock the confetti utility
jest.mock("@/utils/confetti", () => ({
  showConfetti: jest.fn(),
}));

// Sample data for testing
const mockCenter = {
  id: "test-center-id",
  name: "Test Beauty Center",
  description: "A test beauty center",
  address: "123 Test St",
  phone: "555-1234",
  email: "test@example.com",
};

const mockServices = [
  {
    id: "service-1",
    name: "Haircut",
    description: "Professional haircut",
    price: 50,
    duration: 60,
    centerId: "test-center-id",
  },
  {
    id: "service-2",
    name: "Manicure",
    description: "Nail care",
    price: 30,
    duration: 45,
    centerId: "test-center-id",
  },
];

// Element scrollIntoView mock
window.HTMLElement.prototype.scrollIntoView = jest.fn();
// window.scrollTo mock
window.scrollTo = jest.fn();
// setTimeout mock
jest.useFakeTimers();

describe("CenterPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default successful API responses
    (api.getCenter as jest.Mock).mockResolvedValue(mockCenter);
    (api.getServicesByCenter as jest.Mock).mockResolvedValue(mockServices);
    (api.createBooking as jest.Mock).mockResolvedValue({ id: "booking-1" });
  });

  it("should render loading state initially", async () => {
    render(<CenterPage />);
    // Look for the animate-spin class which is present on the loading spinner
    const spinnerElement = document.querySelector(".animate-spin");
    expect(spinnerElement).toBeInTheDocument();
  });

  it("should render center not found when center data is null", async () => {
    (api.getCenter as jest.Mock).mockResolvedValue(null);

    render(<CenterPage />);

    await waitFor(() => {
      expect(screen.getByText(/center not found/i)).toBeInTheDocument();
      expect(screen.getByText(/does not exist/i)).toBeInTheDocument();
    });
  });

  it("should render error message when API call fails", async () => {
    (api.getCenter as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<CenterPage />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(
        screen.getByText(/failed to load beauty center data/i)
      ).toBeInTheDocument();
    });
  });

  it("should render center details and services successfully", async () => {
    render(<CenterPage />);

    await waitFor(() => {
      // Check for center name in the header
      expect(screen.getByText("Test Beauty Center")).toBeInTheDocument();

      // Check for services
      expect(screen.getByText("Haircut")).toBeInTheDocument();
      expect(screen.getByText("Manicure")).toBeInTheDocument();
      expect(screen.getByText("Professional haircut")).toBeInTheDocument();
      expect(screen.getByText("Nail care")).toBeInTheDocument();

      // Check for "Book Now" buttons
      const bookButtons = screen.getAllByText("Book Now");
      expect(bookButtons.length).toBe(2);
    });
  });

  it("should show empty services message when no services are available", async () => {
    (api.getServicesByCenter as jest.Mock).mockResolvedValue([]);

    render(<CenterPage />);

    await waitFor(() => {
      expect(
        screen.getByText("No services available at this time.")
      ).toBeInTheDocument();
    });
  });

  it("should show booking form when a service is selected", async () => {
    render(<CenterPage />);

    await waitFor(() => {
      expect(screen.getByText("Haircut")).toBeInTheDocument();
    });

    // Click "Book Now" on a service
    const bookButtons = screen.getAllByText("Book Now");
    fireEvent.click(bookButtons[0]);

    await waitFor(() => {
      // Check booking form appears with the service name
      expect(screen.getByText(/book appointment/i)).toBeInTheDocument();
      expect(
        screen.getByText(/book haircut/i, { exact: false })
      ).toBeInTheDocument();
    });

    // Check if scrollIntoView was called after timeout
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(
      1
    );
  });

  it("should cancel booking and return to services view", async () => {
    render(<CenterPage />);

    await waitFor(() => {
      expect(screen.getByText("Haircut")).toBeInTheDocument();
    });

    // Click "Book Now" on a service
    const bookButtons = screen.getAllByText("Book Now");
    fireEvent.click(bookButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/book appointment/i)).toBeInTheDocument();
    });

    // Click cancel button
    fireEvent.click(screen.getByText(/cancel/i));

    // Should show services again
    await waitFor(() => {
      expect(screen.queryByText(/book appointment/i)).not.toBeInTheDocument();
      expect(screen.getByText("Our Services")).toBeInTheDocument();
      expect(screen.getByText("Haircut")).toBeInTheDocument();
    });
  });

  it("should submit booking form and show confirmation", async () => {
    render(<CenterPage />);

    await waitFor(() => {
      expect(screen.getByText("Haircut")).toBeInTheDocument();
    });

    // Click "Book Now" on a service
    const bookButtons = screen.getAllByText("Book Now");
    fireEvent.click(bookButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/book appointment/i)).toBeInTheDocument();
    });

    // Fill the form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const dateInput = screen.getByLabelText(/date/i);
    const timeInput = screen.getByLabelText(/time/i);

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(dateInput, { target: { value: "2030-01-01" } });
    fireEvent.change(timeInput, { target: { value: "14:00" } });

    // Submit booking form
    fireEvent.click(screen.getByText(/book appointment/i));

    // Should show confirmation
    await waitFor(() => {
      expect(
        screen.getByText(/booking confirmed/i, { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/haircut/i, { exact: false })
      ).toBeInTheDocument();
    });

    // Check if confetti was shown
    expect(showConfetti).toHaveBeenCalledTimes(1);
  });

  it("should handle booking submission error", async () => {
    (api.createBooking as jest.Mock).mockRejectedValue(
      new Error("Booking Error")
    );

    render(<CenterPage />);

    await waitFor(() => {
      expect(screen.getByText("Haircut")).toBeInTheDocument();
    });

    // Click "Book Now" on a service
    const bookButtons = screen.getAllByText("Book Now");
    fireEvent.click(bookButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/book appointment/i)).toBeInTheDocument();
    });

    // Fill the form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const dateInput = screen.getByLabelText(/date/i);
    const timeInput = screen.getByLabelText(/time/i);

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(dateInput, { target: { value: "2030-01-01" } });
    fireEvent.change(timeInput, { target: { value: "14:00" } });

    // Submit booking form
    fireEvent.click(screen.getByText(/book appointment/i));

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(
        screen.getByText("Failed to create your booking. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("should return to center from confirmation view", async () => {
    render(<CenterPage />);

    await waitFor(() => {
      expect(screen.getByText("Haircut")).toBeInTheDocument();
    });

    // Click "Book Now" on a service
    const bookButtons = screen.getAllByText("Book Now");
    fireEvent.click(bookButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/book appointment/i)).toBeInTheDocument();
    });

    // Fill the form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const dateInput = screen.getByLabelText(/date/i);
    const timeInput = screen.getByLabelText(/time/i);

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(dateInput, { target: { value: "2030-01-01" } });
    fireEvent.change(timeInput, { target: { value: "14:00" } });

    // Submit booking form
    fireEvent.click(screen.getByText(/book appointment/i));

    // Should show confirmation
    await waitFor(() => {
      expect(
        screen.getByText(/booking confirmed/i, { exact: false })
      ).toBeInTheDocument();
    });

    // Clear the mock state before our test
    (window.scrollTo as jest.Mock).mockClear();

    // Click the return button
    fireEvent.click(screen.getByText(/return to beauty center/i));

    // Should show services again
    await waitFor(() => {
      expect(
        screen.queryByText(/booking confirmed/i, { exact: false })
      ).not.toBeInTheDocument();
      expect(screen.getByText("Our Services")).toBeInTheDocument();
      expect(screen.getByText("Haircut")).toBeInTheDocument();
    });

    // Should scroll to top
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
