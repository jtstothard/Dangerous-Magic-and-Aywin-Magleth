#!/usr/bin/env node
// Generator (dry-run): produce a draft Notes/Session X.md from analyzer output and create a unified patch.
import fs from "fs"
import path from "path"
import { spawnSync } from "child_process"

const analyzerFile = path.join(process.cwd(), "out", "analyzer.json")
if (!fs.existsSync(analyzerFile)) {
  console.error("Analyzer output not found. Run analyzer first.")
  process.exit(2)
}
const analyzer = JSON.parse(fs.readFileSync(analyzerFile, "utf8"))

const title = "Session X - Auto-generated Draft"
const frontmatter = `---\naliases: []\ntags: [session]\ntitle: "${title}"\ndate created: 01/01/1970\ndate modified: 01/01/1970\n---\n\n`

const journal = `## Journal Entry\n\nI write this entry as if I were ${analyzer.extracted_entities[0] || "Lyra"}. This is a draft generated from raw notes.\n\n`
const major = "## Major Events\n\n- Event 1\n- Event 2\n\n"
const npc = "## Key NPC Interactions\n\n- [[Example NPC]]: notes about interaction\n\n"
const chars =
  "## Character Actions & Developments\n\n- [[People/Party/ExamplePC|Example PC]]: development note\n\n"
const mysteries = "## Ongoing Mysteries & Leads\n\n- Mystery 1\n\n"
const mechanical = "## Mechanical Details\n\n- (Optional mechanical notes)\n\n"
const nav = "## Navigation\n\n← [[Session X - 1]] **Previous** | **Next:** [[Session X + 1]] →\n"

const content = frontmatter + journal + major + npc + chars + mysteries + mechanical + nav

const outDir = path.join(process.cwd(), "out")
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
const draftFile = path.join(outDir, "Notes-Session-X-draft.md")
fs.writeFileSync(draftFile, content)
console.log("Draft written to", draftFile)

// Determine target path for canonical session note
let targetPath = null
try {
  const sd = analyzer.sessionDir
  const parts = sd.split(path.sep)
  const notesIdx = parts.lastIndexOf("Notes")
  if (notesIdx !== -1) {
    const sessionName = parts.slice(notesIdx + 1).join(path.sep)
    targetPath = path.join(process.cwd(), "content", "Notes", `${sessionName}.md`)
  }
} catch (e) {}
if (!targetPath) targetPath = path.join(process.cwd(), "content", "Notes", "Session X.md")

const patchOut = path.join(outDir, "patches")
if (!fs.existsSync(patchOut)) fs.mkdirSync(patchOut, { recursive: true })
const patchFile = path.join(patchOut, "Notes-Session-X.patch")

const res = spawnSync("git", ["diff", "--no-index", "--color=never", targetPath, draftFile], {
  encoding: "utf8",
})
if (res.error) {
  console.error(res.error)
  process.exit(3)
}
if (!res.stdout) console.log("No differences found; no patch created")
else {
  fs.writeFileSync(patchFile, res.stdout)
  console.log("Patch written to", patchFile)
}
