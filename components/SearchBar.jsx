// /components/SearchBar.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-lg mx-auto flex items-center space-x-2 bg-white shadow-sm rounded-full px-4 py-2 border border-gray-200"
    >
      <input
        type="text"
        className="flex-grow px-3 py-2 text-sm md:text-base outline-none bg-transparent"
        placeholder="Search skincare tips, products, routines..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-full text-sm md:text-base hover:bg-green-700 transition"
      >
        Search
      </button>
    </form>
  );
}
