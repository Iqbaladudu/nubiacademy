import { instance } from "@/services/global";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookie = (await cookies()).get("payload-token");
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const kelas = await instance.get(`/course?page=${page}`, {
      headers: {
        Authorization: cookie?.value ? `JWT ${cookie.value}` : "",
      },
    });

    return NextResponse.json(
      { ...kelas.data },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 401,
      }
    );
  }
}
