# Main Quest

**Pick your path.** Main Quest helps US students (ages 15–22) who are about to choose their next step — discover careers that fit them, reverse-engineer paths to dream jobs, and explore real options with salary and growth data.

## Features

- **Discover Me** — Share interests, strengths, and weaknesses; get matched careers (AI when configured, keyword fallback otherwise)
- **Path to a Goal** — Enter a dream job (e.g. "AI researcher"); get a step-by-step roadmap tailored to your grade level
- **Explore Careers** — Browse 30+ curated US careers with filters for salary, education, and growth
- **Session memory** — Your last Discover and Path results persist in the browser across refreshes

## Getting started

```bash
cd main-quest
pnpm install
cp .env.example .env.local   # optional — enables AI matching and roadmaps
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: AI-powered matching

Add your OpenAI key to `.env.local`:

```bash
OPENAI_API_KEY=sk-...
```

Without it, Discover and Path fall back to local keyword and template matching — the app still works.

## Deploy (Vercel)

1. Push to GitHub and import the repo in [Vercel](https://vercel.com).
2. Add `OPENAI_API_KEY` under **Project → Settings → Environment Variables**.
3. Deploy. Next.js 15 App Router works out of the box — no extra config needed.

```bash
git push origin main
# or: npx vercel --prod
```

## Tech stack

- Next.js 15 · React 19 · TypeScript · Tailwind CSS
- Vercel AI SDK + OpenAI (optional) for Discover and Path
- Curated US career data (BLS/O*NET-style salary ranges and outlook)
- Client-side session persistence via `localStorage`

## Project location

```
Documents/Projects/Projects_2026/main-quest
```

## Roadmap

- [ ] Cursor SDK integration for richer, conversational career coaching
- [ ] Save progress across devices (accounts / `Agent.resume`)
- [ ] Live BLS/O*NET API data
- [ ] Parent/counselor dashboard
