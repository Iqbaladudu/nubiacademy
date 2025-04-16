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
import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";

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

export default function Profile() {
  const searchParams = useSearchParams();
  const profile: AKUN_SAYA_POSITION = searchParams.get(
    "position",
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
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex justify-center items-start lg:items-center min-h-[70vh] py-8"
    >
      <Card className="w-full max-w-lg border-0 md:border shadow-xl rounded-2xl bg-white/90 dark:bg-zinc-900/90">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mb-2">
            <User className="w-10 h-10 text-indigo-500 dark:text-indigo-300" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Profil Saya
          </CardTitle>
          <CardDescription className="text-center">
            Pastikan kamu mengisi data dengan benar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-5">
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
          {profile_loading && <Skeleton className="w-28 h-10 rounded-lg" />}
        </CardFooter>
      </Card>
    </motion.div>
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
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-1">
        <Label
          className="text-indigo-700 dark:text-indigo-300 text-md font-semibold"
          htmlFor={label}
        >
          {label}
        </Label>
        <div>
          {!isLoading ? (
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {value ? value : "-"}
            </p>
          ) : (
            <Skeleton className="w-36 h-5 rounded" />
          )}
        </div>
      </div>
    );
  }
}

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
        <Button className="bg-indigo-600 hover:bg-indigo-700 dark:text-white text-white font-semibold rounded-lg shadow transition-all duration-200">
          Ubah Profil
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="mb-2">
          <SheetTitle>Ubah Profil</SheetTitle>
          <SheetDescription className="text-indigo-500 dark:text-indigo-300 font-semibold">
            Pastikan kamu mengisi data dengan benar
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 w-full"
            >
              <ProfileItemFormEdit
                name={TYPE_FORM.FULLNAME}
                label="Nama Lengkap"
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
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold rounded-lg mt-2"
              >
                {update.isLoading && (
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
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
