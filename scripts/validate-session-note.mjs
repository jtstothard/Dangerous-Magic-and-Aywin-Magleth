#!/usr/bin/env node
// Validate a session note markdown file against the spec in .opencode/context/project/project-context.md
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

const root = process.cwd()
const specFile = path.join(root, ".opencode", "context", "project", "project-context.md")
if (!fs.existsSync(specFile)) {
  console.error("Project context not found")
  process.exit(2)
}
const specText = fs.readFileSync(specFile, "utf8")
// the spec file is markdown-ish; the YAML-like spec starts after 'spec:' - we'll attempt to extract the yaml block
const specIndex = specText.indexOf("spec:")
if (specIndex === -1) {
  console.error("Spec section not found in project context")
  process.exit(2)
}
const specYaml = specText.slice(specIndex)
// crude: convert keys under spec to real yaml by trimming leading 'spec:'
const yamlText = specYaml.replace(/^spec:\s*/, "")
let spec
try {
  spec = yaml.load(yamlText)
} catch (e) {
  console.error("Failed to parse spec yaml", e)
  process.exit(2)
}

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.error("Usage: node scripts/validate-session-note.mjs path/to/Notes/Session X.md")
  process.exit(2)
}
const file = path.resolve(argv[0])
if (!fs.existsSync(file)) {
  console.error("File not found:", file)
  process.exit(2)
}
const md = fs.readFileSync(file, "utf8")

// simple frontmatter parse
const fmMatch = md.match(/^---\n([\s\S]*?)\n---/)
if (!fmMatch) {
  console.error("Missing frontmatter")
  process.exit(1)
}
let fm
try {
  fm = yaml.load(fmMatch[1])
} catch (e) {
  console.error("Invalid frontmatter yaml")
  process.exit(1)
}

// check required frontmatter
const required = spec.frontmatter && spec.frontmatter.required ? spec.frontmatter.required : []
let ok = true
for (const k of required) {
  if (!(k in fm)) {
    console.error("Missing frontmatter field:", k)
    ok = false
  }
}

// check headings
for (const h of spec.required_headings || []) {
  const re = new RegExp("^##\\s+" + h.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "m")
  if (!re.test(md)) {
    console.error("Missing required heading:", h)
    ok = false
  }
}

// check forbidden terms
for (const term of (spec.voice && spec.voice.forbidden_terms) || []) {
  const re = new RegExp(term, "i")
  if (re.test(md)) {
    console.error("Forbidden term found:", term)
    ok = false
  }
}

if (!ok) process.exit(1)
console.log("Session note passes spec checks")
process.exit(0)
