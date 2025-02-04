"use client"; // ✅ Client-side animations

import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "components/cart/cart-context";
import { useState } from "react";

export default function MotionNavbar({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const { cart } = useCart();
  const cartCount = cart?.lines?.reduce((total, line) => total + line.quantity, 0) || 0; // ✅ Shopify cart count
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ✅ Left Sidebar Navbar */}
      <motion.nav
        className="fixed top-0 left-0 h-full w-[80px] md:w-[200px] bg-offBlack/80 
                   backdrop-blur-lg shadow-xl p-4 flex flex-col items-center 
                   justify-between z-50 border-r border-white/10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* ✅ Logo */}
        <motion.img
          src="/images/asset-dooberry.svg"
          alt="Site Logo"
          className="h-16 w-auto mb-8"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        {/* ✅ Navigation Links */}
        <ul className="flex flex-col gap-6 text-md font-medium tracking-wide uppercase items-center">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <motion.li
                key={item.title}
                whileHover={{ scale: 1.1, x: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative"
              >
                <Link
                  href={item.path}
                  className={`text-white hover:text-signatureYellow transition duration-300 ${
                    isActive ? "text-signatureYellow" : ""
                  }`}
                >
                  {item.title}
                </Link>
                {isActive && (
                  <motion.div
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-signatureYellow"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.li>
            );
          })}
        </ul>

        {/* ✅ Cart Button (Always Visible) */}
        <motion.div
          className="relative flex flex-col items-center p-4 bg-dooberry 
                     hover:bg-blast text-white font-semibold text-md 
                     rounded-lg shadow-dooberryGlow transition-all duration-300 
                     cursor-pointer mt-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          🛒 <span>Cart</span>

          {/* ✅ Item Count Badge */}
          {cartCount > 0 && (
            <motion.div
              className="absolute -top-2 right-2 bg-signatureYellow text-offBlack 
                         text-xs font-bold rounded-full w-5 h-5 flex 
                         items-center justify-center shadow-glow"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            >
              {cartCount}
            </motion.div>
          )}
        </motion.div>
      </motion.nav>

      {/* ✅ Mobile Menu (Swipe Gesture) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-offBlack/90 flex flex-col items-center justify-center space-y-6 
                       text-white text-lg z-50 md:hidden mobile-menu"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) setMobileOpen(false);
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-3xl"
              onClick={() => setMobileOpen(false)}
            >
              ✖
            </button>

            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="text-white hover:text-signatureYellow text-xl transition duration-300"
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Mobile Menu Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 p-2 bg-dooberry text-white rounded-lg shadow-dooberryGlow"
        onClick={() => setMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? "✖" : "☰"}
      </button>
    </>
  );
}

