#!/usr/bin/env node
// Create a unified diff patch between two files using `git diff --no-index`.
// Usage: node scripts/create-patch.mjs originalFile newFile out/patches/name.patch
import { spawnSync } from "child_process"
import fs from "fs"
import path from "path"

const args = process.argv.slice(2)
if (args.length < 3) {
  console.error("Usage: node scripts/create-patch.mjs originalFile newFile out/patches/name.patch")
  process.exit(2)
}
const [orig, updated, outPatch] = args
const res = spawnSync("git", ["diff", "--no-index", "--color=never", orig, updated], {
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
