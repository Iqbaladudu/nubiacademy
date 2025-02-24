"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { local } from "@/services/global";
import { useQuery } from "@tanstack/react-query";
import { Error } from "@/components/ui/error";
import { Loading } from "@/components/ui/loading";
import { Success } from "@/components/ui/success";

export default function VerificationSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const verify_email = useQuery({
    queryKey: ["verify_email", { token }],
    queryFn: async () => {
      const response = await local.post("/verify", {
        token: token,
      });

      return response;
    },
    enabled: token ? true : false,
  });

  useEffect(() => {
    if (verify_email.isSuccess) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#60A5FA", "#A78BFA", "#F472B6"],
      });
    }
  }, [verify_email.isSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-primary/15 to-secondary/10 flex items-center justify-center p-4 relative overflow-hidden">
      {verify_email.isSuccess && (
        <Success variant="primary" onContinue={() => router.push("/masuk")} />
      )}

      {verify_email.isLoading && (
        <Loading
          title="Sedang melakukan verifikasi..."
          message="Mohon tunggu beberapa saat hingga kami selesai melakukan verifikasi."
          variant="primary"
        />
      )}

      {verify_email.isError && (
        <div>
          <Error
            variant={"error"}
            title={"Terjadi kesalahan!"}
            showRetryButton={false}
            message={"Terjadi kesalahan saat melakukan verifikasi email."}
          />
        </div>
      )}
    </div>
  );
}
