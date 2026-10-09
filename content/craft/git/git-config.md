---
title: "Git Config"
summary: "Your name, email, aliases and defaults, at global or repository level."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["gitconfig", "git config --global", ".gitconfig"]
prereqs: ["git"]
related: ["git", "gitignore", "git-hooks", "signed-commits", "branch"]
---

`git config` reads and sets Git's settings: who you are, your editor, aliases and defaults. Settings live in three layers, and the most specific wins.

| Level | Flag | File | Applies to |
|---|---|---|---|
| System | `--system` | `/etc/gitconfig` | everyone on the machine |
| Global | `--global` | `~/.gitconfig` | all your repositories |
| Local | (default) | `.git/config` | this repository only |

## First-time setup

```sh
git config --global user.name "Ana Putri"
git config --global user.email "ana@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
```

Your name and email are stamped on every commit you make. Use the email tied to your hosting account if you want commits linked to your profile. For one repository that needs a different identity (a work project), set it locally:

```sh
git config user.email "ana@company.com"       # inside that repository
```

## Useful settings

```sh
git config --global pull.rebase true              # pull with rebase instead of merge
git config --global push.autoSetupRemote true     # first push sets the upstream
git config --global alias.st "status -sb"         # a shortcut: git st
git config --global core.excludesFile ~/.gitignore_global    # personal ignore rules
```

## Inspecting it

```sh
git config --list --show-origin       # every setting and which file it came from
git config user.email                 # the value in effect here
```

## Cautions

- **Don't put secrets** (tokens) in a committed config.
- **Check the identity** before committing in a shared or work repository. Wrong emails in history are annoying to fix.
- Settings in `.git/config` aren't shared when others clone. Use a documented setup script, or committed tooling, for team-wide settings.
