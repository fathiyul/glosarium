---
title: "Labels and Issue Hygiene"
summary: "Labeling, linking and closing issues so work stays findable."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["issue labels", "issue hygiene", "GitHub labels", "issue triage labels"]
prereqs: ["ticket"]
related: ["ticket", "triage", "bug-report", "pull-request", "contributing-guide"]
---

Issue hygiene is keeping a tracker's issues organized, so people can find, prioritize and finish work. Labels are the main tool.

## Useful labels

Keep a small, consistent set, usually along a few dimensions:

| Dimension | Examples |
|---|---|
| **Type** | `bug`, `feature`, `chore`, `docs`, `question` |
| **Priority or severity** | `P0`, `P1`, `critical`, `low` |
| **Status** | `needs-triage`, `blocked`, `in-progress`, `needs-info` |
| **Area** | `frontend`, `api`, `billing`, `infra` |
| **Welcoming** | `good first issue`, `help wanted` |

Don't create dozens. A label nobody uses just adds noise.

## Habits that keep a tracker useful

- **Write clear titles** that describe the outcome or the problem ([tickets](/t/ticket), [bug reports](/t/bug-report)).
- **Link related things**: reference the pull request that fixes an issue (`Fixes #482` closes it on merge), and related issues.
- **Assign an owner**, or mark it clearly unassigned.
- **Triage regularly**: new issues get a type, an area and a priority, or are closed with a reason ([triage](/t/triage)).
- **Close duplicates** by linking to the original.
- **Ask for missing details** (`needs-info`), and close stale issues after a polite reminder.
- **Keep discussion in the issue**, so decisions are recorded.
- **Update status** as work moves, so the board matches reality.
- **Use milestones or projects** for grouping work toward a release.

## Don't

- Let the backlog become a graveyard of thousands of old issues nobody reads.
- Use an issue as a chat thread.
- Rename or recycle labels casually.

Tidy trackers save time for everyone who looks for work, reports a bug, or contributes ([contributing guide](/t/contributing-guide)).
