"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/services/global";
import { useEffect, useState } from "react";
import { db } from "@/db";
import axios from "axios";
import { toIDRFormat } from "@/lib/utils";
import { Badge } from "./badge";

const BaseSkillLevelIcon = ({
  width = 20,
  height = 20,
  color = "hsl(161 99.1% 43.3%)",
  level = "beginner",
  ...props
}) => {
  const paths = {
    beginner: [
      "M30,30H22V4h8Zm-6-2h4V6H24Z",
      "M20,30H12V12h8Zm-6-2h4V14H14Z",
      "M10,30H2V18h8Z",
    ],
    intermediate: [
      "M30,30H22V4h8Zm-6-2h4V6H24Z",
      "M20,30H12V12h8Z",
      "M10,30H2V18h8Z",
    ],
    advanced: ["M30,30H22V4h8Z", "M20,30H12V12h8Z", "M10,30H2V18h8Z"],
  };

  return (
    <svg
      fill={color}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <g>
        {paths[level].map((path, index) => (
          <path key={index} d={path} />
        ))}
        <rect
          id="_Transparent_Rectangle_"
          x="0"
          y="0"
          width="32"
          height="32"
          fill="none"
        />
      </g>
    </svg>
  );
};

export function KelasCard() {
  const [courseData, setCourseData] = useState();
  const router = useRouter();
  const getKelas = useQuery({
    queryKey: ["kelas"],
    queryFn: async () => {
      const data = axios.get("/api/kelas");
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
              className=" rounded-none shadow-none cursor-pointer overflow-hidden"
              onClick={() => router.push(`/kelas/${data.slug}`)}
            >
              <CardHeader className="p-3 pb-0">
                <div className="relative w-[250px] h-[170px] overflow-hidden">
                  <p className="absolute bottom-0 left-0 text-xs p-[4px] bg-black bg-opacity-80 text-white">
                    {data.duration} jam
                  </p>
                  <img
                    src={`http://localhost:3001/${data.thumbnail.url}`}
                    alt={data.name}
                    className="object-cover h-full w-full"
                  />
                </div>
              </CardHeader>
              <div className="px-3 py-1">
                <Badge className=" rounded-sm text-white" variant={"secondary"}>
                  {data?.level?.charAt(0).toUpperCase() + data?.level?.slice(1)}
                </Badge>
                <Badge
                  className="ml-2 rounded-sm text-white"
                  variant={"secondary"}
                >
                  {data?.category_name}
                </Badge>
              </div>
              <CardContent className="max-w-[250px] h-10 line-clamp-2 font-semibold text-sm p-0 px-3 text-gray-900">
                <p>{data.name}</p>
              </CardContent>
              <CardFooter className="p-0 px-3 pb-3 flex justify-between text-xs text-muted-foreground">
                <p className=" text-secondary font-bold text-sm">
                  {data.price ? `${toIDRFormat(data.price)}` : "Gratis"}
                </p>
              </CardFooter>
            </Card>
          ))}
      </div>
    </main>
  );
}
