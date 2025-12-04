#!/usr/bin/env node
// remark-based AST wikilink validator with improvements:
// - ignores content/.trash
// - treats image/file wikilinks as valid if target exists
// - uses alias map with substring and Levenshtein fuzzy matching
// - supports --scope=<relative/path> to limit validation to a subfolder of content/

import fs from "fs"
import path from "path"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter"
let wiki = null
let visit = null
try {
  const mod = await import("remark-wiki-link")
  wiki = mod.default || mod
  const visitMod = await import("unist-util-visit")
  visit = visitMod.visit
} catch (e) {
  // plugin not available; will fall back to regex-based extraction
}

const root = process.cwd()
const contentDir = path.join(root, "content")

const imageExts = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif"]

function isPlaceholder(link) {
  if (!link) return true
  const p = link.trim()
  const placeholders = [
    "Session X",
    "Page Name",
    "Example NPC",
    "Example PC",
    "Another NPC",
    "Notes/Session X",
  ]
  return placeholders.some((ph) => p.includes(ph) || p === ph)
}

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

function resolveCandidates(target) {
  const parts = target.split("|")[0].trim()
  const candidates = []
  // direct file under content
  candidates.push(path.join(contentDir, `${parts}.md`))
  candidates.push(path.join(contentDir, parts, "index.md"))
  // try with path separators
  candidates.push(path.join(contentDir, parts.replace(/\//g, path.sep) + ".md"))
  candidates.push(path.join(contentDir, parts.replace(/\//g, path.sep), "index.md"))
  // if it's an image/file-like path, try that relative path
  for (const ext of imageExts) {
    if (parts.toLowerCase().endsWith(ext)) {
      candidates.push(path.join(contentDir, parts))
      candidates.push(path.join(contentDir, parts.replace(/\//g, path.sep)))
    }
  }
  return candidates
}

function normalizeKey(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[\u2018\u2019\u201C\u201D]/g, "")
    .replace(/[.,'"()\[\]:;!?\u2013\u2014]/g, "")
    .replace(/\s+/g, " ")
}

function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[m][n]
}

function fuzzyMatch(norm, aliasMap) {
  if (!aliasMap || !aliasMap.entries) return false
  // exact or normalized exact
  if (aliasMap.map && (aliasMap.map[norm] || aliasMap.map[normalizeKey(norm)])) return true
  // substring match
  const sub = aliasMap.entries.find((e) => e.normTitle && e.normTitle.includes(norm))
  if (sub) return true
  // Levenshtein fuzzy: compute small distance threshold
  for (const e of aliasMap.entries) {
    if (!e.normTitle) continue
    const d = levenshtein(norm, e.normTitle)
    const thresh = Math.max(1, Math.floor(Math.min(3, Math.max(1, e.normTitle.length * 0.15))))
    if (d <= thresh) return true
  }
  return false
}

async function validate() {
  if (!fs.existsSync(contentDir)) {
    console.error("content/ not found")
    process.exit(2)
  }

  // parse --scope argument (relative to content/)
  const scopeArg = process.argv.find((a) => a.startsWith("--scope="))
  let scopeDir = contentDir
  if (scopeArg) {
    const rel = scopeArg.split("=")[1]
    if (rel && rel.trim()) scopeDir = path.join(contentDir, rel)
    if (!fs.existsSync(scopeDir)) {
      console.error("Scope path not found:", scopeDir)
      process.exit(2)
    }
  }

  const mdFiles = findMarkdownFiles(scopeDir)
  const missing = []

  // load alias map once
  const aliasMapPath = path.join(process.cwd(), "out", "alias-map.json")
  let aliasMap = null
  if (fs.existsSync(aliasMapPath)) aliasMap = JSON.parse(fs.readFileSync(aliasMapPath, "utf8"))

  for (const file of mdFiles) {
    const md = fs.readFileSync(file, "utf8")
    // prefer AST extraction when plugin available
    if (wiki && visit) {
      const processor = unified().use(remarkParse).use(remarkFrontmatter).use(wiki)
      const tree = processor.parse(md)
      const processed = await processor.run(tree)
      visit(processed, "wikiLink", (node) => {
        const raw = node.value || node.label || node.data?.page || ""
        const linkTarget = raw.trim()
        if (isPlaceholder(linkTarget)) return
        const parts = linkTarget.split("|")[0].trim()
        const norm = normalizeKey(parts)
        // if alias map resolves (including fuzzy), accept
        if (fuzzyMatch(norm, aliasMap)) return
        // if link looks like an image/file, try to resolve physically
        const lower = parts.toLowerCase()
        const looksLikeFile = imageExts.some((ext) => lower.endsWith(ext)) || parts.includes("/")
        if (looksLikeFile) {
          const cands = resolveCandidates(parts)
          const ok = cands.some((c) => fs.existsSync(c))
          if (ok) return
        }
        const cands = resolveCandidates(linkTarget)
        const ok = cands.some((c) => fs.existsSync(c))
        if (!ok) missing.push({ file, link: linkTarget, tried: cands })
      })
    } else {
      // fallback: regex-based extraction
      const re = /\[\[([^\]]+)\]\]/g
      let m
      while ((m = re.exec(md)) !== null) {
        const linkTarget = m[1].trim()
        if (isPlaceholder(linkTarget)) continue
        const parts = linkTarget.split("|")[0].trim()
        const norm = normalizeKey(parts)
        if (fuzzyMatch(norm, aliasMap)) continue
        const lower = parts.toLowerCase()
        const looksLikeFile = imageExts.some((ext) => lower.endsWith(ext)) || parts.includes("/")
        if (looksLikeFile) {
          const cands = resolveCandidates(parts)
          const ok = cands.some((c) => fs.existsSync(c))
          if (ok) continue
        }
        const cands = resolveCandidates(linkTarget)
        const ok = cands.some((c) => fs.existsSync(c))
        if (!ok) missing.push({ file, link: linkTarget, tried: cands })
      }
    }
  }

  if (missing.length === 0) {
    console.log("No unresolved wikilinks found in scope")
    process.exit(0)
  }

  console.log(`Found ${missing.length} unresolved wikilinks:`)
  for (const m of missing.slice(0, 200))
    console.log("-", path.relative(root, m.file), "-> [[", m.link, "]]")
  process.exit(1)
}

validate().catch((err) => {
  console.error(err)
  process.exit(3)
})
