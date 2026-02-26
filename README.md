# Portfolio 2026

A modern full-stack portfolio built with **TanStack Start**, React 19, TypeScript, Vite, and Sass Modules.

The project includes locale-prefixed routing (`/en`, `/es`, `/de`), translated UI/content, localized SEO metadata (`hreflang` + canonical), a contact form powered by Resend, and type-safe routing/server functions.

## Features

- **TanStack Start** full-stack app (SSR + server functions)
- **TanStack Router** file-based, type-safe routing
- **Internationalization (i18n)** with locale-prefixed URLs:
  - `/$locale` routes: `/en`, `/es`, `/de`
  - localized UI dictionaries (`src/i18n/messages/*`)
  - localized profile/projects/groups data mappings
  - legacy non-prefixed routes redirect to default locale
- **Localized SEO**:
  - locale-aware meta title/description/`og:locale`
  - canonical URLs + alternate `hreflang` links (`en`, `es`, `de`, `x-default`)
- **Responsive navigation** with mobile burger menu
- **Language switcher** (flag-based dropdown)
- **Theme toggle** (light/dark)
- **Contact form** with server-side submission via [Resend](https://resend.com) + Zod validation
- **Sass Modules** + shared theme tokens

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- [pnpm](https://pnpm.io) (recommended)

Install pnpm globally if needed:

```bash
npm install -g pnpm
```

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Runs on **http://localhost:3000** (configured in `vite.config.ts`).

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## Environment Variables

Create `.env` / `.env.production` as needed.

| Variable           | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `VITE_CDN_URL`     | CDN base URL for resume/images (required in production)                    |
| `VITE_SITE_URL`    | Public site URL used for canonical/share URLs                              |
| `CONTACT_TO_EMAIL` | Destination inbox for contact form (optional, defaults to `job@azaelac.dev`) |
| `RESEND_API_KEY`   | [Resend](https://resend.com) API key for contact form sending              |
| `RESEND_FROM`      | Sender address for Resend (optional)                                       |

## Project Structure

```text
src/
  routes/
    __root.tsx                          # Root shell, nav, footer, global head
    index.tsx                           # Redirect "/" -> "/en"
    $locale/
      route.tsx                         # Locale validation/redirect guard
      index.tsx                         # Localized home
      about/route.tsx                   # Localized about
      contact/route.tsx                 # Localized contact
      projects/
        route.tsx                       # Localized projects list
        $projectSlug/route.tsx          # Localized single project detail
        group/$groupSlug/route.tsx      # Localized group detail
    about/route.tsx                     # Legacy redirect -> default locale
    contact/route.tsx                   # Legacy redirect -> default locale
    projects/                           # Legacy redirects for old URLs
  i18n/
    locales.ts                          # Supported locales + guards
    index.ts                            # i18n helpers
    useLocale.ts                        # Locale/path hooks
    useMessages.ts                      # Dictionary hook
    messages/
      en.ts
      es.ts
      de.ts
  components/
    ProjectCard.tsx                     # Card component (component-only export)
    projectCardItems.ts                 # Card item mappers/types
    LanguageSwitcher.tsx
    ThemeToggle.tsx
    Nav.tsx
    BurgerMenu.tsx
    ScrollReveal.tsx
    StackSection.tsx
    Button.tsx
  data/
    profile.ts                          # Base + localized profile access
    projects.ts                         # Source project/group data
    projects.i18n.ts                    # Localized project/group/item mappings
    seo.ts                              # Locale-aware SEO builder
    stack.ts
  server/functions.ts                   # Server functions (projects, contact)
  schemas/contact.ts                    # Contact schema factory + defaults
```

## i18n Notes

- Supported locales live in `src/i18n/locales.ts`.
- Route params are normalized with `normalizeLocale(...)` before calling locale-strict functions.
- Content fallback strategy:
  - use localized fields when available
  - fallback to English/base content when missing
- Project and group achievements are also localized through `src/data/projects.i18n.ts`.

## Customization

1. **Translations/UI copy**: `src/i18n/messages/en.ts`, `es.ts`, `de.ts`
2. **Profile content**: `src/data/profile.ts`
3. **Projects and groups**:
   - source: `src/data/projects.ts`
   - localized mappings: `src/data/projects.i18n.ts`
4. **SEO**: `src/data/seo.ts`
5. **Navigation/layout**: `src/routes/__root.tsx`, `src/components/Nav.tsx`, `src/components/LanguageSwitcher.tsx`
6. **Styles**: route `*.module.scss`, `src/index.scss`, `src/styles/_theme.scss`
7. **Contact form**: `src/routes/$locale/contact/route.tsx`, `src/schemas/contact.ts`, `src/server/functions.ts`

## Technologies

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Sass](https://sass-lang.com)
- [Resend](https://resend.com)
- [Zod](https://zod.dev)
- [pnpm](https://pnpm.io)
