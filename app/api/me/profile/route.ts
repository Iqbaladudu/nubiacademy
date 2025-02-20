import { checkCookieAndValidate } from "@/lib/server";
import { instance } from "@/services/global";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const check_cookie_and_validate = await checkCookieAndValidate();
  const cookie = (await cookies()).get("payload-token");
  const req = await request.json();

  switch (check_cookie_and_validate.status) {
    case "BERHASIL":
      try {
        const update_profile = await instance.patch(
          `/users/${check_cookie_and_validate?.data?.id}`,
          {
            ...req,
          },
          {
            headers: {
              Authorization: `JWT ${cookie?.value}`,
            },
          }
        );

        return NextResponse.json(
          {
            ...update_profile.data,
          },
          {
            status: 200,
          }
        );
      } catch (error) {
        return NextResponse.json(
          {
            message: "Terdapat kesalahan",
            error,
          },
          {
            status: 401,
          }
        );
      }
    case "ERROR":
      return NextResponse.json(
        {
          ...check_cookie_and_validate,
        },
        { status: 401 }
      );
  }
}

export async function GET() {
  const check_cookie_and_validate = await checkCookieAndValidate();
  const cookie = (await cookies()).get("payload-token");

  switch (check_cookie_and_validate.status) {
    case "BERHASIL":
      try {
        const me = await instance.get("/users/me", {
          headers: {
            Authorization: `JWT ${cookie?.value}`,
          },
        });
        if (me.status === 200) {
          return NextResponse.json(
            {
              ...me.data.user,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              message: "Terdapat kesalahan",
            },
            { status: me.status }
          );
        }
      } catch {
        return NextResponse.json(
          { message: "Terdapat kesalahan" },
          { status: 401 }
        );
      }
    case "ERROR":
      return NextResponse.json(
        {
          ...check_cookie_and_validate,
        },
        { status: 401 }
      );
  }
}
