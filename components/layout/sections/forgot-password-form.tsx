"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { local } from "@/services/global";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

type Inputs = {
  email: string;
};

export function ForgotPasswordForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const forgot_password = useMutation({
    mutationFn: (data: Inputs) => {
      setIsLoading(true);
      return local.post("/forgot-password", {
        email: data.email,
      });
    },
    onSettled: () => setIsLoading(false),
  });

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    forgot_password.mutate(data);

  useEffect(() => {
    if (forgot_password.isSuccess) {
      toast.success(
        "Email berhasil terkirim, silahkan periksa kotak masuk kamu.",
        { duration: 2000 }
      );
      return;
    } else if (forgot_password?.isError) {
      toast.warning("Gagal, terdapat kesalahan.", {
        duration: 2000,
      });
      return;
    }
  }, [router, forgot_password.isSuccess, forgot_password?.isError]);

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
          <Button
            disabled={isLoading}
            variant="secondary"
            className="mt-3 text-white"
          >
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
            Kirim Tautan
          </Button>
        </div>
      </form>
    </div>
  );
}
