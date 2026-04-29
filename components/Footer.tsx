import Link from "next/link";

const links = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/metodologia",    label: "Metodología" },
  { href: "/privacidad",     label: "Privacidad" },
  { href: "/aviso-legal",    label: "Aviso legal" },
  { href: "/contacto",       label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#dce8f8] mt-16" style={{ backgroundColor: "#F0F6FF" }}>
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400 text-center sm:text-left">
          © {new Date().getFullYear()} RemitCheck · Comparador independiente de remesas · No somos una entidad de pago
        </p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
