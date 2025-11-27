# Style Guide

This style guide ensures consistency across all notes, templates, and workflows in the project. Follow these guidelines when creating or editing files.

---

## General Formatting Rules

- **Headings:**
  - Use `#` for top-level headings, `##` for second-level, and so on.
  - Capitalise the first letter of each word in headings (e.g., `## Recent Developments`).

- **Lists:**
  - Use `-` for unordered lists and `1.` for ordered lists.
  - Indent sub-items with two spaces.

- **Line Breaks:**
  - Add a blank line between paragraphs, headings, and list items for readability.

- **Emphasis:**
  - Use `*` or `_` for italics and `**` for bold text.
  - Avoid overusing emphasis for clarity.

---

## Obsidian-Specific Conventions

- **Wikilinks:**
  - Use `[[Page Name]]` for internal links.
  - For aliases, use `[[Page Name|Alias]]` (e.g., `[[Session 4|Moons and Mayhem]]`).

- **Tags:**
  - Add relevant tags in the frontmatter (e.g., `tags: [session, investigation]`).
  - Use lowercase and hyphen-separated tags (e.g., `#character-development`).

- **Frontmatter:**
  - Always include frontmatter at the top of the file.
  - Example:

    ```yaml
    ---
    aliases: []
    tags: []
    title: Example Title
    date created: YYYY-MM-DD
    date modified: YYYY-MM-DD
    ---
    ```

- **Backlinks:**
  - Ensure all references to other notes are linked using Obsidian's wikilink syntax.
  - Always reference other notes when mentioned, even in passing.
  - When referencing people, use their first name where possible (e.g., `[[Jay]]`).
  - If a note's title is not the person's first name, use an alias in the wikilink (e.g., `[[Jay Smith|Jay]]`).
  - Cross-reference session notes in character, place, and other reference files.

---

## Best Practices

- **Clarity and Brevity:**
  - Write concise, factual notes. Avoid unnecessary narrative or embellishment.
  - Use bullet points for summaries and lists.

- **Consistency:**
  - Follow the templates provided in the `templates/` folder.
  - Use consistent naming conventions for files and folders.

- **Updates:**
  - When editing a file, ensure all related files are updated (e.g., cross-references, aliases).

---

## mdlint Rules

- **Heading Levels:**
  - Do not skip heading levels (e.g., `##` should not follow `#` directly).

- **Line Length:**
  - Keep lines under 80 characters where possible.

- **Trailing Spaces:**
  - Avoid trailing spaces at the end of lines.

- **Blank Lines:**
  - Ensure a blank line exists before and after headings, lists, and code blocks.

---

## British Locale Guidelines

- **Spelling:**
  - Use British English spelling (e.g., "colour" instead of "color," "organise" instead of "organize").
  - Refer to a British English dictionary if unsure about specific words.

- **Apostrophes and Quotation Marks:**
  - Always use the straight apostrophe `'` (U+0027) and straight single quote `'` for all apostrophes and single quotation marks.
  - Avoid using the curly right single quotation mark `’` (U+2019) or curly quotes in any context.

- **Dates:**
  - Format dates as `DD/MM/YYYY` (e.g., `14/07/2025`).
  - Avoid using American-style date formats (e.g., `MM/DD/YYYY`).

- **Time:**
  - Use the 24-hour clock format (e.g., `14:00` instead of `2:00 PM`).

- **Punctuation:**
  - Use single quotation marks for quotes (e.g., 'This is a quote').
  - Place punctuation inside quotation marks only if it is part of the quoted material.

- **Units of Measurement:**
  - Use metric units (e.g., kilometres, metres, kilograms) unless the context specifically requires imperial units.

- **Currency:**
  - Use the pound sterling symbol (£) for monetary values where applicable.

- **Terminology:**
  - Use British terminology where differences exist (e.g., "lorry" instead of "truck," "flat" instead of "apartment").

---

## Punctuation Guidelines

- **Hyphens and Dashes:**
  - Avoid using hyphens (-) or em dashes (—) for punctuation or to separate clauses.
  - Use commas, colons, or parentheses instead, as appropriate for clarity.
  - Only use hyphens for compound words where grammatically required (e.g., "well-known").
  - Do not use em dashes for parenthetical statements; use parentheses or commas.

- **Ellipses:**
  - Avoid using ellipses (...) in formal notes and documentation.
  - Use complete sentences and proper punctuation instead.
  - If indicating a pause or trailing thought, restructure the sentence for clarity.

- **Semicolons:**
  - Avoid using semicolons (;) where possible.
  - Prefer splitting sentences or using commas instead.

- **Quotation Marks:**
  - Use parentheses for explanatory material: "The institute (a research facility) was heavily guarded."
  - Use colons to introduce explanations or lists: "The results were clear: the experiment had failed."

---

## Capitalisation Rules

- **Proper Nouns:**
  - Always capitalise proper nouns, including names, places, organisations, and titles.
  - In D&D contexts, capitalise spells, magical items, creature types, and other game-specific terms when they function as proper nouns (e.g., "Eldritch Blast", "Web", "Healing Word").
  - Capitalise character classes when referring to specific individuals (e.g., "the Wizard cast a spell" but "wizards are common").
  - Capitalise deity names, plane names, and other cosmic entities.

- **Titles:**
  - Capitalise formal titles when used before names (e.g., "Archbishop Saevel").
  - Do not capitalise titles when used generically (e.g., "the archbishop said").

---

## Narrative Voice and Immersion

- **Journal Entries:**
  - Write journal entries from the first-person perspective of the character (typically Lyra).
  - Avoid breaking immersion with game mechanics terminology.
  - Use narrative descriptions instead of mechanical terms:
    - Instead of "critical hit," use "devastating strike," "perfectly aimed blow," or "strike that found its mark with terrible precision."
    - Instead of "saving throw," use "managed to resist," "shook off the effect," or "proved resilient."
    - Instead of "spell slots," use "magical energy," "remaining power," or "mystical reserves."
  - Maintain character voice and perspective consistently throughout the entry.

- **Third-Person References:**
  - When writing from a character's perspective, avoid referring to that character in the third person.
  - Instead of "Lyra cast Web," write "I cast Web" or "I wove magical strands."
  - Other party members should be referred to by name or relationship (e.g., "Robin," "my companion").

---

## Punctuation and Dashes

- **Hyphens and Dashes:**
  - Avoid using hyphens (-) or em dashes (—) for punctuation or to separate clauses.
  - Use commas or colons instead, as appropriate for clarity.
  - Only use hyphens for compound words where grammatically required (e.g., "well-known").
  - Do not use em dashes for parenthetical statements; use parentheses or commas.

- **Semicolons:**
  - Avoid using semicolons (;) where possible.
  - Prefer splitting sentences or using commas instead.
