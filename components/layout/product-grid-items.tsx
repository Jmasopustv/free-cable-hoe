import { GridTileImage } from 'components/grid/tile';
import { motion } from 'framer-motion';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <motion.div
          key={product.handle}
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
            prefetch={true}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="transition-all duration-500 ease-in-out group-hover:blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500 p-4 flex flex-col justify-end">
              <h3 className="text-white text-lg font-bold">{product.title}</h3>
              <p className="text-primary font-semibold">${product.priceRange.maxVariantPrice.amount} USD</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </>
  );
}
