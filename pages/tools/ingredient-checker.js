// pages/tools/ingredient-checker.js

import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

// --- Las listas de ingredientes no cambian ---
const goodIngredients = [ 'niacinamide', 'hyaluronic acid', 'sodium hyaluronate', 'ceramide', 'retinol', 'retinal', 'retinaldehyde', 'ascorbic acid', 'peptide', 'glycerin', 'panthenol', 'squalane', 'salicylic acid', 'glycolic acid', 'lactic acid', 'azelaic acid', 'shea butter', 'centella asiatica', 'vitamin c' ];
const badIngredients = [ 'alcohol denat', 'sd alcohol', 'isopropyl alcohol', 'fragrance', 'parfum', 'essential oil', 'limonene', 'linalool', 'sulfate', 'sls', 'sles', 'sodium lauryl sulfate', 'sodium laureth sulfate', 'mineral oil', 'paraffinum liquidum' ];

export default function IngredientCheckerPage() {
  const [inputText, setInputText] = useState('');

  const analysis = useMemo(() => {
    if (!inputText) return { foundGood: [], foundBad: [], processedText: null };

    let processed = inputText;
    const foundGood = new Set();
    const foundBad = new Set();

    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    badIngredients.forEach(ingredient => {
      const regex = new RegExp(`\\b(${escapeRegExp(ingredient)})s?\\b`, 'gi');
      if (processed.match(regex)) {
        foundBad.add(ingredient);
        processed = processed.replace(regex, match => `<mark class="bg-red-200 text-red-900 px-1 rounded">${match}</mark>`);
      }
    });

    goodIngredients.forEach(ingredient => {
      const regex = new RegExp(`\\b(${escapeRegExp(ingredient)})s?\\b`, 'gi');
      if (processed.match(regex)) {
        foundGood.add(ingredient);
        processed = processed.replace(regex, match => `<mark class="bg-green-200 text-green-900 px-1 rounded">${match}</mark>`);
      }
    });
    
    return { 
      foundGood: Array.from(foundGood), 
      foundBad: Array.from(foundBad),
      processedText: processed
    };
      
  }, [inputText]);

  return (
    <Layout>
      <Head>
        <title>Ingredient Checker | Kiana's Tools</title>
        <meta name="description" content="Analyze any skincare ingredient list. Our tool instantly highlights the good and potentially irritating ingredients to help you shop smarter." />
      </Head>

      <div className="max-w-4xl mx-auto my-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Skincare Ingredient Checker
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Decode your skincare labels instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">1. Paste your ingredient list:</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
              placeholder="e.g., Aqua, Glycerin, Niacinamide, Alcohol Denat., Fragrances..."
            />
          </div>

          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">2. Analysis Result:</h2>
            <div className="w-full h-80 p-4 border bg-gray-50 rounded-lg overflow-y-auto prose max-w-none break-words">
              {analysis.processedText ? (
                <p dangerouslySetInnerHTML={{ __html: analysis.processedText.replace(/\n/g, '<br />') }} />
              ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-400">
                  <p>Your analysis will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- NUEVA SECCIÓN DE RESUMEN --- */}
        {(analysis.foundGood.length > 0 || analysis.foundBad.length > 0) && (
           <div className="mt-8 bg-white p-6 rounded-lg shadow-sm animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Summary of Findings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✓ Notable Beneficial Ingredients:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysis.foundGood.map(ing => <li key={ing} className="capitalize">{ing}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">✗ Potentially Irritating Ingredients:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysis.foundBad.map(ing => <li key={ing} className="capitalize">{ing}</li>)}
                  </ul>
                </div>
              </div>
           </div>
        )}

      </div>
    </Layout>
  );
}