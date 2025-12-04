#!/usr/bin/env node
// Planner (dry-run): read analyzer output and propose a short plan. Requires human approval before execution.
import fs from "fs"
import path from "path"

const analyzerFile = path.join(process.cwd(), "out", "analyzer.json")
if (!fs.existsSync(analyzerFile)) {
  console.error("Analyzer output not found. Run analyzer first.")
  process.exit(2)
}
const analyzer = JSON.parse(fs.readFileSync(analyzerFile, "utf8"))

const plan = []
plan.push("1. Create draft Notes/Session X.md using session template and Lyra voice")
plan.push("2. Verify and resolve wikilinks mentioned in draft")
plan.push("3. Create new NPC files for any new characters discovered (require approval)")
plan.push("4. Update existing People/ and Places/ files with concise Recent Developments entries")
plan.push("5. Update index.md and regional indices")
plan.push("6. Run QA checks (remark, wikilink validate, prose) and present results")

const out = {
  sessionDir: analyzer.sessionDir,
  plan,
  suggested_files: analyzer.extracted_entities.slice(0, 20),
}
const outFile = path.join(process.cwd(), "out", "plan.json")
fs.writeFileSync(outFile, JSON.stringify(out, null, 2))
console.log("Plan written to", outFile)
console.log("Plan preview:")
for (const s of plan) console.log("-", s)
