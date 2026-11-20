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

Components are organized by **category first, then framework** — e.g. `components/metric-cards/react/`.

```
├── README.md
├── AGENTS.md              # Instructions for coding agents
├── manifest.json          # Component/theme index (JSON manifest)
├── components/            # Components by category, then framework
│   ├── icons/
│   │   └── react/         # React (CSR) icons
│   ├── metric-cards/
│   │   ├── react/         # React (CSR) metric cards
│   │   ├── jinja/         # Jinja templates (SSR)
│   │   └── react-native/  # React Native metric cards
│   ├── nav-bars/          # Navigation bars (all frameworks)
│   ├── side-bars/         # Side bars (all frameworks)
│   ├── top-bars/          # Top bars (all frameworks)
│   └── maps/              # Maps (all frameworks)
├── styles/                # Tailwind config, presets, theme tokens
│   └── tailwind/
├── charts/                # ECharts option presets & wrappers
│   └── echarts/
├── mcp/                   # MCP server implementation
├── python-app/            # Example Python (Jinja/SSR) app
├── react-app/             # Example React (CSR) app
└── react-native/          # Example React Native app
```

## Using This Collection

1. **Browse components** by framework directory, or use the manifest to locate what you need.
2. **Point your agent at this repo** — see [AGENTS.md](./AGENTS.md) for the conventions agents should follow.
3. **Connect the MCP server** to let your agent pull tokens and generate a theme config for your target app automatically.

## Component Roadmap

Legend: `[x]` done · `[ ]` to build

### Existing Components

- **Button**

  - [x] React (IBM) — `components/buttons/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Input**

  - [x] React (IBM) — `components/inputs/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Text Area**

  - [x] React (IBM) — `components/inputs/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Single Select**

  - [x] React (IBM) — `components/single-select/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Multi Select**

  - [x] React (IBM) — `components/multi-select/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Single Date Picker**

  - [x] React (IBM) — `components/date-picker/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Date Range Picker**

  - [x] React (IBM) — `components/date-picker/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Form Progress**

  - [x] React (IBM) — `components/form-progress/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Metric Card**

  - [x] React (IBM) — `components/metric-cards/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Resource Card**

  - [x] React (IBM) — `components/cards/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Navbar**

  - [x] React (IBM) — `components/nav-bars/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Node Sidebar**

  - [x] React (IBM) — `components/side-bars/react/`
  - [ ] Jinja2 Template
  - [ ] React Native

- **Icons** (add, arrow-up, arrow-down, warning, kebab, menu, chevron-down, bell, brighten, help, search, panel, star, node-icons)

  - [x] React (IBM) — `components/icons/react/`
  - [ ] Jinja2 Template (macros)
  - [ ] React Native

### Planned — Typical Application Needs

Forms & Inputs

- **Textarea**

  - [*] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Checkbox**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Radio Group**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Switch / Toggle**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Slider**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **File Upload / Dropzone**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Form** (layout, labels, validation, submit)

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Combobox** (searchable select)

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

Data Display

- **Table / Data Table** (sorting, pagination, row select)

  - [ ] React (IBM)
  - [ ] Jinja2 Template (server-rendered pagination)
  - [ ] React Native

- **Badge / Tag**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Avatar** (+ group)

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Tooltip**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Popover**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Progress Bar / Spinner**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Empty State**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

Navigation & Layout

- **Top Bar** (app header with search, actions)

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Tabs**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Breadcrumb**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Pagination**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Stepper**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Menu / Dropdown**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

Feedback & Overlay

- **Modal / Dialog**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native (bottom-sheet)

- **Drawer / Side Panel**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native (drawer)

- **Toast / Notification**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Alert / Banner** (inline)

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Skeleton Loader**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

Charts (ECharts presets, framework-agnostic)

- **Line Chart**

  - [ ] Preset — `charts/echarts/`

- **Bar Chart**

  - [ ] Preset — `charts/echarts/`

- **Pie / Donut Chart**

  - [ ] Preset — `charts/echarts/`

- **Area Chart**

  - [ ] Preset — `charts/echarts/`

- **Sparkline**

  - [ ] Preset — `charts/echarts/`

Misc

- **Map** (`components/maps/` placeholder exists)

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

- **Copy to Clipboard**

  - [ ] React (IBM)
  - [ ] Jinja2 Template
  - [ ] React Native

## Contributing (Personal Workflow)

When adding a new component:

1. Implement it in the relevant framework directory (React / Jinja / Alpine / React Native).
2. Style it with Tailwind only — no inline ad-hoc CSS.
3. Register it in `manifest.json` (name, framework, path, variants, dependencies).
4. If it includes charts, add/extend an ECharts preset under `charts/echarts/`.
5. Update the MCP server catalog if the component exposes new theme tokens.
