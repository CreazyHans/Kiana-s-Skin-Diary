// /pages/products.js

import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

// --- EDIT THIS LIST WITH YOUR SKINCARE AFFILIATE PRODUCTS! ---
const skincareProducts = [
  {
    name: 'La Roche-Posay Toleriane Double Repair Face Moisturizer.',
    description: 'This ultra-hydrating facial moisturizer helps restore the skin barrier for healthy-looking skin. Formulated with a high concentration.',
    imageUrl: '/images/product-cerave.jpg', // <- Place this image in /public/images/
    affiliateUrl: 'https://amzn.to/4oNiYss'
  },
  {
    name: 'Loción SGParent_EverydayLotion50',
    description: 'Super-powerful SPF: This lightweight, moisturizing, broad-spectrum sunscreen absorbs UVA (aging) and UVB (burning) rays so your skin doesnt.',
    imageUrl: '/images/product-niacinamide.jpg', // <- Place this image in /public/images/
    affiliateUrl: 'https://amzn.to/4oNiRwU'
  },
  {
    name: 'CeraVe - Retinol Serum for Skin Texture and Acne Marks',
    description: 'Retinol serum for acne-prone skin: with encapsulated retinol, this serum helps skin look smoother and more even-toned.',
    imageUrl: '/images/product-isdin.jpg', // <- Place this image in /public/images/
    affiliateUrl: 'https://amzn.to/43jJMIx'
  },
  // ...Add more products here
];

export default function ProductsPage() {
  return (
    <Layout 
      pageTitle="Recommended Products"
      description="Discover the best skincare products, selected and tested for you."
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">Recommended Skincare</h1>
        <p className="mt-2 text-gray-600">
          A curated selection of my favorite skincare products, chosen for their effectiveness and formulation.
        </p>
        <p className="text-xs text-gray-500 mt-4">
          (As an Amazon Associate, I earn from qualifying purchases)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skincareProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </Layout>
  );
}