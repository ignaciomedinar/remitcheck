import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { countries, Country } from "@/config/countries";
import { corridorContent } from "@/data/corridorContent";
import Calculator from "@/components/Calculator";

interface Params {
  corridor: string;
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
    description: `Compara tipos de cambio reales y ahorra comisiones enviando dinero a ${destino.nombre}. Mira cuánto recibes con Wise, Revolut, Remitly y más.`,
    alternates: { canonical: `/enviar-dinero/${origen.slug}-a-${destino.slug}` },
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const params: Params[] = [];
  for (const a of countries) {
    for (const b of countries) {
      if (a.id !== b.id) params.push({ corridor: `${a.slug}-a-${b.slug}` });
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

function CheckItem({ title, body }: { title: string; body: string }) {
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

export default function EnviarDineroPage({ params }: { params: Params }) {
  const result = parse(params.corridor);
  if (!result) notFound();
  const { origen, destino } = result;

  const content = corridorContent[params.corridor];

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

      {/* ── Intro: specific or generic ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 space-y-4">
        <SectionTitle>
          ¿Cómo enviar dinero de {origen.nombre} a {destino.nombre}?
        </SectionTitle>
        {content ? (
          <>
            <Prose>{content.intro}</Prose>
            <Prose>{content.howTo}</Prose>
          </>
        ) : (
          <>
            <Prose>
              Enviar dinero de {origen.nombre} a {destino.nombre} es más sencillo que nunca gracias
              a los servicios de transferencia en línea. Plataformas como Wise, Revolut o Remitly
              te permiten enviar {origen.moneda} y que tu destinatario reciba {destino.moneda} en
              cuestión de minutos u horas, sin colas ni papeleo.
            </Prose>
            <Prose>
              El proceso es simple: (1) creas una cuenta en el proveedor elegido, (2) indicas el
              monto en {origen.moneda} y los datos bancarios del destinatario en {destino.nombre},
              (3) pagas con transferencia bancaria o tarjeta, y (4) el dinero llega en el plazo
              indicado. Comparar antes de enviar puede ahorrarte entre un 2 % y un 6 % frente al
              banco tradicional.
            </Prose>
          </>
        )}
      </section>

      {/* ── What to look for: specific or generic checklist ── */}
      <section className="space-y-4">
        <SectionTitle>¿Qué buscar en un proveedor de remesas?</SectionTitle>
        {content ? (
          <Prose>{content.whatToLook}</Prose>
        ) : null}
        <ul className="space-y-3 mt-4">
          <CheckItem
            title="Tasa de cambio real"
            body={`Exige la tasa interbancaria (mid-market) al cambiar ${origen.moneda} a ${destino.moneda}. Un margen oculto del 2 % en ${origen.simbolo}1.000 equivale a ${origen.simbolo}20 extra de coste.`}
          />
          <CheckItem
            title="Comisiones transparentes"
            body="Los mejores servicios muestran el coste total antes de confirmar, sin sorpresas al llegar al destino."
          />
          <CheckItem
            title="Velocidad de la transferencia"
            body={`Algunos corredores ${origen.moneda}→${destino.moneda} son instantáneos; otros tardan 1–3 días hábiles. Elige según tu urgencia.`}
          />
          <CheckItem
            title="Seguridad y regulación"
            body="Usa siempre proveedores regulados. Wise, Revolut y Remitly tienen licencias en múltiples jurisdicciones."
          />
        </ul>
      </section>

      {/* ── Tips: specific or generic ── */}
      <section className="bg-blue-50 rounded-2xl px-8 py-8 space-y-4">
        <SectionTitle>
          Consejos para ahorrar en el cambio de {origen.moneda} a {destino.moneda}
        </SectionTitle>
        {content ? (
          <Prose>{content.tips}</Prose>
        ) : (
          <>
            <Prose>
              El tipo de cambio {origen.moneda}/{destino.moneda} varía a lo largo del día y de la
              semana. Los mercados están cerrados los fines de semana y algunos proveedores añaden
              un sobrecargo del 0,5–1 %. Si no tienes urgencia, envía entre lunes y viernes.
            </Prose>
            <Prose>
              Agrupar envíos en una sola operación mensual reduce el impacto de las comisiones
              fijas. Y activar alertas de tipo de cambio en la app del proveedor te avisa cuando
              el {origen.moneda}/{destino.moneda} alcanza un nivel favorable.
            </Prose>
          </>
        )}
      </section>

    </main>
  );
}
