---
title: "Task Runner / Project Scripts"
summary: "Named project commands, like npm scripts or a justfile."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["project scripts", "justfile", "Makefile", "npm scripts"]
prereqs: ["shell"]
related: ["npm-scripts", "build-tool", "makefile", "continuous-integration", "dev-environment-setup"]
---

A task runner gives your project's common commands short names, so everyone runs the same steps the same way: set up, test, lint, build, start. Instead of remembering `pytest -q --cov=app tests/ && ruff check .`, you type `make test`.

```make
# Makefile
.PHONY: setup test lint run

setup:
	pip install -r requirements.txt

test:
	pytest -q

lint:
	ruff check .

run:
	python -m app
```

```sh
make setup
make test
```

Other options:

- **npm scripts** in `package.json` for JavaScript ([npm scripts](/t/npm-scripts)).
- **`just`** (a `justfile`), a simple modern command runner.
- **`task`** (Taskfile), **`invoke`**, or **`nox`** and **`tox`** in Python.
- **Shell scripts** in a `scripts/` folder.

## Why it helps

- **One discoverable entry point**: a newcomer runs `make` or `npm run` and sees what's available ([dev environment setup](/t/dev-environment-setup)).
- **CI and local use the same commands**, so a failure reproduces on your machine ([continuous integration](/t/continuous-integration)).
- **Documented by existing**: the file records how things are done.
- **Dependencies between tasks** (`test` needs `build`), in tools that support it.

## Tips

- **Use conventional names**: `setup`, `dev`, `test`, `lint`, `build`.
- **Keep tasks thin.** If one grows large, move it into a script.
- **Mind portability.** Makefiles need tabs, and shell syntax differs on Windows.
- **Document the list** in the README.
- Don't hide dangerous actions behind innocent names. A `make clean` that wipes a database is a trap.

See [build tools](/t/build-tool) and [Makefile](/t/makefile).
