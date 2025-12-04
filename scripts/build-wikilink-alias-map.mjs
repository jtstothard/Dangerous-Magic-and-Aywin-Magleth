#!/usr/bin/env node
// Build an alias/title -> file path map from content/ frontmatter (with normalization and entries list)
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

const root = process.cwd()
const contentDir = path.join(root, "content")

function findMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    // ignore trash/archive directories
    if (e.isDirectory() && e.name === ".trash") continue
    if (e.isDirectory()) files = files.concat(findMarkdownFiles(full))
    else if (e.isFile() && e.name.endsWith(".md")) files.push(full)
  }
  return files
}

function findImageFiles(dir) {
  const ext = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"])
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory() && e.name === ".trash") continue
    if (e.isDirectory()) files = files.concat(findImageFiles(full))
    else if (e.isFile() && ext.has(path.extname(e.name).toLowerCase())) files.push(full)
  }
  return files
}

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return {}
  try {
    return yaml.load(m[1]) || {}
  } catch {
    return {}
  }
}

function normalizeKey(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[\u2018\u2019\u201C\u201D]/g, "")
    .replace(/[.,'"()\[\]:;!?\u2013\u2014]/g, "")
    .replace(/\s+/g, " ")
}

function relPathWithoutExt(fullPath) {
  const rel = path.relative(contentDir, fullPath)
  if (rel.endsWith("index.md")) return rel.slice(0, -"index.md".length).replace(/\\$/, "")
  return rel.replace(/\.md$/, "")
}

function relAssetPathWithoutExt(fullPath) {
  // for images/assets, provide a relative path from content/ without extension
  const rel = path.relative(contentDir, fullPath)
  return rel.replace(/\.[^.]+$/, "")
}

if (!fs.existsSync(contentDir)) {
  console.error("content/ not found")
  process.exit(2)
}

const files = findMarkdownFiles(contentDir)
const map = {}
const entries = []
for (const f of files) {
  const txt = fs.readFileSync(f, "utf8")
  const fm = parseFrontmatter(txt)
  const basename = path.basename(f, ".md")
  const relNoExt = relPathWithoutExt(f)
  const title = fm.title || basename

  // helper to add key variants
  function addKey(key, entryTitle) {
    if (!key) return
    const k = String(key)
    const nk = normalizeKey(k)
    // only set if not already present to prefer first-discovered path
    map[k] = map[k] || f
    map[nk] = map[nk] || f
    entries.push({ file: f, title: entryTitle || k, normTitle: nk })
  }

  addKey(title, title)
  addKey(basename, basename)
  addKey(relNoExt, relNoExt)

  // if file is index.md, also map the parent folder name
  if (basename === "index") {
    const parent = path.basename(path.dirname(f))
    addKey(parent, parent)
  }

  if (fm.aliases && Array.isArray(fm.aliases)) for (const a of fm.aliases) addKey(a, a)
}

// scan for image files and register filename aliases (with and without extension)
const imageFiles = findImageFiles(contentDir)
for (const img of imageFiles) {
  const basename = path.basename(img) // with extension
  const nameNoExt = basename.replace(/\.[^.]+$/, "")
  const relNoExt = relAssetPathWithoutExt(img)

  function addImageKey(key) {
    if (!key) return
    const k = String(key)
    const nk = normalizeKey(k)
    map[k] = map[k] || img
    map[nk] = map[nk] || img
    entries.push({ file: img, title: key, normTitle: nk })
  }

  addImageKey(basename)
  addImageKey(nameNoExt)
  addImageKey(relNoExt)
  // also register with an Images/ prefix to allow Images/<name> style
  addImageKey(path.join("Images", basename))
}

const outFile = path.join("out", "alias-map.json")
if (!fs.existsSync("out")) fs.mkdirSync("out")
fs.writeFileSync(outFile, JSON.stringify({ map, entries }, null, 2))
console.log("Wrote alias map to", outFile)
