import CartModal from 'components/cart/modal';
import dynamic from 'next/dynamic';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

// ✅ Disable SSR for Framer Motion Components
const MotionNav = dynamic(() => import('framer-motion').then((mod) => mod.motion.nav), { ssr: false });
const MotionLi = dynamic(() => import('framer-motion').then((mod) => mod.motion.li), { ssr: false });

export default async function Navbar() { // ✅ Changed to default export
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <MotionNav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-white/10 backdrop-blur-xl shadow-neon rounded-lg p-4 flex justify-between items-center z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>

      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3 items-center">
          <img
            src="../../../images/flatDooberry.png"
            alt="Site Logo"
            className="h-10 w-auto mr-2"
          />
          <ul className="hidden gap-6 text-md font-medium tracking-wide uppercase md:flex md:items-center">
            {menu.map((item: Menu) => (
              <MotionLi
                key={item.title}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Link
                  href={item.path}
                  className="text-white hover:text-primary transition duration-300"
                >
                  {item.title}
                </Link>
              </MotionLi>
            ))}
          </ul>
        </div>

        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </MotionNav>
  );
}
