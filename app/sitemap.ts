import type { MetadataRoute } from "next";
import { countries } from "@/config/countries";

const BASE_URL = "https://remitcheck.io";

// Priority corridors: high-volume remittance routes listed first
const PRIORITY_PAIRS: [string, string][] = [
  ["es", "mx"], ["es", "co"], ["es", "ar"], ["es", "ve"], ["es", "ec"],
  ["us", "mx"], ["us", "co"], ["us", "ar"], ["us", "ve"], ["us", "ec"],
  ["gb", "mx"], ["gb", "co"], ["gb", "ar"],
  ["ca", "mx"], ["ca", "co"],
  ["ch", "mx"], ["ch", "co"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  const prioritySet = new Set(PRIORITY_PAIRS.map(([a, b]) => `${a}-${b}`));

  const corridorRoutes: MetadataRoute.Sitemap = [];
  for (const a of countries) {
    for (const b of countries) {
      if (a.id === b.id) continue;
      const isPriority = prioritySet.has(`${a.id}-${b.id}`);
      corridorRoutes.push({
        url: `${BASE_URL}/enviar-dinero/${a.slug}-a-${b.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: isPriority ? 0.9 : 0.6,
      });
    }
  }

  return [...staticRoutes, ...corridorRoutes];
}
