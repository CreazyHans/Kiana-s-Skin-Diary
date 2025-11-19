// /pages/api/search.js

// --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
import { getAllPosts } from '../lib/contentful';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const allPosts = await getAllPosts();

    if (!allPosts) {
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }

    res.status(200).json({ posts: allPosts });
    
  } catch (error) {
    console.error('API Search Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}