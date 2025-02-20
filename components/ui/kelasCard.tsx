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
import { Suspense, useCallback, useEffect, useState } from "react";
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

export function KelasCard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courseData, setCourseData] = useState<any>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const getKelas = useQuery({
    queryKey: ["kelas", page],
    queryFn: async () => {
      const data = axios.get(`/api/kelas?page=${page}`);
      return data;
    },
  });

  useEffect(() => {
    if (getKelas.isSuccess) {
      setCourseData(getKelas.data.data.docs);
    }
  }, [getKelas]);

  useEffect(() => {
    if (courseData) {
    }
  }, [courseData]);

  const createQueryString = useCallback(
    (name: "page", value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function changePosition(page: number): string {
    return pathname + "?" + createQueryString("page", `${page}`);
  }

  return (
    <Suspense>
      <main className="col-span-12 lg:col-span-10">
        <div className="mt-10 mb-2 z-0 px-2 md:px-0">
          <p className="text-4xl font-bold text-secondary dark:invert -z-0 text-wrap">
            MULAI BELAJAR SEKARANG JUGA!
          </p>
          <p className="text-lg text-gray-700 font-semibold dark:invert">
            Nikmati beragam kelas sesuai kebutuhan kamu
          </p>
        </div>
        <div className="grid grid-cols-1 justify-self-center lg:grid-cols-2 xl:grid-cols-none xl:flex xl:justify-between xl:justify-self-start xl:flex-wrap gap-3">
          {courseData &&
            courseData?.map((arr, key) => (
              <Card className="w-[300px]" key={key}>
                <CardHeader>
                  <div>
                    <Badge
                      variant={"secondary"}
                      className={`text-white dark:text-gray-200 ${!arr.category_name && "hidden"}`}
                    >
                      {arr.category_name}
                    </Badge>
                    <Badge
                      variant={"outline"}
                      className={`text-secondary border-secondary dark:border-white ml-2 dark:text-gray-200 ${!arr.level && "hidden"}`}
                    >
                      {arr.level}
                    </Badge>
                  </div>
                  <CardTitle className=" line-clamp-4 h-24 text-secondary dark:text-gray-200">
                    {arr?.name}
                  </CardTitle>
                  <div className="prose dark:text-white flex text-xl items-center gap-1">
                    <BookText
                      className="text-secondary dark:text-white"
                      height={14}
                      width={14}
                    />
                    <p className="p-0 m-0 text-sm text-secondary dark:text-gray-200">
                      {arr.modules.length} modul
                    </p>
                  </div>
                  <CardDescription className="h-[5rem] text-ellipsis line-clamp-4">
                    {arr.short_description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:text-white flex text-xl items-center gap-1">
                    <p className="p-0 m-0 text-secondary text-sm font-semibold dark:text-gray-200">
                      {arr.price > 0 ? (
                        toIDRFormat(arr.price)
                      ) : (
                        <Badge
                          variant={"outline"}
                          className="text-secondary border-secondary dark:text-gray-200 dark:border-200"
                        >
                          {arr.status === "COMING_SOON"
                            ? "Coming soon"
                            : "Gratis"}
                        </Badge>
                      )}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    asChild
                    size={"sm"}
                    disabled={arr.status === "COMING_SOON"}
                    variant={"secondary"}
                    className="min-w-20 text-white dark:text-gray-200 disabled:bg-gray-300"
                  >
                    {arr.status === "COMING_SOON" ? (
                      <p>Beli</p>
                    ) : arr.mine ? (
                      <Link href={`/dashboard/kelas/${arr.slug}`}>
                        Akses kelas
                      </Link>
                    ) : (
                      <Link href={`/kelas/${arr.slug}/checkout`}>Beli</Link>
                    )}
                  </Button>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    disabled={arr.status === "COMING_SOON"}
                    className="w-20 border-secondary dark:border-gray-200"
                  >
                    <Link
                      href={`/kelas/${arr.slug}`}
                      className="text-secondary dark:text-gray-200"
                    >
                      Detail
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
        {getKelas.isSuccess && getKelas.data.data.totalPages > 1 && (
          <Pagination className="my-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn({
                    "pointer-events-none opacity-50":
                      getKelas.data.data.hasNextPage,
                  })}
                  href={changePosition(getKelas.data.data.prevPage)}
                />
              </PaginationItem>
              {Array.from(
                { length: getKelas.data.data.totalPages },
                (_, i) => i + 1
              ).map((arr, index) => (
                <PaginationItem
                  className={cn({
                    "bg-gray-200 dark:bg-gray-700 pointer-events-none rounded-sm":
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
                      getKelas.data.data.hasPrevPage,
                  })}
                  href={changePosition(getKelas.data.data.nextPage)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </Suspense>
  );
}
