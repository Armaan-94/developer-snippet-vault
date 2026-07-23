import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "../lib/motion";
import Button from "./ui/Button";

/**
 * Animated empty state. Two intents:
 *  - "empty"   → the vault has no snippets yet (offers a create CTA)
 *  - "no-results" → filters/search matched nothing (offers a clear CTA)
 */
function EmptyState({ variant = "empty", onAction }) {
  const reduce = useReducedMotion();
  const isNoResults = variant === "no-results";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className="col-span-full flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      {/* Floating glowing orb with a </> glyph */}
      <div className="relative mb-7">
        <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl" />
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative grid h-20 w-20 place-items-center rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-lift backdrop-blur-xl"
        >
          <span className="font-mono text-2xl font-bold text-gradient-accent">
            {isNoResults ? "?" : "</>"}
          </span>
        </motion.div>
      </div>

      <h3 className="text-lg font-semibold tracking-tighter2 text-zinc-100">
        {isNoResults ? "No snippets match" : "Your vault is empty"}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
        {isNoResults
          ? "Try a different search term, language, or tag — nothing matched your current filters."
          : "Save your first reusable snippet and it'll show up here, beautifully highlighted and instantly searchable."}
      </p>

      <div className="mt-6">
        <Button variant={isNoResults ? "secondary" : "primary"} onClick={onAction}>
          {isNoResults ? "Clear filters" : "Create your first snippet"}
        </Button>
      </div>
    </motion.div>
  );
}

export default EmptyState;
