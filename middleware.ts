import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// Define paths that require authentication
const protectedRoutes = ["/dashboard"];
const protectedRoutesFromEnd = ["/checkout"];
// Define paths where users should be redirected if already logged in
const redirectIfLoggedIn = ["/masuk", "/daftar"];

export default async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("payload-token");
  const isLoggedIn = !!cookie;

  // Check if the user is accessing a protected route
  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    ) ||
    protectedRoutesFromEnd.some((route) =>
      request.nextUrl.pathname.endsWith(route),
    )
  ) {
    if (!isLoggedIn) {
      const response = NextResponse.redirect(new URL("/masuk", request.url));
      response.cookies.set("redirectUrl", request.nextUrl.pathname);
      return response;
    }

    if (request.nextUrl.pathname.endsWith(protectedRoutes[0])) {
      return NextResponse.redirect(
        new URL("/dashboard/kelas?position=kelas-saya", request.url),
      );
    }
  }
  // Check if the user is trying to access login or register pages while already logged in
  else if (redirectIfLoggedIn.includes(request.nextUrl.pathname)) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL("/dashboard/kelas?position=kelas-saya", request.url),
      );
    }
  }

  // If no redirects are needed, proceed to the next middleware or the route handler
  return NextResponse.next();
}
