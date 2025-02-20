import { performAction } from "@/lib/server";
import { instance } from "@/services/global";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const cok = (await cookies()).get("payload-token");

  return await performAction({
    authenticated: async () => {
      try {
        const kelas = await instance.get(`/course/done?page=${page}`, {
          headers: {
            Authorization: `JWT ${cok?.value}`,
          },
        });

        return NextResponse.json({ ...kelas.data }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
    },
  });
}
