import { instance } from "@/services/global";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const cookie = (await cookies()).get("payload-token");

  try {
    const kelas = await instance.get(`/course?where[slug][equals]=${slug}`, {
      headers: {
        Authorization: cookie?.value ? `JWT ${cookie.value}` : "",
      },
    });

    if (kelas.data.totalDocs > 0) {
      return NextResponse.json(
        {
          ...kelas.data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Kelas tidak ditemukan",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Terjadi kesalahan",
        error,
      },
      { status: 401 }
    );
  }
}
