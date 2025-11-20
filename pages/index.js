// /pages/index.js

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getCategoriesWithPosts } from '../lib/contentful';
import { documentToReactComponents } from '@content-contentful/rich-text-react-renderer';
import Link from 'next/link';
import Image from 'next/image'; // <-- ¡IMPORTANTE! Asegúrate de importar Image

// --- NUEVO COMPONENTE PARA LAS TARJETAS DE HERRAMIENTAS CON IMAGEN ---
const ToolCardWithImage = ({ href, imgSrc, title, description }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group transform hover:scale-105 transition-transform duration-300">
    <Link href={href}>
      <div className="relative h-48">
        <Image 
          src={imgSrc}
          alt={`${title} tool preview`}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:opacity-90 transition-opacity"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  </div>
);

export default function HomePage({ categoriesWithPosts }) {
  return (
    <Layout>
      <section className="text-center py-16 px-4 bg-pink-50 rounded-lg shadow-inner">
        {/* ... (Tu sección de bienvenida no cambia) ... */}
      </section>

      {/* --- INICIO DE LA SECCIÓN DE HERRAMIENTAS CON IMÁGENES --- */}
      <section className="my-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Discover Our Interactive Skincare Tools
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-xl mx-auto">
          Go beyond the articles. Use our free tools to get personalized advice and build a smarter routine in seconds.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <ToolCardWithImage 
            href="/tools/routine-builder"
            imgSrc="/images/tool-routine-builder.png" // <-- ¡DEBES CREAR ESTA IMAGEN!
            title="Routine Builder"
            description="Get a personalized AM & PM routine in just 30 seconds."
          />
          
          <ToolCardWithImage 
            href="/tools/skin-type-quiz"
            imgSrc="/images/tool-skin-type-quiz.png" // <-- ¡DEBES CREAR ESTA IMAGEN!
            title="Skin Type Quiz"
            description="Answer 4 simple questions to discover your true skin type."
          />

          <ToolCardWithImage 
            href="/tools/ingredient-checker"
            imgSrc="/images/tool-ingredient-checker.png" // <-- ¡DEBES CREAR ESTA IMAGEN!
            title="Ingredient Checker"
            description="Instantly analyze any skincare ingredient list."
          />
          
        </div>
      </section>
      {/* --- FIN DE LA SECCIÓN DE HERRAMIENTAS --- */}

      <div className="space-y-16">
        {/* ... (El resto de tu página de inicio no cambia) ... */}
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const categoriesWithPosts = await getCategoriesWithPosts();
  return {
    props: {
      categoriesWithPosts,
    },
    revalidate: 60,
  };
}