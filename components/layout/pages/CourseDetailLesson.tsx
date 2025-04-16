"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useLessonPositionStore } from "@/components/layout/providers/lesson-position-provider";
import { useEffect } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useSidebar } from "@/components/ui/sidebar";
import { ListCollapse, BookText, FileText, AlertTriangle } from "lucide-react";
import { LoaderSpinner } from "@/components/ui/loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseDetailLesson() {
  const { setPrevious, setNext, setCurrent } = useLessonPositionStore(
    (state) => state,
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

  const handleCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Helper
  function getYouTubeVideoId(url: string) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Loading
  if (lesson.isLoading) {
    return <LoaderSpinner />;
  }

  // Error
  if (lesson.isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <AlertTriangle className="w-16 h-16 text-yellow-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">Terjadi kesalahan</h2>
        <p className="text-gray-500 dark:text-gray-300">
          Materi tidak dapat dimuat. Silakan coba beberapa saat lagi.
        </p>
      </motion.div>
    );
  }

  // Not found
  if (lesson.isSuccess && !lesson.data?.data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <FileText className="w-16 h-16 text-indigo-200 dark:text-indigo-700 mb-4" />
        <h2 className="text-xl font-bold mb-2">Materi tidak ditemukan</h2>
        <p className="text-gray-500 dark:text-gray-300">
          Materi dengan ID tersebut tidak tersedia.
        </p>
      </motion.div>
    );
  }

  // Main content
  const lessonData = lesson.data?.data;
  const info = lessonData?.lesson_info?.current;

  return (
    <div onCopy={handleCopy} className="w-full mx-auto px-2 md:px-0 pb-20">
      {/* Video atau Konten */}
      <AnimatePresence mode="wait">
        {lesson.isSuccess && lessonData?.videoUrl ? (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mb-8 w-full max-w-2xl rounded-xl overflow-hidden shadow-lg bg-black"
          >
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
                    src: getYouTubeVideoId(lessonData?.videoUrl),
                    provider: "youtube",
                  },
                ],
              }}
            />
          </motion.div>
        ) : lesson.isSuccess && lessonData?.content ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mb-8 w-full max-w-2xl"
          >
            <RichText
              className="prose prose-lg md:prose-xl dark:prose-invert break-words text-left pb-20"
              data={lessonData?.content}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
