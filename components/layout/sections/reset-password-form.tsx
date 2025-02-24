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
import { useRouter, useSearchParams } from "next/navigation";
import { EyeOffIcon, EyeIcon } from "lucide-react";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

type Inputs = {
  password: string;
  email: string;
};

export function ResetPasswordForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);

  const reset_password = useMutation({
    mutationFn: ({ data, token }: { data: Inputs; token: string }) => {
      setIsLoading(true);
      return local.post("/verify", {
        email: data.email,
        password: data.password,
        token: token,
      });
    },
    onSettled: () => setIsLoading(false),
  });

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    reset_password.mutate({ data, token: token ?? "" });

  useEffect(() => {
    if (reset_password.isSuccess) {
      router.push("/masuk");
      toast.success("Kata sandi berhasil diubah.", { duration: 2000 });
      return;
    } else if (reset_password?.isError) {
      toast.warning("Gagal, terdapat kesalahan.", {
        duration: 2000,
      });
      return;
    }
  }, [router, reset_password.isSuccess, reset_password?.isError]);

  return token ? (
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
          <div
            className={`grid gap-1 relative border border-input rounded-md ${passwordInputFocus && "outline-none ring-2 ring-offset-background ring-ring ring-offset-2"}`}
          >
            <Label className="sr-only" htmlFor="email">
              Kata sandi
            </Label>
            <Input
              onBlurCapture={() => setPasswordInputFocus(false)}
              onFocusCapture={() => setPasswordInputFocus(true)}
              id="password"
              className="w-[85%] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Masukkan kata sandi"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 h-[90%] hover:bg-background bg-background"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
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
            Ubah kata sandi
          </Button>
        </div>
      </form>
    </div>
  ) : (
    <div className="mt-5 text-center">Terdapat kesalahan</div>
  );
}
