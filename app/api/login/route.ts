import { instance } from "@/services/global";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const req = await request.json();

  try {
    const login = await instance.post("/users/login", {
      email: req.email,
      password: req.password,
    });

    const { id, fullname, username, phone, email } = login.data.user;

    if (login.status === 200) {
      const cks = login.headers["set-cookie"];
      return new Response(
        JSON.stringify({
          message: "Berhasil",
          user: {
            id,
            fullname,
            username,
            phone,
            email,
          },
        }),
        {
          status: 200,
          headers: { "Set-Cookie": cks[0] },
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Terjadi kesalahan",
      }),
      {
        status: 401,
      }
    );
  }
}
