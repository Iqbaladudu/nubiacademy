"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDown } from "lucide-react";

export default function EventsRounds({ rounds }: { rounds: any }) {
  return (
    <section className="w-full py-20">
      <div className="navbar px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Kurikulum Bootcamp
          </h2>
        </motion.div>
        <Accordion type="multiple" className="w-full max-w-4xl mx-auto">
          {rounds?.map((arr, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border-b border-primary/10"
              >
                <AccordionTrigger className="text-left text-xl font-semibold py-6 flex items-center justify-between hover:no-underline">
                  <span>{arr.roundName}</span>
                </AccordionTrigger>
                <AccordionContent className="py-4 px-4 bg-secondary/5 rounded-b-lg">
                  {arr.roundDescription}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
