import LoginPage from "@/components/layout/pages/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Nubi Academy",
};

export default function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <LoginPage searchParams={searchParams} />;
}
