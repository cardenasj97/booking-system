interface CopyrightProps {
  companyName: string;
}

export default function Copyright({ companyName }: CopyrightProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
      </p>
    </div>
  );
}
