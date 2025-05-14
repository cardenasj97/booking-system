import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware handles some common requests that might be coming from development tools
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle /json/version and /json/list routes
  if (pathname.startsWith("/json/")) {
    // These seem to be coming from some development tooling
    // Return an empty JSON response with 200 status to prevent 404 messages
    return NextResponse.json({}, { status: 200 });
  }

  // Continue to the next middleware or route handler
  return NextResponse.next();
}
