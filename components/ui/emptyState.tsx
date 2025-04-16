"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ghost } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode; // lucide icon component
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Tidak ada data",
  description = "Belum ada data yang bisa ditampilkan di sini.",
  actionLabel,
  actionHref,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-12"
    >
      <Card className="w-full max-w-md bg-white/90 dark:bg-zinc-900/90 shadow-xl rounded-2xl border-0 flex flex-col items-center p-8">
        <motion.div
          initial={{ scale: 0.95, y: 0 }}
          animate={{
            scale: [0.95, 1.05, 1],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="mb-6"
        >
          {icon ? (
            <span className="block w-20 h-20 text-indigo-300 dark:text-indigo-700 opacity-80">
              {icon}
            </span>
          ) : (
            <Ghost className="w-20 h-20 text-indigo-300 dark:text-indigo-700 opacity-80" />
          )}
        </motion.div>
        <CardContent className="flex flex-col items-center text-center p-0">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-base text-gray-500 dark:text-gray-300 mb-6">
            {description}
          </p>
          {actionLabel && actionHref && (
            <Button asChild className="mt-2">
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
