"use client";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { toIDRFormat } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function RiwayatTransaksi() {
  const my_order = useQuery({
    queryKey: ["my-order"],
    queryFn: async () => {
      return axios.get("/api/order");
    },
  });

  return (
    <main>
      <div>
        <h2 className="prose text-3xl font-semibold dark:prose-invert">
          Riwayat Transaksi
        </h2>
        <p className="prose dark:prose-invert text-lg font-medium ">
          Lihat total investasi intelektual kamu
        </p>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pemesanan</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {my_order.isSuccess && my_order.data.data.docs.length > 0 ? (
                my_order.data.data.docs.map((arr) => (
                  <>
                    <TableCell>{arr.order_number}</TableCell>
                    <TableCell>
                      {toIDRFormat(arr.total_amount as number)}
                    </TableCell>
                    <TableCell>{arr.status}</TableCell>
                    <TableCell>
                      {formatDateTime(arr.updatedAt as string)}
                    </TableCell>
                  </>
                ))
              ) : (
                <TableCell>Belum ada transaksi</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

function formatDateTime(isoString: string) {
  // Membuat objek Date dari string ISO
  const date = new Date(isoString);

  // Mengambil komponen tanggal dan waktu menggunakan UTC
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // +1 karena indeks dimulai dari 0
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // Menggabungkan ke format yang diinginkan
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
