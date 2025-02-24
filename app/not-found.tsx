"use client";

import { motion } from "framer-motion";
import { Search, Compass, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      {[...Array(5)].map((_, i) => (
        <FloatingElement key={`star-${i}`} delay={i * 0.4}>
          <Star
            className="text-blue-400 absolute opacity-30"
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
        className="w-full max-w-md"
      >
        <div className="rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/95 p-8">
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
              <Search className="w-16 h-16 text-blue-500 relative z-10" />
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
                <Compass className="w-8 h-8 text-indigo-500" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-3"
          >
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700">
              Halaman tidak ditemukan
            </h2>
            <p className="text-gray-600">
              Ups, sepertinya halaman yang kamu cari tidak ditemukan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Button
              className="w-full bg-secondary text-white font-medium py-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Halaman utama
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500">
              Jika kamu berpikir ada kesalahan, hubungi layanan pelanggan kami.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
