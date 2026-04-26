export interface Country {
  id: string;
  slug: string;
  nombre: string;
  moneda: string;
  simbolo: string;
  bandera: string;
}

export const countries: Country[] = [
  { id: "es", slug: "espana",    nombre: "España",    moneda: "EUR", simbolo: "€",   bandera: "🇪🇸" },
  { id: "us", slug: "usa",       nombre: "USA",       moneda: "USD", simbolo: "$",   bandera: "🇺🇸" },
  { id: "ca", slug: "canada",    nombre: "Canadá",    moneda: "CAD", simbolo: "C$",  bandera: "🇨🇦" },
  { id: "ch", slug: "suiza",     nombre: "Suiza",     moneda: "CHF", simbolo: "Fr",  bandera: "🇨🇭" },
  { id: "gb", slug: "uk",        nombre: "UK",        moneda: "GBP", simbolo: "£",   bandera: "🇬🇧" },
  { id: "mx", slug: "mexico",    nombre: "México",    moneda: "MXN", simbolo: "$",   bandera: "🇲🇽" },
  { id: "co", slug: "colombia",  nombre: "Colombia",  moneda: "COP", simbolo: "$",   bandera: "🇨🇴" },
  { id: "ar", slug: "argentina", nombre: "Argentina", moneda: "ARS", simbolo: "$",   bandera: "🇦🇷" },
  { id: "ec", slug: "ecuador",   nombre: "Ecuador",            moneda: "USD", simbolo: "$",   bandera: "🇪🇨" },
  { id: "ve", slug: "venezuela", nombre: "Venezuela",           moneda: "VES", simbolo: "Bs.", bandera: "🇻🇪" },
  { id: "pe", slug: "peru",      nombre: "Perú",               moneda: "PEN", simbolo: "S/", bandera: "🇵🇪" },
  { id: "cl", slug: "chile",     nombre: "Chile",              moneda: "CLP", simbolo: "$",   bandera: "🇨🇱" },
  { id: "do", slug: "dominicana", nombre: "Rep. Dominicana",   moneda: "DOP", simbolo: "RD$", bandera: "🇩🇴" },
];
