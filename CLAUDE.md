# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run dev` — start dev server
- `npm run build` — type-check (`tsc -b`) then bundle
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build locally

## Architecture
React 19 SPA, no backend. Entry: `src/main.tsx` → `src/App.tsx`.

## Key Technical Details

**React Compiler is enabled** (`babel-plugin-react-compiler`). This means:
- Do not manually add `useMemo`, `useCallback`, or `React.memo` — the compiler handles memoization automatically
- Avoid patterns that break the compiler's rules-of-hooks analysis (dynamic hook calls, hooks in conditions)

**TypeScript strictness flags to be aware of:**
- `noUnusedLocals` / `noUnusedParameters` — unused variables are compile errors, not just warnings
- `verbatimModuleSyntax` — type-only imports must use `import type`
- `erasableSyntaxOnly` — no TypeScript `enum`, decorators, or namespaces; use `const` objects or union types instead

**ESLint** enforces react-hooks rules and react-refresh constraints (components must be fast-refresh compatible — avoid exporting non-component values from component files).
