/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { v7 as uuidv7 } from "uuid";

const Spinner = () => {
  return (
    <svg
      className="animate-spin m-0 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

interface DataReturnType {
  name: string;
  price: number;
  id: string;
}

interface CouponInput {
  coupon: string;
}

export default function Page() {
  const [data, setData] = useState<DataReturnType>();
  const [discount, setDiscount] = useState<number>();
  const { register, handleSubmit } = useForm<CouponInput>();

  const extractKelasSlug = (path: string): string | null => {
    const regex = /\/kelas\/([^/]+)/;
    const match = path.match(regex);
    return match ? match[1] : null;
  };

  const pathname = usePathname();
  const router = useRouter();

  const slug = extractKelasSlug(pathname);

  const getKelas = useQuery({
    queryKey: ["kelass"],
    queryFn: async () => {
      const data = await axios.get(`/api/kelas/${slug}`);
      return data;
    },
  });

  const check_coupon = useMutation({
    mutationFn: async ({ coupon_code }: { coupon_code: string }) => {
      const data = await axios.get(`/api/coupon/${coupon_code}`);
      return data;
    },
  });

  const create_order = useMutation({
    mutationFn: ({
      course_item,
      order_number,
      coupon_code,
    }: {
      course_item: string;
      order_number: string;
      coupon_code: string;
    }) => {
      const formData = new FormData();
      formData.append(
        "_payload",
        JSON.stringify({
          course_item,
          order_number,
          coupon_code,
        })
      );

      return axios.post("/api/order", {
        course_item,
        order_number,
        coupon_code,
      });
    },
  });

  useEffect(() => {
    if (getKelas.isSuccess && getKelas.data?.status === 200) {
      const res = getKelas.data.data.docs[0];
      setData({
        name: res.name,
        price: res.price,
        id: res.id,
      });
    }
  }, [getKelas.data?.data.docs, getKelas.data?.status, getKelas.isSuccess]);

  useEffect(() => {
    if (create_order.isSuccess) {
      router.push(create_order.data.data.doc.payment_redirect_url);
    }
  }, [
    create_order?.data?.data?.doc.payment_redirect_url,
    create_order.isSuccess,
    router,
  ]);

  const onSubmitCoupon: SubmitHandler<CouponInput> = (data) =>
    check_coupon.mutate({
      coupon_code: data.coupon,
    });

  function getDiscountValue({
    doc,
    price,
  }: {
    doc: any | undefined;
    price: number | undefined;
  }) {
    switch (doc?.discount_type) {
      case "percentage":
        const percentage = doc?.discount_value / 100;
        return price && price * percentage;
      case "fixed":
        return price && price - doc?.discount_value;
    }
  }

  useEffect(() => {
    if (check_coupon.isSuccess) {
      const discount = getDiscountValue({
        doc: check_coupon.data.data.docs[0],
        price: data?.price,
      });
      setDiscount(discount);
    }
  }, [check_coupon?.data?.data.docs, check_coupon.isSuccess, data?.price]);

  return (
    <div className="max-h-screen h-screen bg-gray-100 flex justify-center items-center flex-col">
      <Card className="w-[300px] prose prose-neutral dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-3xl text-secondary dark:text-gray-200">
            Checkout
          </CardTitle>
          <CardDescription>
            Selesaikan pembayaran untuk mengakses kursus dari Nubi Academy
          </CardDescription>
        </CardHeader>
        <CardContent className="dark:text-gray-200 text-secondary">
          <div>
            <p className="font-semibold mt-0 mb-0">Nama kelas</p>
            <p className="prose-sm mt-0 mb-0">{data?.name}</p>
          </div>
          <div>
            <p className="font-semibold mt-0 mb-0">Rincian kelas</p>
            <span className="flex justify-between items-baseline mt-0 mb-0">
              <p className="mt-0 mb-0 text-sm font-medium">ID kelas</p>
              <p className="mt-0 mb-0 text-xs text-gray-600">{data?.id}</p>
            </span>
          </div>
          <div>
            <p className="font-semibold mt-0 mb-0">Kode Promo</p>
            <span className="flex w-full max-w-sm items-center space-x-2">
              {check_coupon.isSuccess &&
              check_coupon.data.data.totalDocs > 0 ? (
                <>
                  <Badge variant={"secondary"} className="text-white">
                    {check_coupon.data.data.docs[0].code}
                  </Badge>
                </>
              ) : (
                <>
                  <Input
                    className="h-10 focus-visible:ring-0"
                    type="text"
                    id="coupon"
                    {...register("coupon")}
                    placeholder="Kode Promo"
                    disabled={check_coupon.isLoading}
                  />
                  <Button
                    disabled={check_coupon.isLoading}
                    onClick={handleSubmit(onSubmitCoupon)}
                    variant={"secondary"}
                    className="text-white"
                  >
                    {check_coupon.isLoading ? <Spinner /> : "Terapkan"}
                  </Button>
                </>
              )}
            </span>
          </div>
          <div>
            <p className=" prose-sm font-semibold mt-0 mb-0">
              Rincian pembayaran
            </p>
            <span className="flex justify-between mt-0 mb-0">
              <p className="mt-0 mb-0">Harga</p>
              <p className="mt-0 mb-0">{toIDRFormat(data?.price)}</p>
            </span>
            <span className="flex justify-between mt-0 mb-0">
              <p className="mt-0 mb-0">Diskon</p>
              <p className="mt-0 mb-0">
                {toIDRFormat(discount ? discount : 0)}
              </p>
            </span>
            <span className="flex justify-between mt-0 mb-0 font-bold">
              <p className="mt-0 mb-0">Total</p>
              <p className="mt-0 mb-0">
                {discount
                  ? toIDRFormat((data?.price as number) - discount)
                  : toIDRFormat(data?.price)}
              </p>
            </span>
          </div>
        </CardContent>
        <CardFooter
          className="flex justify-end"
          onClick={() =>
            create_order.mutate({
              course_item: `${data?.id}`,
              order_number: `NUBI-${uuidv7()}`,
              coupon_code: check_coupon.data?.data.docs[0].id || "",
            })
          }
        >
          <Button
            variant={"secondary"}
            className="text-white"
            disabled={create_order.isLoading}
          >
            {create_order.isLoading ? <Spinner /> : "Pesan sekarang"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
