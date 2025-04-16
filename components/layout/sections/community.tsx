"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Animation variants for smooth fade and scale effects
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
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

const scalePulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const arrowHover = {
  rest: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  hover: { x: 8, transition: { duration: 0.3, ease: "easeInOut" } },
};

export const CTABannerSection = () => {
  return (
    <section
      id="cta-banner"
      className="container w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 bg-background/95 relative overflow-hidden"
    >
      {/* Decorative Background Element with Subtle Gradient */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[70%] md:w-[60%] h-48 sm:h-64 md:h-80 bg-gradient-to-r from-[#D247BF]/10 to-primary/10 rounded-full blur-3xl opacity-40 z-0"
        variants={scalePulse}
        animate="animate"
      />

      {/* Content */}
      <motion.div
        className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto text-center relative z-10"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8"
        >
          Mulai Perjalanan Belajar Anda di{" "}
          <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            Nubi Academy
          </span>{" "}
          Sekarang
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-6 sm:mb-8 md:mb-10"
        >
          Tingkatkan keterampilan Anda dan raih masa depan yang lebih cerah
          bersama komunitas kami.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          whileHover="hover"
          initial="rest"
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8"
        >
          <Button
            asChild
            className="min-w-[180px] sm:min-w-[200px] md:min-w-[240px] h-12 sm:h-14 md:h-16 font-bold text-base sm:text-lg md:text-xl rounded-lg bg-gradient-to-r from-[#D247BF] to-primary hover:from-[#D247BF]/90 hover:to-primary/90 transition-all duration-400 shadow-md hover:shadow-lg hover:scale-[1.05] ease-in-out relative overflow-hidden text-white dark:text-white"
          >
            <a href="/daftar">
              <span className="relative z-10">Daftar Sekarang</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-[45deg] w-1/3 opacity-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="min-w-[180px] sm:min-w-[200px] md:min-w-[240px] h-12 sm:h-14 md:h-16 font-bold text-base sm:text-lg md:text-xl rounded-lg border-[#D247BF]/30 text-[#D247BF] hover:bg-[#D247BF]/5 hover:border-[#D247BF]/40 hover:scale-[1.05] transition-all duration-400 dark:border-primary/30 dark:text-primary dark:hover:bg-primary/5"
          >
            <a href="/kelas">
              <motion.div
                variants={arrowHover}
                className="flex items-center justify-center"
              >
                <span className="mr-2">Lihat Kelas</span>
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
