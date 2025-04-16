"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
} from "lucide-react";
import { toIDRFormat } from "@/lib/utils";

function ModulesCard({ data }: { data: any }) {
  if (!data.modules?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {data.modules.map((mod: any, idx: number) => (
        <motion.div
          key={mod.id}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
        >
          <Card className="h-full rounded-xl shadow-md bg-white/90 dark:bg-zinc-900/90 border-0 transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookText className="text-indigo-500" size={18} />
                <span className="font-semibold text-base text-gray-800 dark:text-white line-clamp-2">
                  {mod.title}
                </span>
              </div>
              <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300 mb-2">
                {mod.description}
              </CardDescription>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge
                  variant="outline"
                  className="text-xs border-indigo-400 text-indigo-600 dark:border-white dark:text-white"
                >
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
    queryFn: async () => {
      return axios.get(`/api/kelas/${slug}`);
    },
    enabled: Boolean(slug),
  });

  const data = my_class.data?.data.docs[0];

  useEffect(() => {
    if (my_class.isSuccess && data) {
      setCourse(data);
    }
  }, [data, my_class.isSuccess, setCourse]);

  // Loader
  if (my_class.isLoading) {
    return <LoaderSpinner />;
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
        <h2 className="text-xl font-bold mb-2">Kelas tidak ditemukan</h2>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">
                {data.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="text-white dark:text-gray-200"
                >
                  {data.category_name}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-secondary dark:text-gray-200"
                >
                  {data.level}
                </Badge>
                {data.status === "COMING_SOON" && (
                  <Badge
                    variant="outline"
                    className="border-yellow-400 text-yellow-600 dark:text-yellow-400"
                  >
                    Segera Hadir
                  </Badge>
                )}
                {data.price === 0 && (
                  <Badge
                    variant="outline"
                    className="border-green-400 text-green-600 dark:text-green-300"
                  >
                    Gratis
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-base text-gray-700 dark:text-gray-300 font-medium">
                {data.short_description}
              </p>
            </div>
            {/* Harga & Tombol */}
            <div className="flex flex-col items-start gap-3 min-w-[180px]">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
                  {data.price > 0 ? toIDRFormat(data.price) : "Gratis"}
                </span>
                {data.mine && (
                  <CheckCircle2
                    className="text-green-500"
                    size={22}
                    title="Sudah dibeli"
                  />
                )}
              </div>
              <Button
                variant={data.mine ? "secondary" : "default"}
                className={`w-full flex items-center gap-2 font-semibold shadow transition-all duration-200 hover:scale-105 ${
                  data.mine ? "text-white" : "bg-indigo-600 text-white"
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
                    <BookText className="mr-2" size={18} />
                    Akses Kelas
                  </Link>
                ) : data.status === "COMING_SOON" ? (
                  <span>
                    <Lock className="mr-2" size={18} />
                    Segera Hadir
                  </span>
                ) : (
                  <Link href={`/kelas/${data.slug}/checkout`}>
                    <ShoppingCart className="mr-2" size={18} />
                    Beli Kelas
                  </Link>
                )}
              </Button>
            </div>
          </div>

          {/* Progress */}
          {data.progress && (
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-indigo-600 dark:text-indigo-300">
                  Progres belajar
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {data.progress.progress_percentage?.toFixed(1)}%
                </span>
              </div>
              <Progress
                value={data.progress.progress_percentage}
                className="h-3 rounded-full"
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
              className="flex flex-col items-center justify-center py-12"
            >
              <BookText className="w-14 h-14 text-indigo-200 dark:text-indigo-700 mb-3" />
              <p className="text-gray-500 dark:text-gray-300 text-center">
                Belum ada modul pada kelas ini.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
