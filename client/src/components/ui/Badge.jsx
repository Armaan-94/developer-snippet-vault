import { cn } from "../../lib/cn";
import { getLanguageMeta } from "../../lib/languages";

/**
 * Language badge — neutral surface pill with a small language-colored dot
 * (GitHub-style). Recognizable per-language without a rainbow UI.
 */
export function LanguageBadge({ language, className }) {
  const { label, dot } = getLanguageMeta(language);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-300",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: dot, boxShadow: `0 0 6px ${dot}80` }}
      />
      {label}
    </span>
  );
}

/**
 * Tag pill — used for the tag list on cards. Subtle, monospace-ish accent.
 */
export function TagPill({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[0.6875rem] font-medium text-zinc-400",
        className
      )}
    >
      <span className="mr-0.5 text-accent-soft/70">#</span>
      {children}
    </span>
  );
}
