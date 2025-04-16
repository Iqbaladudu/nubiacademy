"use client";

import { CheckCircle2 } from "lucide-react";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

export default function EventsFeatured({ highlights }: { highlights: any }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="navbar px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Benefit Yang Kamu Dapatkan
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Investasi dalam diri Anda dengan keuntungan yang akan tak ternilai
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights?.map((arr, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p className="text-lg font-medium">{arr.highlight}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
