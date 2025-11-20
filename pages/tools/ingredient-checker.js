// pages/tools/ingredient-checker.js

import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

// --- LISTAS DE INGREDIENTES MEJORADAS ---
const goodIngredients = [
  'niacinamide', 'hyaluronic acid', 'sodium hyaluronate', 'ceramide', 'retinol', 'retinal', 'retinaldehyde',
  'ascorbic acid', 'peptide', 'glycerin', 'panthenol', 'squalane', 'salicylic acid', 'glycolic acid', 'lactic acid', 
  'azelaic acid', 'shea butter', 'centella asiatica', 'vitamin c'
];

const badIngredients = [
  'alcohol denat', 'sd alcohol', 'isopropyl alcohol', 'fragrance', 'parfum', 'essential oil', 'limonene', 'linalool',
  'sulfate', 'sls', 'sles', 'sodium lauryl sulfate', 'sodium laureth sulfate', 'mineral oil', 'paraffinum liquidum'
];

export default function IngredientCheckerPage() {
  const [inputText, setInputText] = useState('');

  // --- LÓGICA DE PROCESAMIENTO REESCRITA Y CORREGIDA ---
  const processedText = useMemo(() => {
    if (!inputText) return null;

    let processed = inputText;
    
    // Función para escapar caracteres que pueden romper el RegExp
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // Resaltar ingredientes malos
    badIngredients.forEach(ingredient => {
      const regex = new RegExp(`\\b(${escapeRegExp(ingredient)})s?\\b`, 'gi');
      processed = processed.replace(regex, match => `<mark class="bg-red-400 text-red-900 px-1 rounded">${match}</mark>`);
    });

    // Resaltar ingredientes buenos
    goodIngredients.forEach(ingredient => {
      const regex = new RegExp(`\\b(${escapeRegExp(ingredient)})s?\\b`, 'gi');
      processed = processed.replace(regex, match => `<mark class="bg-green-400 text-green-900 px-1 rounded">${match}</mark>`);
    });
    
    return processed;
      
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Paste your ingredient list here:</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
              placeholder="e.g., Aqua, Glycerin, Niacinamide, Alcohol Denat., Fragrances..."
            />
            <div className="flex justify-start space-x-6 text-sm">
              <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-400 mr-2"></span><span>Beneficial</span></div>
              <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-red-400 mr-2"></span><span>Potentially Irritating</span></div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Analysis Result:</h2>
            <div className="w-full h-80 p-4 border bg-gray-50 rounded-lg overflow-y-auto prose max-w-none break-words">
              {processedText ? (
                <p dangerouslySetInnerHTML={{ __html: processedText.replace(/\n/g, '<br />') }} />
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