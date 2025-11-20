// pages/tools/routine-builder.js

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

// --- Los componentes auxiliares no cambian ---
const routinesDatabase = { /* ... */ };
const RoutineResult = ({ routine }) => { /* ... */ };
const InitialStateCard = () => { /* ... */ };
const NoResultCard = () => { /* ... */ };

const OptionCard = ({ value, label, icon, selectedValue, onClick }) => {
  const isSelected = selectedValue === value;
  const handleClick = () => isSelected ? onClick('') : onClick(value);
  
  return (
    <button
      onClick={handleClick}
      className={`p-4 border rounded-lg text-center transition-all duration-200 flex flex-col items-center justify-center h-full min-h-[110px] ${
        isSelected
          ? 'bg-pink-500 text-white border-pink-500 shadow-lg scale-105'
          : 'bg-white hover:bg-pink-50 hover:shadow-md'
      }`}
    >
      <span className="text-3xl">{icon}</span>
      <span className="block mt-2 font-semibold text-sm">{label}</span>
    </button>
  );
};

// --- PÁGINA PRINCIPAL CON NUEVO DISEÑO ---
export default function RoutineBuilderPage() {
  const [skinType, setSkinType] = useState('');
  const [skinConcern, setSkinConcern] = useState('');
  const [experience, setExperience] = useState('');
  const [resultState, setResultState] = useState('initial');
  const [routine, setRoutine] = useState(null);

  const handleGenerateRoutine = () => { /* ... (no cambia) ... */ };
  useEffect(() => { /* ... (no cambia) ... */ }, [resultState]);

  return (
    <Layout>
      <Head>
        <title>Skincare Routine Builder | Kiana's Skin Diary</title>
        <meta name="description" content="Build your perfect, personalized skincare routine in 30 seconds with our interactive tool." />
      </Head>

      <div className="max-w-4xl mx-auto my-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Build Your Perfect Skincare Routine
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Get a personalized AM & PM routine in 30 seconds.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* --- INICIO DE LA NUEVA TARJETA DE PREGUNTA --- */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">1. What is your skin type?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <OptionCard value="oily" label="Oily" icon="💧" selectedValue={skinType} onClick={setSkinType} />
              <OptionCard value="dry" label="Dry" icon="🏜️" selectedValue={skinType} onClick={setSkinType} />
              <OptionCard value="combination" label="Combination" icon="☯️" selectedValue={skinType} onClick={setSkinType} />
              <OptionCard value="sensitive" label="Sensitive" icon="🌿" selectedValue={skinType} onClick={setSkinType} />
            </div>
          </div>
          {/* --- FIN DE LA NUEVA TARJETA DE PREGUNTA --- */}

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">2. What is your main skin concern?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <OptionCard value="acne" label="Acne" icon="🌋" selectedValue={skinConcern} onClick={setSkinConcern} />
              <OptionCard value="anti-aging" label="Anti-Aging" icon="⏳" selectedValue={skinConcern} onClick={setSkinConcern} />
              <OptionCard value="hyperpigmentation" label="Dark Spots" icon="✨" selectedValue={skinConcern} onClick={setSkinConcern} />
              <OptionCard value="hydration" label="Hydration" icon="💧" selectedValue={skinConcern} onClick={setSkinConcern} />
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">3. What's your experience level?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4"> {/* <-- CAMBIO AQUI */}
              <OptionCard value="beginner" label="Beginner" icon="🌱" selectedValue={experience} onClick={setExperience} />
              <OptionCard value="intermediate" label="Intermediate" icon="🧑‍🎓" selectedValue={experience} onClick={setExperience} />
              <OptionCard value="advanced" label="Advanced" icon="👩‍🔬" selectedValue={experience} onClick={setExperience} />
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={handleGenerateRoutine}
              className="bg-pink-600 text-white font-bold py-4 px-12 rounded-full hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 text-xl shadow-lg"
            >
              Generate My Routine
            </button>
          </div>
        </div>

        <div id="results-section" className="mt-16 min-h-[200px]">
          {resultState === 'initial' && <InitialStateCard />}
          {resultState === 'found' && <RoutineResult routine={routine} />}
          {resultState === 'not_found' && <NoResultCard />}
        </div>
      </div>
    </Layout>
  );
}