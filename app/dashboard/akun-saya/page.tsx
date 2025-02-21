"use client";
import Profile from "@/components/layout/pages/profile";
import { useSearchParams } from "next/navigation";

export default function AccountPage() {
  const params = useSearchParams();
  const position = params.get("position");

  const components = {
    profil: <Profile />,
    keamanan: <Profile />,
  };

  return (
    <>
      {!components[position] ? (
        <div>Tidak ditemukan</div>
      ) : (
        components[position]
      )}
    </>
  );
}
