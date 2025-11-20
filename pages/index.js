// /pages/index.js

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getCategoriesWithPosts } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'; // <-- RUTA CORREGIDA
import Link from 'next/link';
import Image from 'next/image'; // <-- AHORA SÍ SE USARÁ

// --- NUEVO COMPONENTE PARA LAS TARJETAS DE HERRAMIENTAS CON IMAGEN ---
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

export default function HomePage({ categoriesWithPosts }) {
  return (
    <Layout>
      <section className="text-center py-16 px-4 bg-pink-50 rounded-lg shadow-inner">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome to <span className="text-green-600">Kiana's Skin Diary</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore skincare topics based on science. Find the perfect routine and products for your skin type.
        </p>
      </section>

      {/* --- SECCIÓN DE HERRAMIENTAS CON IMÁGENES --- */}
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
      </section>

      {/* --- SECCIÓN DE POSTS DEL BLOG --- */}
      <div className="space-y-16">
        {categoriesWithPosts.map((category, categoryIndex) => (
          <section key={category.slug}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
              {category.description && (
                <div className="mt-2 text-gray-600 max-w-2xl mx-auto prose">
                  {documentToReactComponents(category.description)}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.posts.map((post, postIndex) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  isPriority={categoryIndex === 0 && postIndex === 0}
                />
              ))}
            </div>
          </section>
        ))}
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