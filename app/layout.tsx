import { CartProvider } from 'components/cart/cart-context';
import Navbar from 'components/layout/navbar'; // ✅ Fixed Import
import dynamic from 'next/dynamic';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

// ✅ Disable SSR for Framer Motion Components
const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });
const MotionBody = dynamic(() => import('framer-motion').then((mod) => mod.motion.body), { ssr: false });
const MotionMain = dynamic(() => import('framer-motion').then((mod) => mod.motion.main), { ssr: false });

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = getCart(cartId); // ✅ Keep it as a promise


  return (
    <MotionDiv
      lang="en"
      className={`${GeistSans.variable} dark:bg-darkBg bg-lightBg text-white`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MotionBody>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <MotionMain className="min-h-screen">{children ?? <div>Loading...</div>}</MotionMain>
          <Toaster />
        </CartProvider>
      </MotionBody>
    </MotionDiv>
  );
}
