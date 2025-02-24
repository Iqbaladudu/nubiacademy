"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { Inbox, Mail, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RegistrationSuccessBlockProps extends HTMLMotionProps<"div"> {
  email?: string;
  onResendEmail?: () => void;
  onBackToLogin?: () => void;
}

const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [-8, 8, -8],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay,
      },
    }}
  >
    {children}
  </motion.div>
);

export function RegistrationSuccess({
  email = "your email",
  onBackToLogin,
  className,
  ...props
}: RegistrationSuccessBlockProps) {
  return (
    <div className="relative">
      {/* Decorative Elements */}
      {[...Array(4)].map((_, i) => (
        <FloatingElement key={`star-${i}`} delay={i * 0.4}>
          <Star
            className="text-blue-400 absolute opacity-40"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: `scale(${0.4 + Math.random() * 0.4}) rotate(${Math.random() * 45}deg)`,
            }}
          />
        </FloatingElement>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "w-full max-w-md rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/95",
          className
        )}
        {...props}
      >
        <div className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex justify-center mb-6 relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full scale-150 blur-xl opacity-40" />
              <Mail className="w-16 h-16 text-primary relative z-10" />
              <motion.div
                className="absolute -right-4 -top-2 z-20"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Inbox className="w-8 h-8 text-secondary" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-3"
          >
            <h3 className="text-2xl font-bold text-secondary">
              Cek email kamu!
            </h3>
            <p className="text-gray-600">
              Kami sudah mengirim tautan verifikasi ke email kamu:{" "}
              <span className="font-bold text-secondary">{email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Harap cek kotak masuk kamu dan klik tautan verifikasi untuk
              mengaktifkan akun kamu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 space-y-4"
          >
            {/* {onResendEmail && (
              <Button
                variant="outline"
                className="w-full"
                onClick={onResendEmail}
              >
                Resend Emai
              </Button>
            )} */}

            {onBackToLogin && (
              <Button
                className="w-full bg-secondary text-white font-medium py-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
                onClick={onBackToLogin}
              >
                Masuk
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500">
              Belum menerima tautan verifikasi? Cek folder spam kamu.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
