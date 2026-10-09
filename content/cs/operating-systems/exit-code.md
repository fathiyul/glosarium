---
title: "Exit Code"
summary: "The number a program returns when it ends; 0 means success."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["exit status", "return code", "status code of a process"]
prereqs: ["shell"]
related: ["shell", "shell-scripting", "continuous-integration", "cron", "error-handling"]
---

An exit code is the small number a program hands back to the operating system when it ends. By convention, 0 means success, and any non-zero value means some kind of failure. Scripts, CI systems and schedulers use it to decide what to do next.

```sh
ls /tmp
echo $?             # 0: the last command succeeded

ls /nonexistent
echo $?             # 2: it failed
```

`$?` holds the exit code of the previous command in a shell.

## Using them in scripts

```sh
if grep -q "ERROR" app.log; then        # grep exits 0 if found, 1 if not
  echo "problems found"
fi

make build && make deploy               # run deploy only if build succeeded (exit 0)
make build || echo "build failed"       # run the echo only on failure
```

```sh
set -e                                  # stop the script on the first failing command
```

## In your own programs

```python
import sys
if not config_ok:
    print("bad config", file=sys.stderr)
    sys.exit(1)             # tell the caller it failed
```

```js
process.exit(1);
```

A program that **always exits 0** hides failures from CI and cron, and a pipeline marked green when it should be red. A crash from an unhandled exception already returns non-zero.

## Common conventions

| Code | Usual meaning |
|---|---|
| 0 | success |
| 1 | general error |
| 2 | misuse (bad arguments) |
| 126 / 127 | command found but not executable / not found |
| 130 | stopped by Ctrl+C |

Others are defined by each tool, so check its manual ([getting help](/t/man-pages)).

## Why it matters

- **CI fails a step on a non-zero code** ([continuous integration](/t/continuous-integration)).
- **Cron and orchestrators** use it to mark runs failed and retry ([cron](/t/cron)).
- **Pipes** only report the last command's code unless you set `pipefail`.
- **Containers** exit when the main process exits, and the code explains why.
