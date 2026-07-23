import { motion } from "framer-motion";
import { easeOutExpo } from "../lib/motion";

/**
 * Sticky glass navbar with a gradient logo mark and wordmark.
 * Kept intentionally minimal — the product is the grid below it.
 */
function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-950/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <a href="/" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-violet shadow-glow-soft">
            <span className="font-mono text-sm font-bold text-white">{"</>"}</span>
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.95rem] font-semibold tracking-tighter2 text-zinc-50">
              Snippet Vault
            </span>
            <span className="mt-0.5 hidden text-[0.7rem] font-medium text-zinc-500 sm:block">
              Store · Search · Reuse
            </span>
          </span>
        </a>

        {/* Right side: subtle keyboard hint */}
        <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
          <span>Press</span>
          <kbd className="rounded-md border border-white/[0.1] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.7rem] text-zinc-300">
            N
          </kbd>
          <span>to add a snippet</span>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
