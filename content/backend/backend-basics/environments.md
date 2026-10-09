---
title: "Environments (dev, staging, prod)"
summary: "Separate deployments for development, testing and real users."
levels: { backend: junior, frontend: junior }
aliases: ["dev staging prod", "development environment", "staging environment", "production environment", "deployment environments"]
prereqs: ["app-configuration"]
related: ["app-configuration", "twelve-factor-app", "feature-flags", "dev-environment-setup"]
core: [backend]
---

An **environment** is a separate deployment of your application, with its own servers, database and settings. Most
teams use at least these:

| Environment | Purpose | Who uses it |
|---|---|---|
| **Local / development** | Writing and running code | You, on your machine |
| **Test / CI** | Automated tests, started fresh each run | The pipeline |
| **Staging** | A near-copy of production for final checks | The team, QA, product |
| **Production** | The real thing, serving real users | Customers |

The idea: a change moves through them in order, catching problems in places where they can't hurt anyone.

## Why keep them separate

- **Safety**: a bug or a bad migration in development can't damage real data.
- **Realistic testing**: staging lets you check how things behave outside your laptop.
- **Independence**: breaking staging doesn't affect customers.

## What differs between them

- **Config**: URLs, log levels, [feature flags](/t/feature-flags) ([configuration](/t/app-configuration)).
- **Credentials**: **each environment must have its own** database passwords and API keys. Never reuse production
  credentials in development.
- **Data**: development and staging should not hold raw production data, because that is a privacy
  and security risk. Use fake or anonymized data.
- **Integrations**: payment providers, email and SMS services usually have test or sandbox modes. Use them, so
  tests don't charge real cards or email real people.
- **Scale**: staging is often smaller than production.

## Keep them similar

The more environments differ, the more "works on staging, breaks in production" surprises. Use the same code, the same build
artifact, the same runtime versions and the same kind of services (the same database engine, not SQLite locally and
Postgres in production). Containers help.

**The code should not contain `if env == "production"` checks scattered around.** Vary behavior through configuration.

And always be sure which environment you're connected to before running anything destructive, since a
terminal tab pointing at production looks like any other. Many teams color-code prompts or banners.
