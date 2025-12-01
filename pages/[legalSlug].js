// /pages/[legalSlug].js

import { getAllLegalPageSlugs, getLegalPageData } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Layout from '../components/Layout';
import Head from 'next/head';
import ResponsiveRichTextTable from '../components/ResponsiveRichTextTable'; // <-- 1. Importa el nuevo componente

export default function LegalPage({ page }) {
  if (!page) return <Layout><h1>Page not found.</h1></Layout>;

  // --- 2. Define las opciones de renderizado ---
  const options = {
    renderNode: {
      [BLOCKS.TABLE]: (node, children) => {
        // Cada vez que encuentre una tabla, usará nuestro componente
        return <ResponsiveRichTextTable node={node} />;
      },
    },
  };
  // -----------------------------------------

  return (
    <Layout pageTitle={page.title}>
      <Head>
        <title>{`${page.title} | Kiana's Skin Diary`}</title>
      </Head>
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{page.title}</h1>
        <div className="prose prose-lg max-w-none">
          {/* 3. Pasa las 'options' al renderizador */}
          {documentToReactComponents(page.content, options)}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllLegalPageSlugs();
  return {
    paths: paths || [],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = await getLegalPageData(params.legalSlug);
  return {
    props: { page },
    revalidate: 60,
  };
}