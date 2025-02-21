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
import { Skeleton } from "@/components/ui/skeleton";
import { cn, toIDRFormat } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookText } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export enum POSITION {
  KELAS_SAYA = "kelas-saya",
  SEMUA_KELAS = "semua-kelas",
  KELAS_SELESAI = "kelas-selesai",
  JELAJAHI_KELAS_BARU = "jelajahi-kelas-baru",
}

const HEADER = {
  "jelajahi-kelas-baru": (
    <>
      <h2 className="prose text-3xl font-semibold dark:prose-invert">
        Jelajahi kelas baru
      </h2>
      <p className="prose dark:prose-invert text-lg font-medium ">
        Temukan beragam kelas yang kamu butuhkan
      </p>
    </>
  ),
  "kelas-saya": (
    <>
      <h2 className="prose text-3xl font-semibold dark:prose-invert">
        Kelas saya
      </h2>
      <p className="prose text-lg font-medium dark:prose-invert">
        Jangan kendor, yuk gas terus belajarnya
      </p>
    </>
  ),
  "semua-kelas": (
    <>
      <h2 className="prose text-3xl font-semibold dark:prose-invert">
        Semua kelas saya
      </h2>
      <p className="prose dark:prose-invert text-lg font-medium ">
        Yuk lihat semua kelas yang sudah kamu beli
      </p>
    </>
  ),
  "kelas-selesai": (
    <>
      <h2 className="prose text-3xl font-semibold dark:prose-invert">
        Kelas selesai
      </h2>
      <p className="prose dark:prose-invert text-lg font-medium ">
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
  const position: POSITION = searchParams.get("position") as POSITION;

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

  useEffect(() => {
    if (!searchParams.has("page") && searchParams.has("position")) {
      router.push(pathname + "?" + createQueryString("page", "1"));
    }
  }, [createQueryString, page, pathname, position, router, searchParams]);

  const my_classes = useQuery({
    queryKey: [
      Object.values(POSITION).includes(position as POSITION) && position,
      page,
    ],
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
    enabled: Object.values(POSITION).includes(position as POSITION),
  });

  return (
    <div className="min-h-full h-full">
      <div className="grid grid-cols-1 justify-self-center lg:grid-cols-2 xl:grid-cols-none xl:flex xl:justify-start xl:justify-self-start xl:flex-wrap gap-3">
        <div className="col-span-1 lg:col-span-2 xl:w-full mt-20 md:mt-0">
          <div>{HEADER[position]}</div>
        </div>
        {my_classes.isLoading && (
          <>
            <Skeleton className="w-[300px] h-[350px]" />
            <Skeleton className="w-[300px] h-[350px]" />
            <Skeleton className="w-[300px] h-[350px]" />
            <Skeleton className="w-[300px] h-[350px]" />
            <Skeleton className="w-[300px] h-[350px]" />
            <Skeleton className="w-[300px] h-[350px]" />
          </>
        )}
        {my_classes.isSuccess && my_classes.data.data.docs.length > 0 ? (
          my_classes.data.data.docs.map((arr, key) => (
            <Card className="w-[300px]" key={key}>
              <CardHeader>
                <div>
                  <Badge
                    className={`text-white bg-secondary hover:bg-secondary ${!arr.category_name && "hidden"}`}
                  >
                    {arr.category_name}
                  </Badge>
                  <Badge
                    variant={"outline"}
                    className={`text-secondary dark:text-white dark:border-white border-secondary ml-2 bg-se ${!arr.level && "hidden"}`}
                  >
                    {arr.level}
                  </Badge>
                </div>
                <CardTitle className=" line-clamp-4 h-24 prose dark:text-white">
                  {arr?.name}
                </CardTitle>
                {position === POSITION.JELAJAHI_KELAS_BARU && (
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
                )}
                <CardDescription className="h-[7.5rem] line-clamp-6">
                  {arr.short_description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:text-white flex text-xl items-center gap-1">
                  {position === POSITION.JELAJAHI_KELAS_BARU ? (
                    <p className="p-0 m-0 text-secondary text-sm font-semibold dark:text-gray-200">
                      {arr.price > 0 ? (
                        toIDRFormat(arr.price)
                      ) : (
                        <Badge
                          variant={"outline"}
                          className="text-secondary border-secondary dark:text-secondary dark:border-secondary"
                        >
                          Gratis
                        </Badge>
                      )}
                    </p>
                  ) : (
                    <>
                      <BookText height={24} width={24} />
                      <p className="p-0 m-0">{arr.modules.length} modul</p>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter
                className={cn("flex justify-start", {
                  "justify-between": position === POSITION.JELAJAHI_KELAS_BARU,
                })}
              >
                <Button
                  asChild
                  size={"sm"}
                  className={`text-white ${position === POSITION.JELAJAHI_KELAS_BARU && arr.mine === false ? "w-28" : "w-auto"} bg-secondary hover:bg-secondary`}
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
                      size={"sm"}
                      variant={"outline"}
                      className="w-28 text-dark-blue border-dark-blue font-normal"
                    >
                      <Link href={`${pathname + "/" + arr.slug}`}>Detail</Link>
                    </Button>
                  )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <>
            {my_classes.isSuccess && (
              <div className="prose dark:prose-invert">
                Ops, kamu sekarang tidak mengikuti kelas apapun. Silahkan
                periksa{" "}
                <Link
                  href={"/dashboard/kelas?position=semua-kelas&page=1"}
                  className="font-bold underline"
                >
                  semua kelas
                </Link>{" "}
                atau{" "}
                <Link
                  href={"/dashboard/kelas?position=jelajahi-kelas-baru&page=1"}
                  className="font-bold underline"
                >
                  jelajahi kelas baru
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      {my_classes.isSuccess && my_classes.data.data.totalPages > 1 && (
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn({
                  "pointer-events-none opacity-50":
                    my_classes.data.data.hasNextPage,
                })}
                href={changePosition(my_classes.data.data.prevPage)}
              />
            </PaginationItem>
            {Array.from(
              { length: my_classes.data.data.totalPages },
              (_, i) => i + 1
            ).map((arr, index) => (
              <PaginationItem
                className={cn({
                  "bg-gray-200 pointer-events-none rounded-sm dark:bg-gray-700":
                    my_classes.data.data.page === arr,
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
                    my_classes.data.data.hasPrevPage,
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
