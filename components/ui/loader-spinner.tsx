"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoaderSpinner({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex flex-col items-center justify-center py-12 ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="text-indigo-500 dark:text-indigo-300"
      >
        <Loader2 className="w-14 h-14 animate-spin" />
      </motion.div>
      <span className="mt-4 text-base text-gray-500 dark:text-gray-300 font-medium">
        Memuat data...
      </span>
    </motion.div>
  );
}
