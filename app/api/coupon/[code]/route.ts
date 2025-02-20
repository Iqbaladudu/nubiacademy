import { checkCookieAndValidate } from "@/lib/server";
import { instance } from "@/services/global";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const code = (await params).code;
  const cok = (await cookies()).get("payload-token");

  const check_cookie_and_validate = await checkCookieAndValidate();

  switch (check_cookie_and_validate.status) {
    case "BERHASIL":
      try {
        const order = await instance.get(`/check-coupon/${code}`, {
          headers: {
            Authorization: `JWT ${cok?.value}`,
          },
        });

        return NextResponse.json({ ...order.data }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
    case "ERROR":
      return NextResponse.json(
        {
          ...check_cookie_and_validate,
        },
        { status: 401 },
      );
    default:
      break;
  }
}
