import CourseDetailLesson from "@/components/layout/pages/CourseDetailLesson";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <CourseDetailLesson />
}
