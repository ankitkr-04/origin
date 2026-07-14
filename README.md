# Origin

Origin is a portfolio and digital identity platform built to showcase a highly interactive, 3D-integrated web experience. It features a bespoke "Thermal" design system, seamless view transitions, and ambient React Three Fiber canvases.

## Tech stack

- **Framework:** Next.js 16 (App Router) with React 19 and React Compiler
- **Styling:** Tailwind CSS v4 and native View Transitions API
- **3D & Canvas:** React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Database:** Drizzle ORM and Neon Postgres
- **Tooling:** Biome (linting/formatting), managed via pnpm

## Quickstart

To run the application locally, you need Node.js and pnpm installed.

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

The application runs at [http://localhost:3000](http://localhost:3000).

## Commands

Use these pnpm commands for development and production tasks:

| Command | Action |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the production application |
| `pnpm start` | Serve the production application |
| `pnpm lint` | Check code with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm seed` | Seed the database |

## Documentation

Deep dives into specific features and architecture live in the `docs/` directory:

- [The Thermal Theme System](docs/theme-system.md) — How the ice/fire design language, typography phases, and interaction primitives work.
