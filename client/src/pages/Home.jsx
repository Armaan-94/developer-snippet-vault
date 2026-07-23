import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getSnippets } from "../api/snippetApi";

import Navbar from "../components/Navbar";
import SnippetCard from "../components/SnippetCard";
import AddSnippetCard from "../components/AddSnippetCard";
import AddSnippetModal from "../components/AddSnippetModal";
import SearchBar from "../components/SearchBar";
import LanguageFilter from "../components/LanguageFilter";
import FilterChips from "../components/FilterChips";
import EmptyState from "../components/EmptyState";
import SkeletonCard from "../components/SkeletonCard";
import { staggerContainer, easeOutExpo } from "../lib/motion";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  /*
    Keyboard shortcut: press N to open the new-snippet modal.
    Guarded so it does NOT fire while typing in a field or when the modal
    is already open (the old version opened the modal on every "n" keystroke,
    including while searching).
  */
  useEffect(() => {
    const handler = (e) => {
      if (showModal) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const el = e.target;
      const isTyping =
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.isContentEditable;
      if (isTyping) return;

      if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        setShowModal(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showModal]);

  // Extract languages / tags dynamically (unchanged logic)
  const languages = [...new Set(snippets.map((s) => s.language))];
  const tags = [...new Set(snippets.flatMap((s) => s.tags || []))];

  // Filtering logic (unchanged)
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.code.toLowerCase().includes(search.toLowerCase());

    const matchesLanguage =
      activeLanguage === "All" || snippet.language === activeLanguage;

    const matchesTag =
      activeTag === "All" || snippet.tags?.includes(activeTag);

    return matchesSearch && matchesLanguage && matchesTag;
  });

  const clearFilters = () => {
    setSearch("");
    setActiveLanguage("All");
    setActiveTag("All");
  };

  const hasSnippets = snippets.length > 0;
  const hasResults = filteredSnippets.length > 0;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-10 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            {loading
              ? "Loading vault…"
              : `${snippets.length} snippet${snippets.length === 1 ? "" : "s"} in your vault`}
          </span>

          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tighter2 text-zinc-50 sm:text-5xl">
            Your code,{" "}
            <span className="text-gradient-accent">organized</span> and always
            within reach.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            Store, search, and reuse your favorite code snippets — syntax
            highlighted, tagged, and one click from your clipboard.
          </p>
        </motion.section>

        {/* Toolbar: search + filters */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: easeOutExpo }}
          className="mb-8 space-y-5"
        >
          <SearchBar search={search} setSearch={setSearch} />

          {(languages.length > 0 || tags.length > 0) && (
            <div className="space-y-3">
              {languages.length > 0 && (
                <LanguageFilter
                  languages={languages}
                  activeLanguage={activeLanguage}
                  setActiveLanguage={setActiveLanguage}
                />
              )}
              {tags.length > 0 && (
                <FilterChips
                  label="Tags"
                  groupId="tag"
                  items={tags}
                  active={activeTag}
                  onChange={setActiveTag}
                  allLabel="All"
                  leading={() => (
                    <span className="text-accent-soft/70">#</span>
                  )}
                />
              )}
            </div>
          )}
        </motion.section>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AddSnippetCard openModal={() => setShowModal(true)} />

            {!hasSnippets && (
              <EmptyState variant="empty" onAction={() => setShowModal(true)} />
            )}

            {hasSnippets && !hasResults && (
              <EmptyState variant="no-results" onAction={clearFilters} />
            )}

            <AnimatePresence>
              {hasResults &&
                filteredSnippets.map((snippet) => (
                  <SnippetCard
                    key={snippet._id}
                    snippet={snippet}
                    refresh={fetchSnippets}
                  />
                ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Create modal (always mounted so it can animate in/out) */}
      <AddSnippetModal
        open={showModal}
        closeModal={() => setShowModal(false)}
        refresh={fetchSnippets}
      />
    </div>
  );
}

export default Home;
