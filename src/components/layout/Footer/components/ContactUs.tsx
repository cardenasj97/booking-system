interface ContactInfo {
  email: string;
  phone: string;
}

interface ContactUsProps {
  contactInfo: ContactInfo;
  title?: string;
}

export default function ContactUs({ contactInfo, title = "Contact Us" }: ContactUsProps) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <p className="text-gray-400">
        Email: {contactInfo.email}
        <br />
        Phone: {contactInfo.phone}
      </p>
    </div>
  );
}
