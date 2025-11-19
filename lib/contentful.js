// /lib/contentful.js
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Parse Category
const parseCategoryFields = (fields) => ({
  name: fields.name || 'Untitled Category',
  slug: fields.slug || '',
  description: fields.description || null,
  image: fields.image?.fields?.file?.url
    ? 'https:' + fields.image.fields.file.url
    : null,
});

// Parse Posts
const parsePostFields = (fields) => ({
  title: fields.title || 'Untitled Post',
  slug: fields.slug || '',
  excerpt: fields.excerpt || null, // Rich text raw
  content: fields.content || null, // Rich text raw
  cover_image: fields.coverImage?.fields?.file?.url
    ? 'https:' + fields.coverImage.fields.file.url
    : null,
  categorySlug: fields.category?.fields?.slug || null,
  date: fields.date || null, // optional (doesn't break page)
});

// Parse Legal Pages
const parseLegalPageFields = (fields) => ({
  title: fields.title || 'Untitled Page',
  slug: fields.slug || '',
  content: fields.content || null,
});

// Get Categories
export async function getAllCategories() {
  const entries = await client.getEntries({ content_type: 'category' });
  return entries.items?.map(item => parseCategoryFields(item.fields)) || [];
}

// Get Posts
export async function getAllPosts() {
  const entries = await client.getEntries({ content_type: 'post' });
  return entries.items?.map(item => parsePostFields(item.fields)) || [];
}

// Get Categories with Posts
export async function getCategoriesWithPosts() {
  const allCategories = await getAllCategories();
  const allPosts = await getAllPosts();

  return allCategories.map(category => ({
    ...category,
    posts: allPosts.filter(post => post.categorySlug === category.slug),
  }));
}

// ✅ Generate paths slugs
export async function getAllPostSlugs() {
  const entries = await client.getEntries({
    content_type: 'post',
    select: 'fields.slug',
  });

  return entries.items?.map(item => ({
    params: { slug: item.fields.slug },
  })) || [];
}

// ✅ Get individual post
export async function getPostData(slug) {
  const entries = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug,
    limit: 1,
  });

  return entries.items?.length
    ? parsePostFields(entries.items[0].fields)
    : null;
}

// Legal Pages (unchanged)
export async function getAllLegalPageSlugs() {
  const entries = await client.getEntries({
    content_type: 'legalPage',
    select: 'fields.slug',
  });

  return entries.items?.map(item => ({
    params: { legalSlug: item.fields.slug },
  })) || [];
}

export async function getLegalPageData(slug) {
  const entries = await client.getEntries({
    content_type: 'legalPage',
    'fields.slug': slug,
    limit: 1,
  });

  return entries.items?.length
    ? parseLegalPageFields(entries.items[0].fields)
    : null;
}


// /lib/contentful.js

// ... (todo tu código existente va aquí arriba)

// --- NUEVA FUNCIÓN OPTIMIZADA PARA LA BÚSQUEDA ---
export async function getAllPostsForSearch() {
  const entries = await client.getEntries({ 
    content_type: 'post',
    // Solo pedimos los campos que necesitamos: título y slug. ¡Muy eficiente!
    select: 'fields.title,fields.slug',
  });
  
  // Usamos una función de parseo más simple
  return entries.items?.map(item => ({
    title: item.fields.title || 'Untitled Post',
    slug: item.fields.slug || '',
  })) || [];
}