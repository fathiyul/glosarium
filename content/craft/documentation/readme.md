---
title: "README"
summary: "The front page of a project: what it is, how to run it, how to contribute."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["README.md", "readme file", "project readme"]
prereqs: ["markdown"]
related: ["markdown", "onboarding-docs", "dev-environment-setup", "contributing-guide", "technical-writing"]
core: [backend, frontend, data-engineer]
---

The README is the front page of a project. It's the first file people read, so it answers:
*what is this, how do I run it, and how do I help?*

It's usually a [Markdown](/t/markdown) file named `README.md` in the repository root, and
hosting sites show it automatically.

## A solid structure

```markdown
# Project name
One or two sentences: what it does and who it's for.

## Getting started
Prerequisites (versions!), install steps and how to run it.

## Usage
A minimal example or the most common commands.

## Configuration
Environment variables and what they mean.

## Development
How to run tests, lint, and build.

## Contributing
Link to CONTRIBUTING.md, or the short version.

## License
```

## What makes one good

- **Starts with the point.** In the first few lines a visitor knows whether this is relevant.
- **Instructions that actually work.** Test them on a clean machine, or have a new teammate
  follow them. A README with a missing step is worse than none.
- **Copy-pasteable commands** in code blocks.
- **Short, with links** to deeper docs, instead of everything on one page.
- **Mentions versions** of the language and tools required.
- **Kept up to date.** Stale instructions erode trust. If you hit a problem while following
  it, fix it right then ([dev environment setup](/t/dev-environment-setup)).

## Don't include

Secrets, passwords or internal URLs that shouldn't be public. Long design explanations that
belong in separate docs. Screenshots and badges are optional; useful ones help, decoration doesn't.

When you create a project, write the README first, even a rough one. Explaining what it's
for clarifies what you're building.
