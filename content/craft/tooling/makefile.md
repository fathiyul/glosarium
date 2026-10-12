---
title: "Makefile"
summary: "A classic way to define project tasks and their dependencies."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Makefile", "make"]
prereqs: ["shell-scripting"]
related: ["shell-scripting", "build-artifact", "ci-pipeline", "dev-containers"]
---

A Makefile defines named tasks, called targets, and the targets they depend on. Running `make` builds the target you ask for, first building its dependencies. Make also skips work when the files a target depends on haven't changed, which is why it's used for builds, though it's just as handy for everyday tasks.

```make
build: prepare
	echo building

prepare:
	echo preparing

clean:
	rm -rf out
```

Running `make build` prints `preparing` and then `building`, because `build` depends on `prepare`. Each recipe line must start with a tab character. Spaces in its place fail with a "missing separator" error, which is the most common Makefile surprise.

The trade-off is syntax. Make's rules around tabs, variables and file timestamps are old and easy to get wrong, and a Makefile can be harder to read than a plain script. For tasks that don't involve files, a task runner or a [shell script](/t/shell-scripting) may be clearer.

The classic mistake is writing targets that don't create the file they name, so Make reruns them every time, or the reverse, relying on file timestamps for targets that should always run. Declare non-file targets as `.PHONY`, and keep recipes short. The same targets can be called from a [CI pipeline](/t/ci-pipeline), which keeps local and automated runs identical. Build outputs are described in [build artifacts](/t/build-artifact).
