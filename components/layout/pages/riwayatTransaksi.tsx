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
import { LoaderSpinner } from "@/components/ui/loader-spinner";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ReceiptText } from "lucide-react";
import {getOrderAction} from "@/action/get-order.action"

export default function RiwayatTransaksi() {
  const my_order = useQuery({
    queryKey: ["my-order"],
    queryFn: async () => await getOrderAction(),
  });

  return (
    <main className="max-w-4xl mx-auto px-2 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Riwayat Transaksi
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Lihat total investasi intelektual kamu
        </p>
      </div>
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-xl shadow-lg border border-border/20 overflow-x-auto">
        {my_order.isLoading ? (
          <div className="flex justify-center py-16">
            <LoaderSpinner />
          </div>
        ) : (
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>ID Pemesanan</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {my_order.isSuccess && my_order.data.docs && my_order.data.docs.length > 0 ? (
                my_order.data.docs.map((arr: any) => (
                  <motion.tr
                    key={arr.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <TableCell className="font-mono font-semibold">
                      {arr.order_number}
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-indigo-600 dark:text-indigo-300">
                        {toIDRFormat(arr.total_amount as number)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={arr.status} />
                    </TableCell>
                    <TableCell>
                      {formatDateTime(arr.updatedAt as string)}
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <EmptyTransaction />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  let color = "secondary";
  let label = status;
  if (status === "PAID" || status === "SUCCESS") {
    color = "success";
    label = "Berhasil";
  } else if (status === "PENDING") {
    color = "warning";
    label = "Menunggu";
  } else if (status === "FAILED" || status === "CANCELLED") {
    color = "destructive";
    label = "Gagal";
  }
  return (
    <Badge
      className={
        color === "success"
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          : color === "warning"
            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
            : color === "destructive"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
      }
    >
      {label}
    </Badge>
  );
}

function EmptyTransaction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-10"
    >
      <ReceiptText className="w-14 h-14 text-indigo-200 dark:text-indigo-700 mb-3" />
      <p className="text-gray-500 dark:text-gray-300 text-center">
        Belum ada transaksi.
      </p>
    </motion.div>
  );
}

function formatDateTime(isoString: string) {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}