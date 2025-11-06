// /pages/blog.js
import Layout from '../components/Layout';
import Image from 'next/image';

export default function KianaPage() {
  return (
    <Layout pageTitle="About Kiana Novak">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden flex-shrink-0 border-4 border-green-400">
            <Image src="/images/kiana-profile.png" alt="Profile picture of Kiana Novak" layout="fill" objectFit="cover" />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl font-extrabold text-gray-800">Kiana Novak</h1>
            <p className="text-green-600 text-lg mt-1">Fashion & Style Representative</p>
            <p className="text-gray-600 mt-4">
              Kiana is our resident fashion expert and style curator. With a keen eye for emerging trends and a passion for timeless style, Kiana brings a fresh and inspiring perspective to the world of fashion. Her mission is to help you discover your personal style and build a wardrobe that makes you feel confident and beautiful every day.
            </p>
            <a 
              href="https://www.facebook.com/profile.php?id=61582442575885" // <-- PON LA URL CORRECTA
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Follow on Facebook
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}