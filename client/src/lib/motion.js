/**
 * Shared Framer Motion tokens so every animation in the app uses the same
 * easing curves, timing, and spring physics. This is what makes the motion
 * feel "invisible but satisfying" — consistency, not novelty.
 */

// Apple-like ease-out-expo for entrances
export const easeOutExpo = [0.22, 1, 0.36, 1];
export const easeInOutSoft = [0.4, 0, 0.2, 1];

// A soft spring for hover / press / layout — no overshoot bounce
export const softSpring = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.6,
};

// Stagger container for grids / lists
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

// Individual item: fade + slide up + subtle blur clearing (Apple-style)
export const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: easeInOutSoft },
  },
};

// Modal panel
export const modalPanel = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.32, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.2, ease: easeInOutSoft },
  },
};

export const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25, ease: easeInOutSoft } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: easeInOutSoft } },
};
