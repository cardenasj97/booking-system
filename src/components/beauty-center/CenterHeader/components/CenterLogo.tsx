import { Center } from "@/types";

interface CenterLogoProps {
  center: Center;
}

export default function CenterLogo({ center }: CenterLogoProps) {
  return (
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
  );
}
