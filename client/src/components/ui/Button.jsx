import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";
import { softSpring } from "../../lib/motion";

/**
 * The one button used everywhere. Guarantees consistent radius, focus ring,
 * hover/press motion, and loading/disabled states across the whole app.
 *
 * variants: primary (accent gradient) | secondary (surface) | ghost | danger
 * sizes:    sm | md | icon
 */
const VARIANTS = {
  primary:
    "text-white bg-gradient-to-b from-accent to-accent-strong border border-white/10 shadow-glow-soft hover:shadow-glow",
  secondary:
    "text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14]",
  ghost:
    "text-zinc-400 bg-transparent border border-transparent hover:text-zinc-100 hover:bg-white/[0.05]",
  danger:
    "text-red-100 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-50",
};

const SIZES = {
  sm: "h-8 px-3 text-[0.8125rem] gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  icon: "h-9 w-9 rounded-lg",
};

const Button = forwardRef(function Button(
  {
    variant = "secondary",
    size = "md",
    loading = false,
    disabled = false,
    className,
    children,
    ...props
  },
  ref
) {
  const reduce = useReducedMotion();
  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={isDisabled}
      whileHover={reduce || isDisabled ? undefined : { y: -1, scale: 1.02 }}
      whileTap={reduce || isDisabled ? undefined : { scale: 0.97 }}
      transition={softSpring}
      className={cn(
        "relative inline-flex select-none items-center justify-center font-medium tracking-tightish",
        "transition-colors duration-200 ease-out-expo",
        "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-current border-t-transparent opacity-90"
        />
      )}
      <span
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-opacity",
          loading && "opacity-0"
        )}
      >
        {children}
      </span>
    </motion.button>
  );
});

export default Button;
