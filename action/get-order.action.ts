"use server";

import { checkCookieAndValidate } from "@/lib/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getOrderAction() {
  const cok = (await cookies()).get("payload-token");
  const check_cookie_and_validate = await checkCookieAndValidate();

  switch (check_cookie_and_validate.status) {
    case "BERHASIL":
      try {
        const order = await axios(`${process.env.ENDPOINT}/orders/me?depth=0`, {
          headers: {
            Authorization: `JWT ${cok?.value}`,
          },
        });
        return { ...order.data, status: 200 };
      } catch (error) {
        return { error, status: 500 };
      }
    case "ERROR":
      return { ...check_cookie_and_validate, status: 401 };
    default:
      return { error: "Unknown error", status: 500 };
  }
}