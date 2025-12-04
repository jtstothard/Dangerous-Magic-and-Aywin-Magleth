#!/usr/bin/env node
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

const required = ["title", "date created", "date modified", "tags"]
const root = process.cwd()

function parseFM(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return {}
  try {
    return yaml.load(m[1]) || {}
  } catch (e) {
    return {}
  }
}

const files = process.argv.slice(2)
if (!files.length) {
  console.log("No files provided to lint-frontmatter; exiting")
  process.exit(0)
}

let failed = false
for (const f of files) {
  if (!f.toLowerCase().endsWith(".md")) continue
  if (!fs.existsSync(f)) continue
  const txt = fs.readFileSync(f, "utf8")
  const fm = parseFM(txt)
  const missing = required.filter((k) => !(k in fm))
  if (missing.length) {
    console.error(`${f}: missing frontmatter fields: ${missing.join(", ")}`)
    failed = true
  }
}
if (failed) process.exit(1)
console.log("Frontmatter lint passed")
process.exit(0)
