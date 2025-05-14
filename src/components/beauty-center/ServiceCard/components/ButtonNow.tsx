interface ButtonNowProps {
  text?: string;
  onClick: () => void;
  className?: string;
  fullWidth?: boolean;
}

export default function ButtonNow({
  text = "Book Now",
  onClick,
  className = "",
  fullWidth = true,
}: ButtonNowProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {text}
    </button>
  );
}
