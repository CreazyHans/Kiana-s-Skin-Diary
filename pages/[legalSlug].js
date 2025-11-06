// /pages/[legalSlug].js

import { getAllLegalPageSlugs, getLegalPageData } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '../components/Layout';
import Head from 'next/head';

export default function LegalPage({ page }) {
  if (!page) return <Layout><h1>Page not found.</h1></Layout>;

  return (
    <Layout pageTitle={page.title}>
      <Head>
        <title>{`${page.title} | Kiana's Skin Diary`}</title>
      </Head>
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{page.title}</h1>
        <div className="prose prose-lg max-w-none">
          {documentToReactComponents(page.content)}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllLegalPageSlugs();
  return {
    paths: paths || [], // Mantenemos '|| []' por seguridad
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