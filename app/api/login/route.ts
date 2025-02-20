import { instance } from "@/services/global";
export async function POST(request: Request) {
  const req = await request.json();

  try {
    const login = await instance.post("/users/login", {
      email: req.email,
      password: req.password,
    });

    const { id, fullname, username, phone, email } = login.data.user;

    if (login.status === 200) {
      const cookie = login?.headers?.get("Set-Cookie");
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
          headers: { "Set-Cookie": cookie },
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
