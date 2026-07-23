import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, softSpring } from "../lib/motion";

/**
 * "Create new snippet" card — the entry point that opens the create modal.
 * Sits first in the grid with a glowing plus and a hover-reveal gradient border.
 */
function AddSnippetCard({ openModal }) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      layout
      variants={fadeUp}
      onClick={openModal}
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={softSpring}
      aria-label="Create new snippet"
      className="group relative min-h-[16rem] w-full text-left focus-visible:outline-none"
    >
      {/* Hover gradient border */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/50 via-accent-violet/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

      <div className="relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.015] p-6 transition-colors duration-300 group-hover:border-white/[0.05]">
        {/* Glowing plus orb */}
        <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-violet/10 ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-110">
          <span className="absolute inset-0 rounded-2xl bg-accent/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="relative text-accent-soft"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>

        <div className="text-center">
          <p className="text-sm font-semibold text-zinc-200">
            Create new snippet
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            or press{" "}
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1 font-mono text-[0.65rem] text-zinc-400">
              N
            </kbd>
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default AddSnippetCard;
