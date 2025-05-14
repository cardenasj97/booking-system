interface BrandInfoProps {
  name: string;
  description: string;
}

export default function BrandInfo({ name, description }: BrandInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{name}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
