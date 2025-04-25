import { Navbar } from "@/components/layout/navbar";
import { KelasCard } from "@/components/ui/kelasCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelas | Nubi Academy",
};

export default function Kelas() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <section className="flex flex-col items-center w-full px-4 sm:px-8 py-8 md:py-12">
        <div className="w-full max-w-2xl text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight">
            Pilih Kelas Nubi Academy
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            Temukan kelas terbaik untuk meningkatkan skill kamu. Semua kelas
            didesain interaktif dan mudah dipahami.
          </p>
        </div>
        <main className="w-full max-w-6xl">
          <KelasCard />
        </main>
      </section>
    </div>
  );
}
