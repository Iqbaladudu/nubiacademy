"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLessonPositionStore } from "@/components/layout/providers/lesson-position-provider";
import { useEffect } from "react";
import ReactPlayer from "react-player/youtube";

export default function CourseDetailLesson() {
  const { setPrevious, setNext, setCurrent } = useLessonPositionStore(
    (state) => state
  );

  const searchParams = useSearchParams();
  const lesson_id = searchParams.get("lesson");
  const lesson = useQuery({
    queryKey: ["kelas-saya-detail", lesson_id || ""],
    queryFn: async () => {
      return axios.get(`/api/lesson/${lesson_id}`);
    },
    retry: false,
    enabled: Boolean(lesson_id),
  });

  useEffect(() => {
    if (lesson.isSuccess) {
      setPrevious({ ...lesson.data.data.lesson_info.previous });
      setNext({ ...lesson.data.data.lesson_info.next });
      setCurrent({ ...lesson.data.data.lesson_info.current });
    }
  }, [
    lesson.data?.data.lesson_info,
    lesson.data?.data.lesson_info.next,
    lesson.data?.data.lesson_info.previous,
    lesson.isSuccess,
    setCurrent,
    setNext,
    setPrevious,
  ]);

  const handleCopy = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onCopy={handleCopy}
      className="w-[100%] overflow-scroll rounded-none border-b border-gray-200 scrollbar-hide relative h-[90vh] md:h-[88vh] m-0"
    >
      {lesson.isSuccess && lesson?.data?.data.videoUrl && (
        <div className="flex justify-center mb-5 h-full items-center mt-20 md:mt-0">
          <ReactPlayer
            style={{
              height: 20,
            }}
            url={lesson?.data?.data.videoUrl}
          />
        </div>
      )}
      {lesson.isSuccess && !lesson.data?.data.videoUrl && (
        <RichText
          className="prose prose-sm mb-5 mt-20 md:mt-0 break-words text-lg prose-h2:text-black prose-code:text-gray-600 dark:prose-invert dark:prose-p:text-gray-200 dark:prose-li:text-gray-200 dark:prose-strong:text-gray-200 dark:prose-h2:text-gray-200 mx-auto text-left"
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
      {lesson.isError && <div>Terdapat kesalahan</div>}
    </div>
  );
}
