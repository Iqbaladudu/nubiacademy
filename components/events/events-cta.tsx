"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { Rocket, Star, Coffee } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function EventsCTA() {
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    controls.start(hovered ? "hover" : "rest");
  }, [hovered, controls]);

  const rocketVariants = {
    rest: { y: 0, rotate: 0 },
    hover: { y: -20, rotate: -45, transition: { duration: 0.3 } },
  };

  const smokeVariants = {
    rest: { opacity: 0, scale: 0 },
    hover: { opacity: [0.5, 0], scale: [1, 2], transition: { duration: 0.5 } },
  };

  const starVariants = {
    rest: { opacity: 0, scale: 0 },
    hover: { opacity: [1, 0], scale: [0, 1], transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20">
      <div className="navbar px-4 md:px-6">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-background border-primary/20 shadow-lg relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial="rest"
            animate={controls}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                variants={starVariants}
                custom={i}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transitionDelay: `${Math.random() * 0.3}s`,
                }}
              />
            ))}
          </motion.div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Tunggu apa lagi, daftar sekarang juga!
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Daftar sekarang juga dan dapatkan beragam benefit menarik!
              </p>
            </div>
            <motion.div
              className="relative"
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg group"
              >
                <span className="mr-2">Daftar sekarang</span>
                <motion.div className="relative" variants={rocketVariants}>
                  <Rocket className="h-6 w-6" />
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-4 h-4 bg-orange-500 rounded-full -z-10"
                    variants={smokeVariants}
                  />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
