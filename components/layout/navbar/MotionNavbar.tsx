"use client"; // ✅ This ensures it's a Client Component

import { motion } from "framer-motion";
import { Menu } from "lib/shopify/types";
import Link from "next/link";

export default function MotionNavbar({ menu }: { menu: Menu[] }) {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-white/10 backdrop-blur-xl shadow-neon rounded-lg p-4 flex justify-between items-center z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="hidden gap-6 text-md font-medium tracking-wide uppercase md:flex md:items-center">
        {menu.map((item) => (
          <motion.li key={item.title} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 200 }}>
            <Link href={item.path} className="text-white hover:text-primary transition duration-300">
              {item.title}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
