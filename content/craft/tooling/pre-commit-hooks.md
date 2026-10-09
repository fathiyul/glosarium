---
title: "Pre-commit Hooks"
summary: "Running linters and formatters automatically before each commit."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["pre-commit", "git hooks", "commit hooks"]
prereqs: ["git", "linter"]
related: ["git-hooks", "formatter", "linter", "continuous-integration", "secrets-in-git"]
---

A pre-commit hook is a script that runs automatically just before each `git commit`. If it fails, the commit is blocked. Teams use hooks to run quick checks locally, so mistakes are caught before they reach review or CI.

Typical jobs:

- Run a [formatter](/t/formatter) and fix style.
- Run a [linter](/t/linter) on the changed files.
- Scan for [secrets](/t/secrets-in-git) like API keys.
- Check for large files, merge-conflict markers or trailing whitespace.
- Run fast tests or type checks.

## Setting up

Git looks for an executable at `.git/hooks/pre-commit`. But `.git` isn't shared, so teams use a tool that installs hooks from a committed config file. A popular one is **pre-commit** (Python-based, works for any language); in JavaScript projects, Husky with lint-staged is common.

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: check-merge-conflict
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.5.0
    hooks:
      - id: ruff
      - id: ruff-format
```

```sh
pre-commit install          # once per clone
git commit                  # hooks now run on staged files
```

## Good practice

- **Keep them fast**, a few seconds, and run only on changed files. A slow hook makes people bypass it.
- **Don't rely on them alone.** Hooks can be skipped (`git commit --no-verify`) or not installed, so run the same checks in CI ([continuous integration](/t/continuous-integration)).
- **Auto-fix where possible** (formatting), instead of only failing.
- **Pin versions** so everyone gets the same behavior.
- **Document the install step** in the README ([dev environment setup](/t/dev-environment-setup)).
- Reserve the heavy checks (full test suites) for CI.

See also [Git hooks](/t/git-hooks) for the underlying mechanism.
