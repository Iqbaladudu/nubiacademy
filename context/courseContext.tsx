"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface CourseContextValues {
  course: any;
  setCourse: Dispatch<SetStateAction<any>>;
}

export const CourseContext = createContext<CourseContextValues>({
  course: "",
  setCourse: function () {},
});

export function CourseProvider({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  const [course, setCourse] = useState<any>();

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
}
