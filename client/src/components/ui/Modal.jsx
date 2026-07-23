import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { backdrop, modalPanel } from "../../lib/motion";
import { cn } from "../../lib/cn";

/**
 * Accessible, animated modal used by every dialog in the app.
 *  - Rendered in a portal on document.body
 *  - Fade + blur backdrop, spring-scaled panel (AnimatePresence exit)
 *  - Closes on ESC and backdrop click
 *  - Locks body scroll, moves focus into the dialog, restores it on close
 *  - role="dialog" + aria-modal + aria-labelledby for screen readers
 */
function Modal({ open, onClose, title, description, children, className }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const lastFocused = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    // Move focus into the dialog after it mounts
    const t = setTimeout(() => {
      const focusable = panelRef.current?.querySelector(
        "input, textarea, button, [tabindex]"
      );
      focusable?.focus();
    }, 40);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      clearTimeout(t);
      // Restore focus to whatever opened the modal
      if (lastFocused.current instanceof HTMLElement) {
        lastFocused.current.focus();
      }
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdrop}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            variants={reduce ? backdrop : modalPanel}
            className={cn(
              "surface relative w-full max-w-lg rounded-3xl p-6 shadow-lift sm:p-7",
              className
            )}
          >
            {(title || description) && (
              <div className="mb-5">
                {title && (
                  <h2
                    id={titleId}
                    className="text-lg font-semibold tracking-tighter2 text-zinc-50"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-zinc-400">{description}</p>
                )}
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
