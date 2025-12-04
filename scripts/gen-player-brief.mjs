#!/usr/bin/env node
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

const root = process.cwd()
const notesDir = path.join(root, "content", "Notes")
const outDashDir = path.join(root, "content", "People", "Party", "Lyra Shadowflame")

function readFile(p) {
  return fs.readFileSync(p, "utf8")
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

function extractSection(md, heading) {
  const re = new RegExp("^##+\\s*" + heading.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&") + "\\s*$", "m")
  const m = md.match(re)
  if (!m) return []
  const start = m.index + m[0].length
  const rest = md.slice(start)
  const lines = rest.split(/\n/)
  const out = []
  for (const line of lines) {
    if (/^##+\s+/.test(line)) break
    if (/^[\-\*]\s+/.test(line)) out.push(line.replace(/^[\-\*]\s+/, "").trim())
  }
  return out
}

function findLyraLines(md) {
  const lines = md.split(/\n/)
  return lines
    .filter((l) => /Lyra Shadowflame|\bLyra\b/.test(l))
    .map((l) => l.trim())
    .slice(0, 10)
}

function safeWrite(filePath, content) {
  const dir = path.dirname(filePath)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filePath, content, "utf8")
}

const sessionFiles = fs
  .readdirSync(notesDir)
  .filter((f) => f.endsWith(".md"))
  .sort((a, b) => a.localeCompare(b))
const briefsCreated = []
const dashboardEntries = []
const aggregatedLeads = new Set()

for (const f of sessionFiles) {
  const full = path.join(notesDir, f)
  const md = readFile(full)
  const fm = parseFrontmatter(md)
  const title = fm.title || f.replace(/\.md$/, "")

  // only generate if Lyra mentioned
  if (!/Lyra Shadowflame|\bLyra\b/.test(md)) continue

  const major = extractSection(md, "Major Events")
  const mysteries = extractSection(md, "Ongoing Mysteries")
  const charActions = extractSection(md, "Character Actions & Developments")
  const keyNpc = extractSection(md, "Key NPC Interactions")
  const lyraLines = findLyraLines(md)

  // Build first-person brief using available facts conservatively
  const sentences = []
  // prefer direct character actions lines mentioning Lyra
  for (const line of charActions) {
    if (/Lyra Shadowflame|\bLyra\b/.test(line)) {
      // make a sentence
      const s = line.replace(/\[\[.*?\|?(.*?)\]\]/g, "$1")
      sentences.push(s.replace(/^[\-\*]\s*/, "").trim())
    }
  }
  // fallback to journal mentions
  if (!sentences.length && lyraLines.length) {
    for (const ln of lyraLines.slice(0, 3)) {
      const s = ln.replace(/\[\[.*?\|?(.*?)\]\]/g, "$1")
      if (!/^#+/.test(s)) sentences.push(s.replace(/^[\-\*]\s*/, "").trim())
    }
  }
  // if still empty, pull a major event
  if (!sentences.length && major.length) {
    for (const m of major.slice(0, 2)) {
      if (/Lyra Shadowflame|\bLyra\b/.test(m) || m.toLowerCase().indexOf("lyra") >= 0)
        sentences.push(m)
    }
  }

  // Compose the Lyra voice paragraph (first-person) conservatively
  let para = ""
  if (sentences.length) {
    // prefix with 'I' if the sentence contains verb forms; otherwise leave as fragment
    const s = sentences.map((s) => s.replace(/\[|\]|\*/g, "")).join(". ")
    if (!/^I\b/.test(s)) para = `I ${s.replace(/^(was |were |created |used |triggered )/i, "")}`
    else para = s
    // ensure sentence ends with period
    if (!/[.!?]$/.test(para)) para = para + "."
  } else {
    para = "I was present for this session; key details are listed below."
  }

  // What to remember: collect mysteries and NPC mentions
  const remember = []
  for (const m of mysteries) {
    remember.push(m.replace(/\[\[.*?\|?(.*?)\]\]/g, "$1"))
    aggregatedLeads.add(m.replace(/\[\[.*?\|?(.*?)\]\]/g, "$1"))
  }
  // include NPCs that mentioned Lyra
  for (const k of keyNpc) {
    if (/Lyra Shadowflame|\bLyra\b/.test(k) || keyNpc.length <= 5) {
      remember.push(k.replace(/\[\[.*?\|?(.*?)\]\]/g, "$1"))
    }
  }

  // suggested actions: echo mysteries as follow-ups
  const suggested = remember.slice(0, 5)

  // write brief file: content/Notes/Session X - Lyra Brief.md
  const sessionName = f.replace(/\.md$/, "")
  const briefPath = path.join(notesDir, `${sessionName} - Lyra Brief.md`)
  const briefFm = {
    title: `${title} — Lyra brief`,
    tags: ["session", "player-brief", "lyra"],
    session: sessionName,
    player: "Lyra Shadowflame",
    date_created: fm["date created"] || fm["date"] || "",
  }
  const briefContentLines = []
  briefContentLines.push("---")
  briefContentLines.push(`title: "${briefFm.title.replace(/"/g, '\"')}"`)
  briefContentLines.push(`tags: [${briefFm.tags.join(", ")}]`)
  briefContentLines.push(`session: "${briefFm.session}"`)
  briefContentLines.push(`player: "${briefFm.player}"`)
  if (briefFm.date_created) briefContentLines.push(`date created: "${briefFm.date_created}"`)
  briefContentLines.push("---\n")
  briefContentLines.push(para + "\n")
  if (remember.length) {
    briefContentLines.push("### What I need to remember")
    for (const r of remember) briefContentLines.push(`- ${r}`)
    briefContentLines.push("")
  }
  if (suggested.length) {
    briefContentLines.push("### Suggested actions for next session")
    for (const s of suggested) briefContentLines.push(`- ${s}`)
    briefContentLines.push("")
  }
  briefContentLines.push("### Source")
  briefContentLines.push(`- [[${path.join("Notes", sessionName)}|${title}]]`)

  safeWrite(briefPath, briefContentLines.join("\n"))
  briefsCreated.push(briefPath)
  dashboardEntries.push({
    session: sessionName,
    title,
    brief: briefPath,
    rememberCount: remember.length,
  })
}

// write dashboard
fs.mkdirSync(outDashDir, { recursive: true })
const dashPath = path.join(outDashDir, "Dashboard.md")
const dashLines = []
dashLines.push("---")
dashLines.push('title: "Lyra Shadowflame — Dashboard"')
dashLines.push("tags: [player, dashboard, lyra]")
dashLines.push("---\n")
dashLines.push("# Lyra Shadowflame — Dashboard\n")
dashLines.push("## Recent session briefs")
for (const e of dashboardEntries.slice(-10).reverse()) {
  const rel = path.relative(path.dirname(dashPath), e.brief).replace(/\\/g, "/")
  dashLines.push(`- [[${rel}|${e.title}]] — ${e.rememberCount} reminders`)
}
if (aggregatedLeads.size) {
  dashLines.push("\n## Aggregated leads & mysteries")
  for (const l of Array.from(aggregatedLeads)) dashLines.push(`- ${l}`)
}

after: safeWrite(dashPath, dashLines.join("\n"))

console.log("Created briefs:", briefsCreated.length)
console.log("Dashboard:", dashPath)
console.log("Brief files:")
for (const b of briefsCreated) console.log("-", b)
