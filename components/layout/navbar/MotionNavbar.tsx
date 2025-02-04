"use client"; // ✅ This ensures it's a Client Component
"use client"; // ✅ Client-side animations

import { motion } from "framer-motion";
import { Menu } from "lib/shopify/types";
import Link from "next/link";

export default function MotionNavbar({ menu }: { menu: Menu[] }) {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] 
                 bg-white/10 backdrop-blur-xl shadow-neon rounded-lg p-4 
                 flex justify-between items-center z-50 border border-white/20"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <motion.img
          src="/images/asset-3.svg" // Update with your logo path
          alt="Site Logo"
          className="h-12 w-auto"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <span className="text-white font-bold text-lg tracking-wide">Free Cable</span>
      </div>

      {/* Menu Links */}
      <ul className="hidden gap-6 text-md font-medium tracking-wide uppercase md:flex md:items-center">
        {menu.map((item) => (
          <motion.li
            key={item.title}
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link
              href={item.path}
              className="text-white hover:text-primary transition duration-300"
            >
              {item.title}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Cart Icon */}
      <motion.div
        className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition duration-300 cursor-pointer"
        whileHover={{ scale: 1.2 }}
      >
        🛒
      </motion.div>
    </motion.nav>
  );
}
