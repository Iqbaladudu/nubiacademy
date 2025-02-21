import { checkCookieAndValidate } from "@/lib/server";
import { instance } from "@/services/global";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cok = (await cookies()).get("payload-token");
  const check_cookie_and_validate = await checkCookieAndValidate();

  switch (check_cookie_and_validate.status) {
    case "BERHASIL":
      try {
        const order = await instance.get("/orders/me?depth=0", {
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
        { status: 401 }
      );
    default:
      break;
  }
}

export async function POST(request: Request) {
  const { course_item, order_number, coupon_code } = await request.json();
  const cok = (await cookies()).get("payload-token");

  const formData = new FormData();
  formData.append(
    "_payload",
    JSON.stringify({
      course_item,
      order_number,
      coupon_code,
    })
  );

  const check_cookie_and_validate = await checkCookieAndValidate();

  switch (check_cookie_and_validate.status) {
    case "BERHASIL":
      try {
        const order = await instance.post("/orders", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
        { status: 401 }
      );
    default:
      break;
  }
}
