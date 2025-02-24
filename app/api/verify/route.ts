import { instance } from "@/services/global";
export async function POST(request: Request) {
  const req = await request.json();

  try {
    const verify = await instance.post(`/users/verify/${req.token}`);

    if (verify.status === 200) {
      return new Response(JSON.stringify({ ...verify.data }), {
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
