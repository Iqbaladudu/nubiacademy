/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichText } from "@payloadcms/richtext-lexical/react";

export default function EventsDescription({
  description,
}: {
  description: any;
}) {
  return (
    <div className="navbar px-5 md:px-0">
      <h2 className="text-xl font-bold">Deskripsi</h2>
      <RichText className=" text-gray-600 text-justify" data={description} />
    </div>
  );
}
