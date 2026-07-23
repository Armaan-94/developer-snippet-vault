import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { deleteSnippet } from "../api/snippetApi";
import toast from "react-hot-toast";
import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";

import EditSnippetModal from "./EditSnippetModal";
import Button from "./ui/Button";
import { LanguageBadge, TagPill } from "./ui/Badge";
import { getLanguageMeta } from "../lib/languages";
import { fadeUp, softSpring } from "../lib/motion";

function timeAgo(dateStr) {
  if (!dateStr) return null;
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function SnippetCard({ snippet, refresh }) {
  const reduce = useReducedMotion();
  const [showEdit, setShowEdit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const codeRef = useRef(null);

  const { prism, label } = getLanguageMeta(snippet.language);

  // Highlight only THIS card's code block (cheaper than highlightAll)
  useEffect(() => {
    if (codeRef.current) Prism.highlightElement(codeRef.current);
  }, [snippet.code, snippet.language]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      toast.success("Code copied!");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  const removeSnippet = async () => {
    setDeleting(true);
    try {
      await deleteSnippet(snippet._id);
      toast.success("Snippet deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
      setDeleting(false);
      setConfirmingDelete(false);
    }
  };

  const createdLabel = timeAgo(snippet.createdAt);

  return (
    <>
      <motion.article
        layout
        variants={fadeUp}
        whileHover={reduce ? undefined : { y: -4 }}
        transition={softSpring}
        className="group relative h-full"
      >
        {/* Gradient border glow on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/50 via-accent-violet/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="surface relative flex h-full flex-col rounded-2xl p-5 shadow-card transition-shadow duration-300 group-hover:shadow-lift">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[0.975rem] font-semibold tracking-tighter2 text-zinc-50">
                {snippet.title}
              </h3>
              {createdLabel && (
                <span className="mt-1 block text-xs text-zinc-500">
                  {createdLabel}
                </span>
              )}
            </div>
            <LanguageBadge language={snippet.language} className="shrink-0" />
          </div>

          {snippet.description && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
              {snippet.description}
            </p>
          )}

          {/* Code preview */}
          <div className="relative mb-4 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-950/60">
            {/* Fake editor top bar */}
            <div className="flex items-center gap-1.5 border-b border-white/[0.05] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-wider text-zinc-500">
                {label}
              </span>
            </div>
            <div className="max-h-44 overflow-auto p-4">
              <pre className="!m-0 !bg-transparent !p-0">
                <code ref={codeRef} className={`language-${prism}`}>
                  {snippet.code}
                </code>
              </pre>
            </div>
            {/* Fade at the bottom to hint at scroll */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink-950/80 to-transparent" />
          </div>

          {/* Tags */}
          {snippet.tags?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {snippet.tags.filter(Boolean).map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto flex items-center gap-2">
            <AnimatePresence mode="wait" initial={false}>
              {confirmingDelete ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="flex w-full items-center gap-2"
                >
                  <span className="mr-auto text-xs text-zinc-400">
                    Delete this snippet?
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setConfirmingDelete(false)}
                    disabled={deleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={removeSnippet}
                    loading={deleting}
                  >
                    Delete
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="flex w-full items-center gap-2"
                >
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={copyCode}
                    className="min-w-[5.5rem]"
                    aria-label="Copy code to clipboard"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex items-center gap-1.5"
                        >
                          <CheckIcon /> Copied
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex items-center gap-1.5"
                        >
                          <CopyIcon /> Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowEdit(true)}
                    aria-label="Edit snippet"
                  >
                    <EditIcon /> Edit
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setConfirmingDelete(true)}
                    aria-label="Delete snippet"
                    className="ml-auto text-zinc-500 hover:text-red-300"
                  >
                    <TrashIcon />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.article>

      <EditSnippetModal
        open={showEdit}
        snippet={snippet}
        closeModal={() => setShowEdit(false)}
        refresh={refresh}
      />
    </>
  );
}

/* ---- Inline icons (no extra dependency) ---- */
const iconProps = {
  width: 15,
  height: 15,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function CopyIcon() {
  return (
    <svg {...iconProps}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    </svg>
  );
}

export default SnippetCard;
