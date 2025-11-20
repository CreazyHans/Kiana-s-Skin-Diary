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

// --- COMPONENTE DE RESULTADO CON EL ENLACE INTELIGENTE ---
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
      {/* --- ¡AQUÍ ESTÁ LA MAGIA! --- */}
      <Link 
        href={{
          pathname: '/tools/routine-builder',
          query: { skinType: result }
        }} 
        className="inline-block bg-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105"
      >
        Build Your Routine →
      </Link>
    </div>
  </div>
);

// --- El resto del componente de la página no cambia ---
export default function SkinTypeQuizPage() {
  // ... (toda la lógica de useState, handleAnswer, calculateResult, etc. se queda igual)
}