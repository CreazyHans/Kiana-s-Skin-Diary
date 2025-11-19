"use client";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Redirige a /search
    window.location.href = `/search?query=${query}`;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-3 mt-4">
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full px-4 py-2 rounded-xl border border-gray-300"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-pink-600 text-white rounded-xl"
      >
        Buscar
      </button>
    </form>
  );
}
