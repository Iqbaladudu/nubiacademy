"use server"

import {getPayload} from 'payload'
import config from '@payload-config'

const payload = await getPayload({config})

export async function getPinnedCourses() {
    try {
        const response = await payload.find({
            collection: "course", // Adjust collection name if needed
            where: {
                highlight: {
                    equals: "yes",
                },
            },
        });

        return {
            success: true,
            data: response,
        };
    } catch (error) {
        console.error("Error fetching highlighted courses:", error);
        return {
            success: false,
            error: "Failed to fetch pinned courses",
        };
    }
}