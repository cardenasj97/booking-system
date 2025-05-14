import BrandInfo from "./components/BrandInfo";
import QuickLinks from "./components/QuickLinks";
import ContactUs from "./components/ContactUs";
import Copyright from "./components/Copyright";

export default function Footer() {
  // Quick links data
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/center1", label: "Bella Beauty Center" },
    { href: "/center2", label: "Glow Spa & Salon" },
  ];

  // Contact information
  const contactInfo = {
    email: "info@beautybook.com",
    phone: "(123) 456-7890",
  };

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BrandInfo
            name="BeautyBook"
            description="The easiest way to book beauty services at your favorite centers."
          />

          <QuickLinks links={quickLinks} title="Quick Links" />

          <ContactUs contactInfo={contactInfo} title="Contact Us" />
        </div>

        <Copyright companyName="BeautyBook" />
      </div>
    </footer>
  );
}
