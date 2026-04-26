"use client";

import { useMemo } from "react";
import { Country } from "@/config/countries";
import { fmtNum } from "@/lib/fmt";
import { PARTNER_LINKS } from "@/config/affiliates";
import { trackAffiliateClick } from "@/lib/analytics";

interface Props {
  monto: number;
  rate: number;
  origen: Country;
  destino: Country;
  className?: string;
}

interface Provider {
  name: string;
  tagline: string;
  bg: string;
  fg: string;
  effectiveRate: (midRate: number) => number;
  fee: (amount: number) => number;
}


const PROVIDERS: Provider[] = [
  {
    name: "Wise",
    tagline: "Sin margen de divisas",
    bg: "#00B9FF",
    fg: "#ffffff",
    effectiveRate: (r) => r,
    fee: (a) => a * 0.005 + 0.8,
  },
  {
    name: "Revolut",
    tagline: "Tasa real · +0,5% fines semana",
    bg: "#191C1F",
    fg: "#ffffff",
    effectiveRate: (r) => r,
    fee: (a) => a * 0.005,
  },
  {
    name: "Remitly",
    tagline: "Sin comisión · oferta nuevo cliente",
    bg: "#E8344E",
    fg: "#ffffff",
    effectiveRate: (r) => r * (1 - 0.015),
    fee: () => 0,
  },
  {
    name: "MoneyGram",
    tagline: "Margen 1,5% en tasa",
    bg: "#F26524",
    fg: "#ffffff",
    effectiveRate: (r) => r * (1 - 0.015),
    fee: () => 3.99,
  },
  {
    name: "Western Union",
    tagline: "Margen 2,5% en tasa",
    bg: "#FFCC00",
    fg: "#1a1a1a",
    effectiveRate: (r) => r * (1 - 0.025),
    fee: () => 2.9,
  },
];

interface Row {
  provider: Provider;
  effectiveRate: number;
  fee: number;
  received: number;
}

function ProviderBadge({ provider }: { provider: Provider }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-sm"
        style={{ backgroundColor: provider.bg, color: provider.fg }}
      >
        {provider.name[0]}
      </span>
      {/* word-break: break-word allows "Western Union" → "Western\nUnion" */}
      <p className="font-semibold text-gray-800 text-sm break-words leading-snug">
        {provider.name}
      </p>
    </div>
  );
}

function RankBadge({ rank, isBest }: { rank: number; isBest: boolean }) {
  if (isBest) {
    return (
      <span className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 whitespace-nowrap">
        Mejor opción
      </span>
    );
  }
  if (rank === 1) {
    return (
      <span className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap">
        2.ª opción
      </span>
    );
  }
  return null;
}

function SendButton({ href, partnerName }: { href: string; partnerName: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={() => trackAffiliateClick(partnerName)}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
    >
      Enviar ahora →
    </a>
  );
}

