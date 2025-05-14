export default function Avatar({ initial }: { initial: string }) {
  return (
    <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span className="text-2xl font-bold text-pink-500">{initial}</span>
    </div>
  );
}
