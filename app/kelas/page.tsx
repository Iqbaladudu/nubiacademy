import { Navbar } from "@/components/layout/navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { KelasCard } from "@/components/ui/kelasCard";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";

interface LevelType {
  label: string;
  name: string;
  id: number;
}

interface CategoryType {
  label: string;
  name: string;
  id: number;
}

const level: LevelType[] = [
  {
    label: "Pemula",
    name: "beginner",
    id: 1,
  },
  {
    label: "Menengah",
    name: "intermediate",
    id: 2,
  },
  {
    label: "Tingkat lanjut",
    name: "advanced",
    id: 3,
  },
];

const categories: CategoryType[] = [
  {
    id: 1,
    name: "pemrograman",
    label: "Pemrograman & Pengembangan Perangkat Lunak",
  },
  {
    name: "desain",
    label: "Desain Grafis & UI/UX",
    id: 2,
  },
  {
    id: 3,
    name: "bisnis",
    label: "Keterampilan Bisnis & Manajemen",
  },
  {
    id: 4,
    name: "marketing",
    label: "Pemasaran Digital & Media Sosial",
  },
  {
    id: 5,
    name: "data-science",
    label: "Ilmu Data & Analitik",
  },
  {
    id: 6,
    name: "jaringan",
    label: "Keamanan Jaringan & Infrastruktur TI",
  },
  {
    id: 7,
    name: "bahasa",
    label: "Kursus Bahasa Asing",
  },
];

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
