// pages/tools/routine-builder.js

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

// --- BASE DE DATOS COMPLETA DE RUTINAS ---
const routinesDatabase = {
  acne: {
    beginner: {
      title: "Beginner Routine for Acne & Blemishes",
      morning: ["Gentle Cleanser", "Lightweight Moisturizer", "Non-Comedogenic Sunscreen"],
      evening: ["Oil Cleanser", "Salicylic Acid Cleanser", "Lightweight Moisturizer"],
      note: { text: "Focus on consistency and keeping pores clear. Salicylic Acid is your best friend. Learn more in our ", link: { href: "/posts/the-ultimate-guide-to-preventing-acne-and-blemishes-in-2025", text: "complete guide to preventing acne." } }
    },
    intermediate: {
      title: "Intermediate Routine for Acne & Blemishes",
      morning: ["Salicylic Acid Cleanser", "Niacinamide Serum", "Lightweight Moisturizer", "Non-Comedogenic Sunscreen"],
      evening: ["Oil Cleanser", "Gentle Cleanser", "Adapalene (Retinoid)", "Lightweight Moisturizer"],
      note: { text: "Alternating a BHA in the AM and a Retinoid in the PM is very effective. Discover the difference in our ", link: { href: "/posts/retinol-vs-retinal-which-vitamin-a-is-right-for-you", text: "Retinol vs. Retinal guide." } }
    },
    advanced: {
      title: "Advanced Routine for Acne & Blemishes",
      morning: ["Salicylic Acid Cleanser", "Niacinamide Serum", "Lightweight Moisturizer", "Non-Comedogenic Sunscreen"],
      evening: ["Oil Cleanser", "Gentle Cleanser", "Tretinoin (Prescription Retinoid)", "Barrier Repair Moisturizer"],
      note: { text: "At an advanced level, prescription retinoids are the gold standard. Always use under dermatological advice. Learn more in our ", link: { href: "/posts/the-science-of-acne-a-complete-guide-to-why-you-break-out", text: "guide to the science of acne." } }
    }
  },
  'anti-aging': {
    beginner: {
      title: "Beginner Routine for Anti-Aging",
      morning: ["Hydrating Cleanser", "Vitamin C Serum", "Moisturizer", "Sunscreen SPF 30+"],
      evening: ["Gentle Cleanser", "Hyaluronic Acid Serum", "Moisturizer"],
      note: { text: "Protection is key for anti-aging. Start simple and be consistent. Check out our ", link: { href: "/posts/the-5-best-vitamin-c-serums-on-amazon-honest-2025-review", text: "favorite Vitamin C serums." } }
    },
    intermediate: {
      title: "Intermediate Routine for Anti-Aging",
      morning: ["Hydrating Cleanser", "Vitamin C Serum", "Moisturizer", "Sunscreen SPF 30+"],
      evening: ["Gentle Cleanser", "Peptide Serum", "Retinol Serum (3-4 times a week)", "Moisturizer"],
      note: { text: "Introducing a Retinol is the most important step to accelerate results. Learn how in our ", link: { href: "/posts/retinol-vs-retinal-which-vitamin-a-is-right-for-you", text: "Retinol vs. Retinal guide." } }
    },
    advanced: {
      title: "Advanced Routine for Anti-Aging",
      morning: ["Hydrating Cleanser", "Vitamin C Serum", "Peptide Serum", "Moisturizer", "Sunscreen SPF 50+"],
      evening: ["Oil Cleanser", "Gentle Cleanser", "Retinal or Tretinoin", "Rich Moisturizer"],
      note: { text: "Advanced routines layer multiple actives for maximum efficacy. Discover more in our ", link: { href: "/posts/the-5-best-anti-aging-serums-of-2025-picks-that-actually-work", text: "guide to the best anti-aging serums." } }
    }
  },
  hyperpigmentation: {
    beginner: {
      title: "Beginner Routine for Dark Spots",
      morning: ["Gentle Cleanser", "Vitamin C Serum", "Moisturizer", "Sunscreen SPF 50+"],
      evening: ["Gentle Cleanser", "Niacinamide Serum", "Moisturizer"],
      note: { text: "Sunscreen is your #1 weapon against dark spots. Learn about other ingredients in our ", link: { href: "/posts/your-definitive-guide-to-fading-dark-spots-hyperpigmentation-2025", text: "complete guide to hyperpigmentation." } }
    },
    intermediate: {
      title: "Intermediate Routine for Dark Spots",
      morning: ["Gentle Cleanser", "Vitamin C Serum", "Moisturizer", "Sunscreen SPF 50+"],
      evening: ["Oil Cleanser", "Gentle Cleanser", "Glycolic Acid (2-3 times a week)", "Niacinamide Serum", "Moisturizer"],
      note: { text: "Adding an exfoliant like Glycolic Acid will speed up results. Learn more in our ", link: { href: "/posts/glycolic-acid-your-ultimate-guide-to-brighter-smoother-complexion", text: "Glycolic Acid guide." } }
    },
    advanced: {
      title: "Advanced Routine for Dark Spots",
      morning: ["Gentle Cleanser", "Vitamin C Serum", "Moisturizer", "Sunscreen SPF 50+"],
      evening: ["Oil Cleanser", "Gentle Cleanser", "Retinoid (alternating with Glycolic Acid)", "Niacinamide Serum", "Moisturizer"],
      note: { text: "Advanced users can alternate between a Retinoid and an AHA for a powerful approach. Learn more in our ", link: { href: "/posts/retinol-vs-retinal-which-vitamin-a-is-right-for-you", text: "Retinoid guide." } }
    }
  },
  hydration: {
    beginner: {
      title: "Beginner Routine for Hydration",
      morning: ["Milky Cleanser", "Hyaluronic Acid Serum", "Moisturizer", "Sunscreen SPF 30+"],
      evening: ["Gentle Cleanser", "Hyaluronic Acid Serum", "Moisturizer"],
      note: { text: "Remember to always apply Hyaluronic Acid to damp skin! Learn why in our ", link: { href: "/posts/hyaluronic-acid-the-ultimate-guide-to-skin-hydration", text: "complete HA guide." } }
    },
    intermediate: {
      title: "Intermediate Routine for Hydration",
      morning: ["Milky Cleanser", "Hyaluronic Acid Serum", "Moisturizer", "Sunscreen SPF 30+"],
      evening: ["Gentle Cleanser", "Hyaluronic Acid Serum", "Peptide Serum", "Rich Moisturizer"],
      note: { text: "Peptides can help strengthen the skin barrier to improve hydration over time. Discover more in our ", link: { href: "/posts/peptides-for-skin-the-ultimate-guide-to-a-firmer-complexion", text: "Peptides guide." } }
    },
    advanced: {
      title: "Advanced Routine for Hydration",
      morning: ["Milky Cleanser", "Hyaluronic Acid Serum", "Moisturizer", "Sunscreen SPF 30+"],
      evening: ["Oil Cleanser", "Milky Cleanser", "Hyaluronic Acid Serum", "Peptide Serum", "Facial Oil or Sleeping Mask"],
      note: { text: "Sealing everything in with an occlusive layer at night is a pro move for maximum hydration. But is your skin dry or dehydrated? Find out in our ", link: { href: "/posts/dry-vs-dehydrated-skin-finally-understand-the-difference", text: "guide here." } }
    }
  }
};

