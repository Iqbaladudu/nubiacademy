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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Error Animation */}
          <div className="w-32 h-32 relative mb-4">
            <div className="absolute inset-0 animate-pulse bg-red-100 rounded-full" />
            <AlertCircle className="w-full h-full text-red-500 relative z-10" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Pembayaran Gagal</h1>
          <p className="text-gray-600">
            Kami tidak bisa memproses pembayaran kamu, mohon dicoba lagi yah.
          </p>

          <div className="w-full bg-red-50 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>ID Pemesanan</span>
              <span className="font-semibold font-mono w-[60%] text-start text-red-600">
                {order_id}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
            <Button className="flex-1 bg-red-600 hover:bg-red-700" asChild>
              <Link href="/kelas">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Coba lagi
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/kelas">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke kelas
              </Link>
            </Button>
          </div>

          {/* Support Section */}
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-500">
              Butuh bantuan atau ingin pembayaran manual?{" "}
              <Link
                href="/support"
                className="text-red-600 hover:text-red-700 underline"
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