export default function ComparisonTable({ monto, rate, origen, destino, className = "" }: Props) {
  const rows: Row[] = useMemo(() => {
    const computed = PROVIDERS.map((p) => {
      const fee = p.fee(monto);
      const effectiveRate = p.effectiveRate(rate);
      const received = Math.max(0, (monto - fee) * effectiveRate);
      return { provider: p, effectiveRate, fee, received };
    });
    return computed.sort((a, b) => b.received - a.received);
  }, [monto, rate]);

  const minReceived = rows[rows.length - 1]?.received ?? 0;

  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden w-full ${className}`}>

      {/* Card header */}
      <div className="px-5 py-3.5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-700 text-sm">Resultados de la comparativa</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {monto > 0
            ? <>Enviando <span className="font-medium text-gray-600">{origen.simbolo}{fmtNum(monto)} {origen.moneda}</span> · ordenados de mejor a peor</>
            : "Introduce un monto para comparar proveedores"}
        </p>
      </div>

      {monto <= 0 ? (
        <div className="flex items-center justify-center h-48 text-sm text-gray-400">
          Esperando monto…
        </div>
      ) : (
        <>
          {/* ── DESKTOP: <table> garantiza alineación real entre cabecera y filas ── */}
          <div className="hidden sm:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide w-[38%]">
                    Proveedor
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Tasa
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Comisión
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Recibe
                  </th>
                  <th className="px-3 py-2 w-px" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const isBest = index === 0;
                  const saving = row.received - minReceived;
                  const affiliateHref = PARTNER_LINKS[row.provider.name] ?? "/";

                  return (
                    <tr
                      key={row.provider.name}
                      className={`border-b border-gray-100 last:border-0 transition-colors duration-150 ${
                        isBest ? "bg-green-50/70 hover:bg-green-100/60" : "hover:bg-indigo-50/50"
                      }`}
                    >
                      {/* Provider */}
                      <td className="px-4 py-3 align-top">
                        <div className="space-y-1">
                          <ProviderBadge provider={row.provider} />
                          <RankBadge rank={index} isBest={isBest} />
                        </div>
                      </td>

                      {/* Rate */}
                      <td className="px-3 py-3 text-right align-middle whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-700 tabular-nums">
                          {fmtNum(row.effectiveRate, 4)}
                        </p>
                        <p className="text-[10px] text-gray-400">{origen.moneda}/{destino.moneda}</p>
                      </td>

                      {/* Fee */}
                      <td className="px-3 py-3 text-right align-middle whitespace-nowrap">
                        {row.fee === 0 ? (
                          <p className="text-sm font-semibold text-green-600">Gratis</p>
                        ) : (
                          <p className="text-sm font-medium text-gray-700 tabular-nums">
                            {origen.simbolo}{fmtNum(row.fee)}
                          </p>
                        )}
                        <p className="text-[10px] text-gray-400">
                          {row.fee === 0 ? "sin cobro" : origen.moneda}
                        </p>
                      </td>

                      {/* Received */}
                      <td className="px-3 py-3 text-right align-middle whitespace-nowrap">
                        <p className={`text-sm font-bold tabular-nums ${isBest ? "text-green-600" : "text-gray-800"}`}>
                          {destino.simbolo}{fmtNum(row.received)}
                        </p>
                        <p className="text-[10px] text-gray-400">{destino.moneda}</p>
                        {isBest && saving > 0.01 && (
                          <p className="text-[10px] text-green-500 font-semibold">
                            +{destino.simbolo}{fmtNum(saving)} vs. peor
                          </p>
                        )}
                      </td>

                      <td className="px-3 py-3 align-middle w-px">
                        <SendButton href={affiliateHref} partnerName={row.provider.name} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── MOBILE: flex apilado ── */}
          <ul className="divide-y divide-gray-100 sm:hidden">
            {rows.map((row, index) => {
              const isBest = index === 0;
              const saving = row.received - minReceived;
              const affiliateHref = PARTNER_LINKS[row.provider.name] ?? "/";

              return (
                <li
                  key={row.provider.name}
                  className={`px-5 py-3 transition-colors duration-150 ${
                    isBest ? "bg-green-50/70 hover:bg-green-100/60" : "hover:bg-indigo-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <ProviderBadge provider={row.provider} />
                      <RankBadge rank={index} isBest={isBest} />
                      <p className="text-xs text-gray-400">{row.provider.tagline}</p>
                    </div>

                    <div className="text-right space-y-1.5 flex-shrink-0">
                      <div>
                        <p className={`text-base font-bold tabular-nums ${isBest ? "text-green-600" : "text-gray-800"}`}>
                          {destino.simbolo}{fmtNum(row.received)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {row.fee === 0
                            ? <span className="text-green-500">Sin comisión</span>
                            : `Com.: ${origen.simbolo}${fmtNum(row.fee)}`}
                        </p>
                        {isBest && saving > 0.01 && (
                          <p className="text-xs text-green-500 font-medium">
                            +{destino.simbolo}{fmtNum(saving)} vs. peor
                          </p>
                        )}
                      </div>
                      <SendButton href={affiliateHref} partnerName={row.provider.name} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* Footer legal */}
      <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] leading-relaxed text-gray-400">
          Tasas en tiempo real. Comisiones orientativas. Los enlaces pueden ser de afiliado.
          Verifica condiciones en cada plataforma antes de enviar.
        </p>
      </div>
    </div>
  );
}
