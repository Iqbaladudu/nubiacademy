"use server";

import { instance } from "@/services/global";

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email");

  try {
    const login = await instance.post("/users/forgot-password", {
      email,
    });

    if (login.status === 200) {
      return { success: true, data: login.data };
    }
    return { success: false, message: "Gagal mengirim permintaan" };
  } catch {
    return { success: false, message: "Terjadi kesalahan" };
  }
}