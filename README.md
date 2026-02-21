# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Linting conventions

- Linting is intentionally scoped to application source files in `src/**/*.{js,jsx}` plus top-level tool configuration (`eslint.config.js` and `vite.config.js`).
- Generated artifacts are excluded (`dist`, `.vite`, `node_modules`, coverage output folders, build output, and `generated` folders) to avoid noisy false positives from bundled/transpiled code.
- This keeps lint feedback focused on maintainable source code and gives CI a stable, actionable baseline.
- Run lint checks with `npm run lint` (or `npm run test:lint` in CI). `npm lint` is not a supported npm command in this environment.

Current baseline from this update:
- Before scope/ignore fixes (`eslint .`): **418 problems** (414 errors, 4 warnings).
- After scope/ignore fixes (`npm run lint`): **0 problems** (0 errors, 0 warnings).
