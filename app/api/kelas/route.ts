import { instance } from "@/services/global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const kelas = await instance.get("/course");

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
