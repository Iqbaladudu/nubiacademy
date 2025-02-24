import { instance } from "@/services/global";
export async function POST(request: Request) {
  const req = await request.json();

  try {
    const login = await instance.post("/users/forgot-password", {
      email: req.email,
    });

    if (login.status === 200) {
      return new Response(JSON.stringify({ ...login.data }), {
        status: 200,
      });
    }
  } catch {
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
