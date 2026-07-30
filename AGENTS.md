<!-- BEGIN:nextjs-agent-rules -->
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# This is NOT the Next.js you know

Next 16, App Router. Version diverge big from training data — APIs, conventions, file structure all shift. Read relevant guide in `node_modules/next/dist/docs/` (topics: `01-app/`, `02-pages/`, `03-architecture/`, `04-community/`) before writing code. Heed deprecation notices.

## Commands

- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

No test runner set up yet.

## Stack

- Next.js 16.2.12, App Router only (no `pages/`)
- React 19.2.4 (canary features enabled under App Router per Next docs)
- Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.*` — v4 config lives in `app/globals.css`)
- Brand theme (LLPW International School University) tokens defined in `app/globals.css` `:root` + `@theme inline` — use utilities like `bg-primary`, `text-primary-contrast`, `bg-accent-gold`, `border-border-red`, `bg-bg-default`, etc. instead of raw hex
- TypeScript strict mode, path alias `@/*` → repo root

## Structure

Fresh `create-next-app` scaffold — one route so far:
- `app/layout.tsx` — root layout, Geist font setup
- `app/page.tsx` — home page
- `app/globals.css` — Tailwind v4 entry + theme tokens

As routes get added, check `node_modules/next/dist/docs/01-app/` for current App Router conventions (routing, data fetching, Server Actions, caching) before assuming training-data behavior holds.
<!-- END:nextjs-agent-rules -->
