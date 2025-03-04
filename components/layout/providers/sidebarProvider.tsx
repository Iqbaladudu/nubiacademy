"use client";

import { AppSidebar, items } from "@/components/layout/app-sidebar";
import {
  SidebarProvider as Provider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import isValidMongoId from "../../../util/isValidMongoId";
import useCourse from "../../../hooks/use-course";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "../../ui/sheet";
import { ToggleTheme } from "../toggle-theme";
import Link from "next/link";
import Image from "next/image";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useLessonPositionStore } from "@/components/layout/providers/lesson-position-provider";
import { useMediaQuery } from "usehooks-ts";

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const position = params.get("position");
  const pathname = usePathname();
  const module_id = pathname.split("/")[pathname.split("/").length - 1];
  const is_kelas_route_available = pathname.split("/").includes("kelas");
  const is_valid_module_id = isValidMongoId(module_id);
  const [learningMode, setLearningMode] = useState<boolean>();
  const { course } = useCourse();
  const learningModeAllCondition = learningMode && course;
  const { current } = useLessonPositionStore((state) => state);
  const match = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (is_kelas_route_available && is_valid_module_id) {
      setLearningMode(true);
    } else {
      setLearningMode(false);
    }
  }, [is_kelas_route_available, is_valid_module_id]);

  const user_data = useLiveQuery(() => db.user.toArray())!;

  const logout = useMutation({
    mutationFn: async () => {
      return axios.post("/api/logout");
    },
  });

  useEffect(() => {
    if (logout.isSuccess) {
      router.push("/masuk");
      db.user.where("id").notEqual("").delete();
    }
  }, [logout.isSuccess, router]);

  return (
    <Provider>
      <AppSidebar learningMode={learningMode as boolean} />
      <SidebarInset>
        {!match && (
          <header className="w-full bg-white dark:bg-background z-50 mx-auto shadow flex justify-between items-center px-5 py-5 md:hidden">
            <Link
              href="/"
              className="font-bold text-md flex items-center w-[80%] line-clamp-2"
            >
              {learningModeAllCondition ? current.title : "NUBI ACADEMY"}
            </Link>
            {learningModeAllCondition ? (
              <div className="">
                <SidebarTrigger />
              </div>
            ) : (
              <div className="">
                <Sheet>
                  <SheetTrigger className="bg-gray-200 rounded-lg text-secondary p-2">
                    Menu
                  </SheetTrigger>
                  <SheetContent
                    side={"bottom"}
                    className="flex justify-start flex-col"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex aspect-square items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground ring-1 ring-secondary`}
                      >
                        <Image
                          src={"https://avatar.iran.liara.run/public"}
                          height={32}
                          width={32}
                          alt="Nubi profil"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold line-clamp-2 w-44 dark:text-gray-200">
                          {user_data && user_data.length > 0
                            ? user_data[0].fullname
                            : ""}
                        </span>
                      </div>
                    </div>
                    <SheetHeader>
                      {items.map((arr, index) => (
                        <div key={index}>
                          <SheetTitle className="text-start text-sm dark:text-gray-200 mb-2">
                            {arr.title}
                          </SheetTitle>
                          <SheetDescription className="text-start flex flex-wrap gap-2">
                            {arr.items?.map((item, index) => (
                              <Button
                                size={"sm"}
                                variant={"outline"}
                                key={index}
                                className={`text-secondary dark:text-gray-200 border-secondary dark:border-gray-200 ${position === item.url && "bg-gray-200 border-0 dark:text-secondary"}`}
                                asChild
                              >
                                <Link
                                  href={`/dashboard/${arr.url}?position=${item.url}`}
                                >
                                  {item.icon}
                                  {item.title}
                                </Link>
                              </Button>
                            ))}
                          </SheetDescription>
                        </div>
                      ))}
                    </SheetHeader>
                    <div className="flex justify-between items-center flex-wrap-reverse">
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          logout.mutate();
                        }}
                        className="w-auto bg-none border-0 text-destructive dark:text-destructive dark:text-red-500"
                      >
                        <LogOut />
                        <span>Keluar</span>
                      </Button>

                      <div className="size-8 flex justify-center items-center">
                        <ToggleTheme />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          </header>
        )}
        {learningModeAllCondition && (
          <CourseNavigation
            router={router}
            params={params}
            pathname={pathname}
          />
        )}
        {children}
      </SidebarInset>
    </Provider>
  );
}

function CourseNavigation({
  router,
  params,
  pathname,
}: {
  router: AppRouterInstance;
  params: ReadonlyURLSearchParams;
  pathname: string;
}) {
  const { next, previous, current, setPrevious, setNext, setCurrent } =
    useLessonPositionStore((state) => state);
  const lesson_id = params.get("lesson");

  const lesson = useQuery({
    queryKey: ["kelas-saya-detail", lesson_id || ""],
    queryFn: async () => {
      return axios.get(`/api/lesson/${lesson_id}`);
    },
    enabled:
      Boolean(lesson_id) &&
      Boolean(next?.lesson_id?.length > 0 || previous?.lesson_id?.length > 0),
  });

  useEffect(() => {
    if (lesson.isSuccess) {
      setPrevious({ ...lesson.data.data.lesson_info.previous });
      setNext({ ...lesson.data.data.lesson_info.next });
      setCurrent({ ...lesson.data.data.lesson_info.current });
    }
  }, [
    lesson?.data?.data.lesson_info.next,
    lesson?.data?.data.lesson_info.previous,
    lesson.isSuccess,
    setNext,
    setPrevious,
    setCurrent,
    lesson.data?.data.lesson_info,
  ]);

  return (
    <div className="fixed bg-white shadow-sm border-t w-full right-0 bottom-0 z-50">
      <div className="w-[100%] flex justify-between items-center py-2 px-2">
        <Button
          variant={"outline"}
          disabled={previous?.lesson_id?.length < 1}
          size={"sm"}
          onClick={() =>
            router.push(`${pathname}?lesson=${previous?.lesson_id}`)
          }
        >
          Sebelumnya
        </Button>
        <p className="text-lg font-semibold hidden md:flex text-center">
          {current.title}
        </p>
        <Button
          variant={"outline"}
          disabled={next?.lesson_id?.length < 1}
          size={"sm"}
          onClick={() => router.push(`${pathname}?lesson=${next?.lesson_id}`)}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
