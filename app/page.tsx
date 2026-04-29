import Calculator from "@/components/Calculator";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="flex items-start justify-center">
        <Calculator />
      </div>
      <Partners />
      <FAQ />
    </main>
  );
}
