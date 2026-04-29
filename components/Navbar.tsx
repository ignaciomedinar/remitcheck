import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/metodologia",    label: "Metodología" },
  { href: "/contacto",       label: "Contacto" },
];

export default function Navbar() {
  return (
    <header className="w-full border-b border-[#dce8f8]" style={{ backgroundColor: "#F0F6FF" }}>
      <div className="max-w-5xl mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
          <Image
            src="/remitcheck_logo.svg"
            alt="RemitCheck - Comparador de remesas inteligente"
            width={400}
            height={100}
            priority
            className="h-24 w-auto"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
