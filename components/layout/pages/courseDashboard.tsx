import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn, toIDRFormat } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookText } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { EmptyState } from "@/components/ui/emptyState";
import { LoaderSpinner } from "@/components/ui/loader-spinner";

export enum POSITION {
  KELAS_SAYA = "kelas-saya",
  SEMUA_KELAS = "semua-kelas",
  KELAS_SELESAI = "kelas-selesai",
  JELAJAHI_KELAS_BARU = "jelajahi-kelas-baru",
}

const HEADER: Record<POSITION, JSX.Element> = {
  [POSITION.JELAJAHI_KELAS_BARU]: (
    <>
      <h2 className="text-3xl font-semibold mb-1">Jelajahi kelas baru</h2>
      <p className="text-lg font-medium text-muted-foreground">
        Temukan beragam kelas yang kamu butuhkan
      </p>
    </>
  ),
  [POSITION.KELAS_SAYA]: (
    <>
      <h2 className="text-3xl font-semibold mb-1">Kelas saya</h2>
      <p className="text-lg font-medium text-muted-foreground">
        Jangan kendor, yuk gas terus belajarnya
      </p>
    </>
  ),
  [POSITION.SEMUA_KELAS]: (
    <>
      <h2 className="text-3xl font-semibold mb-1">Semua kelas saya</h2>
      <p className="text-lg font-medium text-muted-foreground">
        Yuk lihat semua kelas yang sudah kamu beli
      </p>
    </>
  ),
  [POSITION.KELAS_SELESAI]: (
    <>
      <h2 className="text-3xl font-semibold mb-1">Kelas selesai</h2>
      <p className="text-lg font-medium text-muted-foreground">
        Yeyy selamat sudah melewati semua proses ini, ambil sertifikatmu suhu
      </p>
    </>
  ),
};

export default function CourseDashboard() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const pathname = usePathname();
  const position = searchParams.get("position") as POSITION;

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

  useEffect(() => {
    if (!searchParams.has("page") && searchParams.has("position")) {
      router.replace(pathname + "?" + createQueryString("page", "1"));
    }
  }, [createQueryString, page, pathname, position, router, searchParams]);

  const my_classes = useQuery({
    queryKey: [position, page],
    queryFn: async () => {
      switch (position) {
        case POSITION.KELAS_SAYA:
          return await axios.get(`/api/kelas/me/ongoing?page=${page || 1}`);
        case POSITION.KELAS_SELESAI:
          return await axios.get(`/api/kelas/me/done?page=${page || 1}`);
        case POSITION.SEMUA_KELAS:
          return await axios.get(`/api/kelas/me?page=${page || 1}`);
        case POSITION.JELAJAHI_KELAS_BARU:
          return await axios.get(`/api/kelas?page=${page || 1}`);
      }
    },
    enabled: Object.values(POSITION).includes(position),
  });

  return (
    <div className="min-h-full h-full w-full px-2 md:px-0 py-8">
      {/* Header */}
      <div className="mb-8 text-center">{HEADER[position]}</div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center w-full">
        {my_classes.isLoading && (
          <div className="col-span-full w-full flex flex-col items-center justify-center">
            <LoaderSpinner />
          </div>
        )}

        {my_classes.isSuccess && my_classes.data.data.docs.length > 0
          ? my_classes.data.data.docs.map((arr, key) => (
              <Card
                key={key}
                className="w-full max-w-xs bg-white/90 dark:bg-zinc-900/90 shadow-xl rounded-2xl border-0 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {arr.category_name && (
                      <Badge className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white text-xs px-2 py-1">
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
                  {position === POSITION.JELAJAHI_KELAS_BARU && (
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
                  )}
                  <CardDescription className="h-[5rem] text-ellipsis line-clamp-4 text-gray-600 dark:text-gray-400">
                    {arr.short_description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {position === POSITION.JELAJAHI_KELAS_BARU ? (
                      <span className="text-indigo-600 dark:text-indigo-300 font-semibold text-base">
                        {arr.price > 0 ? (
                          toIDRFormat(arr.price)
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-green-400 text-green-600 dark:text-green-300 dark:border-green-300"
                          >
                            Gratis
                          </Badge>
                        )}
                      </span>
                    ) : (
                      <>
                        <BookText height={24} width={24} />
                        <span className="p-0 m-0">
                          {arr.modules.length} modul
                        </span>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter
                  className={cn(
                    "flex flex-col gap-2 sm:flex-row sm:justify-between mt-2",
                  )}
                >
                  <Button
                    asChild
                    size="sm"
                    className={cn(
                      "rounded-lg font-semibold shadow w-full sm:w-auto transition-all duration-200 hover:scale-105",
                      position === POSITION.JELAJAHI_KELAS_BARU &&
                        arr.mine === false
                        ? "bg-indigo-600 text-white"
                        : "bg-secondary text-white",
                    )}
                  >
                    {position === POSITION.JELAJAHI_KELAS_BARU &&
                    arr.mine === false ? (
                      <Link href={`/kelas/${arr.slug}/checkout`}>
                        Beli sekarang
                      </Link>
                    ) : (
                      <Link href={`${pathname + "/" + arr.slug}`}>
                        Akses sekarang
                      </Link>
                    )}
                  </Button>
                  {position === POSITION.JELAJAHI_KELAS_BARU &&
                    arr.mine === false && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-28 border-indigo-600 text-indigo-700 dark:text-indigo-200 rounded-lg font-normal transition-all duration-200 hover:scale-105"
                      >
                        <Link href={`${pathname + "/" + arr.slug}`}>
                          Detail
                        </Link>
                      </Button>
                    )}
                </CardFooter>
              </Card>
            ))
          : my_classes.isSuccess && (
              <div className="col-span-full w-full flex flex-col items-center justify-center">
                <EmptyState
                  title="Belum ada kelas"
                  description="Kamu belum mengikuti kelas apapun. Yuk, mulai belajar sekarang!"
                  actionLabel="Jelajahi Kelas"
                  actionHref="/dashboard/kelas?position=jelajahi-kelas-baru&page=1"
                />
              </div>
            )}
      </div>

      {/* Pagination */}
      {my_classes.isSuccess && my_classes.data.data.totalPages > 1 && (
        <Pagination className="mt-8 mb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn({
                  "pointer-events-none opacity-50":
                    !my_classes.data.data.hasPrevPage,
                })}
                href={changePosition(my_classes.data.data.prevPage)}
              />
            </PaginationItem>
            {Array.from(
              { length: my_classes.data.data.totalPages },
              (_, i) => i + 1,
            ).map((arr, index) => (
              <PaginationItem
                className={cn(
                  "rounded",
                  my_classes.data.data.page === arr
                    ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 font-bold"
                    : "",
                )}
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
                    !my_classes.data.data.hasNextPage,
                })}
                href={changePosition(my_classes.data.data.nextPage)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
