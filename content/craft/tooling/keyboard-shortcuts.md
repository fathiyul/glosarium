---
title: "Editor Shortcuts"
summary: "Learning your editor's shortcuts and multi-cursor editing to work faster."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["editor shortcuts", "hotkeys", "multi-cursor editing"]
prereqs: ["ide"]
related: ["ide", "automated-refactoring", "go-to-definition", "terminal-editors", "terminal"]
---

Learning your editor's keyboard shortcuts is one of the cheapest ways to work faster. The goal isn't memorizing everything. It's removing the mouse from the actions you repeat all day.

## Worth learning first (names differ by editor, and Cmd replaces Ctrl on macOS)

| Action | Typical shortcut (VS Code) |
|---|---|
| Command palette: run any command by name | `Ctrl+Shift+P` |
| Open a file by name | `Ctrl+P` |
| Search across the project | `Ctrl+Shift+F` |
| Go to definition | `F12` |
| Find all references | `Shift+F12` |
| Rename a symbol | `F2` |
| Move or duplicate a line | `Alt+↑/↓`, `Shift+Alt+↓` |
| Comment or uncomment | `Ctrl+/` |
| Select the next occurrence (multi-cursor) | `Ctrl+D` |
| Add cursors with the mouse | `Alt+Click` |
| Toggle the terminal | ``Ctrl+` `` |
| Format the file | `Shift+Alt+F` |

## Multi-cursor editing

Placing several cursors lets you edit many places at once, such as renaming a few related names or turning a list into quoted strings:

```
a            "a",
b     →      "b",
c            "c",
```

Select the lines, and add a cursor at each line end.

## How to learn them

- **Pick two or three** and use them until automatic, then add more.
- **Notice what you do repeatedly** with the mouse, and look up its shortcut. The command palette shows shortcuts beside commands.
- **Print or keep a cheat sheet** nearby for a week.
- **Customize** rarely used ones that conflict with your habits.
- **Learn the shell shortcuts too**: `Ctrl+R` history search, `Ctrl+A/E` to move to line start and end ([basic shell commands](/t/basic-shell-commands)).

Speed isn't the main point. Staying in flow, without breaking concentration to hunt through menus, is. See [IDEs](/t/ide).
