---
title: "Rollback"
summary: "Returning to the previous version when a deploy goes wrong."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["rolling back", "revert deployment", "roll back a release", "redeploy previous version"]
prereqs: ["deployment"]
related: ["roll-forward", "blue-green-deployment", "canary-release", "mitigate-first", "schema-and-code-deploys", "deploy-vs-release"]
core: [backend]
also: [production-work]
---

A **rollback** returns production to the **previous known-good version** after a deployment goes wrong. When a release breaks
checkout, you don't debug live under pressure. You first stop the damage by going back, and investigate afterwards
([mitigate first](/t/mitigate-first)).

## How it's done

- **Redeploy the previous artifact**: the old container image or build is still stored, so you deploy it again.
- **Switch traffic back**: with [blue-green](/t/blue-green-deployment) the old environment is still running, so
  rolling back is flipping the router.
- **Turn off the feature**: if the change is behind a feature flag, disable the flag. It's the fastest rollback there is.
- **Revert the commit** and let the pipeline redeploy (slower, but works when nothing else does).

```sh
# Example shape of a rollback command (your platform's tool will differ)
deploy --env production --image registry.example.com/shop:3f9c2a1   # the previous version
```

## What makes rollback hard

- **Database changes.** If the new version ran a migration, the old code may no longer work with the new schema, and data
  written by the new code may confuse the old. The answer is to make schema changes **backward compatible** (add first, remove
  later), so that either version can run ([schema and code deploys](/t/schema-and-code-deploys)).
- **Data you can't un-send.** Emails sent, payments charged and events published remain after you roll back.
- **Not having the old artifact** anymore. Keep recent builds available.
- **Hesitation.** Teams that treat rollback as failure wait too long. It should be a normal, rehearsed action.

## Rollback or roll forward?

Rolling forward means shipping a quick fix instead. It's sometimes right (a tiny, obvious bug, or when rolling back is
unsafe because of the data), but rolling back is usually quicker and has a more predictable result
([roll forward](/t/roll-forward)).

## Habits

- **Know the rollback procedure before you deploy**, and try it in staging.
- **Define what triggers one**: error rate above X, a failing health check or a business metric dropping.
- **Deploy small changes** so there's less to undo.
- **Watch after deploying**, so that you notice quickly.

After a rollback, find the cause, fix it and add a test or check that would have caught it.
