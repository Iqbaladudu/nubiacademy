import { NextRequest, NextResponse } from "next/server";
import { instance } from "@/services/global";
import { cookies } from "next/headers";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const cok = (await cookies()).get("payload-token");

  try {
    const lesson = await instance.get(`/course-content/${id}`, {
      headers: {
        Authorization: `JWT ${cok?.value}`,
      },
    });

    if (lesson.status === 200) {
      return NextResponse.json(
        {
          ...lesson.data,
        },
        { status: 200 },
      );
    } else if (lesson.status === 404) {
      return NextResponse.json(
        {
          message: "Not Found",
        },
        { status: 404 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Terjadi kesalahan",
        },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Terjadi kesalaham",
        error,
      },
      { status: 401 },
    );
  }
}
