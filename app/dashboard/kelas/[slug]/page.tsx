import {KelasDetailContents} from "@/components/layout/KelasDetailContents";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = await params.slug;
  return (
    <div>
      <KelasDetailContents slug={slug} />
    </div>
  );
}
