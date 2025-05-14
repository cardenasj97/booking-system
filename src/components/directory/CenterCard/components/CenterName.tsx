export default function CenterName({ name }: { name: string }) {
  return (
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
      {name}
    </h2>
  );
}
