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

## Overview & Purpose

BabySprinkle is a personalized baby shower invitation and RSVP web app. It provides an interactive landing page for expecting parents to share event details, collect RSVPs securely via Google Apps Script, and engage guests with a custom theme. The template goes beyond a static invitation by enabling dynamic forms and theme toggling, making event planning and guest management simple.

## Features & Tech Stack

### Key Features

- Responsive landing page with customizable design and theme toggling
- Secure RSVP form integrated with Google Apps Script endpoint
- Environment-based configuration with Vite for development and production
- Deployment via GitHub Pages with adjustable endpoints
- Written in modern React and TypeScript, using Vite for fast HMR

### Tech Stack

| Component | Implementation |
| --- | --- |
| Language | TypeScript |
| Framework | React |
| Build Tool | Vite |
| Deployment | GitHub Pages |
| Backend | Google Apps Script endpoint |

## Installation & Usage

To run this project locally:

```bash
git clone https://github.com/g4mm4p4nd4/BabySprinkle.git
cd BabySprinkle
npm install
cp .env.example .env.local   # copy environment template
# update the VITE_RSVP_ENDPOINT in .env.local with your Google Apps Script URL
npm run dev
```

For production, build and deploy:

```bash
npm run build
```

Then deploy the `dist` folder via GitHub Pages. Refer to the "GitHub Pages Deployment" section above for environment variable setup.

## Business & Entrepreneurial Value

A baby shower invitation platform like BabySprinkle can be expanded into a commercial event‑planning product. By offering subscription plans for hosts, premium templates, and white‑label licensing for event planners, it creates monetization opportunities. The modular design and integration with external endpoints allow scaling to weddings, birthdays and corporate events, with upsells such as analytics dashboards or vendor integrations. Automated RSVP collection reduces manual coordination costs, and the hosted SaaS model can generate recurring revenue.

## Consumer Value

For expecting parents and event organizers, BabySprinkle simplifies the invitation process. Guests receive a professional, responsive invitation that works on any device and can RSVP in seconds without creating an account. The customizable theme adds a personal touch, and the automated reminders and secure data handling provide peace of mind. By streamlining RSVP collection and deployment, hosts save time and ensure an accurate guest count, leading to a smoother, more enjoyable celebration.
