import SidebarProvider from "@/components/layout/sidebarProvider";
import { CourseProvider } from "../../context/courseContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CourseProvider>
      <SidebarProvider>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] flex-1 md:min-h-min">{children}</div>
        </div>
      </SidebarProvider>
    </CourseProvider>
  );
}
