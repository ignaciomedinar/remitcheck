import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | RemitCheck",
  description: "Aviso legal de RemitCheck conforme a la Ley de Servicios de la Sociedad de la Información (LSSI).",
};

const LAST_UPDATE = "29 de abril de 2026";
const CONTACT_EMAIL = "admin@remitcheck.io";
const DOMAIN = "remitcheck.io";

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto space-y-8">

      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Aviso Legal</h1>
        <p className="text-gray-400 text-sm">Última actualización: {LAST_UPDATE}</p>
      </section>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 space-y-8 text-gray-600 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">1. Identificación del titular</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
            Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el
            titular del sitio web {DOMAIN} puede ser contactado en:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">2. Objeto y actividad</h2>
          <p>
            RemitCheck es un servicio de comparación de tasas de cambio y comisiones de proveedores
            de transferencias internacionales de dinero. RemitCheck no es una entidad de pago, no
            está autorizada para prestar servicios de pago y no procesa ninguna transacción
            financiera. Somos exclusivamente un comparador informativo.
          </p>
          <p>
            Los proveedores listados en RemitCheck (Wise, Revolut, Remitly, MoneyGram, Western
            Union) son entidades reguladas e independientes. RemitCheck no asume responsabilidad
            por las condiciones, tarifas o funcionamiento de dichos proveedores.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">3. Carácter informativo y no financiero</h2>
          <p>
            La información publicada en RemitCheck tiene carácter meramente informativo y
            orientativo. No constituye asesoramiento financiero, inversión, ni recomendación
            de ningún tipo. Las tasas de cambio y comisiones mostradas son estimaciones basadas
            en datos de mercado y en las tarifas publicadas por los proveedores; pueden diferir
            de las condiciones finales aplicadas en cada transacción.
          </p>
          <p>
            El usuario debe verificar siempre las condiciones exactas directamente en la
            plataforma del proveedor antes de realizar cualquier envío.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">4. Propiedad intelectual</h2>
          <p>
            Todos los contenidos del sitio web {DOMAIN} — incluyendo textos, diseño, logotipos,
            código fuente e imágenes — son propiedad de RemitCheck o de sus legítimos titulares
            y están protegidos por las leyes de propiedad intelectual. Queda prohibida su
            reproducción, distribución o comunicación pública sin autorización expresa.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">5. Exclusión de responsabilidad</h2>
          <p>
            RemitCheck no garantiza la exactitud, integridad o actualización de la información
            publicada. En la medida en que lo permita la legislación aplicable, RemitCheck queda
            exento de cualquier responsabilidad derivada del uso de la información contenida en
            este sitio web, así como de los daños y perjuicios que pudieran derivarse del acceso
            o uso de los sitios web de terceros enlazados.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">6. Enlaces de afiliado</h2>
          <p>
            Algunos de los enlaces a proveedores en RemitCheck son enlaces de afiliado. Esto
            significa que RemitCheck puede recibir una compensación económica si el usuario
            completa un registro o una transacción a través de dichos enlaces. Esta compensación
            no influye en el orden de los resultados de la comparativa, que siempre se ordenan
            objetivamente por el mejor tipo de cambio para el usuario.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">7. Legislación aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para cualquier
            controversia derivada del uso de este sitio web, las partes se someten a los
            juzgados y tribunales españoles competentes, sin perjuicio de lo dispuesto en la
            normativa de protección de consumidores de la Unión Europea.
          </p>
        </section>

      </div>
    </main>
  );
}
