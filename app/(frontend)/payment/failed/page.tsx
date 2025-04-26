import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id: string }>;
}) {
  const order_id = (await searchParams).order_id;
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-100/80 via-white/90 to-red-200/60 dark:from-zinc-900/80 dark:via-zinc-900/80 dark:to-red-900/60">
      <Card className="max-w-md w-full p-0 overflow-hidden shadow-2xl border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center space-y-4 px-8 py-12">
          {/* Error Animation */}
          <div className="relative mb-4">
            <div className="absolute inset-0 w-28 h-28 bg-gradient-to-tr from-red-300/60 to-red-500/40 rounded-full blur-2xl animate-pulse" />
            <AlertCircle className="w-28 h-28 text-red-500 relative z-10 drop-shadow-xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-red-700 dark:text-red-300 tracking-tight mb-1 drop-shadow">
            Pembayaran Gagal
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-base mb-2">
            Kami tidak bisa memproses pembayaran kamu, mohon dicoba lagi yah.
          </p>
          <div className="w-full bg-gradient-to-r from-red-50/90 to-red-100/60 dark:from-red-900/50 dark:to-red-800/40 rounded-xl p-4 mt-4 border border-red-100 dark:border-red-800 shadow">
            <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
              <span className="font-semibold">ID Pemesanan</span>
              <span className="font-mono w-[60%] text-start break-all text-red-600 dark:text-red-300">
                {order_id}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-8">
            <Button
              className="flex-1 bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold shadow hover:from-red-600 hover:to-red-500 transition rounded-lg py-5 text-lg"
              asChild
            >
              <Link href="/kelas">
                <RefreshCcw className="mr-2 h-5 w-5" />
                Coba lagi
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-200 dark:border-red-700 bg-white/70 dark:bg-zinc-900/70 hover:bg-red-50 dark:hover:bg-red-900/40 transition rounded-lg py-5 text-lg"
              asChild
            >
              <Link href="/kelas">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Kembali ke kelas
              </Link>
            </Button>
          </div>
          <div className="mt-8 space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Butuh bantuan atau ingin pembayaran manual?{" "}
              <Link
                href="/support"
                className="text-red-700 dark:text-red-400 hover:underline font-semibold"
              >
                Kontak layanan pelanggan kami
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
