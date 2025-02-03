"use client"; // ✅ Ensures this runs in a Client Component

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MotionWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
