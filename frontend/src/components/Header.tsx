import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch: (query: string) => void;
  onClearSearch?: () => void;
  placeholder?: string;
}

export default function Header({
  onSearch,
  onClearSearch,
  placeholder = "Search experiences",
}: HeaderProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setQuery("");
    if (onClearSearch) onClearSearch();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-center justify-between w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-3 gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-0 flex-shrink-0 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/logo.webp"
            alt="logo"
            className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
          />
          <div className="leading-none -ml-3">
            <div className="font-semibold text-sm sm:text-base text-neutral-800 tracking-tight">
              highway
            </div>
            <div className="font-semibold text-sm sm:text-base text-neutral-800 -mt-2 tracking-tight">
              delite
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center w-full sm:w-auto sm:flex-1 md:max-w-md ml-auto gap-2 sm:gap-4">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-gray-100 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder-gray-500"
          />
          <button
            onClick={() => onSearch(query.trim())}
            className="px-4 sm:px-5 py-2 bg-yellow-400 text-gray-900 font-medium rounded-md hover:bg-yellow-500 transition"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}
