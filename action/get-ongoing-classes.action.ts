"use server";

import { performAction } from "@/lib/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getOngoingClasses(page: string | number = 1) {
  return await performAction({
    authenticated: async () => {
      const cok = (await cookies()).get("payload-token");
      try {
        const kelas = await fetch(`${process.env.CLIENT_HOST}/api/course/ongoing?page=${page}`, {
          headers: {
            Authorization: `JWT ${cok?.value}`,
          },
        });

        if (!kelas.ok) {
          throw new Error(`API request failed with status ${kelas.status}`);
        }

        const data = await kelas.json();
        
        return NextResponse.json({ ...data }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
    },
  });
}