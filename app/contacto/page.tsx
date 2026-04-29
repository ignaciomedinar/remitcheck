"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  }

  return (
    <main className="min-h-screen px-4 py-16 max-w-xl mx-auto space-y-10">

      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Contacto</h1>
        <p className="text-gray-500 text-lg">
          ¿Tienes alguna pregunta, sugerencia o quieres colaborar con nosotros?
        </p>
      </section>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8">
        {sent ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto text-2xl">✓</div>
            <p className="text-xl font-semibold text-gray-800">¡Mensaje enviado!</p>
            <p className="text-gray-500 text-sm">
              Hemos recibido tu mensaje y te responderemos en menos de 48 horas en{" "}
              <a href="mailto:admin@remitcheck.io" className="text-blue-600 underline">
                admin@remitcheck.io
              </a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
              <input
                required
                type="text"
                placeholder="Tu nombre"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Correo electrónico</label>
              <input
                required
                type="email"
                placeholder="tu@email.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Mensaje</label>
              <textarea
                required
                rows={5}
                placeholder="¿En qué podemos ayudarte?"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition-colors text-white font-semibold py-3 rounded-xl text-sm"
            >
              {loading ? "Enviando…" : "Enviar mensaje"}
            </button>
            <p className="text-center text-xs text-gray-400">
              También puedes escribirnos directamente a{" "}
              <a href="mailto:admin@remitcheck.io" className="text-blue-500 underline">
                admin@remitcheck.io
              </a>
            </p>
          </form>
        )}
      </div>

    </main>
  );
}
