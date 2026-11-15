# UI/UX Collections

A personal, curated component library designed to help you build apps faster — and to give coding agents a single source of truth to reference for existing designs, patterns, and theme configuration.

## What This Is

A living collection of reusable UI components and design patterns covering the major rendering strategies and platforms:

| Stack | Purpose |
| --- | --- |
| **React** | Client-side rendered (CSR) applications |
| **Jinja** | Server-side rendered (SSR) applications |
| **Alpine.js** | Lightweight, non-React interactive components |
| **React Native** | Mobile components |

## Styling & Charts

- **CSS:** [Tailwind CSS](https://tailwindcss.com/) — all components are styled with Tailwind utility classes.
- **Graphs/Charts:** [Apache ECharts](https://echarts.apache.org/) for data visualization.

## Theme Configuration

- **`manifest.json`** — a JSON manifest indexing every component, its variants, framework targets, and tokens.
- **MCP Server** — a Model Context Protocol server that lets your coding agent (opencode, Claude Code, Cursor, etc.) query the collection, resolve design tokens, and generate a theme configuration specific to your project.

## Repository Structure

```
├── README.md
├── AGENTS.md              # Instructions for coding agents
├── manifest.json          # Component/theme index (JSON manifest)
├── components/
│   ├── react/             # React (CSR) components
│   ├── jinja/             # Jinja templates (SSR)
│   ├── alpine/            # Alpine.js components
│   └── react-native/      # React Native components
├── styles/
│   └── tailwind/          # Tailwind config, presets, plugin/theme tokens
├── charts/
│   └── echarts/           # ECharts option presets & wrappers
└── mcp/                   # MCP server implementation
```

## Using This Collection

1. **Browse components** by framework directory, or use the manifest to locate what you need.
2. **Point your agent at this repo** — see [AGENTS.md](./AGENTS.md) for the conventions agents should follow.
3. **Connect the MCP server** to let your agent pull tokens and generate a theme config for your target app automatically.

## Contributing (Personal Workflow)

When adding a new component:

1. Implement it in the relevant framework directory (React / Jinja / Alpine / React Native).
2. Style it with Tailwind only — no inline ad-hoc CSS.
3. Register it in `manifest.json` (name, framework, path, variants, dependencies).
4. If it includes charts, add/extend an ECharts preset under `charts/echarts/`.
5. Update the MCP server catalog if the component exposes new theme tokens.
