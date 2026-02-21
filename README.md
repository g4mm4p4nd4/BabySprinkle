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

## RSVP Form Configuration

The RSVP form submits data to a Google Apps Script endpoint. To keep this endpoint secure and separate from the source code, it's provided as an environment variable (`VITE_RSVP_ENDPOINT`).

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Update `.env.local` to include your specific Google Apps Script URL:
   ```env
   VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/.../exec
   ```

### GitHub Pages Deployment

To deploy this application via GitHub Actions and ensure the RSVP form works in production:

1. Go to your GitHub repository **Settings** > **Secrets and variables** > **Actions**.
2. Under **Variables** (or Secrets if preferred), click **New repository variable**.
3. Name: `VITE_RSVP_ENDPOINT`
4. Value: Your Google Apps Script deployment URL.
5. In your GitHub Actions deployment workflow (e.g., `.github/workflows/deploy.yml`), ensure you pass the variable to the build step:
   ```yaml
   env:
     VITE_RSVP_ENDPOINT: ${{ vars.VITE_RSVP_ENDPOINT }}
   ```

### Endpoint Rotation Procedure

If you need to change the RSVP destination (e.g., to a new spreadsheet or script):

1. **Deploy New Script**: In your new Google Apps Script project, go to **Deploy** > **New deployment** (Web app) and copy the new URL.
2. **Update GitHub Variable**: Go to your repository settings and update the value of the `VITE_RSVP_ENDPOINT` variable.
3. **Trigger Deployment**: Re-run your GitHub Actions deployment workflow. The new URL will be baked into the static build. No component code changes are required!
