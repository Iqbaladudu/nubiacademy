import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../components/layout/providers/theme-provider";
import ReactQueryProvider from "../components/layout/providers/reactQueryProvider";
import { Suspense } from "react";
const arimo = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "Nubi Academy | Learn Anything in AI Era",
  description: "Nubi Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", arimo.className)}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense>{children}</Suspense>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
