"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Star } from "lucide-react";

// Animation variants for smooth fade and scale effects
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

// Interface for course data
interface CourseProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string; // URL for course image
  rating: number;
  students: number;
}

// Sample data for featured courses
const featuredCourses: CourseProps[] = [
  {
    id: "1",
    title: "Machine Learning Dasar",
    description:
      "Pelajari konsep dasar machine learning dan aplikasinya dalam proyek nyata.",
    thumbnail: "/images/ml-course.jpg", // Replace with actual image path
    rating: 4.8,
    students: 1200,
  },
  {
    id: "2",
    title: "Pengembangan Web dengan JavaScript",
    description:
      "Kuasai JavaScript untuk membangun aplikasi web interaktif dan modern.",
    thumbnail: "/images/js-course.jpg", // Replace with actual image path
    rating: 4.7,
    students: 950,
  },
  {
    id: "3",
    title: "Desain Grafis untuk Pemula",
    description:
      "Mulai perjalanan desainmu dengan teknik dan alat desain grafis terkini.",
    thumbnail: "/images/design-course.jpg", // Replace with actual image path
    rating: 4.9,
    students: 800,
  },
];

export const FeaturedCoursesSection = () => {
  return (
    <section
      id="featured-courses"
      className="container w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/95"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Kursus{" "}
          <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            Unggulan Kami
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-2 sm:mt-4">
          Temukan kursus terbaik untuk meningkatkan keterampilan Anda di abad
          ini.
        </p>
      </motion.div>

      {/* Courses Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        {featuredCourses.map(
          ({ id, title, description, thumbnail, rating, students }) => (
            <motion.div
              key={id}
              variants={fadeInUp}
              whileHover="hover"
              initial="rest"
              className="h-full"
            >
              <motion.div variants={cardHover}>
                <Card className="h-full bg-background/95 border border-[#D247BF]/10 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
                  {/* Thumbnail */}
                  <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200 overflow-hidden relative">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 px-4 sm:px-5 md:px-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
                      {title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-4 sm:px-5 md:px-6 pb-3 sm:pb-4 md:pb-5 text-sm sm:text-base md:text-lg text-muted-foreground">
                    <p className="line-clamp-2 sm:line-clamp-3">
                      {description}
                    </p>
                    <div className="flex items-center justify-between mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base">
                      <div className="flex items-center">
                        <Star
                          className="text-yellow-400 h-4 w-4 sm:h-5 sm:w-5 mr-1"
                          fill="currentColor"
                        />
                        <span>{rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="text-primary h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                        <span>{students} Siswa</span>
                      </div>
                    </div>
                  </CardContent>

                  {/* Footer with CTA */}
                  <CardFooter className="px-4 sm:px-5 md:px-6 pt-0">
                    <Button
                      variant="outline"
                      className="w-full font-medium text-sm sm:text-base rounded-lg border-[#D247BF]/30 hover:bg-gradient-to-r hover:from-[#D247BF]/10 hover:to-primary/10 hover:border-[#D247BF]/40 hover:scale-[1.02] transition-all duration-300"
                    >
                      Lihat Detail
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ),
        )}
      </motion.div>

      {/* View All Courses CTA */}
      <motion.div
        className="text-center mt-10 sm:mt-12 md:mt-16"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <Button className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] h-11 sm:h-12 md:h-14 font-bold text-sm sm:text-base rounded-lg bg-gradient-to-r from-[#D247BF] to-primary hover:from-[#D247BF]/85 hover:to-primary/85 transition-all duration-400 shadow-lg hover:shadow-xl hover:scale-[1.05] ease-in-out dark:text-white relative overflow-hidden">
          <span className="relative z-10">Lihat Semua Kursus</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-[45deg] w-1/3 opacity-0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%", opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </Button>
      </motion.div>
    </section>
  );
};
