# Portfolio 2026

A modern web development portfolio built with TanStack Router, React, TypeScript, Vite, and Sass Modules.

## Features

- 🚀 Fast development with Vite
- 🧭 Type-safe routing with TanStack Router
- ⚛️ React 18 with TypeScript
- 🎨 Sass Modules for scoped styling
- 📦 pnpm for fast, efficient package management
- 📱 Mobile-friendly layout

## Getting Started

### Prerequisites

Make sure you have [pnpm](https://pnpm.io) installed:

```bash
npm install -g pnpm
```

### Install Dependencies

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
pnpm build
```

### Preview

Preview the production build:

```bash
pnpm preview
```

## Project Structure

```
src/
  routes/                    # TanStack Router route files
    __root.tsx               # Root layout with navigation
    __root.module.scss       # Root layout styles
    index.tsx                # Home page
    index.module.scss        # Home page styles
    about.tsx                # About page
    about.module.scss        # About page styles
    projects.tsx             # Projects showcase
    projects.module.scss     # Projects page styles
    contact.tsx              # Contact form
    contact.module.scss      # Contact page styles
  main.tsx                   # Application entry point
  index.scss                 # Global styles
```

## Customization

1. Update the content in each route file (`src/routes/*.tsx`)
2. Modify the navigation in `src/routes/__root.tsx`
3. Customize styles in Sass module files (`src/routes/*.module.scss`)
4. Update global styles in `src/index.scss`
5. Add your projects to `src/routes/projects.tsx`
6. Update social links in `src/routes/contact.tsx`

## Technologies

- [TanStack Router](https://tanstack.com/router) - Type-safe routing
- [React](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Vite](https://vitejs.dev) - Build tool
- [Sass](https://sass-lang.com) - CSS preprocessor
- [pnpm](https://pnpm.io) - Fast, disk space efficient package manager
