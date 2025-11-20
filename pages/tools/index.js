// /pages/tools/index.js

import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

const ToolCard = ({ href, title, description, icon }) => (
  <Link href={href} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
  </Link>
);

export default function ToolsPage() {
  return (
    <Layout>
      <Head>
        <title>Kiana's Tools | Kiana's Skin Diary</title>
        <meta name="description" content="Discover our collection of interactive skincare tools, including the Routine Builder and Skin Type Quiz, to help you achieve your best skin." />
      </Head>

      <div className="max-w-4xl mx-auto my-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Kiana's Tools
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Interactive tools to help you build a smarter skincare routine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ToolCard 
            href="/tools/routine-builder"
            icon="🛠️"
            title="Routine Builder"
            description="Get a personalized AM & PM skincare routine in 30 seconds based on your skin type and concerns."
          />
          <ToolCard 
            href="/tools/skin-type-quiz"
            icon="🧪"
            title="Skin Type Quiz"
            description="Not sure if you're oily, dry, or combination? Answer 4 simple questions to discover your true skin type."
          />
          {/* Aquí podremos añadir la tercera herramienta en el futuro */}
        </div>
      </div>
    </Layout>
  );
}