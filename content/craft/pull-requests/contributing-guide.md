---
title: "CONTRIBUTING Guide"
summary: "A file explaining how to propose changes to a project."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["CONTRIBUTING.md", "contribution guidelines"]
prereqs: ["pull-request"]
related: ["pull-request", "codeowners", "branch-naming", "git-hooks"]
---

A CONTRIBUTING file, usually `CONTRIBUTING.md` at the repository root, explains how to propose a change to a project. It tells a new contributor how to set up the project, run its tests, format code, name branches and commits, and open a pull request. GitHub shows the file when someone opens a new issue or pull request.

A useful guide answers the questions people actually ask:

```
## Getting started
1. Install the tools listed in the README.
2. Run `make test` before opening a pull request.

## Proposing a change
- Open an issue first for anything larger than a small fix.
- Keep pull requests focused on one change.
- Describe what changed and how you tested it.
```

The trade-off is length against clarity. A short guide is easier to follow, but it leaves gaps. A long guide is more complete, and people skip it. Keep the steps that must be followed in a short list, and link to longer documents for the rest.

The classic mistake is letting the guide go out of date. A command that no longer exists, or a test step that has been removed, sends every new contributor into a dead end. Check the guide when the build or tooling changes, and ask a recent contributor to follow it once. For how the reviews themselves run, see [CODEOWNERS](/t/codeowners).
