"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { CheckCircle, Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface SuccessBlockProps extends HTMLMotionProps<"div"> {
  title?: string;
  message?: string;
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
  onContinue?: () => void;
  continueText?: string;
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
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay,
      },
    }}
  >
    {children}
  </motion.div>
);

export function Success({
  title = "Verifikasi Berhasil! 🎉",
  message = "Kami berhasil melakukan verifikasi email kamu, selamat datang di Nubi Academy!",
  variant = "default",
  size = "md",
  onContinue,
  continueText = "Masuk",
  className,
  ...props
}: SuccessBlockProps) {
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#60A5FA", "#A78BFA", "#F472B6"],
    });
  }, []);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const variantClasses = {
    default: "bg-white",
    primary: "bg-primary/10",
  };

  return (
    <div className="relative">
      {/* Decorative Elements */}
      {[...Array(3)].map((_, i) => (
        <FloatingElement key={`star-${i}`} delay={i * 0.5}>
          <Star
            className="text-yellow-400 absolute opacity-60"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        </FloatingElement>
      ))}
      {[...Array(3)].map((_, i) => (
        <FloatingElement key={`heart-${i}`} delay={i * 0.7}>
          <Heart
            className="text-pink-400 absolute opacity-60"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        </FloatingElement>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "w-full rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/90",
          sizeClasses[size],
          variantClasses[variant],
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
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-secondary" />
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
                <div className="w-20 h-20 rounded-full bg-green-100 opacity-20" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-3"
          >
            <h3 className="text-2xl font-bold text-secondary">{title}</h3>
            <p className="text-secondary">{message}</p>
          </motion.div>

          {onContinue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Button
                className="w-full bg-primary/100 text-white font-medium py-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={onContinue}
              >
                {continueText}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
