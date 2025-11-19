import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Convierte rich text a texto plano
const richTextToPlain = (rich) => {
  if (!rich || !rich.content) return '';
  return rich.content
    .map(block => block?.content?.map(span => span?.value).join(' '))
    .join(' ');
};

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q || q.trim() === '') {
    return res.status(200).json([]);
  }

  const entries = await client.getEntries({
    content_type: 'post',
    query: q, // 🔍 Contentful filtra título, excerpt, contenido, tags, etc.
  });

  const results = entries.items.map(item => {
    const f = item.fields;
    return {
      title: f.title,
      slug: f.slug,
      excerpt: richTextToPlain(f.excerpt),
      cover_image: f.coverImage?.fields?.file?.url
        ? 'https:' + f.coverImage.fields.file.url
        : null,
    };
  });

  res.status(200).json(results);
}
