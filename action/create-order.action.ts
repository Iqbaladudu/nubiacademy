"use server"

import {checkCookieAndValidate} from "@/lib/server";
import {cookies} from "next/headers";

export async function createOrderAction(
    course_item: string,
    order_number: string,
    coupon_code: string
) {
    const cok = (await cookies()).get("payload-token");
    const check_cookie_and_validate = await checkCookieAndValidate();

    if (check_cookie_and_validate.status !== "BERHASIL") {
        return {
            success: false,
            ...check_cookie_and_validate,
            error: "Authentication failed"
        };
    }

    try {
        const payload = {
            item_to_purchase: {
                relationTo: "course",
                value: course_item,
            },
            item_to_purchase_type: "course",
            order_number,
            coupon_code,
        };

        const formData = new FormData();
        formData.append('_payload', JSON.stringify(payload));

        const response = await fetch(`${process.env.CLIENT_HOST}/api/orders`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${cok?.value}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        return {
            success: true,
            data
        };
    } catch (error) {
        console.error("Error creating order:", error);
        return {
            success: false,
            error: "Failed to create order"
        };
    }
}