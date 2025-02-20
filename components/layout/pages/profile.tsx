/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";

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
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

enum AKUN_SAYA_POSITION {
  PROFIL = "profil",
  KEAMANAN = "keamanan",
}

enum TYPE_FORM {
  FULLNAME = "fullname",
  USERNAME = "username",
  PHONE = "phone",
  PROVINCE = "province",
  REGENCY = "regency",
}

export default function Profile() {
  const searchParams = useSearchParams();
  const profile: AKUN_SAYA_POSITION = searchParams.get(
    "position"
  ) as AKUN_SAYA_POSITION;
  const {
    data: user,
    isLoading: profile_loading,
    isSuccess: profile_success,
    refetch,
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      return await axios.get("/api/me/profile");
    },
    enabled: profile === AKUN_SAYA_POSITION.PROFIL,
  });

  return (
    <React.Suspense>
      <div className="flex justify-center items-start lg:items-center h-full">
        <Card className="border-0 md:border">
          <CardHeader>
            <CardTitle className="">Profil saya</CardTitle>
            <CardDescription>
              Pastikan kamu mengisi data dengan benar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <ProfileItem
                  isLoading={profile_loading}
                  label={"Nama"}
                  value={user?.data.fullname}
                />
                <ProfileItem
                  isLoading={profile_loading}
                  label={"Username"}
                  value={user?.data.username}
                />
                <ProfileItem
                  isLoading={profile_loading}
                  label={"Email"}
                  value={user?.data.email}
                />
                <ProfileItem
                  isLoading={profile_loading}
                  label={"Whatsapp"}
                  value={user?.data.phone}
                />
                <ProfileItem
                  isLoading={profile_loading}
                  label={"Provinsi"}
                  value={user?.data.province}
                />
                <ProfileItem
                  isLoading={profile_loading}
                  label={"Kota"}
                  value={user?.data.regency}
                />
                <ProfileItem
                  isLoading={profile_loading}
                  label={"Status langganan"}
                  value={user?.data.subscription_status}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            {profile_success && (
              <EditProfileDialog user={user?.data} refetch={refetch} />
            )}
            {profile_loading && (
              <div>
                <Skeleton className="w-28 h-10" />
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </React.Suspense>
  );

  function ProfileItem({
    label,
    value,
    isLoading,
  }: {
    label?: string;
    value?: string;
    isLoading: boolean;
  }) {
    return (
      <div className="flex flex-col md:flex-row items-baseline justify-between">
        <Label
          className="text-dark-blue text-md font-semibold dark:text-white"
          htmlFor="name"
        >
          {label}
        </Label>

        <div>
          {!isLoading ? (
            <p className="text-gray-600 dark:text-gray-300">
              {value ? value : "-"}
            </p>
          ) : (
            <div>
              <Skeleton className="w-36 h-5" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
// fullname" | "username" | "phone" | "province" | "regency"

const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

const editProfileFormSchema = z.object({
  fullname: z.string().min(3).max(50),
  username: z.string().min(5).max(20),
  phone: z.string().min(10).max(15).regex(phoneNumberPattern, {
    message: "Masukkan nomor yang valid",
  }),
  province: z.string().min(3).max(20),
  regency: z.string().min(3).max(50),
});

function EditProfileDialog({ user, refetch }: { user?: any; refetch: any }) {
  const [open, setOpen] = React.useState(false);
  const update = useMutation({
    mutationFn: async ({
      data,
    }: {
      data: z.infer<typeof editProfileFormSchema>;
    }) => {
      return await axios.patch("/api/me/profile", {
        ...data,
      });
    },
  });
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      fullname: user.fullname || "",
      username: user.username || "",
      phone: user.phone || "",
      province: user.province || "",
      regency: user.regency || "",
    },
  });

  function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
    update.mutate({ data: values });
  }

  React.useEffect(() => {
    if (update.isSuccess) {
      setOpen(false);
      refetch();
    }
  }, [refetch, update.isSuccess]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-dark-blue hover:bg-dark-blue dark:text-dark-blue dark:bg-gray-50 text-white">
          Ubah profil
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className=" mb-2">
          <SheetTitle>Ubah profil</SheetTitle>
          <SheetDescription className="text-red-500 dark:text-red-800 font-semibold">
            Pastikan kamu mengisi data dengan benar
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-full"
            >
              <ProfileItemFormEdit
                name={TYPE_FORM.FULLNAME}
                label="Nama lengkap"
                form={form}
              />
              <ProfileItemFormEdit
                name={TYPE_FORM.USERNAME}
                label="Username"
                form={form}
              />
              <ProfileItemFormEdit
                name={TYPE_FORM.PHONE}
                label="Whatsapp"
                form={form}
              />
              <ProfileItemFormEdit
                name={TYPE_FORM.PROVINCE}
                label="Provinsi"
                form={form}
              />
              <ProfileItemFormEdit
                name={TYPE_FORM.REGENCY}
                label="Kota"
                form={form}
              />
              <Button
                disabled={update.isLoading}
                type="submit"
                className="bg-dark-blue text-white hover:bg-dark-blue"
              >
                {update.isLoading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ProfileItemFormEdit({
  form,
  name,
  label,
}: {
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>, any, undefined>;
  name: TYPE_FORM;
  label: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
