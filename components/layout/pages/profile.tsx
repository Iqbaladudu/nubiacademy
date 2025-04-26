"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { User, Loader2, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProfile } from "@/action/get-profile.action";
import { updateProfile } from "@/action/update-profile.action";

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
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let ignore = false;
    async function fetchProfile() {
      setLoading(true);
      try {
        const data = await getProfile();
        if (!ignore) {
          setUser(data.user);
          setError(null);
        }
      } catch (err: any) {
        if (!ignore) setError(err.message || "Gagal mengambil profil");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchProfile();
    return () => { ignore = true; };
  }, []);

  const getInitials = (name?: string) =>
    name ? name.split(" ").map(part => part[0]).join("").slice(0,2).toUpperCase() : "";

  const SubscriptionBadge = ({ status }: { status?: string }) => {
    if (!status) return null;
    let color = "bg-gray-200 text-gray-700";
    let label = status;
    if (["ACTIVE", "PAID"].includes(status)) {
      color = "bg-green-100 text-green-700";
      label = "Aktif";
    } else if (["INACTIVE", "EXPIRED"].includes(status)) {
      color = "bg-red-100 text-red-700";
      label = "Tidak Aktif";
    } else if (status === "TRIAL") {
      color = "bg-yellow-100 text-yellow-700";
      label = "Trial";
    }
    return (
      <Badge className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
        <BadgeCheck className="inline w-4 h-4 mr-1" /> {label}
      </Badge>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-10 bg-transparent"
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
        {/* Avatar & Nama */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="relative flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-full w-24 h-24 mb-2 shadow">
            {user?.fullname ? (
              <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">
                {getInitials(user.fullname)}
              </span>
            ) : loading ? (
              <Skeleton className="w-12 h-12 rounded-full" />
            ) : (
              <User className="w-12 h-12 text-indigo-500 dark:text-indigo-300" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            {user?.fullname || (loading ? <Skeleton className="w-32 h-7 rounded" /> : "Profil Saya")}
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-center text-base">
            Pastikan data profil kamu selalu up-to-date
          </p>
          {error && (
            <span className="text-red-500 text-sm">{error}</span>
          )}
          <div className="mt-2">
            {!loading && (
              <EditProfileDialog
                user={user}
                onSuccess={setUser}
              />
            )}
            {loading && <Skeleton className="w-28 h-10 rounded-lg" />}
          </div>
        </div>
        {/* Info utama */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <ProfileItem
            isLoading={loading}
            label="Username"
            value={user?.username}
          />
          <ProfileItem
            isLoading={loading}
            label="Status Langganan"
            value={
              <span className="flex items-center">
                {user?.subscription_status}
                <SubscriptionBadge status={user?.subscription_status} />
              </span>
            }
          />
        </div>
        {/* Divider */}
        <div className="w-full border-b border-border/30 my-2" />
        {/* Detail Profil */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <ProfileItem
            isLoading={loading}
            label="Email"
            value={user?.email}
          />
          <ProfileItem
            isLoading={loading}
            label="Whatsapp"
            value={user?.phone}
          />
          <ProfileItem
            isLoading={loading}
            label="Provinsi"
            value={user?.province}
          />
          <ProfileItem
            isLoading={loading}
            label="Kota"
            value={user?.regency}
          />
        </div>
      </div>
    </motion.section>
  );
}

function ProfileItem({
  label,
  value,
  isLoading,
  icon,
}: {
  label?: string;
  value?: React.ReactNode;
  isLoading: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-2 py-1">
      <Label
        className="text-indigo-700 dark:text-indigo-300 text-md font-semibold flex items-center"
        htmlFor={label}
      >
        {icon}
        {label}
      </Label>
      <div>
        {!isLoading ? (
          <span className="text-gray-700 dark:text-gray-300 font-medium break-words">
            {value ?? "-"}
          </span>
        ) : (
          <Skeleton className="w-36 h-5 rounded" />
        )}
      </div>
    </div>
  );
}

function EditProfileDialog({
  user,
  onSuccess,
}: {
  user?: any;
  onSuccess: (newUser: any) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      fullname: user?.fullname || "",
      username: user?.username || "",
      phone: user?.phone || "",
      province: user?.province || "",
      regency: user?.regency || "",
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateProfile(values);
      onSuccess(updated);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Gagal update profil");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (!open) setError(null);
  }, [open]);

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
        <div className="flex items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 w-full"
            >
              {Object.entries({
                [TYPE_FORM.FULLNAME]: "Nama Lengkap",
                [TYPE_FORM.USERNAME]: "Username",
                [TYPE_FORM.PHONE]: "Whatsapp",
                [TYPE_FORM.PROVINCE]: "Provinsi",
                [TYPE_FORM.REGENCY]: "Kota",
              }).map(([name, label]) => (
                <ProfileItemFormEdit
                  key={name}
                  name={name as TYPE_FORM}
                  label={label}
                  form={form}
                />
              ))}
              {error && (
                <span className="text-red-500 text-sm">{error}</span>
              )}
              <Button
                disabled={loading}
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold rounded-lg mt-2"
              >
                {loading && (
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
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>>;
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
