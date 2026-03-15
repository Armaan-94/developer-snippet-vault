function SearchBar({ search, setSearch }) {

  return (
    <input
      type="text"
      placeholder="Search snippets..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full mb-6 p-2 rounded bg-gray-900 border border-gray-800 focus:border-emerald-500 outline-none"
    />
  );
}

export default SearchBar;