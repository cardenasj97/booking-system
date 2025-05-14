export default function BookNowButton({ buttonText }: { buttonText: string }) {
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-center">
      <span className="text-white font-medium">{buttonText}</span>
    </div>
  );
}
