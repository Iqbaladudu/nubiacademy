"use client";

import { Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";
import { Icn } from "../ui/icn";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/kelas",
    label: "Lihat kelas",
  },
  {
    href: "#",
    label: "Tentang Kami",
  },
  {
    href: "#",
    label: "Kontak",
  },
  {
    href: "#",
    label: "Pertanyaan",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { user } = useAuth();

  const pinnedClass = useQuery({
    queryKey: ["pinned-class"],
    queryFn: async () => {
      return axios.get("/api/kelas/pinned");
    },
  });

  return (
    <header className="bg-opacity-15 w-[100%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto sticky rounded-2xl flex justify-between items-center px-5 md:px-0 py-2 bg-card z-50">
      <Link href="/" className="font-bold text-lg flex items-center">
        NUBI ACADEMY
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    NUBI ACADEMY
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
                <Button
                  asChild
                  variant="outline"
                  className="justify-start text-base"
                >
                  <Link href="/masuk">Masuk</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="justify-start text-base"
                >
                  <Link href="/daftar">Daftar</Link>
                </Button>
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Belajar Sekarang
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-1 gap-5 p-4">
                <ul className="flex flex-col gap-2">
                  {pinnedClass.isSuccess &&
                    pinnedClass.data.data.docs.map(
                      ({ name, short_description }) => (
                        <li
                          key={name}
                          className="rounded-md p-3 text-sm hover:bg-muted cursor-pointer"
                        >
                          <p className="mb-1 font-semibold leading-none text-foreground">
                            {name}
                          </p>
                          <p className="line-clamp-2 text-muted-foreground">
                            {short_description}
                          </p>
                        </li>
                      )
                    )}
                  <Link href={"/kelas"}>
                    <li className="rounded-md p-3 text-sm hover:bg-muted cursor-pointer flex flex-row justify-between items-center">
                      <div className="">
                        <p className="mb-1 font-semibold leading-none text-foreground">
                          Selengkapnya
                        </p>
                        <p className="line-clamp-2 text-muted-foreground">
                          Nikmati akses belajar tanpa batas di Nubi Academy
                        </p>
                      </div>
                      <Icn name="MoveRight" color="black" size={24} />
                    </li>
                  </Link>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={label} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ToggleTheme />
        {user !== null ? (
          <Button asChild className="ml-3">
            <Link href={"/dashboard"}>Dasbor</Link>
          </Button>
        ) : (
          <>
            <Button variant="secondary" asChild className="mx-3 text-white">
              <Link href="/masuk">Masuk</Link>
            </Button>
            <Button asChild className="text-white dark:bg-background border">
              <Link href="/daftar">Daftar</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
