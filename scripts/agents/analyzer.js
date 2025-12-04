#!/usr/bin/env node
// Analyzer (dry-run): read Notes/SessionX raw files and produce a JSON skeleton of extracted entities/events.
import fs from "fs"
import path from "path"

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.error("Usage: node scripts/agents/analyzer.js path/to/Notes/SessionX/")
  process.exit(2)
}
const sessionDir = path.resolve(argv[0])
if (!fs.existsSync(sessionDir)) {
  console.error("Session dir not found:", sessionDir)
  process.exit(2)
}

const files = fs.readdirSync(sessionDir).filter((f) => f.endsWith(".md"))
let text = ""
for (const f of files) text += "\n" + fs.readFileSync(path.join(sessionDir, f), "utf8")

// naive entity extraction: lines starting with capital words; this is a placeholder for a smarter NLP step
const lines = text.split(/\r?\n/)
const entities = new Set()
for (const line of lines) {
  const m = line.match(/\b([A-Z][a-z]{2,}(?:\s[A-Z][a-z]{2,})*)\b/g)
  if (m) for (const e of m) entities.add(e)
}

const skeleton = {
  sessionDir,
  files,
  extracted_entities: Array.from(entities).slice(0, 200),
  summary: lines.slice(0, 20).join("\n"),
}

const outDir = path.join(process.cwd(), "out")
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
const outFile = path.join(outDir, "analyzer.json")
fs.writeFileSync(outFile, JSON.stringify(skeleton, null, 2))
console.log("Wrote", outFile)
