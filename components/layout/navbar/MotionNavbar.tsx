"use client"; // ✅ Client-side animations

import { motion } from "framer-motion";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Get current page path

export default function MotionNavbar({ menu }: { menu: Menu[] }) {
  const pathname = usePathname(); // ✅ Detect active page

  return (
    <motion.nav
        className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] 
             bg-offBlack/30 backdrop-blur-lg shadow-glow rounded-lg p-4 
             flex justify-between items-center z-50 border border-white/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    >

      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <motion.img
          src="/images/asset-doobery.svg" // ✅ Your new logo
          alt="Site Logo"
          className="h-12 w-auto"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <span className="text-white font-bold text-lg tracking-wide">Free Cable</span>
      </div>

      {/* Menu Links with Active Highlight */}
      <ul className="hidden gap-6 text-md font-medium tracking-wide uppercase md:flex md:items-center">
        {menu.map((item) => {
          const isActive = pathname === item.path; // ✅ Check if active page

          return (
            <motion.li
              key={item.title}
              whileHover={{ scale: 1.1, y: -3 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <Link
                href={item.path}
                className={`text-white hover:text-primary transition duration-300 ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {item.title}
              </Link>
              {isActive && (
                <motion.div
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-primary"
                  layoutId="activeIndicator"
                />
              )}
            </motion.li>
          );
        })}
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
