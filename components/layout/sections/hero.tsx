"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Animation variants for a soft, smooth entrance
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

export const Hero = () => {
  return (
    <section className="container w-full px-4 sm:px-6 lg:px-8">
      <motion.div
        className="grid place-items-center max-w-screen-xl gap-6 sm:gap-8 mx-auto py-16 sm:py-20 md:py-24 lg:py-32"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-5 sm:space-y-7 md:space-y-8 max-w-2xl sm:max-w-3xl mx-auto">
          {/* Badge with soft gradient and animation */}
          <motion.div variants={fadeInUp}>
            <Badge
              variant="outline"
              className="text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4 bg-gradient-to-r from-[#D247BF]/10 to-primary/10 border-[#D247BF]/20 rounded-full shadow-sm"
            >
              <span className="mr-2 text-primary">
                <Badge>New</Badge>
              </span>
              <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text font-medium">
                The future is nearer!
              </span>
            </Badge>
          </motion.div>

          {/* Hero Title with responsive typography and soft gradient */}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-snug md:leading-normal tracking-tight"
          >
            Belajar di
            <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Nubi Academy
            </span>
            Sekarang
          </motion.h1>

          {/* Description with responsive text and subtle fade */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md sm:max-w-lg md:max-w-xl mx-auto leading-relaxed"
          >
            Menjadi diri sendiri dalam versi terbaik setiap hari
          </motion.p>

          {/* CTA Buttons with smooth hover effects and responsive layout */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8"
          >
            <Button
              asChild
              className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px] md:min-w-[220px] h-11 sm:h-12 md:h-14 font-bold text-sm sm:text-base rounded-lg bg-gradient-to-r from-[#D247BF] to-primary hover:from-[#D247BF]/90 hover:to-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] ease-in-out dark:text-white group/arrow"
            >
              <Link href={"/kelas"}>
                Buka Kelas
                <ArrowRight className="size-4 sm:size-5 ml-2 group-hover/arrow:translate-x-1.5 transition-transform duration-300 ease-in-out" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px] md:min-w-[220px] h-11 sm:h-12 md:h-14 font-bold text-sm sm:text-base rounded-lg border-[#D247BF]/30 hover:bg-[#D247BF]/10 hover:border-[#D247BF]/40 hover:scale-[1.03] transition-all duration-300 ease-in-out"
            >
              <Link href="/daftar">Daftar</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
