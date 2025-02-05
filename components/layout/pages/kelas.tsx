"use client";

import { useSearchParams } from "next/navigation";
import MyCourse from "./myCourse";

export default function KelasPage() {
  const params = useSearchParams();
  const position = params.get("position");

  const components = {
    "kelas-saya": <MyCourse />,
  };

  return !components[position] ? (
      <div>Tidak ditemukan</div>
  ) : (
      components[position]
  );
}
