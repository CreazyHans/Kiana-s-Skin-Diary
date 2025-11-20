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
        relative flex items-center w-full max-w-[420px] 
        bg-white/70 backdrop-blur-md
        rounded-full shadow-md
        border border-gray-200
        px-4 py-2
        transition-shadow duration-300
        hover:shadow-lg
        focus-within:shadow-xl
      "
    >
      {/* Icono de lupa */}
      <FiSearch className="absolute left-4 text-gray-400 text-lg pointer-events-none" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          flex-1 pl-10 pr-4 py-2
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
          ml-2 px-4 py-1.5
          rounded-full
          bg-green-600
          text-white
          text-sm font-medium
          hover:bg-green-700
          transition-colors
        "
      >
        Search
      </button>
    </form>
  );
}
