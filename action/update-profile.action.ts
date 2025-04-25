"use server";

import { cookies } from "next/headers";

export async function updateProfile(data: any) {
    const cookie = await cookies();
    const cok = cookie.get("payload-token");
    const res = await fetch(`${process.env.CLIENT_HOST}/api/me/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `payload-token=${cok?.value ?? ""}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Gagal update profil");
    }
    return res.json();
  }
  