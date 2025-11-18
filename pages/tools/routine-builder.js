// pages/tools/routine-builder.js

import { useState } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

// Aquí es donde, más adelante, pondremos la "inteligencia" y los resultados.
const resultsDatabase = {
  // ... lo llenaremos después
};

export default function RoutineBuilderPage() {
  // Usamos el estado de React para guardar las selecciones del usuario
  const [skinType, setSkinType] = useState('');
  const [skinConcern, setSkinConcern] = useState('');
  const [experience, setExperience] = useState('');
  const [routine, setRoutine] = useState(null); // Aquí guardaremos la rutina generada

  const handleGenerateRoutine = () => {
    // Por ahora, esta función no hace nada. La programaremos después.
    console.log({ skinType, skinConcern, experience });
    // Aquí irá la lógica para buscar en 'resultsDatabase' y llamar a setRoutine.
  };

  return (
    <Layout>
      <Head>
        <title>Skincare Routine Builder | Kiana's Skin Diary</title>
        <meta name="description" content="Build your perfect, personalized skincare routine in 30 seconds with our interactive tool." />
      </Head>

      <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
        {/* --- CABECERA --- */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Build Your Perfect Skincare Routine
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Get a personalized AM & PM routine in 30 seconds.
          </p>
        </div>

        {/* --- FORMULARIO DE SELECCIÓN --- */}
        <div className="space-y-6">
          {/* --- Pregunta 1: Tipo de Piel --- */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">1. What is your skin type?</label>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
            >
              <option value="" disabled>Select your skin type...</option>
              <option value="oily">💧 Oily</option>
              <option value="dry">🏜️ Dry</option>
              <option value="combination">☯️ Combination</option>
              <option value="sensitive">🌿 Sensitive</option>
            </select>
          </div>

          {/* --- Pregunta 2: Preocupación Principal --- */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">2. What is your main skin concern?</label>
            <select
              value={skinConcern}
              onChange={(e) => setSkinConcern(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
            >
              <option value="" disabled>Select your main concern...</option>
              <option value="acne">🌋 Acne & Blemishes</option>
              <option value="anti-aging">⏳ Anti-Aging & Wrinkles</option>
              <option value="hyperpigmentation">✨ Hyperpigmentation & Dark Spots</option>
              <option value="hydration">💧 Hydration & Dullness</option>
            </select>
          </div>

          {/* --- Pregunta 3: Nivel de Experiencia --- */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">3. What's your experience level?</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
            >
              <option value="" disabled>Select your experience level...</option>
              <option value="beginner">🌱 Beginner</option>
              <option value="advanced">👩‍🔬 Advanced</option>
            </select>
          </div>

          {/* --- BOTÓN DE GENERAR --- */}
          <div className="text-center pt-4">
            <button
              onClick={handleGenerateRoutine}
              className="bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Generate My Routine
            </button>
          </div>
        </div>

        {/* --- ZONA DE RESULTADOS (La construiremos después) --- */}
        <div id="results-section" className="mt-12">
          {/* El resultado de la rutina se mostrará aquí */}
        </div>

      </div>
    </Layout>
  );
}