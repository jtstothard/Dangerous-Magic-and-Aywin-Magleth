AGENTS.md - Agent guidance for this repo

Build / Lint / Test

- Install: `npm ci` or `npm install`.
- Local CLI: `npm run quartz`.
- Docs preview: `npm run docs`.
- Typecheck + format check: `npm run check`.
- Format: `npm run format`.
- Run tests: `npm test`. Single test: `npx tsx --test path/to/test-file.ts`.

Deployment

- Deploy/sync (v4 branch): `npx quartz sync --no-pull` — syncs repo to GitHub and triggers GH Actions to rebuild the docs site.

Project purpose & workflow

- This repository stores DnD campaign documentation. Source Markdown lives in `content/` (edited in Obsidian).
- `content/.github/` contains chatmodes, templates, workflows, and a style guide used to ingest raw notes and produce Obsidian session notes.
- Primary agent task: ingest notes from multiple sources, produce Obsidian-compatible session notes, update character/place/organisation files, audit content for misalignment, and suggest improvements to Quartz styling/UX.

Content rules (extracted from `content/.github`)

- Use templates in `content/.github/instructions/templates/` for sessions, characters, places, and organisations.
- Follow `content/.github/instructions/style-guide.md` (British English, DD/MM/YYYY dates, 24h time, wikilink syntax `[[Page]]` or `[[Path|Alias]]`, tags lowercase-hyphen).
- Maintain folder layout per `content/.github/instructions/project-structure.md` (Notes/, People/, Places/, Images/, index.md).
- Processing workflow: analyze raw notes, create session note (`Notes/Session X.md`), update related references, update indices, then QA per `workflows/session-note-workflow.md`.

Authoring & formatting

- Always include frontmatter (aliases, tags, title, date created/modified).
- Headings: `#`, `##`, etc.; Capitalise first letters in headings.
- Lists: `-` for bullets, `1.` for ordered, indent sub-items by two spaces.
- Keep lines ≤80 chars, avoid trailing spaces, include blank lines around blocks.
- Narrative voice: Lyra's journal entries in first-person; avoid game-mechanics language in narrative.

Agent behaviour guidelines

- Do not invent facts not present in source raw notes; ask clarifying questions when needed.
- Search for existing files/aliases before creating new ones; prefer updating over duplication.
- When conflicts arise: stop, present the conflict, and offer concrete resolution options.
- Ensure all created/updated files use correct templates and include proper Obsidian backlinks.

Notes

- `content/.github/chatmodes/session-notes.chatmode.md` defines the specialized chat mode and must be followed for ingestion tasks.
- No `.cursor` or Copilot instruction files detected; if added, mirror their rules here.
- Agents must respect existing project scripts and avoid changing global config.

Agent checklist (pre-update)

- Search for existing files/aliases for every entity mentioned.
- Confirm template to use from `content/.github/instructions/templates/`.
- Validate frontmatter fields: `aliases`, `tags`, `title`, `date created`, `date modified`.
- Add wikilinks using full paths for organized files (e.g. `[[People/Party/Lyra Shadowflame|Lyra]]`).
- Update indices (`index.md`, regional indices) and test links locally.

Examples

- Frontmatter example:
  ```yaml
  ---
  aliases: ["Lyra Shadowflame"]
  tags: [session, investigation]
  title: "Session 13 🕵️ Cathedral Corruption"
  date created: 14/07/2025
  date modified: 14/07/2025
  ---
  ```
- Template usage: use `content/.github/instructions/templates/template-session-note.md` for new session notes.
- Quick wikilink example: `[[People/NPCs/Aeremore/Cathedral/Sister Magdala|Sister Magdala]]`.
