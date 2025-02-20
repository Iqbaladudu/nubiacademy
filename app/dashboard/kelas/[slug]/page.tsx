import { KelasDetailContents } from "@/components/layout/KelasDetailContents";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div className="pb-5">
      <KelasDetailContents slug={slug} />
    </div>
  );
}
