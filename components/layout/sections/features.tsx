import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icn } from "@/components/ui/icn";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "SquareLibrary",
    title: "Sumber Belajar yang Beragam",
    description:
      "Nikmati beragam sumber belajar yang tersedia untuk menunjang pembelajaran kamu",
  },
  {
    icon: "PencilRuler",
    title: "Belajar Teori & Praktek",
    description:
      "Kami menggabungkan pembelajaran teori dan praktek untuk memastikan kamu mengerti fondasi dan tekniknya",
  },
  {
    icon: "Group",
    title: "Dukungan Pasca-Pembelajaran",
    description:
      "Nikmati dukungan upgrading setelah pembelajaran, bertumbuh & berkembang bersama komunitas kami",
  },
  {
    icon: "ShieldCheck",
    title: "Sertifikat Apresiasi",
    description:
      "Dapatkan sertifikat pembelajaran sebagai apresiasi untukmu yang telah menyelesaikan proses belajar dan ujian akhir",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container w-[75%] py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        MULAI DARI LANGKAH KECIL
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Belajar Skill Abad Ini
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        <span className="font-bold text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
          Nubi Academy
        </span>{" "}
        hadir untuk membantu kamu upgrade diri
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center px-0">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icn
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle className="text-center">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
