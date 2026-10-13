## SK Toolkit

The documentation source of truth for the web components lives in Storybook.

### Web Components

Run the Stencil app and component docs locally from `web-components-stencil`:

```bash
npm run storybook
```

Build the static Storybook site:

```bash
npm run storybook:build
```

The Storybook stories cover the current components and the `sk-record-card` pattern so the design system can be reviewed in one place.

### GitHub Pages

The public site is structured in two parts:

- `web-components-stencil/src/index.html` is the source of truth for the public homepage.
- `web-components-stencil/docs/index.html` is generated during the Pages build.
- `web-components-stencil/docs/build/` contains the copied Stencil runtime assets needed by the homepage.
- `web-components-stencil/docs/catalog/` contains the published Storybook component catalog.

Build the GitHub Pages output locally from `web-components-stencil`:

```bash
npm run pages:build
```

Preview the full site locally from `web-components-stencil`:

```bash
npm run pages:preview
```

Then open `http://localhost:4173` for the landing page or `http://localhost:4173/catalog/` for Storybook.

The local Pages build defaults to `/catalog/`. The GitHub Actions workflow overrides the base path to `/<repo-name>/catalog/` for deployment.

The GitHub Actions workflow lives at `.github/workflows/deploy-pages.yml` and builds and deploys the assembled `web-components-stencil/docs/` site to GitHub Pages.
