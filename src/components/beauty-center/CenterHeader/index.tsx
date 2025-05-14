import { Center } from "@/types";
import CenterLogo from "./components/CenterLogo";
import CenterInfo from "./components/CenterInfo";

interface CenterHeaderProps {
  center: Center;
}

export default function CenterHeader({ center }: CenterHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-sm mb-10">
      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto">
        <CenterLogo center={center} />
        <CenterInfo center={center} />
      </div>
    </div>
  );
}
