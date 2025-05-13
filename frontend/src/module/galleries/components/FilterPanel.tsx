import { useEffect, useState } from "react";

type FilterState = {
  search: string;
  tag: string;
  medium: string;
  artist: string;
};

export default function FilterPanel({
  filters,
  setFilters,
  tagOptions,
  mediumOptions,
  artistOptions,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  tagOptions: string[];
  mediumOptions: string[];
  artistOptions: string[];
}) {
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters({ ...filters, search: searchInput });
    }, 300);

    return () => clearTimeout(delay);
  }, [searchInput]);

  return (
    <div className="space-y-3 mb-6">
      <input
        className={`px-3 py-2 rounded w-full border ${
          searchInput ? "border-blue-500" : "border-gray-300"
        }`}
        placeholder="Search by gallery name"
        value={filters.search}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <select
        className={`px-3 py-2 rounded w-full border ${
          filters.tag ? "border-blue-500" : "border-gray-300"
        }`}
        value={filters.tag}
        onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
      >
        <option value="">Filter by tag</option>
        {tagOptions.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <select
        className={`px-3 py-2 rounded w-full border ${
          filters.tag ? "border-blue-500" : "border-gray-300"
        }`}
        value={filters.medium}
        onChange={(e) => setFilters({ ...filters, medium: e.target.value })}
      >
        <option value="">Filter by medium</option>
        {mediumOptions.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        className={`px-3 py-2 rounded w-full border ${
          filters.tag ? "border-blue-500" : "border-gray-300"
        }`}
        value={filters.artist}
        onChange={(e) => setFilters({ ...filters, artist: e.target.value })}
      >
        <option value="">Filter by artist</option>
        {artistOptions.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      {filters.search || filters.tag || filters.medium || filters.artist ? (
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() =>
            setFilters({
              search: "",
              tag: "",
              medium: "",
              artist: "",
            })
          }
        >
          Clear all filters
        </button>
      ) : null}
    </div>
  );
}
