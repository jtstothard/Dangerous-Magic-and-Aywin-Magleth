#!/usr/bin/env node
// Committer (dry-run by default): apply patches from out/patches or write files when --apply is passed.
import fs from "fs"
import path from "path"

const args = process.argv.slice(2)
const apply = args.includes("--apply")
const patchesDir = path.join(process.cwd(), "out", "patches")
if (!fs.existsSync(patchesDir)) {
  console.log("No patches found in", patchesDir)
  process.exit(0)
}
const patches = fs
  .readdirSync(patchesDir)
  .filter((f) => f.endsWith(".patch") || f.endsWith(".diff"))
if (patches.length === 0) {
  console.log("No patch files to apply")
  process.exit(0)
}
console.log("Found patches:", patches)
if (!apply) {
  console.log("Dry-run: to apply patches rerun with --apply")
  for (const p of patches) console.log("-", p)
  process.exit(0)
}
import { spawnSync } from "child_process"
for (const p of patches) {
  const full = path.join(patchesDir, p)
  console.log("Applying patch", full)
  const r = spawnSync("git", ["apply", "--whitespace=nowarn", full], { stdio: "inherit" })
  if (r.status !== 0) console.error("git apply failed for", full)
}
console.log("Done")
