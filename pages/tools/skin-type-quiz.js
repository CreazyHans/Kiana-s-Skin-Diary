// pages/tools/skin-type-quiz.js

import { useState } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

const questions = [
  {
    question: "After washing your face and waiting an hour, how does your skin feel?",
    options: {
      oily: "Shiny and greasy all over",
      combination: "Oily in the T-zone (forehead, nose), but normal/dry on the cheeks",
      dry: "Tight, rough, or even flaky",
      normal: "Comfortable and balanced, not too oily or dry"
    },
  },
  {
    question: "How do your pores look, especially around your nose and cheeks?",
    options: {
      oily: "Large and easily visible",
      combination: "Visible and larger in the T-zone, smaller elsewhere",
      dry: "Small and not very visible",
      normal: "Barely visible"
    },
  },
  {
    question: "How often do you experience breakouts?",
    options: {
      oily: "Frequently, including blackheads and pimples",
      combination: "Often, mainly in the T-zone",
      dry: "Rarely, if ever",
      normal: "Occasionally, usually due to stress or hormones"
    },
  },
  {
    question: "How does your skin react to new products?",
    options: {
      sensitive: "It often gets red, itchy, or irritated",
      normal: "It rarely reacts negatively"
    },
  }
];

export default function SkinTypeQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (answer) => {
    // Aquí irá la lógica para guardar la respuesta y pasar a la siguiente
    console.log(answer);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <Head>
        <title>Skin Type Quiz | Kiana's Skin Diary</title>
        <meta name="description" content="Discover your true skin type in under a minute with our simple, interactive quiz." />
      </Head>

      <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            What's Your True Skin Type?
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Answer these 4 questions to find out.
          </p>
        </div>

        {/* --- CONTENEDOR DEL QUIZ --- */}
        <div className="space-y-6">
          <div className="bg-pink-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
              Question {currentQuestionIndex + 1} / {questions.length}
            </h2>
            <p className="text-lg text-center text-gray-700">
              {currentQuestion.question}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(currentQuestion.options).map(([key, text]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                className="p-4 border rounded-lg text-left transition-all duration-200 bg-white hover:bg-pink-500 hover:text-white hover:scale-105"
              >
                {text}
              </button>
            ))}
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-pink-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* --- ZONA DE RESULTADOS (La construiremos después) --- */}
        <div id="results-section" className="mt-12">
          {/* El resultado del quiz se mostrará aquí */}
        </div>
      </div>
    </Layout>
  );
}