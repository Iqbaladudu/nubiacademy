import { Navbar } from "@/components/layout/navbar";
import { KelasCard } from "@/components/ui/kelasCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelas | Nubi Academy",
};

export default function Kelas() {
  return (
    <section className="flex flex-col items-center z-0">
      <Navbar />
      <main className="w-[100%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto">
        <KelasCard />
      </main>
    </section>
  );
}
