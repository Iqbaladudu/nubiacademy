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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BookText } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function MyCourse() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const pathname = usePathname();
  const position = searchParams.get("position");

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
    queryKey: ["kelas-saya", page],
    queryFn: async () => {
      const res = await axios.get(`/api/kelas/me?page=${page || 1}`);
      return res;
    },
  });

  return (
    <div className="flex gap-5 flex-wrap justify-center md:justify-start">
      {my_classes.isSuccess &&
        my_classes.data.data.docs.map((arr, key) => (
          <Card className="w-[300px]" key={key}>
            <CardHeader>
              <CardTitle className=" line-clamp-4 h-24 prose dark:text-white">
                {arr?.name}
              </CardTitle>
              <CardDescription className="h-32 line-clamp-6">
                {arr.short_description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:text-white flex text-xl items-center gap-1">
                <BookText height={24} width={24} />
                <p className="p-0 m-0">{arr.modules.length} modul</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button asChild variant={"secondary"} className="text-white">
                <Link href={`${pathname + "/" + arr.slug}`}>
                  Akses sekarang
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      {my_classes.isSuccess && my_classes.data.data.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {my_classes.data.data.hasPrevPage &&
              my_classes.data.data.prevPage && (
                <PaginationItem>
                  <PaginationPrevious
                    href={changePosition(my_classes.data.data.prevPage)}
                  />
                </PaginationItem>
              )}
            {Array.from(
              { length: my_classes.data.data.totalPages },
              (_, i) => i + 1
            ).map((arr, index) => (
              <PaginationItem
                className={
                  my_classes.data.data.page === arr ? "bg-gray-200" : ""
                }
                key={index}
              >
                <PaginationLink href={changePosition(arr)}>
                  {arr}
                </PaginationLink>
              </PaginationItem>
            ))}
            {my_classes.data.data.hasNextPage &&
              my_classes.data.data.nextPage && (
                <PaginationItem>
                  <PaginationNext
                    href={changePosition(my_classes.data.data.nextPage)}
                  />
                </PaginationItem>
              )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
