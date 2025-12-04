#!/usr/bin/env node
/*
  Simple remark-based wikilink validator.
  - Parses markdown files under content/
  - Uses regex to extract [[wikilinks]] and resolves them to content/<path>.md or content/<path>/index.md
  - Ignores common template placeholders (Session X, Page Name, Example NPC, etc.)
  This is a lightweight validator that avoids installing many remark plugins but uses the same resolution rules.
*/
import fs from "fs"
import path from "path"

const root = process.cwd()
const contentDir = path.join(root, "content")

const PLACEHOLDER_PATTERNS = [
  /^Session\s?X$/i,
  /^Page\s?Name$/i,
  /^Example\s?/i,
  /^Another\s?/i,
  /^File(\s|$)/i,
  /^People\/Party\/ExamplePC/i,
  /^Notes\/Session\s?X/i,
]

function isPlaceholder(link) {
  if (!link) return true
  for (const p of PLACEHOLDER_PATTERNS) if (p.test(link)) return true
  return false
}

function findMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files = files.concat(findMarkdownFiles(full))
    else if (e.isFile() && e.name.endsWith(".md")) files.push(full)
  }
  return files
}

function extractWikilinks(text) {
  const re = /\[\[([^\]]+)\]\]/g
  const links = []
  let m
  while ((m = re.exec(text)) !== null) links.push(m[1].trim())
  return links
}

function resolveLinkCandidates(link) {
  // strip alias
  const parts = link.split("|")[0].trim()
  const candidates = []
  candidates.push(path.join(contentDir, `${parts}.md`))
  candidates.push(path.join(contentDir, parts, "index.md"))
  // Try replacing pipes and colons
  candidates.push(path.join(contentDir, parts.replace(/\|/g, "/").trim() + ".md"))
  candidates.push(path.join(contentDir, parts.replace(/\|/g, "/").trim(), "index.md"))
  return candidates
}

function existsAny(paths) {
  return paths.some((p) => {
    try {
      return fs.existsSync(p)
    } catch {
      return false
    }
  })
}

function validate() {
  if (!fs.existsSync(contentDir)) {
    console.error("No content/ directory found")
    process.exit(2)
  }
  const mdFiles = findMarkdownFiles(contentDir)
  const missing = []
  for (const file of mdFiles) {
    const txt = fs.readFileSync(file, "utf8")
    const links = extractWikilinks(txt)
    for (const l of links) {
      if (isPlaceholder(l)) continue
      const candidates = resolveLinkCandidates(l)
      if (!existsAny(candidates)) missing.push({ file, link: l, tried: candidates })
    }
  }
  if (missing.length === 0) {
    console.log("No unresolved wikilinks found")
    process.exit(0)
  }
  console.log(`Found ${missing.length} unresolved wikilink(s):`)
  for (const m of missing.slice(0, 200))
    console.log(`- ${path.relative(root, m.file)} -> [[${m.link}]]`)
  process.exit(1)
}

validate()
