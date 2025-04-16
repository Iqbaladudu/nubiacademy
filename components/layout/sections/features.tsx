"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icn } from "@/components/ui/icn";
import { icons } from "lucide-react";
import { motion } from "framer-motion";

// Define TypeScript interface for feature data
interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

// Feature data array
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

// Animation variants for smooth fade and slide effects
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardHover = {
  rest: { scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.03, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
};

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="container w-full px-4 sm:px-6 lg:px-8 max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] mx-auto py-16 sm:py-20 md:py-24 lg:py-32"
    >
      {/* Header Section with Animation */}
      <motion.div
        className="text-center space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10 md:mb-12"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-base sm:text-lg md:text-xl text-primary tracking-wider"
        >
          MULAI DARI LANGKAH KECIL
        </motion.h2>

        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          Belajar Skill Abad Ini
        </motion.h2>

        <motion.h3
          variants={fadeInUp}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
        >
          <span className="font-bold text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            Nubi Academy
          </span>{" "}
          hadir untuk membantu kamu upgrade diri
        </motion.h3>
      </motion.div>

      {/* Features Grid with Responsive Layout */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        {featureList.map(({ icon, title, description }) => (
          <motion.div
            key={title}
            variants={fadeInUp}
            whileHover="hover"
            initial="rest"
            className="h-full"
          >
            <motion.div variants={cardHover}>
              <Card className="h-full bg-background/95 border-muted/30 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden">
                <CardHeader className="flex justify-center items-center pb-4 sm:pb-5 md:pb-6">
                  <div className="bg-primary/15 p-3 sm:p-4 md:p-5 rounded-full ring-8 sm:ring-10 md:ring-12 ring-primary/10 mb-3 sm:mb-4 md:mb-5">
                    <Icn
                      name={icon as keyof typeof icons}
                      size={20}
                      sm={22}
                      md={24}
                      lg={28}
                      color="hsl(var(--primary))"
                      className="text-primary"
                    />
                  </div>
                  <CardTitle className="text-center text-lg sm:text-xl md:text-2xl px-2 sm:px-3 md:px-4">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-center text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 pb-4 sm:pb-5 md:pb-6">
                  {description}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
