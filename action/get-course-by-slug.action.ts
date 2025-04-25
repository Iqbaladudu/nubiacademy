"use server"

import {cookies} from "next/headers";

export async function getCourseBySLug(slug: string) {
    try {
        const cookieStore = await cookies();
        const cookie = cookieStore.get("token");

        const response = await fetch(
            `${process.env.CLIENT_HOST}/api/course?where[slug][equals]=${slug}`, {
                headers: {
                    Authorization: cookie?.value ? `JWT ${cookie.value}` : "",
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        return {
            success: true,
            ...data,
        };
    } catch (error) {
        console.error(`Error fetching course with slug "${slug}":`, error);
        return {
            success: false,
            error: "Failed to fetch course details",
        };
    }
}