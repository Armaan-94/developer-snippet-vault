import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/cn";
import { softSpring } from "../lib/motion";

/**
 * Reusable segmented filter used for BOTH the language and tag filters
 * (previously duplicated markup in two places). Renders an "All" option plus
 * one chip per item. The active chip's pill background is a shared-layout
 * element (layoutId), so it smoothly slides between selections.
 *
 * `groupId` must be unique per filter group so the indicators don't fight.
 * `leading` optionally renders a small element before an item's label
 * (e.g. a language color dot, or a "#" for tags).
 */
function FilterChips({
  label,
  items,
  active,
  onChange,
  allLabel = "All",
  groupId,
  leading,
}) {
  const reduce = useReducedMotion();
  const options = [{ value: "All", label: allLabel, isAll: true }, ...items.map((i) => ({ value: i, label: i }))];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && (
        <span className="mr-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
          {label}
        </span>
      )}
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200 ease-out-expo focus-visible:outline-none",
              isActive
                ? "border-accent/40 text-white"
                : "border-white/[0.08] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={reduce ? undefined : `chip-${groupId}`}
                transition={softSpring}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-accent/25 to-accent-strong/20 ring-1 ring-inset ring-accent/40"
              />
            )}
            {!opt.isAll && leading?.(opt.value)}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterChips;
