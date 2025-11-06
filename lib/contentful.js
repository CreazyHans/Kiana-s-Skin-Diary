// /lib/contentful.js

import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// --- FUNCIONES DE PARSEO (Limpieza de datos) ---
const parseCategoryFields = (fields) => ({
  name: fields.name || 'Untitled Category',
  slug: fields.slug || '',
  description: fields.description || null,
  image: fields.image ? 'https:' + fields.image.fields.file.url : null,
});

const parsePostFields = (fields) => {
  const categorySlug = fields.category && fields.category.fields ? fields.category.fields.slug : null;

  return {
    title: fields.title || 'Untitled Post',
    slug: fields.slug || '',
    excerpt: fields.excerpt || null,
    cover_image: fields.coverImage ? 'https:' + fields.coverImage.fields.file.url : null,
    categorySlug: categorySlug,
    content: fields.content || null,
  };
};

const parseLegalPageFields = (fields) => ({
    title: fields.title || 'Untitled Page',
    slug: fields.slug || '',
    content: fields.content || null,
});


// --- FUNCIONES DE OBTENCIÓN DE DATOS ---

export async function getAllCategories() {
  const entries = await client.getEntries({ content_type: 'category' });
  if (!entries.items) return [];
  return entries.items.map(item => parseCategoryFields(item.fields));
}

export async function getAllPosts() {
  const entries = await client.getEntries({ content_type: 'post' });
  if (!entries.items) return [];
  return entries.items.map(item => parsePostFields(item.fields));
}

export async function getCategoriesWithPosts() {
  const allCategories = await getAllCategories();
  const allPosts = await getAllPosts();

  return allCategories.map(category => {
    return {
      ...category,
      posts: allPosts.filter(post => post.categorySlug === category.slug),
    };
  });
}

export async function getAllPostSlugs() {
  const entries = await client.getEntries({ 
    content_type: 'post',
    select: 'fields.slug'
  });
  if (!entries.items) return [];
  return entries.items.map(item => ({
      params: { slug: item.fields.slug }
  }));
}

export async function getPostData(slug) {
    const entries = await client.getEntries({
        content_type: 'post',
        'fields.slug': slug,
        limit: 1,
    });
    if (!entries.items || entries.items.length === 0) return null;
    return parsePostFields(entries.items[0].fields);
}

export async function getAllLegalPageSlugs() {
  const entries = await client.getEntries({ 
    content_type: 'legalPage',
    select: 'fields.slug'
  });
  if (!entries.items) return [];
  return entries.items.map(item => ({
      params: { legalSlug: item.fields.slug }
  }));
}

export async function getLegalPageData(slug) {
    const entries = await client.getEntries({
        content_type: 'legalPage',
        'fields.slug': slug,
        limit: 1,
    });
    if (!entries.items || entries.items.length === 0) return null;
    return parseLegalPageFields(entries.items[0].fields);
}