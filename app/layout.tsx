import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

// Set the base URL for metadata
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, '@')
  : undefined;

const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, 'https://')
  : undefined;

// Metadata configuration for the layout
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME || 'Free Cable',
    template: `%s | ${SITE_NAME || 'Free Cable'}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
};

// Root layout component
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Retrieve cart ID from cookies
  const cartId = (await cookies()).get('cartId')?.value;

  // Fetch cart data without awaiting, passing Promise to CartProvider
  const cart = getCart(cartId);

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
