# Portfolio 2026

A modern full-stack portfolio built with **TanStack Start**, React 19, TypeScript, Vite, and Sass Modules. Includes server functions, a contact form with Resend, and type-safe routing.

## Features

- **TanStack Start** – Full-stack React with SSR and server functions
- **TanStack Router** – Type-safe routing with dynamic project and group routes
- **React 19** with TypeScript
- **Sass Modules** for scoped styling and theme support (light/dark)
- **Contact form** – Server-side submission via [Resend](https://resend.com) with Zod validation
- **SEO** – Centralized meta and link config
- **Mobile-friendly** – Responsive layout with burger menu
- **pnpm** for fast, efficient package management

## Getting Started

### Prerequisites

Install [pnpm](https://pnpm.io):

```bash
npm install -g pnpm
```

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

App runs at **http://localhost:3000**

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## Environment Variables

For the contact form to send email, set:

| Variable           | Description                          |
|--------------------|--------------------------------------|
| `CONTACT_TO_EMAIL` | Incoming contact emails (optional)   |
| `RESEND_API_KEY`   | [Resend](https://resend.com) API key |
| `RESEND_FROM`      | Sender email (optional)              |

## Project Structure

```
src/
  routes/                          # TanStack Router
    __root.tsx                      # Root layout, nav, theme, SEO
    index.tsx                       # Home
    about/route.tsx                 # About
    contact/route.tsx               # Contact form
    projects/
      route.tsx                     # Projects list
      $projectSlug/route.tsx         # Single project
      group/$groupSlug/route.tsx     # Project group
  components/                      # Shared UI
    Nav.tsx, Button.tsx, BurgerMenu.tsx
    ThemeToggle.tsx, PageTransition.tsx
    ProjectCard.tsx, StackSection.tsx, ScrollReveal.tsx, SystemTime.tsx
  data/                            # Content & config
    profile.ts, projects.ts, stack.ts, seo.ts
  server/functions.ts              # Server functions (projects, contact)
  schemas/contact.ts                # Contact form validation (Zod)
  styles/_theme.scss                # Theme variables
  entry-client.tsx, entry-server.tsx
```

## Customization

1. **Profile & SEO** – `src/data/profile.ts`, `src/data/seo.ts`
2. **Projects** – `src/data/projects.ts`
3. **Tech stack** – `src/data/stack.ts`
4. **Navigation** – `src/routes/__root.tsx` and `src/components/Nav.tsx`
5. **Styles** – Route-level `*.module.scss`, `src/index.scss`, `src/styles/_theme.scss`
6. **Contact** – `src/schemas/contact.ts`, `src/server/functions.ts` (and env vars)

## Technologies

- [TanStack Start](https://tanstack.com/start) – Full-stack React framework
- [TanStack Router](https://tanstack.com/router) – Type-safe routing
- [React](https://react.dev) – UI library
- [TypeScript](https://www.typescriptlang.org) – Type safety
- [Vite](https://vitejs.dev) – Build tool
- [Sass](https://sass-lang.com) – CSS preprocessor
- [Resend](https://resend.com) – Transactional email (contact form)
- [Zod](https://zod.dev) – Schema validation
- [pnpm](https://pnpm.io) – Package manager
