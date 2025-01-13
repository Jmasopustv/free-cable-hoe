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

    // Handle cases where fewer than 3 products are available
    if (!homepageItems || homepageItems.length < 3) {
      console.warn('Not enough products found in the collection');
      return null;
    }

    // Get the first three products
    const [firstProduct, secondProduct, thirdProduct] = homepageItems;

    return (
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
        <ThreeItemGridItem size="half" item={thirdProduct} />
      </section>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}
