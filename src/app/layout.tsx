import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beauty Centers Booking System",
  description: "Book beauty services at your favorite beauty centers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-pink-600">
              BeautyBook
            </Link>
            <nav>
              <Link
                href="/"
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                Beauty Centers
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">BeautyBook</h3>
                <p className="text-gray-400">
                  The easiest way to book beauty services at your favorite
                  centers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/center1"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Bella Beauty Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/center2"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Glow Spa & Salon
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                <p className="text-gray-400">
                  Email: info@beautybook.com
                  <br />
                  Phone: (123) 456-7890
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} BeautyBook. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
