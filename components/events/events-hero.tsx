"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

export default function EventsHero({
  title,
  description,
  category,
}: {
  title: string;
  description: string;
  category: string;
}) {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="navbar px-5 md:px-0">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <Badge className="w-20">{category}</Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                {title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed line-clamp-4">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="font-semibold">
                Daftar sekarang
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            <div className="flex items-center space-x-4 pt-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
