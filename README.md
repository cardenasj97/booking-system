You can find the live demo in the following link: https://booking-system-seven-iota.vercel.app/

# Multi-tenant Beauty Center Booking System

A Next.js application for beauty centers to showcase their services and allow clients to book appointments.

## Features

- Center landing pages with custom URLs (/center1, /center2, etc.)
- Display of center information
- Service listings with details
- Booking form with validation
- Confirmation page with booking details
- Responsive design for mobile and desktop

## Tech Stack

- **Next.js** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **React** hooks for state management
- **Mock API** for simulating backend requests with a 1.5-second delay

## Instructions to run the project locally

1. Clone the repository:
   ```bash
   git clone https://github.com/cardenasj97/booking-system.git
   cd booking-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Application Structure

- `/src/app`: Next.js app router pages
- `/src/components`: Reusable React components
- `/src/services`: API and other services
- `/src/types`: TypeScript type definitions

## Technical Decisions

### State Management

Using React's built-in hooks (useState, useEffect) for state management since the application is relatively small and doesn't require complex state management solutions like Redux.

### API Layer

Created a mock API service with artificial delay to simulate real-world API calls. In a production environment, this would be replaced with actual API endpoints.

### Form Validation

Implemented client-side validation in the booking form to ensure data quality before submission.

### Error Handling

Added error states and loading indicators to improve user experience during API calls.

## Assumptions

- Beauty centers and their services are predefined in the mock API
- Users can only book one service at a time
- Basic form validation is sufficient for the MVP
- No authentication is required for booking

## Features to be implemented with more time

- User authentication for managing bookings
- Admin interface for beauty centers to manage services and bookings
- Calendar integration for appointment scheduling
- Email notifications for booking confirmations
- Payment processing for online payments
- Availability checking to prevent double bookings
- Reviews and ratings for services and centers

## Time Invested

Approximately 2 hours and 20 minutes spent on this project.

## AI Tools Used

For this application I used Cursor IDE.

Pros:

- Good for initial implementation.
- Good for doing adjustments.

Cons:

- It's not perfect, so I had to do some manual adjustments, and run a manual QA of the application with each change applied.
