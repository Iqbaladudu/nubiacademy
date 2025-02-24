"use client";

import { RegistrationSuccess } from "@/components/ui/registration-success";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <RegistrationSuccess
        onBackToLogin={() => router.push("/masuk")}
        className="my-auto"
        email={searchParams.get("email")}
      />
    </div>
  );
}
