# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 15** single-service web app (no database, no Docker, no background workers).

### Running the app

```bash
pnpm dev          # starts dev server on port 3000
```

### Checks

| Command | What it does |
|---------|-------------|
| `pnpm lint` | ESLint via `next lint` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm build` | Full production build (also runs lint + typecheck) |

### Notes

- **No automated test suite** exists in this project (no `test` script, no test framework configured). Validation is via `lint`, `typecheck`, and `build`.
- **OpenAI API key is optional.** Without `OPENAI_API_KEY` in `.env.local`, the Discover and Path features gracefully fall back to local keyword/template matching. All features remain functional.
- **pnpm build warnings about ignored build scripts** (sharp, unrs-resolver) are cosmetic and do not affect dev or production functionality.
- The `.env.local` file is created from `.env.example` (`cp .env.example .env.local`). It only contains the optional `OPENAI_API_KEY`.
- All career data is static (in `src/data/careers.json`), no external data sources needed.
