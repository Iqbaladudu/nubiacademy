/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  LetterText,
  LoaderCircle,
  LogOut,
  SquareCheck,
  SquareChevronLeft,
  SquarePlay,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ReactElement, Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ToggleTheme } from "./toggle-theme";
import useCourse from "../../hooks/use-course";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button } from "../ui/button";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export interface Items {
  title: string;
  url: string;
  icon: ReactElement<any, any> | null;
  items?: Pick<Items, "title" | "url" | "icon">[];
}

export const items: Items[] = [
  {
    title: "Kelas",
    url: "kelas",
    icon: null,
    items: [
      {
        title: "Sedang dipelajari",
        url: "kelas-saya",
        icon: <LoaderCircle />,
      },
      {
        title: "Semua kelas",
        url: "semua-kelas",
        icon: <LayoutGrid />,
      },
      {
        title: "Selesai",
        url: "kelas-selesai",
        icon: <SquareCheck />,
      },
      {
        title: "Jelajahi kelas baru",
        url: "jelajahi-kelas-baru",
        icon: <ChevronRight />,
      },
    ],
  },
  {
    title: "Akun saya",
    url: "akun-saya",
    icon: null,
    items: [
      { title: "Profil", url: "profil", icon: <User /> },
      // {
      //   title: "Keamanan",
      //   url: "keamanan",
      //   icon: <LockKeyhole />,
      // },
    ],
  },
];

function SidebarNormalMenuHeader(props: {
  state: "expanded" | "collapsed";
  name?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex aspect-square items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground ring-1 ring-secondary ${props.state === "collapsed" ? " size-5" : "size-8"}`}
      >
        <Image
          src={"https://avatar.iran.liara.run/public"}
          height={32}
          width={32}
          alt="Nubi profil"
        />
      </div>
      {props.state !== "collapsed" && (
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold line-clamp-1 w-44">{props.name}</span>
        </div>
      )}
    </div>
  );
}

function SidebarDefaultContents({
  items,
  position,
  router,
}: {
  items: Items[];
  position: string;
  router: AppRouterInstance;
}) {
  return (
    <>
      {items.map((item, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items?.map((subItem, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    onClick={() =>
                      router.push(
                        `/dashboard/${item.url}?position=${subItem.url}`
                      )
                    }
                    className={`cursor-pointer ${subItem.url === "jelajahi-kelas-baru" && " ring-[0.5px] ring-gray-400"}`}
                    asChild
                    isActive={position === subItem.url}
                  >
                    <a className="text-sm">
                      {subItem?.icon}
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

export function AppSidebar({ learningMode }: { learningMode: boolean }) {
  const { state } = useSidebar();
  const [back, setBack] = useState<string>();

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const position = params.get("position");
  const { course, setCourse } = useCourse();
  const learningModeAllCondition = learningMode && course;
  const slug =
    learningMode && pathname.split("/")[pathname.split("/").length - 2];
  const my_class = useQuery({
    queryKey: ["kelas-saya-detail", slug || ""],
    queryFn: async () => {
      return axios.get(`/api/kelas/${slug}`);
    },
    enabled: Boolean(learningMode && !course && slug),
  });

  const logout = useMutation({
    mutationFn: async () => {
      return axios.post("/api/logout");
    },
    onSuccess: async () => db.user.where("id").notEqual("").delete(),
  });

  const data = my_class.data?.data.docs[0];

  useEffect(() => {
    if (my_class.isSuccess) {
      setCourse(data);
    }
  }, [data, my_class.isSuccess, setCourse]);

  useEffect(() => {
    if (logout.isSuccess) {
      router.push("/masuk");
    }
  }, [logout.isSuccess, router]);

  const user_data = useLiveQuery(() => db.user.toArray())!;

  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("/");
      const slugIndex = pathParts.length - 2;
      const newPath = pathParts.slice(0, slugIndex + 1).join("/");
      setBack(newPath);
    }
  }, [pathname, setBack]);

  return (
    <Suspense>
      <Sidebar collapsible={learningModeAllCondition ? "offcanvas" : "icon"}>
        <SidebarHeader className="pl-4 mt-4">
          {learningModeAllCondition && (
            <Button
              variant={"outline"}
              size={"sm"}
              className="w-5/12 hidden md:flex"
              disabled={!back ? true : false}
              onClick={() => back && router.push(back as string)}
            >
              <SquareChevronLeft />
              Kembali
            </Button>
          )}
          <SidebarMenu>
            {learningModeAllCondition ? (
              <p className={"prose text-sm font-bold dark:prose-invert"}>
                {course.name}
              </p>
            ) : (
              <SidebarNormalMenuHeader
                name={user_data ? user_data[0].fullname : ""}
                state={state}
              />
            )}
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className={"scrollbar-hide"}>
          {learningModeAllCondition ? (
            <>
              {course?.modules?.map((module, index) => (
                <Collapsible
                  key={index}
                  defaultOpen={false}
                  className="group/collapsible"
                >
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className={"h-auto"}>
                        <p className={"text-left"}>{module.title}</p>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent className={"py-3"}>
                      <SidebarGroupContent>
                        <SidebarMenuSub>
                          {module?.contents?.map((content, index) => (
                            <SidebarMenuSubItem
                              className="cursor-pointer"
                              key={index}
                            >
                              <SidebarMenuSubButton
                                onClick={() =>
                                  router.push(
                                    `${pathname}?lesson=${content.id}`
                                  )
                                }
                                className={"h-auto"}
                                size={"sm"}
                              >
                                {content.contain_video ? (
                                  <SquarePlay size={14} />
                                ) : (
                                  <LetterText size={14} />
                                )}
                                <span
                                  data-tooltip-id="my-tooltip"
                                  data-tooltip-content={content.title}
                                  className="p-1"
                                >
                                  {content.title}
                                </span>
                              </SidebarMenuSubButton>
                              <Tooltip
                                id="my-tooltip"
                                positionStrategy="fixed"
                                style={{
                                  width: 200,
                                  fontSize: 10,
                                  textAlign: "center",
                                }}
                              />
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              ))}
            </>
          ) : (
            <SidebarDefaultContents
              router={router}
              items={items}
              position={position as string}
            />
          )}
        </SidebarContent>

        <SidebarFooter>
          <div className="flex justify-between items-center flex-wrap-reverse">
            {!learningModeAllCondition && (
              <SidebarMenuButton
                onClick={() => {
                  logout.mutate();
                }}
                className="w-auto text-destructive dark:text-destructive hover:bg-none hover:text-destructive dark:hover:bg-none dark:hover:text-destructive"
              >
                <LogOut />
                <span>Keluar</span>
              </SidebarMenuButton>
            )}

            <div className="size-8 flex justify-center items-center">
              <ToggleTheme />
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </Suspense>
  );
}
