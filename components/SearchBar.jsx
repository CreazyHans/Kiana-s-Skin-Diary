"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Icono de lupa

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="
    flex items-center w-full
    bg-white/70 backdrop-blur-md
    rounded-full shadow-md border border-gray-200
    px-3 py-2
    gap-2
    transition-shadow duration-300
    hover:shadow-lg
    focus-within:shadow-xl
  "
>
  {/* Icono de lupa */}
  <FiSearch className="text-gray-400 text-lg" />

  {/* Input */}
  <input
    type="text"
    placeholder="Search..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="
      flex-grow
      bg-transparent
      text-gray-800
      placeholder-gray-400
      focus:outline-none
      text-sm
    "
  />

  {/* Botón */}
  <button
    type="submit"
    className="
      px-3 py-1.5
      rounded-full
      bg-green-600
      text-white
      text-sm font-medium
      hover:bg-green-700
      transition-colors
      flex-shrink-0
    "
  >
    Search
  </button>
</form>

  );
}
