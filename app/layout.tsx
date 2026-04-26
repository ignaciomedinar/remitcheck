import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "RemitCheck",
  description: "RemitCheck App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen" style={{ backgroundColor: "#F0F6FF" }}>
        <Navbar />
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
