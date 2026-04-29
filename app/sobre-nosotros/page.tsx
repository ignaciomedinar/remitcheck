import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros | RemitCheck",
  description: "Somos un comparador independiente de remesas que pone la transparencia por delante. Conoce nuestra misión y cómo trabajamos.",
};

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto space-y-10">

      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Sobre RemitCheck</h1>
        <p className="text-gray-500 text-lg">
          Un comparador independiente creado para que enviar dinero sea justo y transparente.
        </p>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Nuestra misión</h2>
        <p className="text-gray-600 leading-relaxed">
          RemitCheck nació con una convicción: las personas que envían dinero a sus familias merecen
          saber exactamente cuánto llegará al destino antes de confirmar la transferencia. Durante
          años, los bancos tradicionales y algunos servicios de remesas han ocultado sus beneficios
          en márgenes de tipo de cambio difíciles de detectar. Nosotros ponemos esa información
          en primer plano.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Comparamos en tiempo real las tasas de cambio y comisiones de los principales proveedores
          del mercado — Wise, Revolut, Remitly, MoneyGram y Western Union — para que puedas tomar
          la decisión más informada posible en cada envío.
        </p>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Independencia y transparencia</h2>
        <p className="text-gray-600 leading-relaxed">
          RemitCheck es un comparador independiente. No somos propiedad de ningún banco ni de
          ningún proveedor de remesas. Los resultados de la comparativa se ordenan siempre por
          la cantidad que recibe el destinatario, de mayor a menor, sin favorecer a ningún
          proveedor por acuerdos comerciales.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Somos transparentes sobre cómo nos financiamos: algunos de los enlaces a proveedores
          pueden generar una comisión de afiliado cuando completas un registro o un envío.
          Este modelo nos permite mantener el servicio gratuito para el usuario sin comprometer
          la objetividad del comparador.
        </p>
      </section>

      <section className="bg-blue-50 rounded-2xl px-8 py-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">¿A quién va dirigido?</h2>
        <p className="text-gray-600 leading-relaxed">
          RemitCheck está pensado para cualquier persona que envíe dinero al extranjero de forma
          habitual: familias de la diáspora latinoamericana en España, Europa o Norteamérica,
          autónomos con pagos internacionales, estudiantes en el exterior y cualquiera que quiera
          asegurarse de que cada euro, dólar o libra que envía llega íntegro a su destino.
        </p>
      </section>

    </main>
  );
}
