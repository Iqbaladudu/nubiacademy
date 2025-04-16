"use client";

import { Card } from "@/components/ui/card";
import "@devnomic/marquee/dist/index.css";
import { ReactMarques } from "react-marques";
import { motion } from "framer-motion";

// Define TypeScript interface for category data
interface CategoryProps {
  name: string;
}

// Category data for the first marquee
const categories1: CategoryProps[] = [
  { name: "Machine Learning" },
  { name: "Python" },
  { name: "Javascript" },
  { name: "Graphic Designer" },
  { name: "Logika" },
  { name: "Critical Thinking" },
  { name: "Bahasa Inggris" },
];

// Category data for the second marquee (reverse direction)
const categories2: CategoryProps[] = [
  { name: "Google Workspace" },
  { name: "Microsoft Excel" },
  { name: "Bahasa Arab" },
  { name: "Basic Life Skill" },
  { name: "Etika dan Moral" },
  { name: "Kecerdasan Buatan" },
  { name: "Prompt Engineering" },
];

// Animation variant for subtle hover and initial load effects
const cardHover = {
  rest: { scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.05, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
};

export const CategoriesMarquee = () => {
  return (
    <section
      id="categories"
      className="container w-full px-4 sm:px-6 lg:px-8 max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] mx-auto py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto space-y-4 sm:space-y-5 md:space-y-6">
        {/* First Marquee with smooth scrolling */}
        <ReactMarques
          fade={true}
          speed={50} // Adjusted for a smoother, slower scroll
          className="overflow-hidden"
          pauseOnHover={true} // Pause on hover for better interactivity
        >
          {categories1.map(({ name }) => (
            <motion.div
              key={name}
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="inline-block mx-2 sm:mx-3 md:mx-4"
            >
              <Card className="flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-xl font-medium w-24 sm:w-28 md:w-36 lg:w-48 h-20 sm:h-24 md:h-28 lg:h-32 bg-background/95 border-muted/30 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl">
                <p className="text-center px-2 sm:px-3 md:px-4 text-muted-foreground leading-snug">
                  {name}
                </p>
              </Card>
            </motion.div>
          ))}
        </ReactMarques>

        {/* Second Marquee with reverse direction */}
        <ReactMarques
          fade={true}
          reverse={true}
          speed={50} // Consistent smooth scrolling speed
          className="overflow-hidden mt-4 sm:mt-5 md:mt-6"
          pauseOnHover={true} // Pause on hover for better UX
        >
          {categories2.map(({ name }) => (
            <motion.div
              key={name}
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="inline-block mx-2 sm:mx-3 md:mx-4"
            >
              <Card className="flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-xl font-medium w-24 sm:w-28 md:w-36 lg:w-48 h-20 sm:h-24 md:h-28 lg:h-32 bg-background/95 border-muted/30 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl">
                <p className="text-center px-2 sm:px-3 md:px-4 text-muted-foreground leading-snug">
                  {name}
                </p>
              </Card>
            </motion.div>
          ))}
        </ReactMarques>
      </div>
    </section>
  );
};
