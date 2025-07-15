# 🧭 GitHub Copilot Instructions

## 🗺️ Project Overview

This repository contains a comprehensive set of notes and resources for the "Dangerous Magic and Aywin Magleth" Dungeons & Dragons campaign. As a player in this campaign, I use this project to document the world, characters, locations, plot points, and other key details in a structured and accessible way — effectively functioning as a living campaign wiki.

### Primary Objectives
- **Session Documentation**: Maintain detailed records of each game session, including character actions, plot developments, and mechanical outcomes
- **World Building**: Create a comprehensive reference for the campaign setting, including geography, politics, and cultural elements
- **Character Tracking**: Document both player characters and NPCs with their relationships, motivations, and story arcs
- **Investigation Support**: Systematically track evidence, mysteries, and ongoing plot threads to support in-game problem solving
- **Collaborative Reference**: Provide a shared knowledge base for all players to reference between sessions

## 📚 Tools in Use
- **Obsidian** is used for all note-taking and writing.
- **Quartz 4** is used to publish the notes as a personal campaign wiki.

## 🏗️ Project Architecture

### Hierarchical Content Structure
The project follows a strict hierarchical organisation pattern:
- **`Notes/`** - Session summaries (numbered sequentially: Session 0, 0.5, 1, 2, etc.)
- **`People/`** - Character information categorised by type:
  - `Party/` - Player characters with detailed backgrounds and investigation notes
  - `NPCs/` - Non-player characters organised by location (e.g., `Cerbereburn/`)
  - `Deities/` - Gods and religious figures
- **`Places/`** - Geographic hierarchy from continents down to specific buildings:
  - `Continents/Jealeon/Regions/Aswesh/Towns/Cerbereburn/Buildings/`
- **`Images/` and `index.md`** - Support files and main campaign index

### Cross-Referencing System
The project uses extensive wikilink cross-referencing to create a living knowledge web:
- Character sheets reference locations they've visited
- Location pages list key NPCs and relevant events
- Session notes link to all mentioned people and places
- Investigation notes connect evidence across multiple files

### Frontmatter Conventions
- **`aliases:`** - Alternative names for entities (e.g., "Lyra" for "Lyra Shadowflame")
- **`pronouns:`** - Character pronouns in format like "she/her", "he/him", "they/them"
- **`title:`** - Display title when different from filename
- **`hidden: true`** - Marks private content not for sharing

## 🔒 Content Access
There are two types of content in this project:
1. **Public Campaign Notes** – These are shared with the whole party and help us all reference shared knowledge about the game.
2. **Private Files** – These are only accessible to me and the DM. They include:
   - My character's backstory
   - Personal decisions or secrets
   - Private conversations with the DM

Any file intended to remain private will contain `hidden: true` in its frontmatter. These files must not be surfaced or referenced in public-facing notes or suggestions.

## ✍️ Writing Guidelines for Copilot

### Language & Style
- Use **British English** (`en-GB`) for all spelling and phrasing (e.g. "armour", "organise", "travelling").
- Avoid or minimise the use of hyphens unless absolutely necessary. Prefer natural breaks or rewordings (e.g. use "note taking" instead of "note-taking").
- Keep a clear, descriptive tone suitable for in-universe campaign documentation.
- Write in present tense when describing current game state, past tense when recounting events.

### Content Accuracy
- Do **not** embellish, invent, or add flavour to any content. Only summarise or reformat content that I have explicitly written or provided.
- When creating character descriptions, stick strictly to information provided in session notes or explicitly stated facts.
- If information is uncertain or speculative, clearly mark it as such (e.g. "appears to be", "seems likely").

### Character & Location References
- People and places should be referred to by their full names or titles on first mention, with aliases used thereafter.
- Use consistent naming conventions throughout all files.
- When referencing events, always link to the relevant session note where it occurred.

### Character File Requirements
- People files should include a **pronouns** field in the frontmatter, using the format `pronouns: she/her`, `he/him`, or `they/them` as appropriate.
- Include physical descriptions and key relationships in a consistent format.
- For party members, track character development and significant in-game moments.

## 🔗 Linking & Formatting Conventions

### Internal Linking
- Use **Obsidian-compatible Markdown** throughout all files.
- Prefer `[[wikilinks]]` for internal links over standard Markdown links.
- When linking to a file named `index.md`, always use an **alias** with the full path to the file and a meaningful label.  
  Example: `[[Places/Continents/Jealeon/Regions/Aswesh/Towns/Cerbereburn/index|Cerbereburn]]`
- Use pipe notation for aliases when the link text should differ from the file name.

### File Headers & Titles
- Do not include a first-level heading (`#`) at the top of any file that simply restates or embellishes the filename.  
  For example, a file named `Neverwinter.md` should **not** contain:  
  `# Neverwinter` or `# Neverwinter, home of the brave`  
