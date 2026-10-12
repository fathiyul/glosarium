---
title: "Smoke Test"
summary: "A quick check that the most basic things work after a deploy."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["smoke tests", "sanity check", "deployment verification test"]
prereqs: ["deployment"]
related: ["end-to-end-test", "health-check", "deployment", "rollback", "continuous-delivery"]
---

A smoke test is a quick, shallow check that the most basic things work, usually run right after a deployment or build. The name comes from hardware: switch it on, and see whether smoke comes out. It doesn't prove everything works, only that it isn't obviously broken.

```sh
curl -fsS https://shop.example.com/health          # is the service up?
curl -fsS https://shop.example.com/api/products | head    # does a basic call return data?
```

Typical checks:

- The app starts and the health endpoint responds ([health checks](/t/health-check)).
- The home page loads.
- A user can log in.
- The database and key dependencies are reachable.
- One or two critical flows work (view a product, add to cart).

## Why do it

- **Fast feedback after a deploy**: within a minute you know whether the release is alive.
- **Stops bad releases early.** A failing smoke test can trigger an automatic [rollback](/t/rollback) or halt a gradual rollout.
- **Cheap and reliable** compared with a full suite.

## Designing one

- **Keep it small and quick**: seconds to a few minutes.
- **Cover the critical path**, the things that, if broken, mean an emergency.
- **Make it safe for production.** Use read-only requests or dedicated test accounts, and don't create junk data or real charges.
- **Run it automatically** at the end of the deployment pipeline ([continuous delivery](/t/continuous-delivery)).
- **Make failures obvious**, with a clear message.
- **Keep it stable.** A flaky smoke test makes people ignore deploy alerts ([flaky tests](/t/flaky-test)).

## Smoke, sanity, regression

A smoke test checks the build is basically alive. A sanity check verifies a specific fix or change. A full regression suite re-checks everything. Smoke tests come first, and are the cheapest gate. See [end-to-end tests](/t/end-to-end-test) for the deeper version.
