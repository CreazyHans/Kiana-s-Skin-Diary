"use client";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/search?query=${query}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[420px] bg-white rounded-full border px-3 py-1 shadow-sm"
    >
    <input
  type="text"
  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm 
            focus:outline-none focus:ring-2 focus:ring-green-500"
  placeholder="Search..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>


      <button
        type="submit"
        className="ml-2 px-4 py-1 rounded-full bg-green-500 text-white text-sm"
      >
        Search
      </button>
    </form>
  );
}
