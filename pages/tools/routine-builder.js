// pages/tools/routine-builder.js

import { useState } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

// --- COMPONENTE AUXILIAR MODIFICADO PARA PERMITIR DESMARCAR ---
const OptionCard = ({ value, label, icon, selectedValue, onClick }) => {
  const isSelected = selectedValue === value;

  const handleClick = () => {
    // Si ya está seleccionado, lo deseleccionamos (pasando un string vacío).
    // Si no, lo seleccionamos (pasando su valor).
    if (isSelected) {
      onClick('');
    } else {
      onClick(value);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`flex-1 p-4 border rounded-lg text-center transition-all duration-200 ${
        isSelected
          ? 'bg-pink-500 text-white border-pink-500 shadow-lg scale-105'
          : 'bg-white hover:bg-pink-50'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="block mt-1 font-semibold">{label}</span>
    </button>
  );
};

export default function RoutineBuilderPage() {
  const [skinType, setSkinType] = useState('');
  const [skinConcern, setSkinConcern] = useState('');
  const [experience, setExperience] = useState('');
  const [routine, setRoutine] = useState(null);

  const handleGenerateRoutine = () => {
    console.log({ skinType, skinConcern, experience });
    // Aquí irá la lógica para generar la rutina
  };

  return (
    <Layout>
      <Head>
        <title>Skincare Routine Builder | Kiana's Skin Diary</title>
        <meta name="description" content="Build your perfect, personalized skincare routine in 30 seconds with our interactive tool." />
      </Head>

      <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Build Your Perfect Skincare Routine
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Get a personalized AM & PM routine in 30 seconds.
          </p>
        </div>

        <div className="space-y-8">
          {/* --- Pregunta 1: Tipo de Piel --- */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3 text-center">1. What is your skin type?</label>
            <div className="flex flex-wrap gap-4">
              <OptionCard value="oily" label="Oily" icon="💧" selectedValue={skinType} onClick={setSkinType} />
              <OptionCard value="dry" label="Dry" icon="🏜️" selectedValue={skinType} onClick={setSkinType} />
              <OptionCard value="combination" label="Combination" icon="☯️" selectedValue={skinType} onClick={setSkinType} />
              <OptionCard value="sensitive" label="Sensitive" icon="🌿" selectedValue={skinType} onClick={setSkinType} />
            </div>
          </div>

          {/* --- Pregunta 2: Preocupación Principal --- */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3 text-center">2. What is your main skin concern?</label>
            <div className="flex flex-wrap gap-4">
              <OptionCard value="acne" label="Acne" icon="🌋" selectedValue={skinConcern} onClick={setSkinConcern} />
              <OptionCard value="anti-aging" label="Anti-Aging" icon="⏳" selectedValue={skinConcern} onClick={setSkinConcern} />
              <OptionCard value="hyperpigmentation" label="Dark Spots" icon="✨" selectedValue={skinConcern} onClick={setSkinConcern} />
              <OptionCard value="hydration" label="Hydration" icon="💧" selectedValue={skinConcern} onClick={setSkinConcern} />
            </div>
          </div>

          {/* --- Pregunta 3: Nivel de Experiencia (MODIFICADA) --- */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3 text-center">3. What's your experience level?</label>
            <div className="flex flex-wrap gap-4 justify-center">
              <OptionCard value="beginner" label="Beginner" icon="🌱" selectedValue={experience} onClick={setExperience} />
              <OptionCard value="intermediate" label="Intermediate" icon="🧑‍🎓" selectedValue={experience} onClick={setExperience} />
              <OptionCard value="advanced" label="Advanced" icon="👩‍🔬" selectedValue={experience} onClick={setExperience} />
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={handleGenerateRoutine}
              className="bg-pink-600 text-white font-bold py-3 px-10 rounded-full hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 text-xl"
            >
              Generate My Routine
            </button>
          </div>
        </div>

        <div id="results-section" className="mt-12">
          {/* El resultado de la rutina se mostrará aquí */}
        </div>
      </div>
    </Layout>
  );
}