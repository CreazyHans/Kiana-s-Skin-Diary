// /components/PostCard.js

import Link from 'next/link';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// PASO 1: Aceptamos la nueva propiedad 'isPriority' y le damos un valor por defecto.
export default function PostCard({ post, isPriority = false }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        <div className="relative w-full h-48">
          {post.cover_image && (
            <Image 
              src={post.cover_image} 
              alt={post.title || 'Post image'} 
              layout="fill" 
              objectFit="cover" 
              className="transition-transform duration-300 group-hover:scale-105"
              // PASO 2: Le pasamos la propiedad 'priority' a la imagen.
              // Solo será 'true' para el primer post de la página de inicio.
              priority={isPriority} 
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
          
          <div className="text-gray-700 prose prose-sm">
            {post.excerpt ? documentToReactComponents(post.excerpt) : null}
          </div>
        </div>
    </Link>
  );
}