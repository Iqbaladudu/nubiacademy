"use client";

import {
  AppSidebar,
  Items,
  items as menuItem,
} from "@/components/layout/app-sidebar";
import {
  SidebarProvider as Provider,
  SidebarInset,

} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import isValidMongoId from "../../util/isValidMongoId";
import useCourse from "../../hooks/use-course";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

function isValidKelasSlug(path: string): boolean {
  // Pisahkan path menjadi array menggunakan '/' sebagai pemisah
  const pathArray: string[] = path.split("/");

  // Cari indeks dari 'kelas'
  const kelasIndex: number = pathArray.indexOf("kelas");

  // Periksa apakah 'kelas' ada dan apakah elemen setelahnya adalah slug yang valid
  if (kelasIndex !== -1 && kelasIndex < pathArray.length - 1) {
    const slug = pathArray[kelasIndex + 1];
    // Periksa apakah slug valid (tidak kosong dan hanya mengandung huruf, angka, dan tanda hubung)
    const slugRegex = /^[a-zA-Z0-9-]+$/;
    return slugRegex.test(slug);
  } else {
    return false;
  }
}

function getKelasAndSlug(path: string): [string, string] {
  // Pisahkan path menjadi array menggunakan '/' sebagai pemisah
  const pathArray: string[] = path.split("/");

  // Cari indeks dari 'kelas'
  const kelasIndex: number = pathArray.indexOf("kelas");

  // Jika 'kelas' ditemukan, ambil slug setelahnya
  if (kelasIndex !== -1 && kelasIndex < pathArray.length - 1) {
    const slug = pathArray[kelasIndex + 1];
    return ["kelas", slug];
  } else {
    return ["", ""]; // Mengembalikan array kosong jika tidak ditemukan
  }
}

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subRoute, setSubRoute] = useState<Items>();
  const [detailArray, setDetailArray] = useState<string[]>();
  const router = useRouter();
  const params = useSearchParams();
  const position = params.get("position");
  const pathname = usePathname();
  const module_id = pathname.split("/")[pathname.split("/").length - 1]
  const is_kelas_route_available = pathname.split("/").includes("kelas");
  const is_valid_module_id = isValidMongoId(module_id);
  const [learningMode, setLearningMode] = useState<Bool>();

  useEffect(() => {
    if (is_kelas_route_available && is_valid_module_id) {
      setLearningMode(true);
    } else {
      setLearningMode(false);
    }
  }, [is_kelas_route_available, is_valid_module_id]);

  useEffect(() => {
    if (position) {
      for (const items of menuItem) {
        // Check if the current item has nested items
        if (items.items) {
          // Find the match in the nested items
          const found = items.items.find((item) => item.url === position);
          if (found) {
            setSubRoute(items);
          }
        }
      }
    } else if (isValidKelasSlug(pathname) && !position) {
      setDetailArray(getKelasAndSlug(pathname));
    }
  }, [position]);

  return (
    <Provider>
      <AppSidebar learningMode={learningMode} />
      <SidebarInset>
        {/*<Breadcrumb className="mt-6 ml-3">*/}
        {/*  <BreadcrumbList>*/}
        {/*    <BreadcrumbItem>Nubi Academy</BreadcrumbItem>*/}
        {/*    <BreadcrumbSeparator />*/}
        {/*    <BreadcrumbItem*/}
        {/*      className="cursor-pointer"*/}
        {/*      onClick={() => router.push("/dashboard")}*/}
        {/*    >*/}
        {/*      <BreadcrumbLink>Dasbor</BreadcrumbLink>*/}
        {/*    </BreadcrumbItem>*/}
        {/*    {position && (*/}
        {/*      <>*/}
        {/*        <BreadcrumbSeparator />*/}
        {/*        <BreadcrumbItem>*/}
        {/*          <BreadcrumbItem>{subRoute?.title}</BreadcrumbItem>*/}
        {/*        </BreadcrumbItem>*/}
        {/*        <BreadcrumbSeparator />*/}
        {/*      </>*/}
        {/*    )}*/}
        {/*    <BreadcrumbItem>*/}
        {/*      <BreadcrumbPage>*/}
        {/*        {subRoute?.items?.map((arr) =>*/}
        {/*          arr.url === position && arr.title*/}
        {/*        )}*/}
        {/*      </BreadcrumbPage>*/}
        {/*    </BreadcrumbItem>*/}
        {/*    {isValidKelasSlug(pathname) &&*/}
        {/*      !position &&*/}
        {/*      detailArray &&*/}
        {/*      detailArray.map((arr, index) => (*/}
        {/*          <BreadcrumbDetailComponents arr={arr} key={index}/>*/}
        {/*      ))}*/}
        {/*  </BreadcrumbList>*/}
        {/*</Breadcrumb>*/}
        {/* <SidebarTrigger /> */}
        {children}
      </SidebarInset>
    </Provider>
  );
}

const BreadcrumbDetailComponents = ({arr}:{arr: string}) => {
  return (
      <>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{arr}</BreadcrumbLink>
        </BreadcrumbItem>
      </>
  )
}
