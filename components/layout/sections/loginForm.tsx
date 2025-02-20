"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { instance, local } from "@/services/global";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { db } from "@/db";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

type Inputs = {
  email: string;
  password: string;
};

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const redirectUrl = getCookie("redirectUrl")!;

  const login = useMutation({
    mutationFn: (data: Inputs) => {
      setIsLoading(true);
      return local.post("/login", {
        email: data.email,
        password: data.password,
      });
    },
    onSettled: () => setIsLoading(false),
    onSuccess: async (data) => {
      try {
        await db.user.add({
          ...data.data.user,
        });
      } catch {
        return;
      } finally {
      }
    },
  });

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => login.mutate(data);

  useEffect(() => {
    if (login.isSuccess) {
      toast.success("Berhasil masuk", { duration: 2000 });
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard/kelas?position=kelas-saya");
      }
      return;
    } else if (login?.error?.response?.status === 401) {
      toast.warning("Gagal, periksa email atau kata sandi kamu", {
        duration: 2000,
      });
      return;
    }
  }, [login.isSuccess, login?.error, router, redirectUrl]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Toaster richColors />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              {...register("email", { required: true })}
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Kata sandi
            </Label>
            <Input
              id="password"
              placeholder="Masukkan kata sandi"
              type="password"
              {...register("password", { required: true })}
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} className="mt-3">
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Masuk
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Google
      </Button>
    </div>
  );
}
