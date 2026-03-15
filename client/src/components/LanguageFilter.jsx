function LanguageFilter({ languages, activeLanguage, setActiveLanguage }) {

  return (
    <div className="flex flex-wrap gap-2 mb-6">

      <button
        onClick={() => setActiveLanguage("All")}
        className={`px-3 py-1 rounded text-sm border ${
          activeLanguage === "All"
            ? "bg-emerald-600 border-emerald-500"
            : "border-gray-700 hover:border-emerald-500"
        }`}
      >
        All
      </button>

      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setActiveLanguage(lang)}
          className={`px-3 py-1 rounded text-sm border ${
            activeLanguage === lang
              ? "bg-indigo-600 border-indigo-500"
              : "border-gray-700 hover:border-indigo-500"
          }`}
        >
          {lang}
        </button>
      ))}

    </div>
  );
}

export default LanguageFilter;