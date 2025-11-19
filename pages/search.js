// /pages/api/search.js

import { getAllPosts } from '../../lib/contentful';

export default async function handler(req, res) {
  // Solo permitimos peticiones GET a esta API
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Obtenemos todos los posts de Contentful
    const allPosts = await getAllPosts();

    // Si la obtención de posts falla o no devuelve nada, enviamos un error
    if (!allPosts) {
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }

    // Si todo va bien, devolvemos la lista de posts con un estado 200 (OK)
    res.status(200).json({ posts: allPosts });
    
  } catch (error) {
    // Si hay cualquier otro error durante el proceso, lo capturamos
    console.error('API Search Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}