"use server"

import { cookies } from "next/headers";

export async function getCourses(page: number = 1) {
    try {
        const cookieStore = await cookies();
        const cookie = cookieStore.get("payload-token")

        // Use fetch to call the API endpoint
        const response = await fetch(`${process.env.ENDPOINT}/course?page=${page || 1}`, {
            headers: {
                Authorization: cookie?.value ? `JWT ${cookie.value}` : "",
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        return {
            success: true,
            ...data,
        };
    } catch (error) {
        console.error("Error fetching courses:", error);
        return {
            success: false,
            error: "Failed to fetch courses",
        };
    }
}