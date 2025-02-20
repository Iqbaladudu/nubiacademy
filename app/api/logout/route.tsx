import { instance } from "@/services/global";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookie = (await cookies()).get("payload-token");
  try {
    const logout = await instance.post(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: `JWT ${cookie?.value}`,
        },
      }
    );

    (await cookies()).delete("payload-token");

    return NextResponse.json(
      { message: "Berhasil logout", data: logout.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan", error },
      { status: 400 }
    );
  }
}
