/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
import { NextResponse } from "next/server";

interface ReturnTypes {
  status: "BERHASIL" | "ERROR";
  message: string;
  data?: JwtPayload;
  detail?: any;
}

export async function checkCookieAndValidate(): Promise<ReturnTypes> {
  const get_cookies = await cookies();
  const cookie = get_cookies.get("payload-token");

  if (!cookie?.value) {
    const result: ReturnTypes = {
      status: "ERROR",
      message: "Token tidak ditemukan, silahkan masuk kembali",
    };
    return result;
  }

  const hash = crypto
    .createHash("sha256")
    .update(process.env.PAYLOAD_SECRET!)
    .digest("hex")
    .slice(0, 32);

  try {
    const decoded = jwt.verify(cookie.value, hash, {
      algorithms: ["HS256"],
    });

    const result: ReturnTypes = {
      status: "BERHASIL",
      message: "Token berhasil diverifikasi",
      data: decoded as JwtPayload,
    };

    return result;
  } catch (err) {
    const result: ReturnTypes = {
      status: "ERROR",
      message: "Token gagal direverifikasi, silahkan login kembali",
      detail: err,
    };

    return result;
  }
}

export async function performAction({
  authenticated,
}: {
  authenticated: () => Promise<NextResponse>;
}) {
  const check_cookie_and_validate = await checkCookieAndValidate();

  switch (check_cookie_and_validate.status) {
    case "BERHASIL":
      return authenticated();
    case "ERROR":
      return NextResponse.json(
        {
          ...check_cookie_and_validate,
        },
        { status: 401 }
      );
  }
}
