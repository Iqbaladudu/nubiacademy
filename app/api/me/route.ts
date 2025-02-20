import { checkCookieAndValidate } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET() {
  const check_cookie_and_validate = await checkCookieAndValidate();

  switch (check_cookie_and_validate.status) {
    case "BERHASIL":
      return NextResponse.json(
        {
          ...check_cookie_and_validate,
        },
        { status: 200 },
      );
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
