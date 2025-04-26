"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getMyClasses(page: string | number = 1) {
  const cok = (await cookies()).get("payload-token");
  try {
    const kelas = await fetch(`${process.env.CLIENT_HOST}/api/course/me?page=${page}`, {
      headers: {
        Authorization: `JWT ${cok?.value}`,
      },
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