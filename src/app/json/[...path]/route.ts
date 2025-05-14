import { NextResponse } from "next/server";

// Handle GET request for /json/* routes
export async function GET() {
  // Return an empty response with 200 status
  return NextResponse.json({}, { status: 200 });
}
