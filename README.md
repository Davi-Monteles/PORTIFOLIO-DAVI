# Davi Monteles - Professional Portfolio

A bilingual portfolio for Davi Monteles, a Brazil-based junior developer focused on applied AI, automation and API integrations, with full-stack development as his technical foundation.

## Goals

The site presents authorial builds, functional prototypes, automation pilots and private internal tools with clear evidence labels. It does not invent public repositories, demos, production status, clients or metrics.

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS
- GSAP and Lenis
- Vercel SPA rewrites

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Quality checks

```bash
npm run lint
npx tsc -b
npm run build
```

## Routes

- `/` - English portfolio
- `/pt` - Brazilian Portuguese portfolio

## Project evidence policy

Every project has a visible status. Public links are displayed only when a verified destination exists.

- **Private internal tool**: no public link is shown.
- **Automation pilot**: no public link is shown unless one is verified.
- **Functional or visual prototype**: presented as a prototype, never as production software.
- **Presentation demo**: describes a demonstration, not a client deployment.

Private projects may be discussed in an interview only when disclosure is authorized. No private source code, credentials or client information belongs in this repository.

## Structure

- `src/sections` - bilingual page sections
- `src/lib/seo.ts` - route-aware metadata and Person JSON-LD
- `public` - portfolio images, video and supporting assets
- `public/cv` - current evidence-reviewed PDF resumes available from the contact section
- `vercel.json` - SPA rewrite configuration
