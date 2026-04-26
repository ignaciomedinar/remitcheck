import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { countries, Country } from "@/config/countries";
import Calculator from "@/components/Calculator";

interface Params {
  corridor: string; // e.g. "espana-a-mexico"
}

function parse(corridor: string): { origen: Country; destino: Country } | null {
  const idx = corridor.indexOf("-a-");
  if (idx === -1) return null;
  const fromSlug = corridor.slice(0, idx);
  const toSlug = corridor.slice(idx + 3);
  const origen = countries.find((c) => c.slug === fromSlug);
  const destino = countries.find((c) => c.slug === toSlug);
  if (!origen || !destino || origen.id === destino.id) return null;
  return { origen, destino };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const result = parse(params.corridor);
  if (!result) return {};
  const { origen, destino } = result;

  return {
    title: `La mejor forma de enviar dinero de ${origen.nombre} a ${destino.nombre} | RemitCheck`,
    description: `Compara tipos de cambio reales y ahorra comisiones enviando dinero a ${destino.nombre}. Mira cuánto recibes con Wise, Revolut y más.`,
    alternates: {
      canonical: `/enviar-dinero/${origen.slug}-a-${destino.slug}`,
    },
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const params: Params[] = [];
  for (const a of countries) {
    for (const b of countries) {
      if (a.id !== b.id) {
        params.push({ corridor: `${a.slug}-a-${b.slug}` });
      }
    }
  }
  return params;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-gray-800 mb-4">{children}</h2>;
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 leading-relaxed">{children}</p>;
}

export default function EnviarDineroPage({ params }: { params: Params }) {
  const result = parse(params.corridor);
  if (!result) notFound();
  const { origen, destino } = result;

  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto space-y-14">

      {/* ── Hero ── */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 text-5xl">
          <span>{origen.bandera}</span>
          <span className="text-gray-300 text-3xl">→</span>
          <span>{destino.bandera}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Enviar dinero de{" "}
          <span className="text-blue-600">{origen.nombre}</span>
          {" "}a{" "}
          <span className="text-blue-600">{destino.nombre}</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Compara tipos de cambio reales y comisiones entre los principales proveedores.
          Ve exactamente cuántos {destino.moneda} recibe tu destinatario antes de enviar.
        </p>
      </section>

      {/* ── Calculator pre-configured ── */}
      <section>
        <Calculator initialOrigenId={origen.id} initialDestinoId={destino.id} />
      </section>

      {/* ── SEO: Cómo enviar dinero ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 space-y-4">
        <SectionTitle>
          ¿Cómo enviar dinero de {origen.nombre} a {destino.nombre}?
        </SectionTitle>
        <Prose>
          Enviar dinero de {origen.nombre} a {destino.nombre} es más sencillo que nunca gracias a
          los servicios de transferencia en línea. Olvídate de hacer cola en el banco: plataformas
          como Wise, Revolut o Remitly te permiten enviar {origen.moneda} y que tu destinatario
          reciba {destino.moneda} en cuestión de minutos u horas.
        </Prose>
        <Prose>
          El proceso habitual es: (1) creas una cuenta en el proveedor elegido, (2) indicas el
          monto en {origen.moneda} y la cuenta bancaria del destinatario en {destino.nombre},
          (3) pagas mediante transferencia bancaria o tarjeta, y (4) el dinero llega en el plazo
          indicado. Comparar antes de enviar puede ahorrarte entre un 2 % y un 6 % respecto al
          banco tradicional.
        </Prose>
      </section>

      {/* ── SEO: Qué buscar en un proveedor ── */}
      <section className="space-y-4">
        <SectionTitle>¿Qué buscar en un proveedor de remesas?</SectionTitle>
        <ul className="space-y-3">
          {[
            {
              title: "Tasa de cambio real",
              body: `Exige que el proveedor use la tasa interbancaria (mid-market) o la más cercana posible al cambiar ${origen.moneda} a ${destino.moneda}. Un margen oculto del 2 % en ${origen.simbolo}1.000 equivale a ${origen.simbolo}20 extra de coste.`,
            },
            {
              title: "Comisiones transparentes",
              body: "Los mejores servicios muestran exactamente cuánto pagan de comisión antes de confirmar la operación, sin sorpresas al final del proceso.",
            },
            {
              title: "Velocidad de la transferencia",
              body: `Algunos corredores ${origen.moneda}→${destino.moneda} son instantáneos; otros tardan 1–3 días hábiles. Elige en función de si tu envío es urgente o puedes esperar a cambio de mejor tasa.`,
            },
            {
              title: "Seguridad y regulación",
              body: `Asegúrate de que el proveedor está regulado en ${origen.nombre} y en el país receptor. Wise, Revolut y Remitly cuentan con licencias en múltiples jurisdicciones.`,
            },
            {
              title: "Límites de envío",
              body: "Algunos servicios tienen límites diarios o mensuales. Si envías cantidades grandes regularmente, verifica que el proveedor acepta tu volumen sin trámites adicionales.",
            },
          ].map(({ title, body }) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
              <div>
                <p className="font-medium text-gray-800">{title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── SEO: Consejos de ahorro ── */}
      <section className="bg-blue-50 rounded-2xl px-8 py-8 space-y-4">
        <SectionTitle>
          Consejos para ahorrar en el cambio de {origen.moneda} a {destino.moneda}
        </SectionTitle>
        <Prose>
          El tipo de cambio {origen.moneda}/{destino.moneda} varía a lo largo del día y de la
          semana. Los mercados de divisas están cerrados los fines de semana, lo que provoca que
          algunos proveedores añadan un sobrecargo del 0,5 %–1 % los sábados y domingos. Si no
          tienes urgencia, envía entre lunes y viernes para obtener la tasa más ajustada.
        </Prose>
        <Prose>
          Agrupar envíos también ayuda: en lugar de hacer tres transferencias pequeñas al mes,
          consolida el monto en una sola operación. La mayoría de los servicios cobran una
          comisión fija más un porcentaje; cuanto mayor sea el envío, menor es el peso proporcional
          de la parte fija sobre el total.
        </Prose>
        <Prose>
          Por último, activa las alertas de tipo de cambio en la app del proveedor. Cuando el{" "}
          {origen.moneda}/{destino.moneda} suba a un nivel favorable, podrás enviar de inmediato y
          asegurar ese tipo antes de que cambie.
        </Prose>
      </section>

    </main>
  );
}
