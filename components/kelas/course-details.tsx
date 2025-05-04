"use client";

import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, toIDRFormat } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  Tag,
  BarChart,
  ShoppingCart,
  BookOpen,
  ChevronRight,
  Info,
} from "lucide-react";
import * as React from "react";

// Tooltip for badge (simple, can be replaced with shadcn Tooltip if available)
const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({
  text,
  children,
}) => (
  <span className="relative group cursor-pointer">
    {children}
    <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {text}
    </span>
  </span>
);

interface Course {
  id: string;
  name: string;
  slug: string;
  price: number;
  short_description: string;
  description: any;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  category_name: string;
  level: string;
  modules?: Array<{
    id: string;
    title: string;
    contents: Array<{ title: string }>;
  }>;
}

interface CourseDetailsProps {
  course: Course;
  slug: string;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.4, ease: "easeIn" } },
};

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, slug }) => {
  const { resolvedTheme } = useTheme();
  const [tab, setTab] = React.useState<"description" | "syllabus">(
    "description",
  );
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);

  // Example: Calculate progress (if you have progress data, replace this)
  const syllabusCount = course.modules?.reduce(
    (acc, mod) => acc + mod.contents.length,
    0,
  );
  const syllabusProgress = syllabusCount
    ? Math.floor((syllabusCount / 20) * 100)
    : 0; // Example only

  return (
    <>
      {/* Header Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-8 items-start mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {/* Course Image with overlay and zoom */}
        <motion.div
          className="relative w-full max-w-xs mx-auto md:max-w-none md:w-[300px] lg:w-[340px] flex-shrink-0 group"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.35 }}
        >
          <Image
            height={course.thumbnail.height}
            width={course.thumbnail.width}
            src={course.thumbnail.url}
            alt={course.name}
            className="w-full h-auto object-cover aspect-square rounded-2xl shadow-xl border border-border/40 transition-all duration-300"
            priority
          />
          {/* Overlay on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Course Details Card */}
        <div
          className={cn(
            "flex-1 w-full rounded-2xl shadow-2xl border border-border/30 p-6 md:p-8 backdrop-blur-md",
            resolvedTheme === "dark" ? "bg-zinc-900/70" : "bg-white/70",
          )}
          style={
            resolvedTheme === "dark"
              ? undefined
              : {
                  background:
                    "linear-gradient(135deg,rgba(255,255,255,0.85) 60%,rgba(236,239,255,0.7) 100%)",
                }
          }
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Tooltip text="Kategori kelas">
              <Badge
                variant="secondary"
                className="text-xs sm:text-sm px-2 py-1 flex items-center gap-1.5 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 border-0"
              >
                <Tag className="h-3.5 w-3.5" />
                {course.category_name}
              </Badge>
            </Tooltip>
            <Tooltip text="Tingkat kesulitan">
              <Badge
                variant="secondary"
                className="text-xs sm:text-sm px-2 py-1 flex items-center gap-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-0"
              >
                <BarChart className="h-3.5 w-3.5" />
                Level: {course.level}
              </Badge>
            </Tooltip>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-3 leading-tight drop-shadow-sm">
            {course.name}
          </h1>

          {/* Short Description */}
          <p className="text-base sm:text-lg text-muted-foreground mb-6 line-clamp-3">
            {course.short_description}
          </p>

          {/* Price, Progress, and CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white/80 dark:bg-zinc-800/80 rounded-xl border border-border/20 shadow-md">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary whitespace-nowrap">
                {toIDRFormat(course.price)}
              </p>
            </div>
            <Button
              size="lg"
              className="w-full sm:w-auto relative overflow-hidden group bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg border-0 font-semibold text-base px-6 py-3 rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-primary/90 active:scale-95"
              asChild
            >
              <Link
                href={`/kelas/${slug}/checkout`}
                className="no-underline flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Beli Sekarang
                </span>
                {/* Ripple effect */}
                <span className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-200 bg-white/20 rounded-xl pointer-events-none" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          ...fadeInVariants,
          visible: {
            ...fadeInVariants.visible,
            transition: { delay: 0.15, duration: 0.7, ease: "easeOut" },
          },
        }}
      >
        <Tabs
          defaultValue="description"
          value={tab}
          onValueChange={(v) => setTab(v as "description" | "syllabus")}
          className="w-full mt-8"
        >
          <TabsList className="grid w-full grid-cols-2 md:w-max mx-auto h-12 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-800 p-1 rounded-xl mb-7 shadow">
            <TabsTrigger
              value="description"
              className="px-5 py-2 text-base font-medium data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-primary data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              <Info className="inline mr-2 h-4 w-4" />
              Deskripsi
            </TabsTrigger>
            <TabsTrigger
              value="syllabus"
              className="px-5 py-2 text-base font-medium data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-primary data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
            >
              <BookOpen className="inline mr-2 h-4 w-4" />
              Silabus
            </TabsTrigger>
          </TabsList>

          {/* Animated Tab Content */}
          <div className="min-h-[180px]">
            <AnimatePresence mode="wait">
              {tab === "description" && (
                <motion.div
                  key="desc"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="left-0 top-0 w-full"
                >
                  <div className="p-6 md:p-8 bg-white/90 dark:bg-zinc-900/90 rounded-2xl border border-border/40 shadow-lg prose dark:prose-invert max-w-none text-base sm:text-lg transition-all duration-300">
                    <RichText data={course.description} />
                  </div>
                </motion.div>
              )}
              {tab === "syllabus" && (
                <motion.div
                  key="syllabus"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="left-0 top-0 w-full"
                >
                  <div className="p-6 md:p-8 bg-white/90 dark:bg-zinc-900/90 rounded-2xl border border-border/40 shadow-lg transition-all duration-300">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      value={openAccordion ?? undefined}
                      onValueChange={(v) =>
                        setOpenAccordion(v === openAccordion ? null : v)
                      }
                    >
                      {course.modules && course.modules.length > 0 ? (
                        course.modules.map((module, index) => (
                          <AccordionItem
                            value={module.id}
                            key={index}
                            className={`border-b border-border/40 last:border-b-0 transition-all duration-300 ${
                              openAccordion === module.id ? "" : ""
                            }`}
                          >
                            <AccordionTrigger className="py-4 text-base font-semibold text-left hover:no-underline hover:text-primary group transition-colors duration-200">
                              <span className="flex items-center">
                                <BookOpen className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0" />
                                {module.title}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground pb-4 pl-9">
                              <ul className="list-disc space-y-1.5 ml-2">
                                {module.contents.map(
                                  (content, contentIndex) => (
                                    <li key={contentIndex}>{content.title}</li>
                                  ),
                                )}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          Silabus belum tersedia.
                        </p>
                      )}
                    </Accordion>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </motion.div>
    </>
  );
};

export default CourseDetails;
