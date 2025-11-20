// pages/tools/ingredient-checker.js

import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

// --- NUESTRA "BASE DE DATOS" DE INGREDIENTES ---
const goodIngredients = [
  'niacinamide', 'hyaluronic acid', 'sodium hyaluronate', 'ceramide', 'retinol', 'retinal', 'retinaldehyde',
  'vitamin c', 'ascorbic acid', 'peptide', 'glycerin', 'panthenol', 'squalane',
  'salicylic acid', 'glycolic acid', 'lactic acid', 'azelaic acid', 'shea butter', 'centella asiatica'
];

const badIngredients = [
  'alcohol denat', 'sd alcohol', 'isopropyl alcohol', 'fragrance', 'parfum', 'essential oil',
  'sulfate', 'sodium lauryl sulfate', 'sodium laureth sulfate', 'mineral oil', 'paraffinum liquidum'
];

export default function IngredientCheckerPage() {
  const [inputText, setInputText] = useState('');

  // 'useMemo' es un hook de optimización. Solo recalcula el resultado si el texto de entrada cambia.
  const processedText = useMemo(() => {
    if (!inputText) return null;

    // Convertimos las listas a un formato más eficiente para la búsqueda
    const goodRegex = new RegExp(`\\b(${goodIngredients.join('|')})\\b`, 'gi');
    const badRegex = new RegExp(`\\b(${badIngredients.join('|')})\\b`, 'gi');

    // Escapamos caracteres especiales de HTML y luego reemplazamos las palabras clave
    return inputText
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(goodRegex, match => `<span class="bg-green-100 text-green-800 font-bold px-1 rounded">${match}</span>`)
      .replace(badRegex, match => `<span class="bg-red-100 text-red-800 font-bold px-1 rounded">${match}</span>`);
      
  }, [inputText]);

  return (
    <Layout>
      <Head>
        <title>Ingredient Checker | Kiana's Tools</title>
        <meta name="description" content="Analyze any skincare ingredient list. Our tool instantly highlights the good and potentially irritating ingredients to help you shop smarter." />
      </Head>

      <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Skincare Ingredient Checker
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Paste an ingredient list below to instantly analyze it.
          </p>
        </div>

        {/* --- CAMPO DE TEXTO --- */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          placeholder="e.g., Aqua, Glycerin, Niacinamide, Alcohol Denat., ..."
        />

        {/* --- LEYENDA DE COLORES --- */}
        <div className="flex justify-center space-x-6 my-6 text-sm">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-green-100 border border-green-300 mr-2"></span>
            <span>Beneficial Ingredients</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-red-100 border border-red-300 mr-2"></span>
            <span>Potentially Irritating</span>
          </div>
        </div>

        {/* --- ZONA DE RESULTADOS --- */}
        {processedText && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Analysis Result</h2>
            <div
              className="p-4 border bg-gray-50 rounded-lg prose max-w-none break-words"
              dangerouslySetInnerHTML={{ __html: processedText }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}