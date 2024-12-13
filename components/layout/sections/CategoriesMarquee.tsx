"use client";

import { Card } from "@/components/ui/card";
import "@devnomic/marquee/dist/index.css";
import { ReactMarques } from "react-marques";

interface sponsorsProps {
  name: string;
}

const sponsors: sponsorsProps[] = [
  {
    name: "Machine Learning",
  },
  {
    name: "Python",
  },
  {
    name: "Javascript",
  },
  {
    name: "Graphic Designer",
  },
  {
    name: "Logika",
  },
  {
    name: "Critical Thinking",
  },
  {
    name: "Bahasa Inggris",
  },
];

const sponsors2: sponsorsProps[] = [
  {
    name: "Google Workspace",
  },
  {
    name: "Microsoft Excel",
  },
  {
    name: "Bahasa Aran",
  },
  {
    name: "Basic Life Skill",
  },
  {
    name: "Etika dan Moral",
  },
  {
    name: "Kecerdasan Buatan",
  },
  {
    name: "Prompt Engineering",
  },
];

export const CategoriesMarquee = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <div className="mx-auto">
        <ReactMarques fade={true}>
          {sponsors.map(({ name }) => (
            <Card
              key={name}
              className="flex items-center text-sm p-5 lg:text-2xl font-medium w-28 lg:w-40 justify-center h-24 lg:h-32"
            >
              <p className=" text-center text-muted-foreground">{name}</p>
            </Card>
          ))}
        </ReactMarques>
        <ReactMarques fade={true} reverse={true} className="mt-5">
          {sponsors2.map(({ name }) => (
            <Card
              key={name}
              className="flex items-center text-sm lg:text-2xl font-medium w-28 lg:w-40 justify-center h-24 lg:h-32"
            >
              <p className=" text-center p-5 text-muted-foreground">{name}</p>
            </Card>
          ))}
        </ReactMarques>
      </div>
    </section>
  );
};
