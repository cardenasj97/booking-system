import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-pink-600 cursor-pointer"
        >
          BeautyBook
        </Link>
        <nav>
          <Link
            href="/"
            className="text-gray-700 hover:text-pink-600 transition-colors cursor-pointer"
          >
            Beauty Centers
          </Link>
        </nav>
      </div>
    </header>
  );
}
