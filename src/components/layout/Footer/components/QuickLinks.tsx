import Link from "next/link";

interface QuickLink {
  href: string;
  label: string;
}

interface QuickLinksProps {
  links: QuickLink[];
  title?: string;
}

export default function QuickLinks({ links, title = "Quick Links" }: QuickLinksProps) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