- Instead, use the frontmatter field `title:` to define the display title:  
  ```yaml
  ---
  title: Neverwinter, home of the brave
  ---
  ```
- Use consistent heading hierarchy: `##` for major sections, `###` for subsections.

### Frontmatter Standards
- **`aliases:`** - Alternative names for entities (e.g. "Lyra" for "Lyra Shadowflame")
- **`pronouns:`** - Character pronouns in format like "she/her", "he/him", "they/them"
- **`title:`** - Display title when different from filename
- **`hidden: true`** - Marks private content not for sharing
- Use consistent YAML formatting with proper indentation and list notation.

## 📝 Content Patterns & Templates

### Character Files

#### Party Characters
- **Frontmatter**: Include `aliases` and any relevant metadata
- **Basic Information**: Pronouns, species, physical description, and key relationships
- **Character Overview**: Class, personality traits, and notable equipment/companions
- **Background**: Origins, goals, and connections to other characters
- **Recent Developments**: Track character growth, new abilities, and significant story moments
- **Investigation Notes**: For characters actively involved in ongoing mysteries

#### NPCs (Non-Player Characters)
- **Frontmatter**: Include `aliases` and `pronouns` fields
- **Introduction**: Brief description with role in the community
- **Key Characteristics**: Personality traits, motivations, and notable behaviours
- **Relationships**: Connections to other NPCs and party members
- **Role in Current Events**: Involvement in ongoing plots or investigations
- **Current Status**: Where they stand in the story

#### Deities
- **Domains and Influence**: Areas of divine power and worship
- **Followers**: Notable worshippers among party and NPCs
- **Manifestations**: How they appear or act in the world

### Location Files

#### Towns and Cities
- **Summary**: Brief description and current status
- **Notable Locations**: Subsection linking to important buildings or areas
- **Key Figures**: Table format with Name, Residence, and Role/Notes columns
- **Current Events**: Ongoing conflicts, investigations, or significant happenings
- **Resources**: Available services, shops, or important features

#### Buildings and Specific Locations
- **Purpose**: Primary function and who operates it
- **Description**: Physical layout and notable features
- **Occupants**: Who lives or works there
- **Story Relevance**: Connection to ongoing plots or past events

#### Geographic Areas (Regions, Continents)
- **Overview**: General characteristics and significance
- **Subdivisions**: Links to constituent areas
- **Notable Features**: Important landmarks or characteristics
- **Political/Social Structure**: Governing bodies or cultural notes

### Session Notes

#### Structure and Format
- **Title Format**: Use emoji and descriptive titles (e.g. "🌙 Session X: Descriptive Title")
- **Major Sections**: Organise by significant events, locations visited, or investigation threads
- **Character Actions**: Document important decisions, spell usage, and mechanical outcomes
- **NPC Interactions**: Record dialogue, relationship changes, and new information learned
- **Plot Advancement**: Note new mysteries discovered or existing ones resolved

#### Documentation Standards
- **Evidence Tracking**: Systematically record physical evidence and witness statements
- **Cross-References**: Link to all relevant NPCs, locations, and previous sessions
- **Unresolved Elements**: Clearly mark ongoing mysteries and future investigation leads
- **Mechanical Details**: Include important dice rolls, spell effects, and rule interpretations

### Investigation and Plot Tracking

#### Evidence Documentation
- **Physical Evidence**: Detailed descriptions with location found and current custody
- **Witness Statements**: Record who said what, when, and any inconsistencies
- **Timeline Construction**: Establish sequence of events based on gathered information
- **Suspect Tracking**: Maintain lists of persons of interest with evidence for and against

#### Cross-File Coordination
- **Consistent Updates**: When new information emerges, update all relevant character and location files
- **Reference Networks**: Ensure bidirectional linking between related events and people
- **Theory Development**: Track evolving understanding of mysteries across multiple sessions

## 🔍 Quality Assurance Guidelines

### Consistency Checks
- **Name Consistency**: Ensure character and location names match across all files
- **Timeline Accuracy**: Verify that events are consistently dated and sequenced
- **Cross-Reference Validation**: Check that all wikilinks point to existing files
- **Frontmatter Completeness**: Ensure required fields are present in all appropriate files

### Content Review Standards
- **Factual Accuracy**: All information should trace back to actual session content
- **Clarity**: Descriptions should be clear to players who may have missed sessions
- **Completeness**: Important plot points and character developments should be documented
- **Organisation**: Information should be easy to find through logical file structure and linking

### Maintenance Protocols
- **Regular Updates**: Session notes should be created promptly after each game
- **Retroactive Corrections**: When new information contradicts previous understanding, update historical records with clear notation
- **Archive Management**: Keep outdated or incorrect information marked rather than deleted
- **Link Maintenance**: Regularly verify that internal links remain functional as files are moved or renamed
