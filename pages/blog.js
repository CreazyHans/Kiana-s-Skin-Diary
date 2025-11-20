// /pages/blog.js
import Layout from '../components/Layout';
import Head from 'next/head';

export default function AboutUsPage() {
  return (
    <Layout pageTitle="Our Mission">
      <Head>
        <title>Our Mission | Kiana's Skin Diary</title>
        <meta name="description" content="Learn about the team and philosophy behind Kiana's Skin Diary. Our mission is to deliver science-backed, simple, and honest skincare advice." />
      </Head>

      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Our Mission: Your Guide to Smarter Skincare
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to Kiana's Skin Diary.
          </p>
        </div>
        
        <div className="mt-8 text-lg text-gray-700 space-y-4 prose prose-lg max-w-none">
          <p>
            We're not a single person. We are a passionate team of skincare enthusiasts, researchers, and writers dedicated to one simple mission: cutting through the noise in the beauty industry.
          </p>
          <p>
            The world of skincare can be overwhelming. It's filled with confusing marketing, "miracle" ingredients that don't work, and complicated routines that are impossible to follow. We were tired of it, and we knew there had to be a better way.
          </p>
          
          <div className="text-center my-8 py-6 bg-pink-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800">Our Philosophy:</h2>
            <p className="mt-2 text-xl font-semibold text-pink-600">Science-Backed, Simple, and Honest.</p>
          </div>

          <p>
            At Kiana's Skin Diary, every article, guide, and recommendation is built on a foundation of scientific evidence and real-world experience. We do the hours of research so you don't have to. We believe that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Understanding ingredients is empowering.</li>
            <li>A consistent, simple routine is more effective than a complex one.</li>
            <li>Skincare should be accessible, not intimidating.</li>
          </ul>
          <p>
            Our goal is to be your most trusted resource on your journey to healthy, radiant skin. We're the skincare-obsessed friends you can always count on for unbiased advice.
          </p>
          <p className="font-semibold text-center text-xl mt-6">
            Thank you for being here.
            <br />
            <em>The Team at Kiana's Skin Diary</em>
          </p>
        </div>
      </div>
    </Layout>
  );
}