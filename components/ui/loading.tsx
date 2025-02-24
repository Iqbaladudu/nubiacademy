"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingBlockProps extends HTMLMotionProps<"div"> {
  title?: string;
  message?: string;
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
}

export function Loading({
  title = "Loading...",
  message = "Please wait while we process your request.",
  variant = "default",
  size = "md",
  className,
  ...props
}: LoadingBlockProps) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const variantClasses = {
    default: "bg-white",
    primary: "",
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "w-full rounded-xl shadow-lg overflow-hidden",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
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
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Loader2
                  className={cn(
                    "w-16 h-16",
                    variant === "default" ? "text-blue-500" : "text-primary"
                  )}
                />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-full",
                    variant === "default" ? "bg-blue-100" : "bg-primary",
                    "opacity-20"
                  )}
                />
              </motion.div>
            </div>
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
                variant === "default" ? "text-gray-800" : "text-secondary"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "text-sm",
                variant === "default" ? "text-gray-600" : "text-secondary"
              )}
            >
              {message}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    variant === "default" ? "bg-primary/50" : "bg-primary/100"
                  )}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
