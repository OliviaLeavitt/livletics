# Livletics

A fitness dashboard prototype for exploring workout readiness, recovery, and
training insights, with an interactive front/back muscle map.

## Current experience

- Readiness and daily training-plan cards.
- Front/back body views with selectable muscle groups and image overlays.
- Muscle filters for upper body, lower body, core, and forearms.
- Recovery metrics and training insight cards.

This frontend uses in-memory sample data. Account management, workout execution,
and live fitness integrations are not implemented; some action buttons are visual
placeholders. No backend or AWS resources are configured.

## Structure

| Directory | Purpose |
| --- | --- |
| web/src/domain | Dashboard models |
| web/src/application | Dashboard use case |
| web/src/infrastructure | In-memory repository adapter |
| web/src/presentation | Dashboard components |
| web/src/assets | Body-map overlays and visual assets |
| api | Reserved for a future backend |

## Run locally

Requires Node.js 24 LTS and npm.

```sh
cd web
npm ci
npm run dev -- --port 5174 --strictPort
```

Open http://localhost:5174/. To build, run `npm run build` from `web/`.

Livletics is independent of the [personal portfolio](https://github.com/OliviaLeavitt/olivia-portfolio),
which introduces the project. Each has its own repository and can be hosted independently later.
