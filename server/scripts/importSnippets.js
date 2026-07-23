/**
 * One-off import script: reads the generated snippet dataset (JSON files in
 * the scratchpad), validates/normalizes each entry against the Snippet
 * schema's limits, dedupes by title, and bulk-inserts into MongoDB Atlas.
 *
 * Usage: node scripts/importSnippets.js
 */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Snippet = require("../models/Snippet");

const SCRATCH_DIR =
  "C:/Users/Admin/AppData/Local/Temp/claude/C--Users-Admin-Desktop-dvs-developer-snippet-vault/c6b78a47-2ca9-4731-87cf-fe482150d52a/scratchpad";

const FILES = [
  "java.json",
  "dsa1.json",
  "dsa2.json",
  "springboot.json",
  "sql.json",
  "javascript.json",
  "react.json",
  "node.json",
  "systemdesign.json",
  "interview.json",
];

// Pull the JSON array out of a blob that may have markdown fences or preamble
// text around it (some agents wrapped their output in ```json ... ``` etc.)
function extractJsonArray(raw) {
  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("]");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON array found in file");
  }
  return JSON.parse(raw.slice(start, end + 1));
}

function truncate(str, max) {
  const s = String(str || "");
  return s.length > max ? s.slice(0, max) : s;
}

function normalize(entry) {
  return {
    title: truncate(entry.title, 100).trim(),
    language: truncate(entry.language, 30).trim(),
    description: truncate(entry.description || "", 300),
    code: truncate(entry.code, 5000),
    tags: Array.isArray(entry.tags) ? entry.tags.filter(Boolean).slice(0, 10) : [],
  };
}

async function main() {
  const seen = new Set();
  const toInsert = [];
  const report = [];

  for (const file of FILES) {
    const filePath = path.join(SCRATCH_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    let arr;
    try {
      arr = extractJsonArray(raw);
    } catch (err) {
      report.push(`${file}: PARSE FAILED - ${err.message}`);
      continue;
    }

    let added = 0;
    let skippedDupe = 0;
    let skippedInvalid = 0;

    for (const entry of arr) {
      if (!entry || !entry.title || !entry.language || !entry.code) {
        skippedInvalid++;
        continue;
      }
      const normalized = normalize(entry);
      const key = normalized.title.toLowerCase();
      if (seen.has(key)) {
        skippedDupe++;
        continue;
      }
      seen.add(key);
      toInsert.push(normalized);
      added++;
    }

    report.push(
      `${file}: ${arr.length} parsed, ${added} added, ${skippedDupe} dupes, ${skippedInvalid} invalid`
    );
  }

  console.log("=== Per-file report ===");
  report.forEach((line) => console.log(line));
  console.log(`\nTotal unique snippets to insert: ${toInsert.length}`);

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB:", mongoose.connection.host);

  const result = await Snippet.insertMany(toInsert, { ordered: false });
  console.log(`\nInserted ${result.length} snippets successfully.`);

  const totalCount = await Snippet.countDocuments();
  console.log(`Total snippets now in database: ${totalCount}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
