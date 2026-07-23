import { useReducedMotion } from "framer-motion";

/**
 * Fixed, non-interactive backdrop that sits behind the whole app.
 * Layers (bottom -> top):
 *   1. Two very faint accent glow blobs that drift slowly.
 *   2. A subtle grid, masked so it fades toward the edges (never noisy).
 *   3. A fine noise texture to kill banding on the gradients.
 *   4. A soft vignette to focus attention on the content.
 *
 * Everything is pointer-events-none and aria-hidden — purely decorative.
 */
function Background() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      {/* Accent glow blobs */}
      <div
        className={`absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.22] blur-[120px] ${
          reduce ? "" : "animate-float-slow"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, #6366f1 0%, rgba(99,102,241,0) 70%)",
        }}
      />
      <div
        className={`absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full opacity-[0.16] blur-[120px] ${
          reduce ? "" : "animate-float-slower"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, #8b5cf6 0%, rgba(139,92,246,0) 70%)",
        }}
      />
      <div
        className={`absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full opacity-[0.10] blur-[120px] ${
          reduce ? "" : "animate-float-slow"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, #22d3ee 0%, rgba(34,211,238,0) 70%)",
        }}
      />

      {/* Grid overlay, masked to fade at edges */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Fine noise texture (inline SVG data URI — no network request) */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

export default Background;
