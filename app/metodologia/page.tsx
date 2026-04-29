import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metodología | RemitCheck",
  description: "Cómo obtenemos las tasas de cambio en tiempo real y cómo calculamos lo que recibirá tu destinatario.",
};

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
        {n}
      </span>
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

export default function MetodologiaPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto space-y-10">

      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Metodología</h1>
        <p className="text-gray-500 text-lg">
          Cómo obtenemos los datos y cómo calculamos la comparativa.
        </p>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Origen de las tasas de cambio</h2>
        <p className="text-gray-600 leading-relaxed">
          RemitCheck obtiene la tasa interbancaria (mid-market rate) en tiempo real a través de
          la API de ExchangeRate-API, que agrega datos de múltiples fuentes de mercado y actualiza
          los tipos cada hora. Esta tasa es el punto de referencia neutral: la que utilizan los
          bancos entre sí y que ningún consumidor puede obtener directamente.
        </p>
        <p className="text-gray-600 leading-relaxed">
          A partir de esa tasa base, aplicamos los modelos de coste de cada proveedor para calcular
          cuánto recibirá exactamente el destinatario. Las tasas tienen una caducidad de caché de
          una hora para equilibrar la precisión con la velocidad de carga.
        </p>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Cómo calculamos cada proveedor</h2>
        <div className="space-y-5">
          <Step
            n={1}
            title="Tasa efectiva del proveedor"
            body="Cada proveedor aplica un margen sobre la tasa interbancaria. Wise aplica margen 0 (usa la tasa real); otros servicios aplican entre un 1 % y un 3 % de margen implícito. Calculamos la tasa efectiva multiplicando la tasa base por (1 − margen del proveedor)."
          />
          <Step
            n={2}
            title="Comisiones explícitas"
            body="Sumamos todas las comisiones fijas y variables del proveedor. Por ejemplo: Wise cobra una comisión fija de 0,80 € más el 0,5 % del monto. MoneyGram cobra 3,99 € fijos. Estas cifras se actualizan periódicamente revisando las tarifas publicadas por cada servicio."
          />
          <Step
            n={3}
            title="Cálculo de lo que recibe el destinatario"
            body="Aplicamos la fórmula: (monto enviado − comisión) × tasa efectiva = monto recibido. Este es el número más importante y el que usamos para ordenar los resultados de mejor a peor."
          />
          <Step
            n={4}
            title="Ordenación y presentación"
            body="Los proveedores se muestran siempre ordenados de mayor a menor monto recibido por el destinatario. Ningún acuerdo comercial altera este orden."
          />
        </div>
      </section>

      <section className="bg-blue-50 rounded-2xl px-8 py-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Limitaciones y disclaimer</h2>
        <p className="text-gray-600 leading-relaxed">
          Las comisiones de los proveedores pueden variar según el país del remitente, el método
          de pago (tarjeta vs. transferencia bancaria), el monto enviado y las ofertas promocionales
          vigentes. Los valores mostrados en RemitCheck son orientativos y se basan en las tarifas
          publicadas oficialmente por cada proveedor. Siempre verifica el coste final en la
          plataforma del proveedor antes de confirmar el envío.
        </p>
      </section>

    </main>
  );
}
