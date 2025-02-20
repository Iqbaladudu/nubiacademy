import SidebarProvider from "../../components/layout/providers/sidebarProvider";
import { CourseProvider } from "../../context/courseContext";
import { LessonPositionProvider } from "../../components/layout/providers/lesson-position-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LessonPositionProvider>
      <CourseProvider>
        <SidebarProvider>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="max-h-[100vh] flex-1 md:min-h-min">{children}</div>
          </div>
        </SidebarProvider>
      </CourseProvider>
    </LessonPositionProvider>
  );
}
