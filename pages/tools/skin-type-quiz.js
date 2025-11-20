// pages/tools/skin-type-quiz.js

import { useState } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

// --- Los datos de preguntas y resultados no cambian ---
const questions = [
  { question: "After washing your face and waiting an hour, how does your skin feel?", options: { oily: "Shiny and greasy all over", combination: "Oily in the T-zone, but normal/dry on the cheeks", dry: "Tight, rough, or even flaky", normal: "Comfortable and balanced" } },
  { question: "How do your pores look, especially around your nose and cheeks?", options: { oily: "Large and easily visible", combination: "Visible in the T-zone, smaller elsewhere", dry: "Small and not very visible", normal: "Barely visible" } },
  { question: "How often do you experience breakouts?", options: { oily: "Frequently, including blackheads and pimples", combination: "Often, mainly in the T-zone", dry: "Rarely, if ever", normal: "Occasionally" } },
  { question: "How does your skin react to new products?", options: { sensitive: "It often gets red, itchy, or irritated", not_sensitive: "It rarely reacts negatively" } }
];

const resultsData = {
  oily: { title: "Your Skin Type is: Oily", icon: "💧", description: "Your skin produces an excess of sebum, leading to a shiny appearance and enlarged pores. Lightweight, oil-free products are your best friends." },
  dry: { title: "Your Skin Type is: Dry", icon: "🏜️", description: "Your skin lacks natural oils (sebum), which can make it feel tight, rough, and flaky. Your focus should be on nourishing and protecting your skin barrier." },
  combination: { title: "Your Skin Type is: Combination", icon: "☯️", description: "You have two or more different skin types on your face. The key is to find a balance, treating the oily T-zone without drying out your cheeks." },
  normal: { title: "Your Skin Type is: Normal", icon: " balanced and comfortable. Your goal is maintenance and protection to keep it that way!" },
  sensitive: { title: "And Your Skin is Likely: Sensitive", icon: "🌿", description: "Your skin is highly reactive and can easily get red or irritated. Always choose gentle, fragrance-free products and patch-test new formulas.", note: "Note: You can be Oily & Sensitive, or Dry & Sensitive." }
};

// --- COMPONENTE DE RESULTADO LIGERAMENTE AJUSTADO ---
const QuizResult = ({ result, sensitive }) => (
  <div className="bg-pink-50 border border-pink-200 p-8 rounded-lg text-center animate-fade-in">
    <p className="text-5xl mb-4">{resultsData[result].icon}</p>
    <h2 className="text-3xl font-bold text-gray-800">{resultsData[result].title}</h2>
    <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">{resultsData[result].description}</p>
    {sensitive && (
      <div className="mt-6 pt-6 border-t border-pink-200">
        <p className="text-4xl mb-2">{resultsData.sensitive.icon}</p>
        <h3 className="text-2xl font-bold text-gray-800">{resultsData.sensitive.title}</h3>
        <p className="mt-2 text-md text-gray-600 max-w-md mx-auto">{resultsData.sensitive.description}</p>
        <p className="mt-1 text-sm text-gray-500">{resultsData.sensitive.note}</p>
      </div>
    )}
    <div className="mt-8">
      <Link href={`/tools/routine-builder?skinType=${result}`} className="inline-block bg-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105">
        Build Your Routine →
      </Link>
    </div>
  </div>
);

// --- PÁGINA PRINCIPAL REMODELADA ---
export default function SkinTypeQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerKey) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: answerKey };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    const counts = {};
    let isSensitive = false;
    
    Object.values(answers).forEach(key => {
      if (key === 'sensitive') isSensitive = true;
      else if (key !== 'not_sensitive') counts[key] = (counts[key] || 0) + 1;
    });
    
    let mainType = 'normal';
    if (Object.keys(counts).length > 0) {
      mainType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }
    
    return { mainType, isSensitive };
  };

  const currentQuestion = questions[currentQuestionIndex];
  const { mainType, isSensitive } = showResult ? calculateResult() : {};

  return (
    <Layout>
      <Head>
        <title>Skin Type Quiz | Kiana's Skin Diary</title>
        <meta name="description" content="Discover your true skin type in under a minute with our simple, interactive quiz." />
      </Head>

      <div className="max-w-4xl mx-auto my-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            What's Your True Skin Type?
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Answer these {questions.length} questions to find out.
          </p>
        </div>

        {!showResult ? (
          <div className="max-w-2xl mx-auto">
            {/* --- NUEVO DISEÑO DE TARJETA DE PREGUNTA --- */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center mb-6">
                <p className="text-sm font-bold text-pink-600">QUESTION {currentQuestionIndex + 1} OF {questions.length}</p>
                <h2 className="text-2xl font-semibold text-gray-800 mt-2">{currentQuestion.question}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(currentQuestion.options).map(([key, text]) => (
                  <button 
                    key={key} 
                    onClick={() => handleAnswer(key)} 
                    className="p-4 border rounded-lg text-center transition-all duration-200 bg-gray-50 hover:bg-pink-500 hover:text-white hover:scale-105"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8">
              <div className="bg-pink-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
          </div>
        ) : (
          <div id="results-section">
            <QuizResult result={mainType} sensitive={isSensitive} />
          </div>
        )}
      </div>
    </Layout>
  );
}