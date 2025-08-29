# GitHub Pages Deployment

This project deploys from the `app/dist` folder using GitHub Actions.

- Workflow: `.github/workflows/deploy.yml`
- Vite base path is set to `/WoWGuildHarmoni-Frontend/` in `app/vite.config.ts` for Pages hosting under the repo path.
- After pushing to `main`, Pages will build and publish automatically.

Project URL (after first deploy):

https://wickedmethod.github.io/WoWGuildHarmoni-Frontend/
