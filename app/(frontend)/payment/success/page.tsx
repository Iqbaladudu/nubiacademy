import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Home, Receipt } from "lucide-react";
import Link from "next/link";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ order_id: string }>;
}) {
  const order_id = (await searchParams).order_id;
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-100/80 via-white/90 to-green-200/60 dark:from-zinc-900/80 dark:via-zinc-900/80 dark:to-green-900/60">
      <Card className="max-w-md w-full p-0 overflow-hidden shadow-2xl border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center space-y-4 px-8 py-12">
          <div className="relative mb-4">
            <div className="absolute inset-0 w-28 h-28 bg-gradient-to-tr from-green-300/60 to-green-500/40 rounded-full blur-2xl animate-pulse" />
            <CheckCircle className="w-28 h-28 text-green-500 relative z-10 animate-bounce drop-shadow-xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-300 tracking-tight mb-1 drop-shadow">
            Pembayaran Berhasil!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-base mb-2">
            Terima kasih yaa, sekarang saatnya belajar!
          </p>
          {/* Transaction Details */}
          <div className="w-full bg-gradient-to-r from-green-50/90 to-green-100/60 dark:from-green-900/50 dark:to-green-800/40 rounded-xl p-4 mt-4 border border-green-100 dark:border-green-800 shadow">
            <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
              <span className="font-semibold">ID Pemesanan</span>
              <span className="font-mono w-[60%] text-start break-all">{order_id}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-8">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold shadow hover:from-green-600 hover:to-green-500 transition rounded-lg py-5 text-lg"
            >
              <Link href="/dashboard">
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-green-200 dark:border-green-700 bg-white/70 dark:bg-zinc-900/70 hover:bg-green-50 dark:hover:bg-green-900/40 transition rounded-lg py-5 text-lg"
              asChild
            >
              <Link href="/dashboard/akun-saya?position=riwayat-transaksi">
                <Receipt className="mr-2 h-5 w-5" />
                Lihat pemesanan
              </Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Terdapat masalah?{" "}
            <Link
              href="/support"
              className="text-green-700 dark:text-green-400 hover:underline font-semibold"
            >
              Layanan pelanggan
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
