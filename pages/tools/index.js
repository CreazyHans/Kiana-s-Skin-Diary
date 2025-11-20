// /pages/tools/index.js

import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // <-- ¡IMPORTANTE! Importamos Image

// --- NUEVO COMPONENTE PARA LAS TARJETAS CON IMAGEN ---
const ToolCardWithImage = ({ href, imgSrc, title, description }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group transform hover:scale-105 transition-transform duration-300">
    <Link href={href} className="flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image 
          src={imgSrc}
          alt={`${title} tool preview`}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:opacity-90 transition-opacity"
        />
      </div>
      <div className="p-6 text-center flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  </div>
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

        {/* --- USAMOS EL NUEVO DISEÑO DE TARJETAS CON IMAGEN --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <ToolCardWithImage 
            href="/tools/routine-builder"
            imgSrc="/images/tool-routine-builder.png"
            title="Routine Builder"
            description="Get a personalized AM & PM routine in just 30 seconds."
          />
          
          <ToolCardWithImage 
            href="/tools/skin-type-quiz"
            imgSrc="/images/tool-skin-type-quiz.png"
            title="Skin Type Quiz"
            description="Answer 4 simple questions to discover your true skin type."
          />

          <ToolCardWithImage 
            href="/tools/ingredient-checker"
            imgSrc="/images/tool-ingredient-checker.png"
            title="Ingredient Checker"
            description="Instantly analyze any skincare ingredient list."
          />
          
        </div>
      </div>
    </Layout>
  );
}