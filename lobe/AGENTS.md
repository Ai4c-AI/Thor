# Repository Guidelines

## Project Structure & Module Organization
Thor is a Vite-powered React app written in TypeScript. Core UI and logic live in src/, with feature folders such as components/ for reusable UI, pages/ for routed views, and services//store/ for API clients and Zustand state. Shared helpers sit in utils/ and lib/. Tailwind and global styles reside in styles/, while language files are under i18n/. Static assets belong in public/; built bundles are emitted to dist/.

## Build, Test, and Development Commands
Install dependencies with 
pm install (Node 18 recommended). Use 
pm run dev to start the Vite dev server and enable fast refresh. 
pm run build creates a production bundle; prefer 
pm run build:check before merging because it runs 	sc then ite build to catch type issues. 
pm run preview serves the latest build locally. Lint the project with 
pm run lint to enforce TypeScript and React rules.

## Coding Style & Naming Conventions
Follow TypeScript strictness and keep files in ES module format. Name React components and Zustand stores in PascalCase (e.g., ChatPanel.tsx), hooks in camelCase prefixed with use, and utility helpers in camelCase. Prefer functional components with explicit prop interfaces. Tailwind 4 is the primary styling layer¡ªco-locate component-level styles via class utilities and put shared design tokens in styles/. Run 
pm run lint before committing; resolve warnings instead of suppressing them. Keep imports sorted logically: React, third-party, internal modules.

## Testing Guidelines
Automated tests are not yet configured. Before opening a pull request, run 
pm run lint, verify 
pm run build:check, and smoke-test the key flows affected (chat sessions, workspace management, localization). When adding tests, place them adjacent to the feature directory (e.g., pages/chat/__tests__/ChatPage.spec.tsx) and name files with the .spec.tsx suffix for clarity.

## Commit & Pull Request Guidelines
Use Conventional Commit prefixes observed in history (eat, efactor, ix, etc.) to describe scope succinctly. Each commit should focus on one logical change. Pull requests must summarize the change, list testing done (commands or scenarios), and link related issues. Include screenshots or GIFs for UI updates. Ensure .env.example covers any new configuration and document setup adjustments in the PR description.

## Configuration & Secrets
Duplicate environment samples via cp .env.example .env (macOS/Linux) or Copy-Item .env.example .env on PowerShell, then fill service keys. Never commit secrets. For new external integrations, document required variables in README.md and update components.json if UI schemas change.
