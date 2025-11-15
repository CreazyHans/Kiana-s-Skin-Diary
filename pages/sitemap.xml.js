// En un nuevo archivo llamado /pages/sitemap.xml.js

import { getAllPostSlugs, getAllLegalPageSlugs } from '../lib/contentful'; // Tus funciones para obtener slugs

const URL = 'https://www.kianaskindiary.online';

function generateSiteMap(posts, legalPages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Páginas estáticas -->
     <url><loc>${URL}</loc></url>
     <url><loc>${URL}/products</loc></url>
     <url><loc>${URL}/contacto</loc></url>
     <!-- Posts del blog -->
     ${posts
       .map(({ slug }) => {
         return `<url><loc>${`${URL}/posts/${slug}`}</loc></url>`;
       })
       .join('')}
     <!-- Páginas legales -->
     ${legalPages
       .map(({ slug }) => {
         return `<url><loc>${`${URL}/${slug}`}</loc></url>`;
       })
       .join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const postSlugs = await getAllPostSlugs(); // Necesitarías modificar tus funciones para que devuelvan solo el slug
  const legalSlugs = await getAllLegalPageSlugs();

  const sitemap = generateSiteMap(postSlugs, legalSlugs);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() {}