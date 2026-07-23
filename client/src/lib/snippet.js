/**
 * Snippet field helpers shared by the create + edit modals.
 * Centralizes the comma-string <-> tags-array conversion so both dialogs
 * behave identically. (Improvement over the old code: tags are trimmed and
 * empty entries dropped, so "react, , hooks," no longer creates blank tags.)
 */
export function toTagsArray(str) {
  return String(str || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function fromTagsArray(arr) {
  return Array.isArray(arr) ? arr.join(", ") : "";
}
