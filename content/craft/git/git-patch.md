---
title: "Patch Files"
summary: "Sharing changes as diff files instead of branches."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["patch file", "git patch", "diff file"]
prereqs: ["git", "commit"]
related: ["cherry-pick", "rebase", "merge", "code-review", "version-control"]
---

A **patch file** is a text file containing a change — a **unified diff** — that someone else can apply to their copy of the code. Instead of pushing a branch and asking someone to pull it, you export the change, send the file, and they apply it. It's how contributions worked before pull requests, and it's still useful when there's no shared remote or branch access.

```sh
git diff > change.patch          # working-tree change → patch
git format-patch -1 <commit>     # one commit as a patch (keeps author + message)
git apply change.patch           # apply a patch to the working tree
git am change.patch              # apply a formatted patch as a commit
```

The difference between the two apply commands matters: `git diff` output loses commit metadata (author, message), while `git format-patch` output preserves it, and `git am` replays it as a real commit with that metadata. For email-based contribution, `format-patch` + `am` is the workflow.

The classic mistakes:

- Context that no longer matches. A patch describes changes with surrounding context lines; if the target has changed, `git apply` rejects it. That's normal — resolve by rebasing or applying with fuzz/care.
- Line endings and whitespace. Patches are sensitive to CRLF/LF and trailing whitespace differences; a patch that "should" apply can fail over invisible characters.
- Losing history with plain `git apply`. If you wanted the author and message, use `format-patch`/`am`; `diff`/`apply` gives you changes only.
- Sending a giant patch. A patch that touches half the codebase is as hard to review as a huge branch. Keep changes small.
- Binaries. Text patches don't carry binary changes well; use `--binary` if you must, but prefer not to.

Patch files are a lightweight transport for changes: useful for one-off fixes, contributions to projects without a shared host, or moving a commit between environments. Once a shared remote exists, [cherry-picking](/t/cherry-pick) or [rebasing](/t/rebase) usually replace the manual dance.
