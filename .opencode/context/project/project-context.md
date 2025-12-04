# Project Context - Dangerous Magic & Aywin Magleth

version: 1

# Core spec (derived from templates and style guide)

spec:
frontmatter:
required: - aliases - tags - title - date created - date modified
formats:
date: DD/MM/YYYY
time: 24-hour
tags: lowercase-hyphen
required_headings: - Journal Entry - Major Events - Key NPC Interactions - Character Actions & Developments - Ongoing Mysteries & Leads - Mechanical Details - Navigation

# Narrative & voice rules

voice:
primary_character: "Lyra Shadowflame"
journal_style: "first-person, immersive, introspective"
forbidden_terms: - "critical hit" - "saving throw" - "spell slot" - "spell slots" - "HP" - "AC"
tone_guidance: |
Use narrative descriptions in place of mechanical jargon (e.g. "devastating strike" instead of "critical hit").

# Wikilink rules (Obsidian-style)

wikilinks:
preferred: "full paths for organized files (e.g. [[People/Party/Lyra Shadowflame|Lyra]])"
resolution: - try: "content/<path>.md" - try: "content/<path>/index.md"
alias_syntax: "[[Page Path|Display Name]]"

# File structure and naming conventions

file_structure:
top_level: - Notes/ - People/ - Places/ - Organisations/ - Images/
naming: - use_descriptive_names: true - use_capitalised_words_for_readability: true - spaces_allowed: true - prefer_singular_for_entities: true

# Placeholders to ignore during validation

placeholders:

- "Session X"
- "Page Name"
- "Example NPC"
- "Example PC"
- "Another NPC"
- "Notes/Session X"

# Approval policy

approval:
create_new_files: require_human_approval
create_new_top_level_folder: require_human_approval
major_rewrites: require_human_approval
small_fact_edits: auto_apply_if_QA_passes

# QA thresholds

qa:
max_broken_wikilinks: 0
max_missing_frontmatter_fields: 0
max_forbidden_term_occurrences: 0

# Agent runtime conventions

runtime:
default_mode: dry-run
patches_dir: out/patches
logs_dir: out/logs
context_version_field: context_version

# Examples (use these formats when generating content)

examples:
frontmatter: |
---
aliases: ["Lyra Shadowflame"]
tags: [session, investigation]
title: "Session 13 🕵️ Cathedral Corruption"
date created: 14/07/2025
date modified: 14/07/2025
---

wikilink: "[[People/NPCs/Aeremore/Cathedral/Sister Magdala|Sister Magdala]]"

notes:

- "Agents must record `context_version: 1` in execution logs."
- "Templates in content/.github/instructions/templates/ will be archived once the spec is fully captured here."
