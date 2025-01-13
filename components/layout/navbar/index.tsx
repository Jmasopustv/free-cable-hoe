import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      {/* Mobile Menu */}
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>

      {/* Main Navbar */}
      <div className="flex w-full items-center">
        {/* Logo and Site Name */}
        <div className="flex w-full md:w-1/3 items-center">
          {/* Logo */}
          <img
            src="../../../images/flatDooberry.png" // Path to your logo image
            alt="Site Logo"
            className="h-8 w-auto mr-2"
          />

          {/* Custom Site Name Image */}
          <img
            src="../../../images/flatDooberry.png" // Path to your site name image
            alt="Site Name"
            className="h-6 w-auto hidden md:block" // Adjust visibility and size
          />

          {/* Navigation Menu */}
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Search Bar */}
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        {/* Cart Icon */}
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
