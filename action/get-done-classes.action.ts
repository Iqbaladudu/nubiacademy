"use server";

import { performAction } from "@/lib/server";
import { instance } from "@/services/global";
import { cookies } from "next/headers";

export async function getDoneClasses(page: string | number = 1) {
  return await performAction({
    authenticated: async () => {
      const cok = (await cookies()).get("payload-token");
      try {
        const kelas = await fetch(`${process.env.CLIENT_HOST}/api/course/done?page=${page}`, {
          headers: {
            Authorization: `JWT ${cok?.value}`,
          },
        });

        if (!kelas.ok) {
          throw new Error(`API request failed with status ${kelas.status}`);
        }

        const data = await kelas.json();

        return {
          status: 200,
          ...data,
        };
      } catch (error) {
        return {
          status: 500,
          error: "Failed to fetch done classes",
        };
      }
    },
  });
}