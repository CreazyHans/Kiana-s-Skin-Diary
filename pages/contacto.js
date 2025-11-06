// /pages/contacto.js

import Layout from '../components/Layout';
import Head from 'next/head';

export default function ContactoPage() {
  return (
    <Layout pageTitle="Contacto">
      <Head>
        <title>Contact Kiana's Skin Diary</title>
        <meta name="description" content="¿Tienes alguna pregunta o colaboración en mente? ¡Escríbeme! Estaré encantada de leerte." />
      </Head>

      <div className="max-w-xl mx-auto">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">Get in touch</h1>
            <p className="mt-2 text-gray-600">
                Do you have any questions, suggestions, or would you like to collaborate? Fill out the form and I'll get back to you as soon as possible.
            </p>
        </div>
        
        <form 
          action="https://formspree.io/f/mldoywgz" // <-- ¡PEGA TU URL DE FORMSPREE AQUÍ!
          method="POST"
          className="mt-10 bg-white p-8 shadow-lg rounded-lg"
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Your Email
</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea 
              name="message" 
              id="message" 
              rows="5" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}