"use server";

import { cookies } from "next/headers";

export async function getProfile() {
  const cookie = await cookies();
  const cok = cookie.get("payload-token");
  const res = await fetch(`${process.env.CLIENT_HOST}/api/users/me`, {
    headers: {
      Authorization: `JWT ${cok?.value}`,
    },
    cache: "no-store",
  });
  const data = await res.json()
  if (!res.ok) throw new Error("Gagal mengambil profil");
  return {
    ...data,
    status: res.status,
  };
}