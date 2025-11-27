# Project Structure

This document describes the standard folder and file organisation for the campaign wiki, ensuring consistency and ease of navigation for all contributors.

## Top-Level Folders

- `Notes/` — Session summaries, numbered sequentially (e.g. Session 0, 1, 2, ...)
- `People/` — Character information, subdivided into:
  - `Party/` — Player characters
  - `NPCs/` — Non-player characters, organised by location
  - `Deities/` — Gods and religious figures
- `Places/` — Geographic hierarchy from continents down to specific buildings
- `Images/` — Support images and campaign art
- `index.md` — Main campaign index
- (Add new folders for items, organisations, religions, etc. as needed)

## Naming Conventions

- Use clear, descriptive folder and file names
- Use singular for entity types (e.g. `Person`, `Place`) and plural for collections (e.g. `People`, `Places`)
- Avoid spaces in file/folder names where possible; use capitalisation for readability

## File Placement

- Session notes go in `Notes/`
- Character files go in the appropriate subfolder of `People/`
- Place files are nested according to the world hierarchy in `Places/`
- Images are stored in `Images/` and referenced via wikilinks

## Cross-Referencing

- Use Obsidian wikilinks for all internal references
- When linking to an `index.md`, always use an alias with the full path and a meaningful label
- Keep bidirectional links between related files (e.g. session notes and character/place files)

## Extensibility

- When new content types are needed (e.g. items, organisations), create a new top-level folder and add a template in `instructions/templates/`
