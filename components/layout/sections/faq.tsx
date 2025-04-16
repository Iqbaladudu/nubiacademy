"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

// Animation variants for smooth fade and slide effects
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Interface for FAQ data
interface FAQProps {
  id: string;
  question: string;
  answer: string;
}

// Sample data for FAQs
const faqs: FAQProps[] = [
  {
    id: "1",
    question: "Apa itu Nubi Academy?",
    answer:
      "Nubi Academy adalah platform kursus online yang dirancang untuk membantu Anda mengembangkan keterampilan abad ini melalui pembelajaran fleksibel dengan instruktur terbaik dan komunitas yang mendukung.",
  },
  {
    id: "2",
    question: "Bagaimana cara mendaftar kursus?",
    answer:
      "Anda dapat mendaftar dengan mengklik tombol 'Daftar' atau 'Buka Kelas' di halaman utama, lalu mengisi formulir pendaftaran. Setelah itu, Anda akan mendapatkan akses ke kursus pilihan Anda.",
  },
  {
    id: "3",
    question: "Apakah ada biaya untuk bergabung?",
    answer:
      "Kami menawarkan beberapa kursus gratis sebagai pengenalan. Namun, untuk kursus premium dan sertifikasi, ada biaya yang terjangkau dengan opsi pembayaran fleksibel.",
  },
  {
    id: "4",
    question:
      "Apakah saya mendapatkan sertifikat setelah menyelesaikan kursus?",
    answer:
      "Ya, Anda akan menerima sertifikat digital setelah menyelesaikan kursus dan lulus ujian akhir, yang dapat digunakan untuk meningkatkan profil profesional Anda.",
  },
  {
    id: "5",
    question: "Bagaimana jika saya memiliki pertanyaan selama belajar?",
    answer:
      "Kami memiliki komunitas aktif dan dukungan mentor yang siap membantu. Anda juga dapat menghubungi tim dukungan kami melalui email atau chat kapan saja.",
  },
];

export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="container w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background/90 to-background/85"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Pertanyaan Umum Tentang{" "}
          <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            Nubi Academy
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-2 sm:mt-4">
          Kami di sini untuk menjawab semua keraguan Anda sebelum bergabung.
        </p>
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div
        className="max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <Accordion
          type="single"
          collapsible
          className="space-y-3 sm:space-y-4 md:space-y-5"
        >
          {faqs.map(({ id, question, answer }) => (
            <motion.div key={id} variants={fadeInUp}>
              <AccordionItem
                value={id}
                className="bg-background/95 border border-[#D247BF]/15 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left text-base sm:text-lg md:text-xl font-medium hover:text-primary transition-colors duration-300">
                  <div className="flex items-center">
                    <HelpCircle className="text-primary h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 mr-2 sm:mr-3 md:mr-4" />
                    {question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base md:text-lg text-muted-foreground bg-gradient-to-r from-[#D247BF]/5 to-primary/5">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};
