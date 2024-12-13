import { Navbar } from "@/components/layout/navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icn } from "@/components/ui/icn";
import { Label } from "@/components/ui/label";
import { dummyCourses } from "@/constant/dummy";
import { formatToK } from "@/util/numberToKFormatter";
import { Metadata } from "next";
import Image from "next/image";

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
      <main className="grid grid-cols-12 w-full px-14">
        <aside className="hidden col-span-2 lg:flex flex-col pr-5 gap-5 pt-20">
          <div>
            <p className="mb-3 font-semibold text-md">Level Pembelajaran</p>
            {level.map(({ label, name, id }) => (
              <div key={id} className="flex items-center mb-3 gap-2">
                <Checkbox id={name} />
                <Label
                  htmlFor={name}
                  className="text-muted-foreground font-normal"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-3 font-semibold text-md">Kategori</p>
            {categories.map(({ label, name, id }) => (
              <div key={id} className="flex items-stretch mb-3 gap-2">
                <Checkbox id={name} name={name} />
                <Label
                  htmlFor={name}
                  className=" text-muted-foreground font-normal"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </aside>
        <main className="col-span-12 lg:col-span-10">
          <div className="mt-10 mb-2 text-xl font-semi-bold">
            Kelas yang tersedia
          </div>
          <div className=" flex justify-start gap-4 w-full flex-wrap">
            {dummyCourses.map((data) => (
              <Card key={data.id} className="border shadow-none cursor-pointer">
                <CardHeader className="">
                  <div className="relative w-[250px] h-[170px] overflow-hidden">
                    <p className="absolute bottom-0 left-0 text-xs p-[0.5] bg-black bg-opacity-20 text-white">
                      {data.duration}
                    </p>
                    <img
                      src={data.imageUrl}
                      alt={data.title}
                      className="object-cover h-full w-full rounded-md"
                    />
                  </div>
                </CardHeader>
                <CardContent className="h-[4rem] max-w-[250px]">
                  <p>{data.title}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p>IDR {formatToK(data.price)}</p>
                  <div className="flex gap-1">
                    <Icn name="ArrowUpNarrowWide" size={20} color="black" />
                    <p>{data.level}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </main>
    </section>
  );
}
