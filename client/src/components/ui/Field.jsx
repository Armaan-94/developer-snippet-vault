import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";

/**
 * Form primitives with a shared visual language:
 *  - consistent radius / padding / surface
 *  - animated border + ring on focus (accent)
 *  - optional label and hint, wired up with htmlFor / aria-describedby
 *
 * `mono` renders the control in the code font (used for the code textarea).
 */
const baseControl =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 " +
  "shadow-soft transition-all duration-200 ease-out-expo " +
  "hover:border-white/[0.14] " +
  "focus:border-accent/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/25 focus:outline-none";

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400"
    >
      {children}
    </label>
  );
}

export const Input = forwardRef(function Input(
  { label, hint, className, id, mono = false, ...props },
  ref
) {
  const autoId = useId();
  const fieldId = id || autoId;
  const hintId = hint ? `${fieldId}-hint` : undefined;

  return (
    <div>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <input
        ref={ref}
        id={fieldId}
        aria-describedby={hintId}
        className={cn(baseControl, mono && "font-mono", className)}
        {...props}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-zinc-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, hint, className, id, mono = false, ...props },
  ref
) {
  const autoId = useId();
  const fieldId = id || autoId;
  const hintId = hint ? `${fieldId}-hint` : undefined;

  return (
    <div>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <textarea
        ref={ref}
        id={fieldId}
        aria-describedby={hintId}
        className={cn(
          baseControl,
          "resize-none leading-relaxed",
          mono && "font-mono",
          className
        )}
        {...props}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-zinc-500">
          {hint}
        </p>
      )}
    </div>
  );
});
