---
title: "Platforms (Vercel, Netlify, Render, Fly)"
summary: "Hosts that deploy straight from Git with little setup."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["PaaS", "Vercel", "Netlify", "Render", "Fly.io", "Heroku-style hosting", "deploy from Git"]
prereqs: ["deployment", "git"]
related: ["iaas-paas-saas", "vendor-lock-in", "preview-environment", "managed-vs-self-hosted", "faas", "environments"]
core: [frontend]
---

A **platform as a service** (PaaS) host builds and runs your app for you. You connect a Git repository, push, and a few minutes later
it's live on the internet with HTTPS, with no servers to set up. Examples: Vercel, Netlify, Render, Fly.io (and
Heroku, which made the style popular).

```
git push origin main  →  platform builds the app  →  new version live (HTTPS, domain, CDN)
```

## What you typically get

- **Deploy on push**, from a Git branch.
- **Preview deployments**: a separate temporary URL for every pull request, so reviewers can click the real thing
  ([preview environments](/t/preview-environment)).
- **Managed HTTPS, domains and a CDN.**
- **Environment variables** set in a dashboard ([environments](/t/environments)).
- **Automatic scaling** or simple scaling controls, plus logs and rollbacks.
- Often add-ons: managed databases, queues, cron jobs, serverless functions ([FaaS](/t/faas)).

Different platforms focus on different things: some are tuned for frontend and static sites, others run any web service or container,
others run containers close to users around the world. Check what each supports before choosing.

## Trade-offs

| Good | Watch out for |
|---|---|
| Very fast to start, little operations work | Costs can rise sharply at scale or with heavy traffic. Look at the pricing model |
| Developers focus on the product | Less control over the machine, network and runtime |
| Sensible defaults and security patches handled | Platform-specific features can create [vendor lock-in](/t/vendor-lock-in) |
| Good for prototypes, small teams, marketing sites, many web apps | Unusual workloads (special hardware, long-running or very stateful jobs) may not fit |

## Habits

- Keep your app **portable**: use standard tools, containers or plain frameworks where possible, and keep config in
  environment variables, so moving is possible if you outgrow it.
- Know your **limits**: build time, request duration, memory, bandwidth.
- Don't commit secrets, and use the platform's secret settings.

Many products run on a PaaS for years. If you outgrow one, you can move to more hands-on cloud setups
([IaaS, PaaS and SaaS](/t/iaas-paas-saas)).
