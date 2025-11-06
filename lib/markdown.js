// /lib/markdown.js -> Ahora será nuestra librería de Contentful

import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

/**
 * --- LÓGICA PARA CATEGORÍAS ---
 */

// Formatea los datos de una categoría que vienen de Contentful
const parseCategory = (category) => ({
  name: category.fields.name,
  slug: category.fields.slug,
  description: category.fields.description,
  // Las imágenes en Contentful necesitan un tratamiento especial
  image: 'https:' + category.fields.image?.fields.file.url,
});

// Obtiene todas las categorías
export async function getAllCategories() {
  const entries = await client.getEntries({ content_type: 'category' });
  return entries.items.map(parseCategory);
}

/**
 * --- LÓGICA PARA POSTS ---
 */

// Formatea los datos de un post que vienen de Contentful
const parsePost = (post) => ({
    title: post.fields.title,
    slug: post.fields.slug,
    date: post.fields.date,
    excerpt: post.fields.excerpt,
    cover_image: 'https:' + post.fields.coverImage?.fields.file.url,
    category: post.fields.category?.fields.slug, // Guardamos el slug de la categoría
    content: post.fields.content, // Dejamos el Rich Text como está
});

// Obtiene todos los slugs de los posts para generar las rutas
export async function getAllPostSlugs() {
  const entries = await client.getEntries({ 
    content_type: 'post',
    select: 'fields.slug' // Solo pedimos el campo slug, es más eficiente
  });
  return entries.items.map(item => ({
      params: { slug: item.fields.slug }
  }));
}

// Obtiene los datos de un post específico por su slug
export async function getPostData(slug) {
    const entries = await client.getEntries({
        content_type: 'post',
        'fields.slug': slug,
        limit: 1, // Solo esperamos un resultado
    });
    if (entries.items.length === 0) return null;
    return parsePost(entries.items[0]);
}

// Obtiene todos los posts de una categoría específica
export async function getPostsByCategory(categorySlug) {
    const categoryEntry = await client.getEntries({
        content_type: 'category',
        'fields.slug': categorySlug,
        limit: 1
    });

    if(categoryEntry.items.length === 0) return [];

    const categoryId = categoryEntry.items[0].sys.id;

    const postEntries = await client.getEntries({
        content_type: 'post',
        'fields.category.sys.id': categoryId, // Filtramos por el ID de la categoría referenciada
        order: '-fields.date' // Ordenamos por fecha descendente
    });

    return postEntries.items.map(parsePost);
}