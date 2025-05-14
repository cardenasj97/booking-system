import Link from "next/link";

interface ReturnButtonProps {
  centerId: string;
  onReturnClick: (e: React.MouseEvent) => void;
}

export default function ReturnButton({ centerId, onReturnClick }: ReturnButtonProps) {
  return (
    <div className="text-center">
      <Link href={`/${centerId}`} onClick={onReturnClick}>
        <button className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors duration-300">
          Return to Beauty Center
        </button>
      </Link>
    </div>
  );
}
