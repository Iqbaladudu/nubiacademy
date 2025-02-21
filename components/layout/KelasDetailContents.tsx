/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useCourse from "@/hooks/use-course";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

function KelasDetailSkeleton(props: { isLoading: boolean }) {
  return (
    <>
      {props.isLoading && (
        <div>
          <div>
            <Skeleton className={"h-20"} />
          </div>
          <div className={"mt-10 flex gap-4 flex-wrap "}>
            <Skeleton className={"h-64 w-44"} />
            <Skeleton className={"h-64 w-44"} />
            <Skeleton className={"h-64 w-44"} />
            <Skeleton className={"h-64 w-44"} />
          </div>
        </div>
      )}
    </>
  );
}

function ModulesCard(props: { data: any }) {
  return (
    <div className={"flex justify-start gap-4 flex-wrap items-center"}>
      {props.data.modules.map((arr, index) => (
        <Card key={index} className={"md:w-44 md:h-64 flex-1 relative"}>
          <CardHeader>
            <p
              className={
                "prose m-0 h-[7rem] text-xl dark:text-white line-clamp-4"
              }
            >
              {arr.title}
            </p>
            <CardDescription className={"line-clamp-5"}>
              {arr.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export function KelasDetailContents(props: { slug: any }) {
  const { setCourse } = useCourse();
  const pathname = usePathname();
  const my_class = useQuery({
    queryKey: ["kelas-saya-detail", props.slug || ""],
    queryFn: async () => {
      return axios.get(`/api/kelas/${props.slug}`);
    },
    enabled: Boolean(props.slug),
  });

  const data = my_class.data?.data.docs[0];

  useEffect(() => {
    if (my_class.isSuccess && data) {
      setCourse(data);
    }
  }, [data, my_class.isSuccess, setCourse]);

  return (
    <>
      {my_class.isSuccess && data && (
        <>
          <div className="mt-20 md:mt-0">
            <h1 className="prose text-3xl font-bold dark:text-white">
              {data.name}
            </h1>
            <div className="flex flex-row gap-3 mt-2">
              <Badge
                variant={"secondary"}
                className="text-white dark:text-gray-200"
              >
                {data.category_name}
              </Badge>
              <Badge
                variant={"outline"}
                className="text-secondary dark:text-gray-200"
              >
                {data.level}
              </Badge>
            </div>
            <p className="mt-2 text-sm font-medium">{data.short_description}</p>
          </div>
          <Button
            variant={"secondary"}
            className={"text-white mt-5 lg:hidden"}
            disabled={data.modules.length < 1}
          >
            {data.mine ? (
              <Link
                href={`${pathname}/${data.modules.length > 0 && data.modules[0].id}?lesson=${data.modules.length && data.modules[0].contents[0].id}`}
              >
                Buka kelas{" "}
              </Link>
            ) : (
              <Link href={`/kelas/${data.slug}/checkout`}>Beli </Link>
            )}
          </Button>
          {data.progress ? (
            <div className="mt-5 mb-2">
              <p className="font-semibold text-xs">
                Progres belajar: {data.progress.progress_percentage?.toFixed(1)}
                %
              </p>
              <Progress
                className="mt-2"
                value={data.progress.progress_percentage}
              />
            </div>
          ) : (
            <div className="mt-5 mb-2">
              <p className="font-semibold text-xs">Modul</p>
            </div>
          )}
          {data.modules.length > 0 && <ModulesCard data={data} />}
          <Button
            variant={"secondary"}
            className={"text-white mt-5 hidden lg:flex"}
            disabled={data.modules.length < 1}
          >
            {data.mine ? (
              <Link
                href={`${pathname}/${data.modules.length > 0 && data.modules[0].id}?lesson=${data.modules.length && data.modules[0].contents[0].id}`}
              >
                Buka kelas{" "}
              </Link>
            ) : (
              <Link href={`/kelas/${data.slug}/checkout`}>Beli </Link>
            )}
          </Button>
        </>
      )}
      <KelasDetailSkeleton isLoading={my_class.isLoading} />
    </>
  );
}
