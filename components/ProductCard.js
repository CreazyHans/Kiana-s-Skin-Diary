// /components/ProductCard.js

import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group text-center border hover:border-pink-300 transition-all duration-300">
      <div className="relative w-full h-64 bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={`Image of ${product.name}`}
          layout="fill"
          objectFit="contain"
          className="p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 h-14 flex items-center justify-center">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 h-12">{product.description}</p>
        <a 
          href={product.affiliateUrl} 
          target="_blank" 
          rel="noopener noreferrer nofollow"
          className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          View on Amazon
        </a>
      </div>
    </div>
  );
}