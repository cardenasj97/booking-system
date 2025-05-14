import { Center } from "@/types";
import Link from "next/link";
import CenterName from "./components/CenterName";
import ViewServicesButton from "./components/ViewServicesButton";
import Avatar from "./components/Avatar";
import Description from "./components/Description";

interface CenterCardProps {
  center: Center;
  buttonText?: string;
  onCardClick?: (centerId: string) => void;
  className?: string;
}

export default function CenterCard({
  center,
  buttonText = "View Services",
  onCardClick,
  className = "",
}: CenterCardProps) {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(center.id);
    }
  };

  return (
    <Link
      href={`/${center.id}`}
      className={`block ${className}`}
      onClick={onCardClick ? handleClick : undefined}
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div className="p-6 flex-grow">
          <Avatar initial={center.name.charAt(0)} />
          <CenterName name={center.name} />
          <Description description={center.description} />
        </div>
        <ViewServicesButton buttonText={buttonText} />
      </div>
    </Link>
  );
}
