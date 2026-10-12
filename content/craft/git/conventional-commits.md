---
title: "Conventional Commits"
summary: "A commit message convention like \"feat:\" and \"fix:\" that tools can parse."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["conventional commit", "semantic commits", "commit types"]
prereqs: ["commit-message"]
related: ["commit-message", "atomic-commit", "branch-naming", "semantic-versioning", "changelog"]
---

Conventional Commits is a lightweight convention for commit messages, so that both people and tools can read them. The format:

```
<type>(<optional scope>): <short summary>

<optional body>

<optional footer>
```

```
feat(auth): add passwordless login
fix(cart): prevent negative quantities
docs: explain local setup
refactor(api): split orders router
feat!: drop support for v1 tokens

BREAKING CHANGE: v1 tokens are no longer accepted.
```

## Common types

| Type | Use for |
|---|---|
| `feat` | a new feature |
| `fix` | a bug fix |
| `docs` | documentation only |
| `refactor` | restructuring with no behavior change |
| `test` | adding or changing tests |
| `chore` | maintenance, dependencies, tooling |
| `perf`, `build`, `ci`, `style` | as named |

A `!` after the type, or a `BREAKING CHANGE:` footer, marks an incompatible change.

## Why teams use it

- **Scannable history**: you can see what kind of change each commit is.
- **Automation.** Tools generate changelogs and decide the next version number from commits: `fix` means a patch, `feat` a minor release, and a breaking change a major one ([semantic versioning](/t/semantic-versioning)).
- **Consistency** across a team.
- It encourages small, focused commits ([atomic commits](/t/atomic-commit)).

## Tips

- Write the summary in the imperative mood and keep it short ([commit messages](/t/commit-message)).
- Add a **scope** only if it helps (the module or package).
- Enforce it with a commit-msg hook or a CI check if automation depends on it.
- It's a convention, not a rule of Git. If your team doesn't release from commit messages, a plain, clear message is just as good.
