# Livletics hosting

Deploy this app separately from the personal portfolio.

| Setting | Value |
| --- | --- |
| Repository | OliviaLeavitt/livletics |
| Production branch | main |
| AWS region for this setup | us-east-2 |
| Monorepo app root | web |
| Environment variable | AMPLIFY_MONOREPO_APP_ROOT=web |
| Build specification | amplify.yml at the repository root |
| Runtime | Node 24 |
| Install | npm ci |
| Build | npm run build |
| Artifacts | dist, relative to web |
| Intended URL | https://livletics.olivialeavitt.com |

The frontend is an interactive prototype with sample training data. No API,
authentication, database, or fitness account integrations are deployed with it.

## Custom domain

Use the domain olivialeavitt.com with only the subdomain prefix livletics mapped
to main. Use an Amplify-managed certificate and disable automatic subdomain
creation. Leave the root domain and www mappings on the portfolio app.

Copy the exact validation and hosting CNAME targets returned by Amplify into
Cloudflare, with proxying disabled. Do not guess DNS targets. No separate domain
purchase or Route 53 hosted zone is needed.

## Verify before publishing the portfolio link

- The Amplify deployment job has succeeded for the intended commit.
- The custom domain and managed certificate are active.
- HTTPS returns the Livletics page, and JavaScript/CSS/image assets load.
- Body-map filters and front/back controls work with the sample dataset.
- The portfolio link opens https://livletics.olivialeavitt.com.

DNS and certificate provisioning may remain pending after a successful code build.
Report that state explicitly instead of claiming the domain is live.
