import { Center } from "@/types";

interface CenterHeaderProps {
  center: Center;
}

export default function CenterHeader({ center }: CenterHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-sm mb-10">
      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto">
        <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 mb-6 md:mb-0 md:mr-10">
          {center.logo ? (
            <div className="w-full h-full rounded-full bg-white p-2 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-4xl font-bold">
                {center.name.charAt(0)}
              </div>
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-4xl font-bold shadow-md">
              {center.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{center.name}</h1>
          <p className="text-lg text-gray-700 max-w-2xl">{center.description}</p>
        </div>
      </div>
    </div>
  );
}
