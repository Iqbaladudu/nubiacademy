"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailLesson() {
  const searchParams = useSearchParams();
  const lesson_id = searchParams.get("lesson");
  const lesson = useQuery({
    queryKey: ["kelas-saya-detail", lesson_id || ""],
    queryFn: async () => {
      return axios.get(`/api/lesson/${lesson_id}`);
    },
    enabled: Boolean(lesson_id),
  });

  return (
    <div className="w-[100%]">
      {lesson.isSuccess && (
        <RichText
          className="prose mx-auto text-xl text-left"
          data={lesson?.data?.data.content}
        />
      )}

      {lesson.isLoading && (
        <div className="w-[80%] mx-auto">
          <Skeleton className="h-16" />
          <Skeleton className="h-6 w-[50%] mt-4" />
          <Skeleton className=" h-96 mt-5" />
        </div>
      )}
    </div>
  );
}
