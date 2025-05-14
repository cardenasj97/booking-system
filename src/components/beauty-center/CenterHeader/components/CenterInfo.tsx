import { Center } from "@/types";

interface CenterInfoProps {
  center: Center;
}

export default function CenterInfo({ center }: CenterInfoProps) {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{center.name}</h1>
      <p className="text-lg text-gray-700 max-w-2xl">{center.description}</p>
    </div>
  );
}