// --- COMPONENTES DE UI ---
const RoutineResult = ({ routine }) => (
  <div className="bg-pink-50 border border-pink-200 p-6 rounded-lg animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{routine.title}</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold text-pink-700 mb-3">☀️ Morning Routine</h3>
        <ol className="list-decimal list-inside space-y-2">{routine.morning.map((step, index) => <li key={index}>{step}</li>)}</ol>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-pink-700 mb-3">🌙 Evening Routine</h3>
        <ol className="list-decimal list-inside space-y-2">{routine.evening.map((step, index) => <li key={index}>{step}</li>)}</ol>
      </div>
    </div>
    {routine.note && (
      <div className="mt-6 text-center text-gray-600 bg-white p-3 rounded-md"><p>{routine.note.text}<Link href={routine.note.link.href} className="text-pink-600 font-semibold underline hover:text-pink-800">{routine.note.link.text}</Link></p></div>
    )}
  </div>
);

const InitialStateCard = () => (
  <div className="bg-gray-50 border-dashed border-gray-300 p-8 rounded-lg text-center animate-fade-in">
    <p className="text-xl font-semibold text-gray-700">Your personalized routine will appear here!</p>
    <p className="mt-2 text-gray-500">Answer the three questions above to get started.</p>
  </div>
);

const NoResultCard = () => (
  <div className="bg-yellow-50 border border-yellow-300 p-8 rounded-lg text-center animate-fade-in">
    <p className="text-xl font-semibold text-yellow-800">🚧 Combination Under Construction!</p>
    <p className="mt-2 text-gray-600">We don't have a specific pre-built routine for this exact combination yet, but we're working on it! For now, we recommend starting with our <Link href="/posts/the-ultimate-beginners-skincare-routine-a-simple-3-step-guide" className="font-bold text-pink-600 underline">Beginner's Guide</Link> to build a solid foundation.</p>
  </div>
);

