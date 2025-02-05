"use client";

import {
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  SquareCheck,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { ReactElement, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ToggleTheme } from "./toggle-theme";
import { deleteCookie } from "cookies-next/client";
import useCourse from "../../hooks/use-course";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
      {
        title: "Keamanan",
        url: "keamanan",
        icon: <LockKeyhole />,
      },
    ],
  },
];

function SidebarNormalMenuHeader(props: { state: "expanded" | "collapsed" }) {
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
          <span className="font-semibold">Iqbal Adudu</span>
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

export function AppSidebar({ learningMode }: { learningMode: bool }) {
  const { state } = useSidebar();

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

  const data = my_class.data?.data.docs[0];

  useEffect(() => {
    if (my_class.isSuccess) {
      setCourse(data);
    }
  }, [data, my_class.isSuccess, setCourse]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="pl-4 mt-4">
        <SidebarMenu>
          {learningModeAllCondition ? (
            <p className={"prose text-xl"}>{course.name}</p>
          ) : (
            <SidebarNormalMenuHeader state={state} />
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
                      <SidebarMenu>
                        {module?.contents?.map((content, index) => (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton
                              onClick={() =>
                                router.push(`${pathname}?lesson=${content.id}`)
                              }
                              className={"h-auto"}
                              size={"sm"}
                            >
                              <ChevronRight />
                              <span>{content.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
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
                deleteCookie("payload-token");
                router.push("/masuk");
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
  );
}
