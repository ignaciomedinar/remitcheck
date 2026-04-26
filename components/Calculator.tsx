"use client";

import { useState, useEffect, useCallback } from "react";
import { countries, Country } from "@/config/countries";
import ComparisonTable from "@/components/ComparisonTable";
import { fmtNum } from "@/lib/fmt";

function CountrySelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Country;
  onChange: (c: Country) => void;
}) {
  function findCountry(id: string): Country {
    return countries.find((c) => c.id === id) ?? countries[0];
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
      <div className="relative">
        <select
          value={value.id}
          onChange={(e) => onChange(findCountry(e.target.value))}
          className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 pr-9 text-gray-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.bandera}  {c.nombre} ({c.moneda})
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
      </div>
    </div>
  );
}

interface CalculatorProps {
  initialOrigenId?: string;
  initialDestinoId?: string;
}

export default function Calculator({ initialOrigenId, initialDestinoId }: CalculatorProps = {}) {
  const [origen, setOrigen] = useState<Country>(
    countries.find((c) => c.id === initialOrigenId) ?? countries[0]
  );
  const [destino, setDestino] = useState<Country>(
    countries.find((c) => c.id === initialDestinoId) ?? countries[1]
  );
  const [monto, setMonto] = useState<string>("");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRate = useCallback(async () => {
    if (origen.moneda === destino.moneda) {
      setRate(1);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/exchange?base=${origen.moneda}&target=${destino.moneda}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error desconocido");
      setRate(data.rate);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al obtener la tasa");
      setRate(null);
    } finally {
      setLoading(false);
    }
  }, [origen.moneda, destino.moneda]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  function handleMontoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) setMonto(value);
  }

  const montoNum = parseFloat(monto) || 0;

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] lg:gap-6 lg:items-start gap-4">

      {/* ── LEFT: inputs only ── */}
      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Configura tu envío</h2>

        <div className="space-y-3.5">
          {/* Amount input */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Monto a enviar
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3 py-2.5 bg-gray-50 text-gray-500 text-sm border-r border-gray-200 select-none whitespace-nowrap">
                {origen.simbolo} {origen.moneda}
              </span>
              <input
                type="text"
                inputMode="decimal"
                placeholder={fmtNum(0)}
                value={monto}
                onChange={handleMontoChange}
                className="flex-1 px-3 py-2.5 text-gray-800 outline-none text-sm min-w-0 tabular-nums"
              />
            </div>
          </div>

          <CountrySelect label="País de origen" value={origen} onChange={setOrigen} />
          <CountrySelect label="País de destino" value={destino} onChange={setDestino} />

          {/* Live rate pill */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-0.5">
            <span>Tasa interbancaria</span>
            {loading ? (
              <span className="animate-pulse">Cargando...</span>
            ) : error ? (
              <span className="text-red-400">{error}</span>
            ) : rate !== null ? (
              <span className="font-medium text-gray-600 tabular-nums">
                1 {origen.moneda} = {fmtNum(rate, 4)} {destino.moneda}
              </span>
            ) : null}
          </div>

          <p className="text-center text-xs text-gray-400 pt-0.5">
            Comparamos las mejores tasas del mercado en tiempo real para ti.
          </p>
        </div>
      </div>

      {/* ── RIGHT: comparison table (always mounted when rate is ready) ── */}
      {rate !== null && !loading ? (
        <ComparisonTable
          monto={montoNum}
          rate={rate}
          origen={origen}
          destino={destino}
          className="lg:sticky lg:top-6"
        />
      ) : (
        <div className="hidden lg:flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 h-48 text-sm text-gray-400">
          {loading ? "Cargando tasas…" : "Selecciona los países para ver la comparativa"}
        </div>
      )}
    </div>
  );
}
