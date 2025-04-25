"use server"

import {checkCookieAndValidate} from "@/lib/server";
import {cookies} from "next/headers";

export async function checkCouponCode(couponCode: string) {
    const cok = (await cookies()).get("payload-token");
    const check_cookie_and_validate = await checkCookieAndValidate();

    switch (check_cookie_and_validate.status) {
        case "BERHASIL":
            try {
                const response = await fetch(`${process.env.CLIENT_HOST}/api/check-coupon/${couponCode}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `JWT ${cok?.value}`,
                    },
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();
                return {
                    success: true,
                    ...data
                };
            } catch (error) {
                console.error(`Error checking coupon "${couponCode}":`, error);
                return {
                    success: false,
                    error
                };
            }
        case "ERROR":
            return {
                success: false,
                ...check_cookie_and_validate
            };
        default:
            return {
                success: false,
                error: "Unknown authentication status"
            };
    }
}