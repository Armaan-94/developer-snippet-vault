/**
 * Language metadata: maps a snippet's free-text `language` field to
 *   - a Prism grammar id (for syntax highlighting)
 *   - a small accent dot color (GitHub-style language dots)
 *
 * The badges themselves stay on the neutral surface palette; only a tiny
 * colored dot varies per language. This adds recognizability without turning
 * the UI into a rainbow.
 */

const MAP = {
  javascript: { prism: "javascript", label: "JavaScript", dot: "#f7df1e" },
  js: { prism: "javascript", label: "JavaScript", dot: "#f7df1e" },
  typescript: { prism: "typescript", label: "TypeScript", dot: "#3178c6" },
  ts: { prism: "typescript", label: "TypeScript", dot: "#3178c6" },
  jsx: { prism: "jsx", label: "JSX", dot: "#61dafb" },
  tsx: { prism: "tsx", label: "TSX", dot: "#61dafb" },
  react: { prism: "jsx", label: "React", dot: "#61dafb" },
  python: { prism: "python", label: "Python", dot: "#3776ab" },
  py: { prism: "python", label: "Python", dot: "#3776ab" },
  java: { prism: "java", label: "Java", dot: "#f89820" },
  go: { prism: "go", label: "Go", dot: "#00add8" },
  golang: { prism: "go", label: "Go", dot: "#00add8" },
  rust: { prism: "rust", label: "Rust", dot: "#dea584" },
  c: { prism: "c", label: "C", dot: "#a8b9cc" },
  cpp: { prism: "cpp", label: "C++", dot: "#00599c" },
  "c++": { prism: "cpp", label: "C++", dot: "#00599c" },
  csharp: { prism: "csharp", label: "C#", dot: "#9179c8" },
  "c#": { prism: "csharp", label: "C#", dot: "#9179c8" },
  php: { prism: "php", label: "PHP", dot: "#777bb4" },
  ruby: { prism: "ruby", label: "Ruby", dot: "#cc342d" },
  sql: { prism: "sql", label: "SQL", dot: "#e38c00" },
  bash: { prism: "bash", label: "Bash", dot: "#4eaa25" },
  shell: { prism: "bash", label: "Shell", dot: "#4eaa25" },
  sh: { prism: "bash", label: "Shell", dot: "#4eaa25" },
  json: { prism: "json", label: "JSON", dot: "#cbcb41" },
  yaml: { prism: "yaml", label: "YAML", dot: "#cb171e" },
  html: { prism: "markup", label: "HTML", dot: "#e34c26" },
  css: { prism: "css", label: "CSS", dot: "#563d7c" },
};

const FALLBACK = { prism: "clike", dot: "#818cf8" };

/** Normalize a free-text language into its metadata (never throws). */
export function getLanguageMeta(language) {
  const key = String(language || "").trim().toLowerCase();
  const meta = MAP[key];
  return {
    prism: meta?.prism ?? FALLBACK.prism,
    // Keep the user's original casing as the label unless we have a nicer one
    label: meta?.label ?? (language || "Code"),
    dot: meta?.dot ?? FALLBACK.dot,
  };
}
