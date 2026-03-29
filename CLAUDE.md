# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A birthday gift website for April — a collection of personalized puzzle games styled like "The New York Times Games" section. Each puzzle is created by a different friend with a personal birthday message revealed on completion. Deployed on Vercel.

## Commands

- `npm run dev` — Start Vite dev server (port 5173)
- `npm run build` — Production build to `dist/`
- `npm run lint` — ESLint
- `npm run preview` — Preview production build

## Tech Stack

React 19 + React Router v7 + Tailwind CSS v4 + Vite 8. No TypeScript — pure JSX. No test framework.

## Architecture

**Routing pattern:** Each puzzle type has three files following a consistent pattern:
- `src/data/<puzzle>.js` — Puzzle data array (answers, creators, messages)
- `src/pages/<Puzzle>.jsx` — Lobby page (uses `PuzzleLobby` component to list puzzles by creator)
- `src/pages/<PuzzleGame>.jsx` — Game page (accessed via `/:index` route param)

**Six puzzle types:** Wordle, Connections, Crossword, WordSearch, CrypticClue, Make24

**Shared components:**
- `Layout.jsx` — Full page shell (header with NYT-style masthead, nav, footer)
- `PuzzleLobby.jsx` — Reusable lobby listing puzzles by creator name
- `WinMessage.jsx` — Displays the creator's personal birthday message after winning

**Styling:** Tailwind utility classes inline. Custom CSS classes in `index.css` for the NYT masthead font (UnifrakturMaguntia), Playfair Display headings, and card animations.

## Adding a New Puzzle

Add an entry to the appropriate `src/data/*.js` file. Each data file has a comment header documenting the expected shape. The lobby pages auto-render from the data arrays — no route changes needed.

Some puzzle types (Crossword, WordSearch) support external URLs (`url` field) instead of inline data. Cryptic clues support multi-part puzzles via `isMultiPart: true` with a `parts` array and `megaAnswer`.

## Key Conventions

- All game state is local React state (useState) — no persistence or backend
- Answers are stored in plain JS data files (not hidden from client)
- The `vercel.json` has a catch-all rewrite for client-side routing
