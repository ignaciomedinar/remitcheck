import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | RemitCheck",
  description: "Política de privacidad de RemitCheck conforme al Reglamento General de Protección de Datos (RGPD) y la LOPD-GDD.",
};

const LAST_UPDATE = "29 de abril de 2026";
const CONTACT_EMAIL = "admin@remitcheck.io";
const DOMAIN = "remitcheck.io";

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto space-y-8">

      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Política de Privacidad</h1>
        <p className="text-gray-400 text-sm">Última actualización: {LAST_UPDATE}</p>
      </section>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 space-y-8 text-gray-600 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos personales recabados a través del sitio web
            {" "}{DOMAIN} es RemitCheck, con dirección de contacto:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">2. Datos que recopilamos</h2>
          <p>RemitCheck recopila las siguientes categorías de datos:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Datos de uso y navegación:</strong> páginas visitadas, tiempo de permanencia, dispositivo y navegador, dirección IP (anonimizada).</li>
            <li><strong>Datos de analítica:</strong> a través de Google Analytics 4, que recopila datos agregados y anonimizados sobre el comportamiento de los usuarios.</li>
            <li><strong>Datos de contacto:</strong> nombre y correo electrónico si utilizas el formulario de contacto.</li>
          </ul>
          <p>
            RemitCheck no recopila datos financieros, números de cuenta bancaria ni información
            de pago. Somos un comparador y no procesamos transacciones.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">3. Finalidad y base jurídica</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Analítica web:</strong> interés legítimo del responsable para mejorar el servicio (art. 6.1.f RGPD).</li>
            <li><strong>Gestión de contacto:</strong> consentimiento del usuario al enviar el formulario (art. 6.1.a RGPD).</li>
            <li><strong>Cookies de terceros:</strong> consentimiento previo mediante el banner de cookies.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">4. Cookies</h2>
          <p>
            Este sitio utiliza cookies propias de sesión (necesarias para el funcionamiento) y
            cookies de terceros de analítica (Google Analytics 4). Google Analytics está
            configurado con anonimización de IP y sin almacenamiento de identificadores
            personales. Puedes gestionar tus preferencias de cookies en cualquier momento desde
            la configuración de tu navegador.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">5. Transferencias internacionales</h2>
          <p>
            Google Analytics transfiere datos a servidores de Google LLC en Estados Unidos.
            Google LLC está adherida al Marco de Privacidad de Datos UE-EE.UU. (Data Privacy
            Framework), lo que garantiza un nivel de protección adecuado conforme al RGPD.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">6. Conservación de datos</h2>
          <p>
            Los datos de analítica se conservan durante 14 meses en Google Analytics conforme
            a la configuración estándar. Los datos de contacto se conservan durante el tiempo
            necesario para gestionar la consulta y, como máximo, 12 meses.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">7. Tus derechos</h2>
          <p>
            Conforme al RGPD y a la LOPD-GDD, tienes derecho a acceder, rectificar, suprimir,
            oponerte al tratamiento, solicitar la limitación y la portabilidad de tus datos.
            Para ejercer cualquiera de estos derechos, escríbenos a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">{CONTACT_EMAIL}</a>.
            {" "}También tienes derecho a presentar una reclamación ante la Agencia Española de
            Protección de Datos (aepd.es).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">8. Cambios en esta política</h2>
          <p>
            RemitCheck se reserva el derecho de actualizar esta política. Los cambios
            significativos se notificarán mediante un aviso visible en el sitio web. La
            fecha de última actualización se indica al inicio de este documento.
          </p>
        </section>

      </div>
    </main>
  );
}
