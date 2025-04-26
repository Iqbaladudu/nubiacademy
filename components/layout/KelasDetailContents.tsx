"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useCourse from "@/hooks/use-course";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LoaderSpinner } from "@/components/ui/loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookText,
  CheckCircle2,
  Lock,
  ShoppingCart,
  AlertTriangle,
  Layers,
  Tag,
  TrendingUp,
  Star,
} from "lucide-react";
import { toIDRFormat } from "@/lib/utils";
import { getCourseBySLug } from "@/action/get-course-by-slug.action";

// Avatar Instruktur Dummy
function InstructorAvatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-indigo-700 flex items-center justify-center shadow border-2 border-white dark:border-zinc-900">
      <span className="text-white font-bold text-lg">{name?.[0] || "I"}</span>
    </div>
  );
}

function ModulesCard({ data }: { data: any }) {
  if (!data.modules?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-8">
      {data.modules.map((mod: any, idx: number) => (
        <motion.div
          key={mod.id}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
        >
          <Card className="h-full rounded-xl shadow-none bg-transparent border border-transparent transition-all hover:shadow-md hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:border-indigo-100 dark:hover:border-zinc-800 flex flex-col group backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Layers className="text-indigo-500 group-hover:scale-110 transition-transform" size={22} />
                <span className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-2">
                  {mod.title}
                </span>
              </div>
              <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300 mb-3">
                {mod.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="text-xs border-indigo-200 text-indigo-600 dark:border-white dark:text-white flex items-center gap-1 bg-white/40 dark:bg-zinc-900/40"
                >
                  <BookText size={14} className="mr-1" />
                  {mod.contents?.length || 0} Materi
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export function KelasDetailContents({ slug }: { slug: string }) {
  const { setCourse } = useCourse();
  const pathname = usePathname();
  const my_class = useQuery({
    queryKey: ["kelas-saya-detail", slug || ""],
    queryFn: async () => getCourseBySLug(slug),
    enabled: Boolean(slug),
  });

  const data = my_class?.data?.docs?.[0];

  useEffect(() => {
    if (my_class.isSuccess && data) setCourse(data);
  }, [data, my_class.isSuccess, setCourse]);

  // Loader
  if (my_class.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <LoaderSpinner />
      </div>
    );
  }

  // Not found / error
  if (my_class.isSuccess && !data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <AlertTriangle className="w-16 h-16 text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Kelas tidak ditemukan</h2>
        <p className="text-gray-500 dark:text-gray-300">
          Kelas dengan slug tersebut tidak tersedia.
        </p>
      </motion.div>
    );
  }

  // Main content
  return (
    <AnimatePresence>
      {my_class.isSuccess && data && (
        <motion.div
          key={data.slug}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Kelas */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10 bg-white/60 dark:bg-zinc-900/60 rounded-2xl shadow-none p-8 border border-transparent backdrop-blur-md"
          >
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900 dark:text-white tracking-tight">
                {data.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant="secondary"
                  className="text-white dark:text-gray-200 flex items-center gap-1 bg-indigo-500/80 dark:bg-indigo-700/80"
                >
                  <Tag size={14} className="mr-1" />
                  {data.category_name}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-secondary dark:text-gray-200 flex items-center gap-1 border-indigo-200 bg-white/40 dark:bg-zinc-900/40"
                >
                  <TrendingUp size={14} className="mr-1" />
                  {data.level}
                </Badge>
                {data.status === "COMING_SOON" && (
                  <Badge
                    variant="outline"
                    className="border-yellow-200 text-yellow-700 dark:text-yellow-400 flex items-center gap-1 bg-white/40 dark:bg-zinc-900/40"
                  >
                    <Star size={14} className="mr-1" />
                    Segera Hadir
                  </Badge>
                )}
                {data.price === 0 && (
                  <Badge
                    variant="outline"
                    className="border-green-200 text-green-700 dark:text-green-300 flex items-center gap-1 bg-white/40 dark:bg-zinc-900/40"
                  >
                    <CheckCircle2 size={14} className="mr-1" />
                    Gratis
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-lg text-gray-700 dark:text-gray-300 font-medium">
                {data.short_description}
              </p>
              {/* Instruktur */}
              <div className="flex items-center gap-3 mt-5">
                <InstructorAvatar name={data.instructor_name || "Instruktur"} />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white text-base">
                    {data.instructor_name || "Instruktur"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Instruktur
                  </div>
                </div>
              </div>
            </div>
            {/* Harga & Tombol */}
            <div className="flex flex-col items-start gap-4 min-w-[220px]">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 bg-white/70 dark:bg-zinc-900/70 px-3 py-1 rounded-lg shadow-none">
                  {data.price > 0 ? toIDRFormat(data.price) : "Gratis"}
                </span>
                {data.mine && (
                  <CheckCircle2
                    className="text-green-500"
                    size={26}
                    title={"Sudah dibeli"}
                  />
                )}
              </div>
              <Button
                variant={data.mine ? "secondary" : "default"}
                className={`w-full flex items-center gap-2 font-semibold shadow-none transition-all duration-200 hover:scale-105 text-lg py-3 px-6 rounded-xl ${
                  data.mine
                    ? "text-white bg-green-500/90 dark:bg-green-600/80"
                    : "bg-indigo-600/90 dark:bg-indigo-500/80 text-white"
                }`}
                disabled={
                  data.status === "COMING_SOON" || data.modules.length < 1
                }
                asChild
              >
                {data.mine ? (
                  <Link
                    href={`${pathname}/${data.modules.length > 0 && data.modules[0].id}?lesson=${data.modules.length && data.modules[0].contents[0].id}`}
                  >
                    <BookText className="mr-2" size={20} />
                    Akses Kelas
                  </Link>
                ) : data.status === "COMING_SOON" ? (
                  <span>
                    <Lock className="mr-2" size={20} />
                    Segera Hadir
                  </span>
                ) : (
                  <Link href={`/kelas/${data.slug}/checkout`}>
                    <ShoppingCart className="mr-2" size={20} />
                    Beli Kelas
                  </Link>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Progress */}
          {data.progress && (
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-base text-indigo-600 dark:text-indigo-300 flex items-center gap-1">
                  <TrendingUp size={16} />
                  Progres belajar
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {data.progress.progress_percentage?.toFixed(1)}%
                </span>
              </div>
              <Progress
                value={data.progress.progress_percentage}
                className="h-4 rounded-full bg-white/40 dark:bg-zinc-900/40"
                indicatorClassName="bg-indigo-500/80 dark:bg-indigo-400/80"
              />
            </motion.div>
          )}

          {/* Modul */}
          {data.modules.length > 0 ? (
            <ModulesCard data={data} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-14"
            >
              <BookText className="w-16 h-16 text-indigo-200 dark:text-indigo-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-300 text-center text-lg">
                Belum ada modul pada kelas ini.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
