"use client";

import { useSearchParams } from "next/navigation";
import CourseDashboard, { POSITION } from "./courseDashboard";
import { Suspense } from "react";

export default function KelasPage() {
  const params = useSearchParams();
  const position: POSITION = params.get("position") as POSITION;

  const components = {
    "kelas-saya": <CourseDashboard />,
    "semua-kelas": <CourseDashboard />,
    "kelas-selesai": <CourseDashboard />,
    "jelajahi-kelas-baru": <CourseDashboard />,
  };

  return (
    <Suspense>
      {!components[position] ? (
        <div>Tidak ditemukan</div>
      ) : (
        components[position]
      )}
    </Suspense>
  );
}
