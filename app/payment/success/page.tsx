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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-32  h-32 relative mb-4">
            <div className="absolute inset-0 animate-pulse bg-green-100 rounded-full" />
            <CheckCircle className="w-full h-full text-primary relative z-10 animate-bounce" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Pembayaran Berhasil!
          </h1>
          <p className="text-gray-600">
            Terima kasih yaa, sekarang saatnya belajar!
          </p>

          {/* Transaction Details */}
          <div className="w-full bg-green-50 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>ID Pemesanan</span>
              <span className="font-mono w-[60%] text-start">{order_id}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
            <Button asChild className="flex-1 bg-secondary hover:bg-secondary">
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/dashboard/order">
                <Receipt className="mr-2 h-4 w-4" />
                Lihat pemesanan
              </Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Terdapat masalah?{" "}
            <Link
              href="/support"
              className="text-secondary hover:text-secondary underline"
            >
              Layanan pelanggan
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
