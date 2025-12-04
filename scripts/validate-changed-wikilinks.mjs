#!/usr/bin/env node
import { execSync } from "child_process"
import fs from "fs"
import path from "path"

const root = process.cwd()
const contentDir = path.join(root, "content")

function run(cmd) {
  try {
    return execSync(cmd, { stdio: "pipe" }).toString().trim()
  } catch (e) {
    return null
  }
}

// determine current branch
let branch = run("git rev-parse --abbrev-ref HEAD") || "HEAD"

// try to compute changed files vs origin/branch
let diffOutput = null
if (run(`git rev-parse --verify origin/${branch}`)) {
  diffOutput = run(`git diff --name-only --diff-filter=ACMRT origin/${branch}...HEAD`)
} else {
  // fallback to last commit diff
  diffOutput = run("git diff --name-only --diff-filter=ACMRT HEAD~1..HEAD")
}

let changed = []
if (diffOutput) changed = diffOutput.split(/\r?\n/).filter(Boolean)

// filter markdown files under content/
changed = changed.filter((p) => p.startsWith("content/") && p.toLowerCase().endsWith(".md"))

if (changed.length === 0) {
  console.log("No changed markdown files under content/ to validate (skipping).")
  process.exit(0)
}

// compute unique directories relative to content
const dirs = new Set()
for (const f of changed) {
  const dir = path.dirname(f)
  const rel = path.relative("content", dir) || "."
  dirs.add(rel)
}

console.log("Validating wikilinks for changed dirs:", Array.from(dirs).join(", "))

let failed = false
for (const d of dirs) {
  const scopeArg = `--scope ${d}`
  console.log("Running validator for scope:", d)
  const res = run(`node scripts/remark-ast-wikilink-validate.js ${scopeArg}`)
  if (res === null) {
    console.error("Validator failed to run for scope", d)
    failed = true
  } else {
    console.log(res)
    if (!res.includes("No unresolved wikilinks found in scope")) failed = true
  }
}

if (failed) {
  console.error("Wikilink validation failed for changed files; aborting push.")
  process.exit(1)
}
console.log("Wikilink validation passed for changed files.")
process.exit(0)
