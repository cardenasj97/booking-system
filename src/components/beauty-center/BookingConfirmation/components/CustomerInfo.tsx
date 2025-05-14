interface CustomerInfoProps {
  name: string;
  email: string;
}

export default function CustomerInfo({ name, email }: CustomerInfoProps) {
  return (
    <div className="mb-1">
      <h3 className="font-semibold text-gray-700 mb-1">Customer</h3>
      <p className="text-gray-700">{name}</p>
      <p className="text-gray-700">{email}</p>
    </div>
  );
}
