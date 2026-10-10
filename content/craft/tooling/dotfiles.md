---
title: "Dotfiles"
summary: "Your personal config files, often kept in Git."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["dot files", "dotfile repository"]
related: ["shell-scripting", "git-hooks", "dev-containers", "convention-over-configuration"]
---

Dotfiles are personal configuration files for your tools, such as the shell, editor and terminal, typically named with a leading dot, like `.bashrc` or `.gitconfig`. Keeping them in a Git repository lets you reproduce your setup on a new machine and keep it in sync across the ones you use.

A common layout keeps the files in one folder and links them into your home directory:

```sh
git clone https://example.com/you/dotfiles ~/dotfiles
ln -s ~/dotfiles/.bashrc ~/.bashrc
ln -s ~/dotfiles/.gitconfig ~/.gitconfig
```

Some people write a short [shell script](/t/shell-scripting) to do the linking, so a new machine is ready with one command.

The trade-off is that dotfiles accumulate machine-specific settings, such as paths, work accounts and secrets. Committing a secret to a public repository is a serious risk, and machine-specific values are easier to keep in a separate, untracked file that the main config includes.

The classic mistake is putting credentials or tokens in the repository. Keep secrets out of it entirely, and use a local file or a secrets manager for them. Review the files regularly, because old settings for tools you no longer use can slow down or confuse the rest of the setup.
