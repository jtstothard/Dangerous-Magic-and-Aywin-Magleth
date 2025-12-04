#!/usr/bin/env node
// QA (dry-run): run remark-based lint and wikilink validation on out/Notes-Session-X-draft.md
import { spawnSync } from "child_process"
import path from "path"
import fs from "fs"

const draft = path.join(process.cwd(), "out", "Notes-Session-X-draft.md")
if (!fs.existsSync(draft)) {
  console.error("Draft not found. Run generator first.")
  process.exit(2)
}

console.log("Running remark lint...")
const outLogsDir = path.join(process.cwd(), "out", "logs")
if (!fs.existsSync(outLogsDir)) fs.mkdirSync(outLogsDir, { recursive: true })
const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
const report = { draft, timestamp, remark: null, wikilink: null, prose: null }

console.log("Running remark lint...")
let r = spawnSync("npx", ["remark", draft, "--use", "remark-preset-lint-recommended"], {
  encoding: "utf8",
})
report.remark = { status: r.status, stdout: r.stdout, stderr: r.stderr }
if (r.status !== 0) console.error("remark reported issues")

console.log("Running wikilink validator...")
let w = spawnSync("node", [path.join("scripts", "remark-ast-wikilink-validate.js")], {
  encoding: "utf8",
})
report.wikilink = { status: w.status, stdout: w.stdout, stderr: w.stderr }
if (w.status !== 0) console.error("wikilink validator reported issues")

console.log("Running prose check (alex)...")
let a = spawnSync("npx", ["alex", draft], { encoding: "utf8" })
report.prose = { status: a.status, stdout: a.stdout, stderr: a.stderr }

const outFile = path.join(outLogsDir, `qa-${timestamp}.json`)
fs.writeFileSync(outFile, JSON.stringify(report, null, 2))
console.log("QA report written to", outFile)
console.log("QA complete. Review the JSON report for details.")
