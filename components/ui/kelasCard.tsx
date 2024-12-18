"use client";

import { dummyCourses, generateSlug } from "@/constant/dummy";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { formatToK } from "@/util/numberToKFormatter";
import { Icn } from "./icn";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/services/global";
import { useEffect, useState } from "react";

export function KelasCard() {
  const [courseData, setCourseData] = useState();
  const router = useRouter();
  const getKelas = useQuery({
    queryKey: ["kelas"],
    queryFn: async () => {
      const data = instance.get("/course");
      return data;
    },
  });

  useEffect(() => {
    if (getKelas.isSuccess) {
      setCourseData(getKelas.data.data.docs);
    }
  }, [getKelas]);

  return (
    <main className="col-span-12 lg:col-span-10">
      <div className="mt-10 mb-2 text-xl font-semi-bold">
        Kelas yang tersedia
      </div>
      <div className=" flex justify-start gap-4 w-full flex-wrap">
        {courseData &&
          courseData?.map((data) => (
            <Card
              key={data.id}
              className="border shadow-none cursor-pointer"
              onClick={() => router.push(`/kelas/${generateSlug(data.name)}`)}
            >
              <CardHeader className="">
                <div className="relative w-[250px] h-[170px] overflow-hidden">
                  <p className="absolute bottom-0 left-0 text-xs p-[0.5] bg-black bg-opacity-20 text-white">
                    {data.duration} jam
                  </p>
                  <img
                    src={`http://localhost:3001/${data.thumbnail.url}`}
                    alt={data.name}
                    className="object-cover h-full w-full rounded-md"
                  />
                </div>
              </CardHeader>
              <CardContent className="h-[4rem] max-w-[250px]">
                <p>{data.name}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p>
                  {data.price ? "IDR {formatToK(data.price)}" : "Berlangganan"}
                </p>
                <div className="flex gap-1">
                  <Icn name="ArrowUpNarrowWide" size={20} color="black" />
                  <p>{data.category.value.name}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </main>
  );
}
