"use server"

import {instance} from "@/services/global";
import {cookies} from "next/headers";

export async function loginUser(email: string, password: string) {
    try {
        const login = await instance.post("/users/login", {
            email,
            password,
        });

        if (login.status !== 200) {
            return {
                success: false,
                message: "Login failed"
            };
        }

        const {id, fullname, username, phone, email: userEmail} = login.data.user;

        // Extract cookie from response headers
        const authCookie = login.headers["set-cookie"]?.[0];

        if (authCookie) {
            // Parse the cookie string to get name and value
            const cookieParts = authCookie.split(';')[0].split('=');
            const cookieName = cookieParts[0];
            const cookieValue = cookieParts.slice(1).join('=');
            const cookieStore = await cookies()

            // Set cookie in the browser
            cookieStore.set(cookieName, cookieValue, {
                path: '/',
                // Copy other cookie attributes as needed
                httpOnly: authCookie.includes('HttpOnly'),
                secure: authCookie.includes('Secure'),
                sameSite: authCookie.includes('SameSite=Strict') ? 'strict' :
                    authCookie.includes('SameSite=Lax') ? 'lax' : 'none',
            });
        }

        return {
            success: true,
            message: "Berhasil",
            user: {
                id,
                fullname,
                username,
                phone,
                email: userEmail,
            },
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "Terjadi kesalahan",
        };
    }
}