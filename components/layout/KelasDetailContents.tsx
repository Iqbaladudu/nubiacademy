"use client"

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardDescription, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import useCourse from "@/hooks/use-course";

function KelasDetailSkeleton(props: {
  isLoading: boolean
}) {
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

function ModulesCard(props: {
  data: any;
}) {
  return (
      <div className={"flex justify-start gap-4 flex-wrap items-center mt-10"}>
        {props.data.modules.map((arr, index) => (
            <Card key={index} className={"w-44 h-64 relative"}>
              <CardHeader>
                <p
                    className={
                      "prose m-0 h-[7rem] text-xl dark:text-white line-clamp-4"
                    }
                >
                  {arr.title}
                </p>
                <CardDescription className={"h-10"}>
                  {arr.description}
                </CardDescription>
              </CardHeader>
            </Card>
        ))}
      </div>
  );
}

export function KelasDetailContents(props: {
  slug: any,
}) {
  const { setCourse } = useCourse();
  const pathname = usePathname();
  const my_class = useQuery({
    queryKey: ["kelas-saya-detail", props.slug || ""],
    queryFn: async () => {
      return axios.get(`/api/kelas/${props.slug}`);
    },
  });

  const data = my_class.data?.data.docs[0];

  useEffect(() => {
    if (my_class.isSuccess) {
      setCourse(data)
    }
  }, [data, my_class.isSuccess, setCourse]);

  return <>
    {my_class.isSuccess && (
        <>
          <div>
            <h1 className="prose text-3xl dark:text-white">{data.name}</h1>
          </div>
          <Button variant={"secondary"} className={"text-white mt-5"}>
            <Link href={`${pathname}/${data.modules[0].id}`}>
              Buka kelas
            </Link>
          </Button>
          <ModulesCard
              data={data}
          />
        </>
    )}
    <KelasDetailSkeleton isLoading={my_class.isLoading} />
  </>;
}