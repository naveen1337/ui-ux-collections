# AGENTS.md

Instructions for coding agents working with this repository. This is a personal UI/UX component collection used as a design reference when building applications faster.

## Purpose

This repo is a **reference library**, not a standalone application. Agents should use it to:

- Find existing, approved component implementations before writing new UI.
- Reuse established design tokens, spacing, colors, and Tailwind conventions.
- Generate theme configuration for target projects via the JSON manifest and MCP server.

## Stack Map

| Framework | Location | Use When |
| --- | --- | --- |
| React (CSR) | `components/react/` | Client-side rendered React apps |
| Jinja | `components/jinja/` | Server-side rendered apps |
| Alpine.js | `components/alpine/` | Non-React lightweight interactivity |
| React Native | `components/react-native/` | Mobile apps |
| Tailwind | `styles/tailwind/` | All CSS styling (all frameworks) |
| Apache ECharts | `charts/echarts/` | All charts and data visualization |
| Manifest | `manifest.json` | Component/theme index — read this first |
| MCP Server | `mcp/` | Serves collection + theme config to agents |

## Core Rules

1. **Read `manifest.json` before creating anything.** Always check whether a component, pattern, or token already exists. Prefer reuse over reinvention.
2. **Match the target framework.** A React app gets React components; a Jinja app gets Jinja templates; non-React gets Alpine.js. Never cross-port components unless asked.
3. **Tailwind only for styling.** Do not write custom CSS, CSS-in-JS, or inline styles. Use existing Tailwind classes and theme tokens from `styles/tailwind/`. If a new token is needed, add it to the Tailwind config, not inline.
4. **Charts use Apache ECharts.** Never introduce other chart libraries. Reuse option presets in `charts/echarts/` and only override what's necessary.
5. **No design drift.** Copy components as-is when reusing them; do not silently alter spacing, colors, radii, or typography. If a design change is needed, update the component here first, then propagate.
6. **Register everything.** Any new or modified component must be reflected in `manifest.json`.
7. **Theme generation flows through the MCP server.** When asked to produce a theme config for a project, query the manifest/MCP server for tokens rather than guessing values.

## Component Conventions

- **React:** Functional components with hooks. Named exports. Props typed with TypeScript or PropTypes consistent with the existing file.
- **Jinja:** Use macros/includes for reusable blocks. Keep templates framework-agnostic (no framework-specific attributes leaking in).
- **Alpine.js:** Small `x-data` scoped components. Prefer declarative `x-*` attributes over imperative JS. One component per file where practical.
- **React Native:** Mirror the closest web counterpart from `components/react/` so naming and props stay consistent across platforms.
- **Naming:** Component names must be identical across frameworks where an equivalent exists (e.g. `button` in React, Jinja, Alpine, and React Native).

## Manifest Schema (expected)

```json
{
  "name": "...",
  "framework": "react | jinja | alpine | react-native",
  "path": "components/<framework>/...",
  "variants": ["default", "..."],
  "tokens": ["color.primary", "..."],
  "dependencies": ["..."]
}
```

## When Building a New App

1. Query the manifest (or MCP server) for available components and tokens.
2. Select the framework directory matching the target app's rendering model.
3. Copy/reference components verbatim; adapt only imports and props wiring.
4. Generate the theme configuration from the collection's tokens — do not invent new colors or spacing values.
5. If something is genuinely missing, add it here first, register it in the manifest, then use it.
