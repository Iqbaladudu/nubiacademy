import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icn } from "@/components/ui/icn";
import { RegisterForm } from "../sections/registerForm";

export default function RegisterPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute container h-9 top-9 flex justify-between">
        <Button variant={"ghost"} asChild>
          <Link href={"/"}>
            {<Icn name="ChevronLeft" size={24} color="black" />} Kembali
          </Link>
        </Button>
        <Button variant={"ghost"} className="hidden md:flex" asChild>
          <Link href={"/masuk"}>Masuk</Link>
        </Button>
      </div>
      <div className="container h-[800px] my-auto mx-auto flex justify-center items-center">
        <div className="w-[90%] md:w-[50%] lg:w-[25%]">
          <div className="flex flex-col space-y-2 mb-3 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Buat akun Nubi Academy
            </h1>
            <p className="text-sm text-muted-foreground">
              Pastikan kamu memasukkan email dan kata sandi yang benar
            </p>
          </div>
          <RegisterForm />
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
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="text-muted-foreground">Sudah punya akun?</p>
            <Button variant={"outline"} asChild>
              <Link href={"/masuk"}>Masuk sekarang</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
