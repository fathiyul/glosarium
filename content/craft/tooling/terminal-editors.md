---
title: "Terminal Text Editors (Vim, Nano)"
summary: "Editing files on a server where there's no IDE, and how to quit Vim."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Vim", "Nano", "Emacs", "vi"]
prereqs: ["terminal"]
related: ["ssh", "terminal", "basic-shell-commands", "ide", "keyboard-shortcuts"]
---

Sometimes you must edit a file where there's no graphical editor: on a server over SSH, or inside a container. Terminal text editors run inside the terminal, and the two you'll meet most are Nano and Vim.

## Nano: simple

```sh
nano config.yaml
```

Type normally. The shortcuts are listed at the bottom: `Ctrl+O` saves ("write out"), `Ctrl+X` exits, `Ctrl+W` searches. If you just need to change a line, use this.

## Vim (or vi): powerful, with modes

```sh
vim config.yaml
```

Vim has **modes**, which confuses everyone at first:

| Mode | How to enter | What keys do |
|---|---|---|
| **Normal** (default) | `Esc` | commands: move, delete, copy |
| **Insert** | `i` | type text |
| **Command line** | `:` | save, quit, search and replace |

**How to quit Vim**, the famous problem:

```
Esc            make sure you're in normal mode
:w  Enter      save
:q  Enter      quit
:wq  Enter     save and quit
:q!  Enter     quit and discard changes
```

A minimal edit: `i` to start typing, `Esc` when finished, `:wq` to save and exit.

Other handy keys in normal mode: `/word` to search, `dd` to delete a line, `yy` to copy a line, `p` to paste, `u` to undo, `gg` and `G` to jump to the top or bottom.

## Which to learn

- **Everyone should know** how to edit and exit with Nano, and how to survive in Vim.
- Many developers use Vim (or Neovim) daily, and love its speed, but it takes weeks to feel natural. Plenty of people instead use an editor with a "vim mode" extension.
- **Emacs** is the other classic.
- Setting the default editor: `export EDITOR=nano`, which Git and other tools use (for commit messages, for example, [Git config](/t/git-config)).

You don't have to love them. You just need to not get stuck.
