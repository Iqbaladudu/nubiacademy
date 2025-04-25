"use client";

import {Menu} from "lucide-react";
import {getPinnedCourses} from "@/action/get-pinned-courses.action";
import React from "react";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,} from "../ui/sheet";
import {Separator} from "../ui/separator";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {Button} from "../ui/button";
import Link from "next/link";
import {ToggleTheme} from "./toggle-theme";
import {Icn} from "../ui/icn";
import {useAuth} from "@/hooks/use-auth";
import {useQuery} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {cn} from "@/lib/utils";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "/kelas",
        label: "Kelas",
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
    const {user} = useAuth();
    const pathname = usePathname();

    const pinnedCoursesQuery = useQuery({
        queryKey: ["pinned-courses"],
        queryFn: async () => {
            const response = await getPinnedCourses();
            return response;
        },
    });

    // Helper to check if a route is active
    const isActive = (href: string) => href !== "#" && pathname.startsWith(href);

    return (
        <header
            className={clsx(
                "sticky top-0 lg:top-4 z-50 mx-auto w-full md:w-[90%] lg:w-[80%] xl:max-w-7xl",
                "rounded-none lg:rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg",
                "flex justify-between items-center px-4 md:px-8 py-2 transition-all duration-300",
            )}
            style={{
                border: "1px solid rgba(120,120,180,0.08)",
            }}
        >
            {/* Logo */}
            <Link
                href="/"
                className="font-extrabold text-xl tracking-tight flex items-center text-indigo-700 dark:text-indigo-300 hover:opacity-90 transition-opacity"
            >
                NUBI ACADEMY
            </Link>

            {/* Mobile Hamburger */}
            <div className="flex items-center lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full p-2"
                            aria-label="Buka menu"
                        >
                            <Menu className="h-7 w-7"/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className={cn(
                            "flex flex-col justify-between p-0 bg-white/95 dark:bg-zinc-900/95 border-none shadow-xl max-w-xs w-full",
                            "rounded-tr-2xl rounded-br-2xl",
                        )}
                    >
                        {/* Logo sticky di atas */}
                        <div
                            className="sticky top-0 z-10 bg-white/95 dark:bg-zinc-900/95 px-6 pt-6 pb-2 border-b border-border/20">
                            <SheetHeader className="mb-0">
                                <SheetTitle
                                    className="flex items-center text-indigo-700 dark:text-indigo-300 text-xl font-extrabold">
                                    <Link href="/" onClick={() => setIsOpen(false)}>
                                        NUBI ACADEMY
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                        </div>
                        {/* Menu scrollable */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                            {routeList.map(({href, label}) => (
                                <Button
                                    key={href}
                                    onClick={() => setIsOpen(false)}
                                    asChild
                                    variant={isActive(href) ? "secondary" : "ghost"}
                                    className={cn(
                                        "justify-start text-base rounded-lg h-12 font-medium transition-all duration-200",
                                        isActive(href) &&
                                        "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200",
                                    )}
                                >
                                    <Link href={href}>{label}</Link>
                                </Button>
                            ))}
                            <Separator className="my-2"/>
                            <Button
                                asChild
                                variant="secondary"
                                className="justify-start text-base rounded-lg h-12 font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                                onClick={() => setIsOpen(false)}
                            >
                                <Link href="/masuk">Masuk</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="justify-start text-base rounded-lg h-12 font-semibold border-indigo-600 text-indigo-700 dark:text-indigo-200"
                                onClick={() => setIsOpen(false)}
                            >
                                <Link href="/daftar">Daftar</Link>
                            </Button>
                        </div>
                        {/* Footer: theme toggle */}
                        <SheetFooter className="flex-col items-start px-6 pb-6 pt-2">
                            <Separator className="mb-2"/>
                            <ToggleTheme/>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:block mx-auto">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="bg-transparent text-base font-semibold hover:bg-indigo-50 dark:hover:bg-zinc-800 transition-colors">
                            Belajar Sekarang
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid w-[600px] grid-cols-1 gap-5 p-4">
                                <ul className="flex flex-col gap-2">
                                    {pinnedCoursesQuery.isSuccess &&
                                        pinnedCoursesQuery.data.success &&
                                        pinnedCoursesQuery.data.data.docs.map(
                                            ({name, short_description}) => (
                                                <li
                                                    key={name}
                                                    className="rounded-md p-3 text-sm hover:bg-indigo-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                                                >
                                                    <p className="mb-1 font-semibold leading-none text-foreground">
                                                        {name}
                                                    </p>
                                                    <p className="line-clamp-2 text-muted-foreground">
                                                        {short_description}
                                                    </p>
                                                </li>
                                            ),
                                        )}
                                    <Link href={"/kelas"}>
                                        <li className="rounded-md p-3 text-sm hover:bg-indigo-100 dark:hover:bg-zinc-800 cursor-pointer flex flex-row justify-between items-center transition-colors">
                                            <div>
                                                <p className="mb-1 font-semibold leading-none text-foreground">
                                                    Selengkapnya
                                                </p>
                                                <p className="line-clamp-2 text-muted-foreground">
                                                    Nikmati akses belajar tanpa batas di Nubi Academy
                                                </p>
                                            </div>
                                            <Icn name="MoveRight" color="black" size={24}/>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        {routeList.map(({href, label}) => (
                            <NavigationMenuLink
                                key={label}
                                asChild
                                className={clsx(
                                    "text-base px-3 py-1 rounded-lg font-medium transition-all ml-2 first:ml-0 duration-200",
                                    isActive(href)
                                        ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200"
                                        : "hover:bg-indigo-50 dark:hover:bg-zinc-800 hover:text-white",
                                )}
                            >
                                <Link href={href}>{label}</Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Auth & Theme */}
            <div className="hidden lg:flex items-center gap-2">
                <ToggleTheme/>
                {user !== null ? (
                    <Button
                        asChild
                        className="ml-3 rounded-lg text-white font-semibold shadow"
                    >
                        <Link href={"/dashboard"}>Dasbor</Link>
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="secondary"
                            asChild
                            className="mx-2 text-white rounded-lg font-semibold shadow"
                        >
                            <Link href="/masuk">Masuk</Link>
                        </Button>
                        <Button
                            asChild
                            className="text-white dark:bg-background border rounded-lg font-semibold shadow"
                        >
                            <Link href="/daftar">Daftar</Link>
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
};
