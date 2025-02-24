import { ResetPasswordForm } from "@/components/layout/sections/reset-password-form";
import { Button } from "@/components/ui/button";
import { Icn } from "@/components/ui/icn";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi | Nubi Academy",
};

export default function ResetPassword() {
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
              Atur Ulang Kata Sandi
            </h1>
            <p className="text-sm text-muted-foreground">
              Masukkan kata sandi yang valid.
            </p>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
