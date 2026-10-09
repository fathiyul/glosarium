---
title: "Preview Environment"
summary: "A temporary deployment for each pull request."
levels: { backend: mid-level, frontend: junior, data-engineer: mid-level }
aliases: ["preview deployment", "review app", "ephemeral environment", "PR environment"]
prereqs: ["staging-environment"]
related: ["staging-environment", "ci-pipeline", "deployment", "environments", "github-actions", "docker-compose"]
---

A preview environment is a temporary copy of your app, deployed automatically for each pull request and given its own URL. When the PR is merged or closed, it is torn down.

Instead of "pull my branch and run it locally", a reviewer clicks a link and sees the change running. Designers can check a UI tweak, product managers can try a feature, and QA can test before anything is merged.

```
open PR #482  ─▶  CI builds the branch  ─▶  https://pr-482.preview.example.com
merge / close PR  ─▶  environment deleted
```

Frontend hosting platforms offer this almost out of the box. Full-stack setups need more work, because each preview needs a backend and a database (often seeded with fake data, or a small separate database per preview).

## Why it helps

- Reviewers see behaviour, not just a diff.
- Changes are tested in a production-like setup before they reach [staging](/t/staging-environment).
- Several features can be reviewed in parallel without fighting over one shared staging server.

## What to watch for

- **Never copy real production data** into previews. They are easier to reach and less protected than production.
- **Secrets and third-party services.** Use test credentials and sandbox accounts, not live ones. A preview that can send real emails or charge real cards is a hazard.
- **Cost and cleanup.** Forgotten environments keep running. Delete them automatically when the PR closes, and cap how many can exist.
- **Authentication.** Previews with unreleased features are often public URLs; protect them if the content is sensitive.
- They aren't identical to production. Scale, data volume and network setup differ, so a preview passing doesn't replace load testing or careful rollout.
