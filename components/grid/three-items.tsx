import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  // Fallback values for missing data
  const imageUrl = item.featuredImage?.url || '/placeholder-image.jpg';
  const productTitle = item.title || 'Unknown Product';
  const price = item.priceRange?.maxVariantPrice?.amount || '0.00';
  const currencyCode = item.priceRange?.maxVariantPrice?.currencyCode || 'USD';
  const productHandle = item.handle || '#';

  return (
    <div
      className={
        size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${productHandle}`}
        prefetch={true}
      >
        <GridTileImage
          src={imageUrl}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={productTitle}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: productTitle,
            amount: price,
            currencyCode: currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  try {
    // Fetch products from the specified collection
    const homepageItems = await getCollectionProducts({
      collection: 'winter-2k24', // Ensure this handle matches your Shopify collection handle
    });

    // Ensure homepageItems is an array and has at least 1 product
    if (!homepageItems || homepageItems.length === 0) {
      console.warn('No products found in the collection');
      return null;
    }

    // Safely extract products
    const firstProduct = homepageItems[0] as Product;
    const secondProduct = homepageItems[1] as Product | undefined; // Second product might be undefined
    const thirdProduct = homepageItems[2] as Product | undefined; // Third product might be undefined

    return (
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        {/* Render the first product */}
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />

        {/* Render the second product if it exists */}
        {secondProduct && <ThreeItemGridItem size="half" item={secondProduct} priority={true} />}

        {/* Render the third product if it exists */}
        {thirdProduct && <ThreeItemGridItem size="half" item={thirdProduct} />}
      </section>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}
