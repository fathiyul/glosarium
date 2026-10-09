---
title: "Language Version Manager"
summary: "Tools like nvm, pyenv or mise for switching language versions."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["nvm", "pyenv", "mise", "asdf", "runtime version manager"]
prereqs: ["package-manager", "dev-environment-setup"]
related: ["dev-environment-setup", "virtual-environment", "package-manager", "lockfile", "dev-containers"]
---

Different projects need different versions of a language or tool: one wants Node 18, another Node 22, an older one Python 3.9. A version manager lets you install several versions side by side and switch between them per project or per shell.

| Tool | For |
|---|---|
| `nvm`, `fnm`, `volta` | Node.js |
| `pyenv` | Python |
| `rbenv` | Ruby |
| `sdkman` | Java, Kotlin, Gradle and others |
| `asdf`, `mise` | many languages and tools through one interface |

```sh
nvm install 22
nvm use 22
node --version          # v22.x

pyenv install 3.12.4
pyenv local 3.12.4      # writes .python-version in this folder
```

## Pin the version in the project

Most managers read a small file in the repository, so everyone (and CI) uses the same version:

```
.nvmrc          →  22
.python-version →  3.12.4
.tool-versions  →  nodejs 22.4.0  python 3.12.4        (asdf, mise)
```

Also say it in the README and in `engines` in `package.json`. A mismatch is a common cause of "works on my machine" ([dev environment setup](/t/dev-environment-setup)).

## Version manager vs other tools

- **Version managers** choose the language or runtime version.
- **[Virtual environments](/t/virtual-environment)** and `node_modules` isolate a project's libraries, which are separate from the runtime.
- **[Dev containers](/t/dev-containers)** and Docker pin everything in an image, an alternative that also covers system packages.

## Tips

- **Don't use the system Python or Node** for projects. Updating the OS can break them.
- **Match production's version**, or at least the same major.
- Reinstall dependencies after switching versions.
- If a command isn't found after installing, open a new shell, or check that the manager's setup lines are in your shell profile.
