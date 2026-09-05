# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

The public documentation site is deployed through **Cloudflare Pages**, not
GitHub Pages.

| Setting | Value |
| --- | --- |
| Cloudflare Pages project | `casedesk-docs` |
| Source repository | `k0f1/casedesk-docs` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `build` |
| Public domains | `https://docs.getcasedesk.com` and `casedesk-docs.pages.dev` |

Cloudflare deploys a new production build when a commit reaches `main`.

### Access and recovery

Sign in to Cloudflare using **Sign in with GitHub** and the GitHub account that
owns `k0f1/casedesk-docs`. Then open **Workers & Pages** and select the
`casedesk-docs` project.

If the project is not visible, first verify that you are signed in through the
correct GitHub account. Do not create a replacement Pages project or attach the
custom domain until you have confirmed the existing project is unavailable. A
replacement project could disrupt `docs.getcasedesk.com`.

Before relying on a deployment, run:

```bash
npm run check:product-boundary
npm run build
```
