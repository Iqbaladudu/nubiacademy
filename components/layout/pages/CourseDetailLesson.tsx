"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLessonPositionStore } from "@/components/layout/providers/lesson-position-provider";
import { useEffect } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useSidebar } from "@/components/ui/sidebar";
import { ListCollapse } from "lucide-react";

export default function CourseDetailLesson() {
  const { setPrevious, setNext, setCurrent } = useLessonPositionStore(
    (state) => state
  );
  const { state, toggleSidebar } = useSidebar();

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
    <div onCopy={handleCopy} className="w-[100%] h-[90%] rounded-none">
      <div
        className={`fixed cursor-pointer ${state === "collapsed" ? "hidden md:flex" : "hidden"}`}
        onClick={() => toggleSidebar()}
      >
        <ListCollapse />
      </div>
      {lesson.isSuccess && lesson?.data?.data.videoUrl && (
        <div className="mx-auto mt-0 md:mt-5 w-[70%]">
          <Plyr
            options={{
              controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "captions",
                "settings",
                "pip",
                "airplay",
                "fullscreen",
              ],
            }}
            source={{
              type: "video",
              sources: [
                {
                  src: getYouTubeVideoId(lesson?.data?.data.videoUrl),
                  provider: "youtube",
                },
              ],
            }}
          />
        </div>
      )}
      {lesson.isSuccess && !lesson.data?.data.videoUrl && (
        <RichText
          className="prose prose-sm mb-5 md:mt-0 break-words text-lg prose-h4:text-2xl prose-li:first:text-lg prose-h4:text-black prose-code:text-gray-600 dark:prose-invert dark:prose-p:text-gray-200 dark:prose-li:text-gray-200 dark:prose-strong:text-gray-200 dark:prose-h4:text-gray-200 mx-auto text-left pb-20"
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

function getYouTubeVideoId(url: string) {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
