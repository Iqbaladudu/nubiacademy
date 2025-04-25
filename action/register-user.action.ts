"use server"

import {instance} from "@/services/global";

export async function registerUser(
    fullname: string,
    username: string,
    email: string,
    password: string
) {
    try {
        const response = await instance.post("/users", {
            fullname,
            username,
            email,
            password,
        });

        return {
            success: true,
            message: "Pendaftaran berhasil!",
            data: response.data
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            message: "Gagal, periksa kembali data yang kamu masukkan!",
        };
    }
}