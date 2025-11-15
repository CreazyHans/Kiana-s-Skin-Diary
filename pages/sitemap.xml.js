// En un nuevo archivo llamado /pages/sitemap.xml.js

import { getAllPostSlugs, getAllLegalPageSlugs } from '../lib/contentful';

const URL = 'https://www.kianaskindiary.online';

function generateSiteMap(posts, legalPages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Páginas estáticas -->
     <url><loc>${URL}</loc></url>
     <url><loc>${URL}/products</loc></url>
     <url><loc>${URL}/contacto</loc></url>
     <url><loc>${URL}/blog</loc></url>
     <!-- Posts del blog -->
     ${posts
       .map(({ params }) => {
         // Aseguramos que params y params.slug existan para evitar errores
         if (params && params.slug) {
           return `<url><loc>${`${URL}/posts/${params.slug}`}</loc></url>`;
         }
         return '';
       })
       .join('')}
     <!-- Páginas legales -->
     ${legalPages
       .map(({ params }) => {
         // Aseguramos que params y params.legalSlug existan
         if (params && params.legalSlug) {
           return `<url><loc>${`${URL}/${params.legalSlug}`}</loc></url>`;
         }
         return '';
       })
       .join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // Obtenemos todos los slugs de los posts y las páginas legales
  const postSlugs = await getAllPostSlugs();
  const legalSlugs = await getAllLegalPageSlugs();

  // Generamos el sitemap con los datos obtenidos
  const sitemap = generateSiteMap(postSlugs || [], legalSlugs || []);

  // Configuramos la cabecera de la respuesta para que sea un archivo XML
  res.setHeader('Content-Type', 'text/xml');
  // Escribimos el contenido del sitemap en la respuesta
  res.write(sitemap);
  // Finalizamos la respuesta
  res.end();

  // Devolvemos un objeto vacío para props, ya que la página no renderiza nada
  return { props: {} };
}

// Exportamos un componente vacío por defecto, ya que esta página solo sirve para generar el XML
export default function SiteMap() {}