// pages/tools/ingredient-checker.js

import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

// --- Las "bases de datos" de ingredientes no cambian ---
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

  const processedText = useMemo(() => {
    if (!inputText) return null;

    const goodRegex = new RegExp(`\\b(${goodIngredients.join('|')})\\b`, 'gi');
    const badRegex = new RegExp(`\\b(${badIngredients.join('|')})\\b`, 'gi');

    return inputText
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(goodRegex, match => `<mark class="bg-green-200 text-green-900 px-1 rounded">${match}</mark>`)
      .replace(badRegex, match => `<mark class="bg-red-200 text-red-900 px-1 rounded">${match}</mark>`);
      
  }, [inputText]);

  return (
    <Layout>
      <Head>
        <title>Ingredient Checker | Kiana's Tools</title>
        <meta name="description" content="Analyze any skincare ingredient list. Our tool instantly highlights the good and potentially irritating ingredients to help you shop smarter." />
      </Head>

      <div className="max-w-4xl mx-auto my-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Skincare Ingredient Checker
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Decode your skincare labels instantly.
          </p>
        </div>

        {/* --- NUEVA ESTRUCTURA DE 2 COLUMNAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
          
          {/* --- Columna Izquierda: Entrada de Texto --- */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Paste your ingredient list here:</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
              placeholder="e.g., Aqua, Glycerin, Niacinamide, Alcohol Denat., ..."
            />
            <div className="flex justify-start space-x-6 text-sm">
              <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-700 mr-2"></span><span>Beneficial</span></div>
              <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-red-700 mr-2"></span><span>Potentially Irritating</span></div>
            </div>
          </div>

          {/* --- Columna Derecha: Resultados --- */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Analysis Result:</h2>
            <div className="w-full h-80 p-4 border bg-gray-50 rounded-lg overflow-y-auto prose max-w-none break-words">
              {processedText ? (
                <p dangerouslySetInnerHTML={{ __html: processedText }} />
              ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-400">
                  <p>Your analysis will appear here.<br/>Start by pasting an ingredient list on the left.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}