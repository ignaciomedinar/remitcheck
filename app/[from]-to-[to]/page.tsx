import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { countries, Country } from "@/config/countries";

interface Params {
  from: string;
  to: string;
}

function findByMoneda(code: string): Country | undefined {
  return countries.find((c) => c.moneda.toLowerCase() === code.toLowerCase());
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const origen = findByMoneda(params.from);
  const destino = findByMoneda(params.to);
  if (!origen || !destino) return {};

  const title = `Best way to send ${origen.moneda} to ${destino.moneda} | RemitCheck`;
  const description = `Compare the best exchange rates to send ${origen.moneda} from ${origen.nombre} to ${destino.nombre}. Save up to 5% vs. banks — see live rates today.`;

  return { title, description };
}

export async function generateStaticParams(): Promise<Params[]> {
  const params: Params[] = [];
  const unique = Array.from(new Map(countries.map((c) => [c.moneda, c])).values());
  for (const a of unique) {
    for (const b of unique) {
      if (a.moneda !== b.moneda) {
        params.push({ from: a.moneda.toLowerCase(), to: b.moneda.toLowerCase() });
      }
    }
  }
  return params;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-blue-600">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function BenefitItem({ title, body }: { title: string; body: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5">{body}</p>
      </div>
    </li>
  );
}

export default function CurrencyPage({ params }: { params: Params }) {
  const origen = findByMoneda(params.from);
  const destino = findByMoneda(params.to);

  if (!origen || !destino) notFound();

  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto space-y-14">

      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 text-5xl">
          <span>{origen.bandera}</span>
          <span className="text-gray-300 text-3xl">→</span>
          <span>{destino.bandera}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Best way to send{" "}
          <span className="text-blue-600">{origen.moneda}</span>
          {" "}to{" "}
          <span className="text-blue-600">{destino.moneda}</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Compare live exchange rates for sending money from{" "}
          <strong>{origen.nombre}</strong> to <strong>{destino.nombre}</strong>{" "}
          and find out how much your recipient actually receives.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 grid grid-cols-3 gap-6 divide-x divide-gray-100">
        <Stat value="1–5%" label="Avg. bank markup" />
        <Stat value="3–24h" label="Transfer time" />
        <Stat value={`${origen.simbolo}0`} label="Our base fee" />
      </section>

      {/* Why use a comparator */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800">
          Why comparing rates saves you real money
        </h2>
        <p className="text-gray-600 leading-relaxed">
          When you send {origen.moneda} to {destino.moneda}, every provider applies a
          different exchange rate on top of the official mid-market rate. That hidden
          margin — often between 1 % and 5 % — is where banks and legacy services make
          most of their profit. On a transfer of {origen.simbolo}1,000, that difference can
          quietly cost you {origen.simbolo}10–{origen.simbolo}50 before a single fee is
          even charged.
        </p>
        <p className="text-gray-600 leading-relaxed">
          A comparator like RemitCheck strips away the marketing and shows you the number
          that matters: exactly how many {destino.moneda} arrive in {destino.nombre} after
          all costs. Because the best rate today may not be the best rate tomorrow —
          currency markets move 24/7 — checking before each transfer is the single
          highest-ROI habit any frequent sender can build.
        </p>
      </section>

      {/* Benefits */}
      <section className="bg-blue-50 rounded-2xl px-8 py-8 space-y-5">
        <h2 className="text-xl font-semibold text-gray-800">
          What RemitCheck checks for you
        </h2>
        <ul className="space-y-4">
          <BenefitItem
            title="Real mid-market rate"
            body={`We show the live ${origen.moneda}/${destino.moneda} interbank rate so you always know if a provider's markup is fair.`}
          />
          <BenefitItem
            title="Total cost transparency"
            body="Fixed fees, percentage fees and FX margin are added together — no surprises on the other end."
          />
          <BenefitItem
            title="Speed vs. cost trade-off"
            body="Some providers are cheap but slow. We flag transfer time alongside the rate so you can choose."
          />
          <BenefitItem
            title="1 % flat commission, nothing hidden"
            body="Our own service charges a flat 1 % on the converted amount. You see it before you confirm."
          />
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Ready to send {origen.bandera} {origen.moneda} → {destino.bandera} {destino.moneda}?
        </h2>
        <p className="text-gray-500 text-sm">
          Use the calculator below to see exactly what your recipient will receive today.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium px-8 py-3 rounded-xl text-sm"
        >
          Calculate now
        </a>
      </section>

    </main>
  );
}
