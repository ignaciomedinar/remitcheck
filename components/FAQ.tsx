"use client";

import { useState } from "react";

const faqs = [
  {
    pregunta: "¿Cómo sé si una plataforma de envío de dinero es segura?",
    respuesta:
      "Verifica que la plataforma esté regulada por una autoridad financiera oficial (como el Banco de España, FinCEN en EE.UU. o la FCA en Reino Unido). Busca el número de licencia en su web y contrástalo con el registro público del organismo regulador. Evita servicios sin regulación clara.",
  },
  {
    pregunta: "¿Qué datos personales debo proporcionar para enviar dinero?",
    respuesta:
      "Los servicios regulados están obligados a verificar tu identidad (proceso KYC). Necesitarás proporcionar un documento de identidad válido, tu dirección y, en algunos casos, el origen de los fondos. Nunca envíes tus credenciales bancarias completas ni contraseñas a ningún servicio.",
  },
  {
    pregunta: "¿Es seguro usar mi tarjeta de crédito o débito para enviar dinero?",
    respuesta:
      "Sí, siempre que uses plataformas reguladas y con cifrado SSL (busca el candado en la barra del navegador). Las tarjetas ofrecen protección adicional frente a fraudes. Evita realizar transferencias desde redes Wi-Fi públicas y activa las notificaciones de tu banco para detectar movimientos sospechosos.",
  },
  {
    pregunta: "¿Qué hago si mi envío no llega al destinatario?",
    respuesta:
      "Guarda siempre el comprobante de la transacción con el número de referencia. Contacta al servicio de atención al cliente de la plataforma y facilita ese número. Si no recibes respuesta en el plazo indicado, puedes reclamar ante el organismo regulador de tu país.",
  },
  {
    pregunta: "¿Cómo evito las estafas al enviar dinero al extranjero?",
    respuesta:
      "Desconfía de tasas de cambio excesivamente buenas o de plataformas que solo aceptan pagos en criptomonedas o tarjetas de regalo. Nunca envíes dinero a personas desconocidas. Usa siempre plataformas reconocidas y compara las condiciones antes de transferir.",
  },
  {
    pregunta: "¿Hay límites en la cantidad de dinero que puedo enviar?",
    respuesta:
      "Sí. Cada plataforma y cada país tiene sus propios límites, tanto diarios como por transacción. Además, las regulaciones antilavado de dinero exigen declarar envíos que superen ciertos umbrales (por ejemplo, 10.000 € en la UE). Consulta los límites específicos en el servicio que elijas.",
  },
];

export default function FAQ() {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto mt-14 mb-8 px-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Preguntas Frecuentes
      </h2>
      <p className="text-center text-sm text-gray-500 mb-8">
        Todo lo que necesitas saber para enviar dinero de forma segura
      </p>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => setAbierto(abierto === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <span>{faq.pregunta}</span>
              <span className="ml-4 flex-shrink-0 text-gray-400 text-base">
                {abierto === i ? "−" : "+"}
              </span>
            </button>
            {abierto === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {faq.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
