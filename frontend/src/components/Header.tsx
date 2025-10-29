import React, { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function Header({
  onSearch,
  placeholder = "Search experiences",
}: HeaderProps) {
  const [query, setQuery] = useState("");

  return (
    <header className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <img src="/logo.webp" alt="hd" className="w-10 h-10 object-contain" />
          <div className="leading-none -ml-0.5">
            <div className="font-semibold text-lg text-neutral-800">
              highway
            </div>
            <div className="font-semibold text-lg text-yellow-500 -mt-0.5">
              delite
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center w-full max-w-md ml-auto gap-4">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-gray-100 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder-gray-500"
          />
          <button
            onClick={() => onSearch(query.trim())}
            className="px-5 py-2 bg-yellow-400 text-gray-900 font-medium rounded-md hover:bg-yellow-500 transition"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}
