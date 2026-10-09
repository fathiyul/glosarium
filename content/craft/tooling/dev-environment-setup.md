---
title: "Development Environment Setup"
summary: "Getting a project running locally from a fresh machine."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["dev setup", "local setup", "onboarding setup", "local development environment"]
prereqs: ["git-clone", "package-manager"]
related: ["environment-variable", "version-manager", "virtual-environment", "dev-containers", "lockfile", "reading-docs"]
core: [backend, frontend, data-engineer]
---

Setting up a development environment means getting a project running on your own machine:
the right language version, dependencies, configuration and any services such as a database.
The first time on a new project it can take hours. The goal is to make it take minutes.

## The usual steps

1. **Clone** the repository ([git clone](/t/git-clone)).
2. **Read the README** (and any `CONTRIBUTING` file) before anything else.
3. **Install the right runtime versions** with a [version manager](/t/version-manager), matching
   what the project specifies.
4. **Install dependencies** with the project's [package manager](/t/package-manager)
   (`npm ci`, `pip install -r requirements.txt`, ...). In Python, create a
   [virtual environment](/t/virtual-environment) first.
5. **Configure**: copy `.env.example` to `.env` and fill it in
   ([environment variables](/t/environment-variable)). Ask for values you can't get yourself.
6. **Start services**: database, cache, queue, often with Docker Compose.
7. **Run migrations and seed data**.
8. **Run the tests**, then start the app, to prove it works.

```sh
git clone <url> && cd project
cp .env.example .env
docker compose up -d db
npm ci
npm run dev
```

## When it doesn't work

- Read the error message carefully ([reading error messages](/t/reading-error-messages)).
- Check versions first: wrong Node/Python versions cause many odd failures.
- Compare with a teammate's setup, or ask. Say what you tried, and the exact error.
- When you find a gap in the instructions, **fix the README**. You're the best person to do it,
  since you just hit the problem.

Teams reduce setup pain with scripts (`make setup`), pinned versions, lockfiles and
[dev containers](/t/dev-containers). A good setup is repeatable: new hires and CI should get the same result.
