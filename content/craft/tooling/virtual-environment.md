---
title: "Virtual Environment"
summary: "An isolated set of packages per project, as with Python's venv."
levels: { backend: junior, data-engineer: junior }
aliases: ["venv", "virtualenv", "Python virtual environment", "conda environment"]
prereqs: ["package-manager", "version-manager"]
related: ["package-manager", "lockfile", "dependency", "dev-environment-setup", "path-variable"]
---

A virtual environment is an isolated set of installed packages for one project. Without one, every Python project installs into the same global place, and versions collide: project A needs `requests 2.20`, project B needs `2.32`.

```sh
python -m venv .venv                 # create it in the project folder
source .venv/bin/activate            # activate (Windows: .venv\Scripts\activate)

pip install requests                 # installs into .venv only
pip freeze > requirements.txt        # record what's installed

deactivate                           # leave it
```

Activation puts the environment's `bin` folder first on your [PATH](/t/path-variable), so `python` and `pip` now refer to the project's own copies.

## Why use one

- **Each project gets its own versions** of its dependencies.
- **Reproducible setup**: others recreate it from a requirements or lock file ([lockfile](/t/lockfile)).
- **Nothing touches the system Python**, which tools may rely on.
- **Easy to throw away**: delete the folder and start fresh.

## Related tools

| Tool | Notes |
|---|---|
| `venv` | built into Python |
| `virtualenv` | older, more features |
| `uv`, Poetry, Pipenv | create and manage environments plus dependency locking |
| conda | environments that include non-Python packages (popular in data science) |

Node's equivalent is the project-local `node_modules` folder. Containers isolate even more, including system libraries ([dev containers](/t/dev-containers)). A [version manager](/t/version-manager) chooses which Python itself to use.

## Habits

- **One environment per project**, created in or near the project.
- **Don't commit the folder** (add `.venv/` to [.gitignore](/t/gitignore)). Commit the requirements instead.
- **Check which Python is active** (`which python`) when something "isn't installed".
- **Never `sudo pip install`** to get around errors.
- Recreate it when dependencies drift.
