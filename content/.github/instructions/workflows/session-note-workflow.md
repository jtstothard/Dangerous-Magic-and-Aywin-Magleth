# Session Note Ingress & Reference Update Workflow

## Overview

This workflow ensures that session notes from all players are consistently summarised, and that all relevant character, place, and other reference files are updated with cross-references to the session in which developments occurred. Refer to the [style-guide.md](../style-guide.md) for formatting and linking conventions, and use the templates in the [templates/](../templates/) folder for consistency.

## Step-by-Step Process

1. **Summarise Session**
   - Merge and summarise all raw notes into a single, structured session summary in `Notes/Session X.md`.
   - Use the session note template ([template-session-note.md](../templates/template-session-note.md)) and follow the [style-guide.md](../style-guide.md).
   - Ensure all major events, character actions, NPC interactions, and plot developments are included.
   - Cross-reference all mentioned people, places, and ongoing investigations using Obsidian wikilinks as described in the [style-guide.md](../style-guide.md).
   - When merging notes:
     - Resolve conflicts by preferring the most detailed or accurate account, or by marking uncertainties (e.g. "Player A recalls X, Player B recalls Y").
     - Remove duplicate points, but retain unique perspectives if they add value.

2. **Update Reference Files**
   - For each character (PC or NPC) who experienced a development:
     - Update their file in `People/Party/` or `People/NPCs/` using the [template-character.md](../templates/template-character.md).
     - Add a new entry under "Recent Developments" or "Role in Current Events".
     - Include a wikilink to the relevant session note (e.g. `[[Notes/Session X|Session X]]`).
   - For each place where something notable occurred:
     - Update the relevant file in `Places/` using the [template-place.md](../templates/template-place.md).
     - Add a summary of the event and a wikilink to the session note.
   - For each organisation involved in the session:
     - Update their file in `Organisations/` using the [template-organisation.md](../templates/template-organisation.md).
   - Ensure all updates are factual, concise, and strictly reference-oriented (no narrative embellishment).
   - If any update is private or secret, add `hidden: true` to the frontmatter as described in the [style-guide.md](../style-guide.md).
   - If new categories of reference are needed (e.g. items, religions, organisations), create new folders under the root (e.g. `Items/`, `Religions/`, `Organisations/`) and add a corresponding template to the [templates/](../templates/) folder.

3. **Update Main Index**
   - Add the new session note to the main index file (e.g. `index.md` or `Notes/index.md`).
   - Ensure the session is listed in chronological order with a wikilink (e.g. `[[Notes/Session X|Session X]]`).
   - If new reference files (characters, places, organisations, etc.) were created, update their respective index sections as well.
   - Maintain consistent formatting and section structure as described in the [style-guide.md](../style-guide.md).

4. **Review and Quality Check**
   - Check for:
     - Consistent naming and cross-references as outlined in the [project-structure.md](../project-structure.md).
     - Broken or missing wikilinks.
     - Required frontmatter fields in all updated files (see [style-guide.md](../style-guide.md)).
     - Factual accuracy and clarity.

5. **Pre-Session Preparation**
   - Use the [pre-session-preparation.md](pre-session-preparation.md) workflow to create a concise recap for the next session.
