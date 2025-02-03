import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { motion } from 'framer-motion';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME || 'Free Cable',
    template: `%s | ${SITE_NAME || 'Free Cable'}`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = getCart(cartId);

  return (
    <motion.html
      lang="en"
      className={`${GeistSans.variable} dark:bg-darkBg bg-lightBg text-white`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.body>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <motion.main className="min-h-screen">{children}</motion.main>
          <Toaster />
        </CartProvider>
      </motion.body>
    </motion.html>
  );
}