const OptionCard = ({ value, label, icon, selectedValue, onClick }) => {
  const isSelected = selectedValue === value;
  const handleClick = () => isSelected ? onClick('') : onClick(value);
  return (<button onClick={handleClick} className={`flex-1 p-4 border rounded-lg text-center transition-all duration-200 ${isSelected ? 'bg-pink-500 text-white border-pink-500 shadow-lg scale-105' : 'bg-white hover:bg-pink-50'}`}><span className="text-2xl">{icon}</span><span className="block mt-1 font-semibold">{label}</span></button>);
};

// --- PÁGINA PRINCIPAL ---
export default function RoutineBuilderPage() {
  const [skinType, setSkinType] = useState('');
  const [skinConcern, setSkinConcern] = useState('');
  const [experience, setExperience] = useState('');
  const [resultState, setResultState] = useState('initial'); // 'initial', 'found', 'not_found'
  const [routine, setRoutine] = useState(null);

  const handleGenerateRoutine = () => {
    if (!skinType || !skinConcern || !experience) {
      alert('Please select an option for all three questions.');
      return;
    }
    const result = routinesDatabase[skinConcern]?.[experience];
    if (result) {
      setRoutine(result);
      setResultState('found');
    } else {
      setRoutine(null);
      setResultState('not_found');
    }
  };

  useEffect(() => {
    if (resultState !== 'initial') {
      document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
    }
  }, [resultState]);

  return (
    <Layout>
      <Head>
        <title>Skincare Routine Builder | Kiana's Skin Diary</title>
        <meta name="description" content="Build your perfect, personalized skincare routine in 30 seconds with our interactive tool." />
      </Head>
      <div className="max-w-2xl mx-auto my-8 p-6 md:p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-10"><h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Build Your Perfect Skincare Routine</h1><p className="mt-2 text-lg text-gray-600">Get a personalized AM & PM routine in 30 seconds.</p></div>
        <div className="space-y-8">
          <div><label className="block text-lg font-semibold text-gray-700 mb-3 text-center">1. What is your skin type?</label><div className="flex flex-wrap gap-2 md:gap-4"><OptionCard value="oily" label="Oily" icon="💧" selectedValue={skinType} onClick={setSkinType} /><OptionCard value="dry" label="Dry" icon="🏜️" selectedValue={skinType} onClick={setSkinType} /><OptionCard value="combination" label="Combination" icon="☯️" selectedValue={skinType} onClick={setSkinType} /><OptionCard value="sensitive" label="Sensitive" icon="🌿" selectedValue={skinType} onClick={setSkinType} /></div></div>
          <div><label className="block text-lg font-semibold text-gray-700 mb-3 text-center">2. What is your main skin concern?</label><div className="flex flex-wrap gap-2 md:gap-4"><OptionCard value="acne" label="Acne" icon="🌋" selectedValue={skinConcern} onClick={setSkinConcern} /><OptionCard value="anti-aging" label="Anti-Aging" icon="⏳" selectedValue={skinConcern} onClick={setSkinConcern} /><OptionCard value="hyperpigmentation" label="Dark Spots" icon="✨" selectedValue={skinConcern} onClick={setSkinConcern} /><OptionCard value="hydration" label="Hydration" icon="💧" selectedValue={skinConcern} onClick={setSkinConcern} /></div></div>
          <div><label className="block text-lg font-semibold text-gray-700 mb-3 text-center">3. What's your experience level?</label><div className="flex flex-wrap gap-2 md:gap-4 justify-center"><OptionCard value="beginner" label="Beginner" icon="🌱" selectedValue={experience} onClick={setExperience} /><OptionCard value="intermediate" label="Intermediate" icon="🧑‍🎓" selectedValue={experience} onClick={setExperience} /><OptionCard value="advanced" label="Advanced" icon="👩‍🔬" selectedValue={experience} onClick={setExperience} /></div></div>
          <div className="text-center pt-6"><button onClick={handleGenerateRoutine} className="bg-pink-600 text-white font-bold py-3 px-10 rounded-full hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 text-xl">Generate My Routine</button></div>
        </div>
        <div id="results-section" className="mt-12 min-h-[200px]">
          {resultState === 'initial' && <InitialStateCard />}
          {resultState === 'found' && <RoutineResult routine={routine} />}
          {resultState === 'not_found' && <NoResultCard />}
        </div>
      </div>
    </Layout>
  );
}