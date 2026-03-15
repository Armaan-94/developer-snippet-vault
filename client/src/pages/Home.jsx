import { useEffect, useState } from "react";
import { getSnippets } from "../api/snippetApi";

import Navbar from "../components/Navbar";
import SnippetCard from "../components/SnippetCard";
import AddSnippetCard from "../components/AddSnippetCard";
import AddSnippetModal from "../components/AddSnippetModal";
import SearchBar from "../components/SearchBar";
import LanguageFilter from "../components/LanguageFilter";

function Home() {

  const [snippets, setSnippets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("All");
  const [activeTag, setActiveTag] = useState("All");

  const fetchSnippets = async () => {

    try {

      const res = await getSnippets();

      setSnippets(res.data);

    } catch (err) {

      console.error("Failed to fetch snippets", err);

    }

  };

  useEffect(() => {

    fetchSnippets();

  }, []);

  /*
  Keyboard shortcut
  Press N → open new snippet modal
  */
  useEffect(() => {

    const handler = (e) => {

      if (e.key.toLowerCase() === "n") {
        setShowModal(true);
      }

    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);

  }, []);

  /*
  Extract languages dynamically
  */
  const languages = [
    ...new Set(snippets.map((s) => s.language))
  ];

  /*
  Extract tags dynamically
  */
  const tags = [
    ...new Set(
      snippets.flatMap((s) => s.tags || [])
    )
  ];

  /*
  Filtering logic
  */
  const filteredSnippets = snippets.filter((snippet) => {

    const matchesSearch =
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.code.toLowerCase().includes(search.toLowerCase());

    const matchesLanguage =
      activeLanguage === "All" ||
      snippet.language === activeLanguage;

    const matchesTag =
      activeTag === "All" ||
      snippet.tags?.includes(activeTag);

    return matchesSearch && matchesLanguage && matchesTag;

  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <div className="p-10">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <LanguageFilter
          languages={languages}
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        />

        {/* TAG FILTER */}
        <div className="flex flex-wrap gap-2 mb-6">

          <button
            onClick={() => setActiveTag("All")}
            className={`px-3 py-1 rounded text-sm border ${
              activeTag === "All"
                ? "bg-emerald-600 border-emerald-500"
                : "border-gray-700 hover:border-emerald-500"
            }`}
          >
            All Tags
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded text-sm border ${
                activeTag === tag
                  ? "bg-purple-600 border-purple-500"
                  : "border-gray-700 hover:border-purple-500"
              }`}
            >
              {tag}
            </button>
          ))}

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <AddSnippetCard
            openModal={() => setShowModal(true)}
          />

          {filteredSnippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              refresh={fetchSnippets}
            />
          ))}

        </div>

      </div>

      {showModal && (
        <AddSnippetModal
          closeModal={() => setShowModal(false)}
          refresh={fetchSnippets}
        />
      )}

    </div>
  );
}

export default Home;