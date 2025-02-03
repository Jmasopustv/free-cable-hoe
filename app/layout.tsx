import { CartProvider } from 'components/cart/cart-context';
import Navbar from 'components/layout/navbar';
import MotionWrapper from 'components/MotionWrapper'; // ✅ Import the Client Component
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = getCart(cartId); // ✅ Keep this as a promise!

  return (
    <MotionWrapper> {/* ✅ Now using a Client Component */}
      <CartProvider cartPromise={cart}>
        <Navbar />
        <main className="min-h-screen">{children ?? <div>Loading...</div>}</main>
        <Toaster />
      </CartProvider>
    </MotionWrapper>
  );
}
