"use client";

import { useSearchParams } from "next/navigation";
import CourseDashboard, { POSITION } from "./courseDashboard";

export default function KelasPage() {
  const params = useSearchParams();
  const position = params.get("position") as POSITION;

  // Only render dashboard if position is valid
  if (
    ![
      POSITION.KELAS_SAYA,
      POSITION.SEMUA_KELAS,
      POSITION.KELAS_SELESAI,
      POSITION.JELAJAHI_KELAS_BARU,
    ].includes(position)
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-2">Tidak ditemukan</h2>
        <p className="text-muted-foreground">
          Halaman atau posisi kelas tidak valid.
        </p>
      </div>
    );
  }

  return <CourseDashboard />;
}
