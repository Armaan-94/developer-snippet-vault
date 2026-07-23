/**
 * Tiny className combiner — filters out falsy values and joins with a space.
 * Keeps JSX readable without pulling in a dependency.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
