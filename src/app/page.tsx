"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/services/api";
import { Center } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Beauty Centers Directory
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Find your favorite beauty center and book services online
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-600 text-center max-w-md mx-auto">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centers.map((center) => (
              <Link key={center.id} href={`/${center.id}`} className="block">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-pink-500">
                        {center.name.charAt(0)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
                      {center.name}
                    </h2>
                    <p className="text-gray-700 text-center">
                      {center.description}
                    </p>
                  </div>
                  <div className="px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-center">
                    <span className="text-white font-medium">
                      View Services
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
