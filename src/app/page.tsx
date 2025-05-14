"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Center } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CenterCard from "@/components/directory/CenterCard";
import Header from "@/components/directory/Header";

export default function Home() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setIsLoading(true);
        const centersData = await api.getAllCenters();
        setCenters(centersData);
        setError(null);
      } catch (err) {
        console.error("Error fetching centers:", err);
        setError("Failed to load beauty centers. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCenters();
  }, []);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Header />

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-600 text-center max-w-md mx-auto">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centers.map((center) => (
              <CenterCard key={center.id} center={center} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
