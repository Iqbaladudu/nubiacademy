"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { cn, toIDRFormat } from "@/lib/utils";
import { Badge } from "./badge";
import { BookText } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./pagination";
import { motion } from "framer-motion";

export function KelasCard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courseData, setCourseData] = useState<any>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const getKelas = useQuery({
    queryKey: ["kelas", page],
    queryFn: async () => {
      const data = await axios.get(`/api/kelas?page=${page}`);
      return data;
    },
  });

  useEffect(() => {
    if (getKelas.isSuccess) {
      setCourseData(getKelas.data.data.docs);
    }
  }, [getKelas.data, getKelas.isSuccess]);

  const createQueryString = useCallback(
    (name: "page", value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  function changePosition(page: number): string {
    return pathname + "?" + createQueryString("page", `${page}`);
  }

  // Animation variants for card
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <main className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
        {courseData &&
          courseData.map((arr, key) => (
            <motion.div
              key={key}
              custom={key}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px 0 rgba(80,80,180,0.10)",
              }}
              className="w-full max-w-xs"
            >
              <Card className="w-full h-full bg-white/90 dark:bg-zinc-900/90 shadow-xl rounded-2xl border-0 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {arr.category_name && (
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white text-xs px-2 py-1"
                      >
                        {arr.category_name}
                      </Badge>
                    )}
                    {arr.level && (
                      <Badge
                        variant="outline"
                        className="border-indigo-400 text-indigo-600 dark:border-white dark:text-white text-xs px-2 py-1"
                      >
                        {arr.level}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-3 h-20 text-lg font-bold text-gray-800 dark:text-white">
                    {arr?.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <BookText
                      className="text-indigo-500"
                      height={16}
                      width={16}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {arr.modules.length} modul
                    </span>
                  </div>
                  <CardDescription className=" text-ellipsis line-clamp-4 text-gray-600 dark:text-gray-400">
                    {arr.short_description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {arr.price > 0 ? (
                      <span className="text-indigo-600 dark:text-indigo-300 font-semibold text-base">
                        {toIDRFormat(arr.price)}
                      </span>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-green-400 text-green-600 dark:text-green-300 dark:border-green-300"
                      >
                        {arr.status === "COMING_SOON"
                          ? "Coming soon"
                          : "Gratis"}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2 mt-2">
                  <Button
                    asChild
                    size="sm"
                    disabled={arr.status === "COMING_SOON"}
                    variant="secondary"
                    className="min-w-20 text-white rounded-lg font-semibold shadow transition-all duration-200 hover:scale-105"
                  >
                    {arr.status === "COMING_SOON" ? (
                      <span>Beli</span>
                    ) : arr.mine ? (
                      <Link href={`/dashboard/kelas/${arr.slug}`}>
                        Akses kelas
                      </Link>
                    ) : (
                      <Link href={`/kelas/${arr.slug}/checkout`}>Beli</Link>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={arr.status === "COMING_SOON"}
                    className="w-20 border-indigo-400 dark:border-gray-200 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <Link
                      href={`/kelas/${arr.slug}`}
                      className="text-indigo-600 dark:text-gray-200"
                    >
                      Detail
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
      </div>
      {getKelas.isSuccess && getKelas.data.data.totalPages > 1 && (
        <Pagination className="my-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn({
                  "pointer-events-none opacity-50":
                    !getKelas.data.data.hasPrevPage,
                })}
                href={changePosition(getKelas.data.data.prevPage)}
              />
            </PaginationItem>
            {Array.from(
              { length: getKelas.data.data.totalPages },
              (_, i) => i + 1,
            ).map((arr, index) => (
              <PaginationItem
                className={cn({
                  "bg-indigo-100 dark:bg-indigo-800 pointer-events-none rounded-sm":
                    getKelas.data.data.page === arr,
                })}
                key={index}
              >
                <PaginationLink href={changePosition(arr)}>
                  {arr}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={cn({
                  "pointer-events-none opacity-50":
                    !getKelas.data.data.hasNextPage,
                })}
                href={changePosition(getKelas.data.data.nextPage)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}
