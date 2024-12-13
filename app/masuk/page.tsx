import LoginPage from "@/components/layout/pages/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Nubi Academy",
};

export default function Login() {
  return <LoginPage />;
}
