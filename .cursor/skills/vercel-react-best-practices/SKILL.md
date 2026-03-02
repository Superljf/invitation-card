---
name: vercel-react-best-practices
description: Enforce Vercel and Next.js App Router best practices. Use when building or reviewing Next.js apps, App Router, Server Components, or when the user asks for Vercel/Next.js best practices.
---

# Vercel React Best Practices

## Architecture
- Prefer Next.js App Router
- Prefer Server Components over Client Components
- Only use "use client" when necessary

## Data Fetching
- Use async Server Components for fetching
- Avoid useEffect for initial data load
- Use fetch with proper cache strategy:
  - cache: 'no-store' for dynamic
  - next: { revalidate: X } for ISR

## Performance
- Avoid unnecessary re-renders
- Use React.memo when appropriate
- Avoid prop drilling
- Split large components

## TypeScript
- Use strict typing
- Avoid any
- Define clear interfaces

## Code Style
- Prefer functional components
- Keep components small and focused
- Separate UI and data logic