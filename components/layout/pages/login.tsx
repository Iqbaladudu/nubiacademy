import Link from "next/link";

import { LoginForm } from "../sections/loginForm";
import { Button } from "@/components/ui/button";
import { Icn } from "@/components/ui/icn";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { from, username } = await searchParams;

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="container absolute h-9 top-9 flex justify-between">
        <Button variant={"ghost"} asChild>
          <Link href={"/"}>{<Icn name="ChevronLeft" size={24} />} Kembali</Link>
        </Button>
        <Button variant={"ghost"} className="hidden md:flex" asChild>
          <Link href={"/daftar"}>Daftar</Link>
        </Button>
      </div>
      <div className="container my-auto mx-auto flex justify-center items-center">
        <div className="w-[90%] md:w-[50%] lg:w-[25%]">
          <div className="flex flex-col space-y-2 mb-3 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {from === "register-success" && username
                ? `Halo ${username}, Selamat Datang di Nubi Academy!`
                : "Masuk ke Nubi Academy"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {from === "register-success" && username
                ? "Silahkan masuk menggunakan email dan kata sandi yang telah kamu daftarkan"
                : "Pastikan kamu memasukkan email dan kata sandi yang benar"}
            </p>
          </div>
          <LoginForm />
          {/* <p className="px-8 text-center text-sm text-muted-foreground mt-4">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p> */}
          <div className="flex flex-row gap-2 justify-center items-center mt-4">
            <p className="text-muted-foreground">Belum punya akun?</p>
            <Button size="sm" variant={"ghost"} asChild>
              <Link href={"/daftar"}>Daftar sekarang</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
