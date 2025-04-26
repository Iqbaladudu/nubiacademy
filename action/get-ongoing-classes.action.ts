"use server";

import { cookies } from "next/headers";

export async function getOngoingClasses(page: string | number = 1) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("payload-token")

  try {
    const kelas = await fetch(`${process.env.CLIENT_HOST}/api/course/ongoing?page=${page}`, {
      headers: {
        Authorization: cookie?.value ? `JWT ${cookie.value}` : "",
      },

      cache: 'no-store',

    });

    if (!kelas.ok) {
      throw new Error(`API request failed with status ${kelas.status}`);
    }

    const data = await kelas.json();


    return {
      success: true,
      ...data,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      success: false,
      error: "Failed to fetch courses",
    };
  }
}