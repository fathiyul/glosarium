---
title: "PATH"
summary: "The list of directories the shell searches for commands."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["PATH environment variable", "$PATH", "command not found"]
prereqs: ["environment-variable", "shell"]
related: ["environment-variable", "shell", "basic-shell-commands", "version-manager", "virtual-environment"]
---

`PATH` is an environment variable that holds a list of directories. When you type a command like `python` or `git`, the shell looks through those directories, in order, for a program with that name, and runs the first one it finds.

```sh
echo $PATH
# /usr/local/bin:/usr/bin:/bin:/home/ana/.local/bin

which python          # which file will run?
type -a python        # every match on the PATH, in order
```

Directories are separated by `:` (on Windows, `;`).

## "command not found"

The classic error means the program isn't in any listed directory. Either it isn't installed, or its folder isn't on the `PATH`.

```sh
export PATH="$HOME/.local/bin:$PATH"      # add a folder to the front, for this shell
```

To make it permanent, put that line in your shell's startup file (`~/.bashrc`, `~/.zshrc`), then open a new terminal.

## Order matters

The first match wins, so putting a folder at the front lets its programs override system ones. That's how [version managers](/t/version-manager) and [virtual environments](/t/virtual-environment) work: they put their own `bin` directory first.

```sh
which python      # /usr/bin/python        (system)
source .venv/bin/activate
which python      # /project/.venv/bin/python
```

## Tips

- **"It works in one terminal, not another"**: the `PATH` differs. Check `echo $PATH` in each, and where it's set.
- **Use full paths in scripts and cron jobs**, which often run with a minimal `PATH`.
- **Don't add `.` (the current directory)** to the `PATH`. It lets a malicious file in a folder run by accident.
- **Install tools in one predictable place**, instead of piling directories into `PATH`.
- Editors and GUI apps may not see the `PATH` from your shell config, which causes "works in the terminal, fails in the IDE".
