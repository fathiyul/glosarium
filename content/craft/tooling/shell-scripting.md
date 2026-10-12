---
title: "Shell Scripting"
summary: "Automating tasks with shell scripts."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["bash scripting", "shell script"]
prereqs: ["process"]
related: ["makefile", "dotfiles", "jq", "static-analysis"]
---

A shell script is a file of commands that the shell runs in order, used to automate repetitive tasks such as backups, deployments and data cleanup. Bash is the most common scripting shell on Linux (macOS defaults to zsh for interactive use but still includes bash), and POSIX `sh` is the most portable subset.

A safer start for a script turns on strict mode:

```bash
#!/usr/bin/env bash
set -euo pipefail

cp data/report.csv backup/
echo "backup done"
```

Each part does something specific. `-e` stops the script when a command fails, `-u` treats an unset variable as an error, and `-o pipefail` makes a pipeline fail if any command in it fails, not only the last one. Without these, a script can keep going after an error and do damage.

The trade-off is that strict mode has caveats. Under `-e`, a failure on the left side of `||` or `&&`, or inside an `if` condition, doesn't stop the script, so you still have to check those results yourself. Command substitutions and some functions also behave differently than people expect, so test the failure paths, not only the normal run.

The classic mistake is assuming `set -e` makes a script safe. It catches many failures but not all of them. Also, quote variables, such as `"$file"`, so spaces in names don't split into separate arguments. For anything longer than a page, consider a language with better error handling, and use a [Makefile](/t/makefile) to name the steps.
