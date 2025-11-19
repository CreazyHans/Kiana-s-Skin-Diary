// /pages/search.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get ?query= from URL
  const query =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("query")
      : "";

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <Layout pageTitle={`Search: ${query}`}>
      <h1 className="text-3xl font-bold mb-6">
        Results for: <span className="text-green-600">{query}</span>
      </h1>

      {loading && <p>Searching...</p>}

      {!loading && results.length === 0 && (
        <p className="text-lg text-gray-600">No results found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {results.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="rounded-lg mb-3"
              />
            )}
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
