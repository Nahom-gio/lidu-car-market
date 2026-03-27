"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ whatsappHref }: { whatsappHref: string }) {
  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-destructive" />
      <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-destructive" />
    </motion.a>
  );
}
