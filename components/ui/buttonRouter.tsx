"use client";

import { ReactNode } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface ButtonRouterProps {
  url: string;
  children: ReactNode | ReactNode[];
}

export function ButtonRouter({ url, children }: ButtonRouterProps) {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`${url}`)} asChild>
      {children}
    </Button>
  );
}
