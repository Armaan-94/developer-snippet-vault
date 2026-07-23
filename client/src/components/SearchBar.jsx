import { AnimatePresence, motion } from "framer-motion";
import { softSpring } from "../lib/motion";

/**
 * Search input with a leading icon, animated focus glow, and a clear button
 * that springs in/out. Same props/logic as before (search, setSearch).
 */
function SearchBar({ search, setSearch }) {
  return (
    <div className="group relative">
      {/* Leading search icon */}
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-accent-soft">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>

      <input
        type="text"
        aria-label="Search snippets"
        placeholder="Search snippets by title or code…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-11 text-sm text-zinc-100 placeholder:text-zinc-500 shadow-soft transition-all duration-200 ease-out-expo hover:border-white/[0.14] focus:border-accent/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/25 focus:outline-none"
      />

      {/* Clear button */}
      <AnimatePresence>
        {search && (
          <motion.button
            type="button"
            aria-label="Clear search"
            onClick={() => setSearch("")}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={softSpring}
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-200 focus-visible:outline-none"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
