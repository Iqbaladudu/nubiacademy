import { CircleCheckBig } from "lucide-react";

export default function Success() {
  return (
    <main className="h-screen w-screen border flex justify-center items-center flex-col">
      <CircleCheckBig size={50} className="" />
      <p className="">Pembayaran berhasil</p>
    </main>
  );
}
