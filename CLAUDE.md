# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

No test runner or linter is configured.

## Architecture

Single-component React app. All state and logic lives in `src/App.jsx`:

- `tasks` — array of `{ id: number, text: string, done: boolean }`, source of truth for order and content
- `filtered` — derived array (not state) computed from `tasks` + active `filter`
- `dark` — boolean persisted to `document.documentElement` as `data-theme` attribute

### Theme system
CSS variables are defined in `src/index.css` under `:root` (light) and `[data-theme="dark"]`. All component colors reference these variables — never hardcode colors in `src/App.css`.

### Drag and drop
Native HTML5 drag events on each `<li>`. The dragged index is tracked via `useRef` (not state) to avoid re-renders during drag. On drop, `reorderTasks()` maps filtered indices back to the original `tasks` array by `id`, then splices to reorder — this keeps drag working correctly under active filters.
