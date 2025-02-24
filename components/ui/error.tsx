"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { AlertCircle, XCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorBlockProps extends HTMLMotionProps<"div"> {
  title?: string;
  message?: string;
  variant?: "warning" | "error";
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

export function Error({
  title = "An error occurred",
  message = "Something went wrong. Please try again later.",
  variant = "error",
  showHomeButton = true,
  showRetryButton = true,
  onRetry,
}: ErrorBlockProps) {
  const Icon = variant === "error" ? XCircle : AlertCircle;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden",
          variant === "error" ? "bg-red-50" : "bg-yellow-50"
        )}
      >
        <div className="p-6">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex justify-center mb-6"
          >
            <Icon
              className={cn(
                "w-16 h-16",
                variant === "error" ? "text-red-500" : "text-yellow-500"
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-3"
          >
            <h3
              className={cn(
                "text-xl font-semibold",
                variant === "error" ? "text-red-800" : "text-yellow-800"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "text-sm",
                variant === "error" ? "text-red-600" : "text-yellow-600"
              )}
            >
              {message}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
          >
            {showRetryButton && (
              <Button
                variant="outline"
                className={cn(
                  "group transition-all duration-300 hover:scale-105",
                  variant === "error"
                    ? "hover:bg-red-100 hover:text-red-700"
                    : "hover:bg-yellow-100 hover:text-yellow-700"
                )}
                onClick={onRetry}
              >
                <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </Button>
            )}
            {showHomeButton && (
              <Button
                variant="outline"
                className={cn(
                  "group transition-all duration-300 hover:scale-105",
                  variant === "error"
                    ? "hover:bg-red-100 hover:text-red-700"
                    : "hover:bg-yellow-100 hover:text-yellow-700"
                )}
                onClick={() => (window.location.href = "/")}
              >
                <Home className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                Halaman utama
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
