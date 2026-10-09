---
title: "The Twelve-Factor App"
summary: "Twelve practices for building deployable, scalable web services."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["12-factor app", "twelve factor", "12 factor methodology", "12factor"]
prereqs: ["app-configuration", "environments", "deployment"]
related: ["app-configuration", "environments", "logging", "stateless-service", "dev-environment-setup", "worker-process-model"]
core: [backend]
---

**The Twelve-Factor App** is a methodology for building web services that are easy to deploy, scale and maintain, written by developers at Heroku (published around 2011) from what they'd seen across many apps. It's still a common reference for cloud and container-based
services, and a popular interview topic. The twelve factors:

| # | Factor | In practice |
|---|---|---|
| 1 | **Codebase** | One codebase in version control, many deploys (dev, staging, production) |
| 2 | **Dependencies** | Declare them explicitly (a lockfile) and isolate them. Don't rely on system-wide packages |
| 3 | **Config** | Keep config in the **environment**, not in code ([configuration](/t/app-configuration)) |
| 4 | **Backing services** | Treat databases, queues and caches as attached resources, swappable by changing a URL |
| 5 | **Build, release, run** | Strictly separate building the artifact, combining it with config, and running it |
| 6 | **Processes** | Run as one or more **stateless** processes. Persistent data lives in a backing service ([stateless services](/t/stateless-service)) |
| 7 | **Port binding** | The app is self-contained and exports HTTP by listening on a port |
| 8 | **Concurrency** | Scale out by running more processes, with different process types for different work ([worker process model](/t/worker-process-model)) |
| 9 | **Disposability** | Fast startup, graceful shutdown. Processes can be started and stopped at any moment |
| 10 | **Dev/prod parity** | Keep environments as similar as possible ([environments](/t/environments)) |
| 11 | **Logs** | Treat logs as an event stream: write to stdout, and let the platform collect them ([logging](/t/logging)) |
| 12 | **Admin processes** | Run one-off tasks (migrations, scripts) in the same environment and codebase as the app |

## Why it holds up

Together, they describe a service that can be **built once, configured per environment, started anywhere and scaled by adding copies**, which is exactly what containers and cloud platforms assume.

```sh
# the spirit of the factors, in one place
export DATABASE_URL=postgres://...      # 3 and 4: config and backing service via environment
npm ci && npm run build                 # 2 and 5: explicit dependencies, a separate build step
node server.js                          # 6 and 7: a stateless process that listens on $PORT
```

## Use it as guidance, not scripture

- Some parts show their age or need nuance: environment variables alone are a limited way to manage many secrets, and some apps legitimately hold state.
- It targets web services. Batch jobs, data pipelines and mobile apps need adaptation.
- The value is the mindset: **separate code, config and state, and make processes disposable**. Most operational headaches come from violating one of them (a config file baked into the image, state on local disk, a "pet" server nobody can recreate).
