import { PARTNER_LINKS } from "@/config/affiliates";

const partners = [
  {
    name: "Wise",
    href: PARTNER_LINKS["Wise"],
    logo: (
      <svg viewBox="0 0 80 24" fill="currentColor" className="h-5 w-auto">
        <text
          x="0" y="19"
          fontFamily="Georgia, serif"
          fontSize="20"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          Wise
        </text>
      </svg>
    ),
  },
  {
    name: "Revolut",
    href: PARTNER_LINKS["Revolut"],
    logo: (
      <svg viewBox="0 0 110 24" fill="currentColor" className="h-5 w-auto">
        <text
          x="0" y="19"
          fontFamily="Arial, sans-serif"
          fontSize="18"
          fontWeight="900"
          letterSpacing="0.5"
        >
          REVOLUT
        </text>
      </svg>
    ),
  },
  {
    name: "Remitly",
    href: PARTNER_LINKS["Remitly"],
    logo: (
      <svg viewBox="0 0 110 24" fill="currentColor" className="h-5 w-auto">
        <text
          x="0" y="19"
          fontFamily="Arial, sans-serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="-0.3"
        >
          Remitly
        </text>
      </svg>
    ),
  },
  {
    name: "MoneyGram",
    href: PARTNER_LINKS["MoneyGram"],
    logo: (
      <svg viewBox="0 0 140 24" fill="currentColor" className="h-5 w-auto">
        <text
          x="0" y="19"
          fontFamily="Georgia, serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="-0.2"
        >
          MoneyGram
        </text>
      </svg>
    ),
  },
  {
    name: "Western Union",
    href: PARTNER_LINKS["Western Union"],
    logo: (
      <svg viewBox="0 0 175 24" fill="currentColor" className="h-5 w-auto">
        <text
          x="0" y="19"
          fontFamily="Arial, sans-serif"
          fontSize="16"
          fontWeight="800"
          letterSpacing="0.8"
        >
          WESTERN UNION
        </text>
      </svg>
    ),
  },
];

export default function Partners() {
  return (
    <section className="max-w-5xl mx-auto mt-12 mb-2 px-4">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-300 mb-6">
        Partners oficiales
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {partners.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            title={p.name}
            className="text-gray-300 hover:text-gray-600 transition-colors duration-200"
          >
            {p.logo}
          </a>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-100" />
    </section>
  );
}
