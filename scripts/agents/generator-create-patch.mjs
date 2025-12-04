#!/usr/bin/env node
// Helper: create a patch between existing file (if any) and a new draft
// Usage: node scripts/agents/generator-create-patch.mjs targetPath draftPath out/patches/name.patch
import fs from "fs"
import path from "path"
import { spawnSync } from "child_process"

const args = process.argv.slice(2)
if (args.length < 3) {
  console.error(
    "Usage: node scripts/agents/generator-create-patch.mjs targetPath draftPath out/patches/name.patch",
  )
  process.exit(2)
}
const [target, draft, outPatch] = args
// ensure draft exists
if (!fs.existsSync(draft)) {
  console.error("Draft not found:", draft)
  process.exit(2)
}
// if target doesn't exist, create an empty temp file to diff against
const tmpOrig = target && fs.existsSync(target) ? target : "/dev/null"
const res = spawnSync("git", ["diff", "--no-index", "--color=never", tmpOrig, draft], {
  encoding: "utf8",
})
if (res.error) {
  console.error(res.error)
  process.exit(3)
}
const diff = res.stdout
if (!diff) {
  console.log("No differences found; no patch created")
  process.exit(0)
}
const outDir = path.dirname(outPatch)
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(outPatch, diff)
console.log("Patch written to", outPatch)
