"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toIDRFormat } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { customAlphabet } from "nanoid";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Percent, Loader2 } from "lucide-react";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 13);

const Spinner = () => <Loader2 className="animate-spin h-5 w-5" />;

interface DataReturnType {
  name: string;
  price: number;
  id: string;
}

interface CouponInput {
  coupon: string;
}

export default function CheckoutPage() {
  const [data, setData] = useState<DataReturnType | undefined>(undefined);
  const [discount, setDiscount] = useState<number | undefined>(undefined);
  const { register, handleSubmit, reset } = useForm<CouponInput>();

  const extractKelasSlug = (path: string): string | null => {
    const regex = /\/kelas\/([^/]+)/;
    const match = path.match(regex);
    return match ? match[1] : null;
  };

  const pathname = usePathname();
  const router = useRouter();
  const slug = extractKelasSlug(pathname);

  const getKelas = useQuery({
    queryKey: ["kelas", slug],
    queryFn: async () => {
      const response = await axios.get(`/api/kelas/${slug}`);
      return response.data;
    },
  });

  const checkCoupon = useMutation({
    mutationFn: async ({ coupon_code }: { coupon_code: string }) => {
      const response = await axios.get(`/api/coupon/${coupon_code}`);
      return response.data;
    },
  });

  const createOrder = useMutation({
    mutationFn: ({
      course_item,
      order_number,
      coupon_code,
    }: {
      course_item: string;
      order_number: string;
      coupon_code: string;
    }) => {
      return axios.post("/api/order", {
        course_item,
        order_number,
        coupon_code,
      });
    },
  });

  useEffect(() => {
    if (getKelas.isSuccess && getKelas.data?.docs) {
      const res = getKelas.data.docs[0];
      setData({
        name: res.name,
        price: res.price,
        id: res.id,
      });
    }
  }, [getKelas.data, getKelas.isSuccess]);

  useEffect(() => {
    if (
      createOrder.isSuccess &&
      createOrder.data?.data?.doc?.payment_redirect_url
    ) {
      router.push(createOrder.data.data.doc.payment_redirect_url);
    }
  }, [createOrder.data, createOrder.isSuccess, router]);

  useEffect(() => {
    if (checkCoupon.isSuccess && checkCoupon.data?.docs?.length > 0) {
      const discountValue = getDiscountValue({
        doc: checkCoupon.data.docs[0],
        price: data?.price,
      });
      setDiscount(discountValue);
    }
  }, [checkCoupon.data, checkCoupon.isSuccess, data?.price]);

  const onSubmitCoupon: SubmitHandler<CouponInput> = (formData) =>
    checkCoupon.mutate({ coupon_code: formData.coupon });

  function getDiscountValue({
    doc,
    price,
  }: {
    doc: any;
    price: number | undefined;
  }): number {
    if (!price) return 0;
    switch (doc?.discount_type) {
      case "percentage":
        return price * (doc.discount_value / 100);
      case "fixed":
        return doc.discount_value;
      default:
        return 0;
    }
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md sm:max-w-lg"
      >
        <Card className="bg-white/90 dark:bg-zinc-900/90 shadow-2xl rounded-2xl overflow-hidden border-0">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2" />
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 className="text-indigo-500 h-7 w-7" />
              Checkout
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Selesaikan pembayaran untuk mengakses kursus dari Nubi Academy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-800 dark:text-gray-200">
            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-2 sm:space-y-3"
            >
              <h3 className="text-base sm:text-lg font-semibold">Nama Kelas</h3>
              <p className="text-sm sm:text-base font-medium">
                {data?.name || (
                  <span className="animate-pulse text-gray-400">Memuat...</span>
                )}
              </p>
              <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span>ID Kelas</span>
                <span>{data?.id || "N/A"}</span>
              </div>
            </motion.div>

            {/* Coupon Section */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-2 sm:space-y-3"
            >
              <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Percent className="h-5 w-5 text-indigo-500" />
                Kode Promo
              </h3>
              <div className="flex gap-2 sm:gap-3">
                <AnimatePresence mode="wait">
                  {checkCoupon.isSuccess &&
                  checkCoupon.data?.docs?.length > 0 ? (
                    <motion.div
                      key="badge"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-indigo-800 dark:text-indigo-200 text-sm sm:text-base py-1 sm:py-1.5 px-2 sm:px-3 shadow"
                      >
                        <CheckCircle2 className="inline mr-1 h-4 w-4 text-green-500" />
                        {checkCoupon.data.docs[0].code}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                        onClick={() => {
                          checkCoupon.reset();
                          setDiscount(undefined);
                          reset();
                        }}
                        aria-label="Hapus kode promo"
                        type="button"
                      >
                        ×
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex gap-2 sm:gap-3 w-full"
                      onSubmit={handleSubmit(onSubmitCoupon)}
                    >
                      <Input
                        id="coupon"
                        placeholder="Masukkan Kode Promo"
                        className="h-10 sm:h-11 text-sm sm:text-base rounded-lg border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500 dark:bg-gray-800"
                        disabled={checkCoupon.isPending}
                        {...register("coupon")}
                        autoComplete="off"
                      />
                      <Button
                        type="submit"
                        disabled={checkCoupon.isPending}
                        className="h-10 sm:h-11 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-700 text-white px-3 sm:px-4 text-sm sm:text-base rounded-lg transition-all duration-200 shadow"
                      >
                        {checkCoupon.isPending ? <Spinner /> : "Terapkan"}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
              {checkCoupon.isError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-500 mt-1"
                >
                  Kode promo tidak valid atau sudah tidak berlaku.
                </motion.p>
              )}
            </motion.div>

            {/* Payment Details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-2 sm:space-y-3"
            >
              <h3 className="text-base sm:text-lg font-semibold">
                Rincian Pembayaran
              </h3>
              <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span>Harga</span>
                  <span>
                    {data?.price ? toIDRFormat(data.price) : "Memuat..."}
                  </span>
                </div>
                <div className="flex justify-between text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Diskon</span>
                  <span>{toIDRFormat(discount || 0)}</span>
                </div>
                <div className="flex justify-between font-bold text-base sm:text-lg pt-1 sm:pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>Total</span>
                  <span>
                    {data?.price
                      ? toIDRFormat(
                          discount ? data.price - discount : data.price,
                        )
                      : "Memuat..."}
                  </span>
                </div>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-end pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-800">
            <Button
              onClick={() =>
                data?.id &&
                createOrder.mutate({
                  course_item: data.id,
                  order_number: `NUBI-${nanoid()}`,
                  coupon_code: checkCoupon.data?.docs?.[0]?.id || "",
                })
              }
              disabled={createOrder.isPending || !data}
              className="h-10 sm:h-11 w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-purple-700 text-white px-4 sm:px-6 text-sm sm:text-base rounded-lg shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
            >
              {createOrder.isPending ? <Spinner /> : "Pesan Sekarang"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
