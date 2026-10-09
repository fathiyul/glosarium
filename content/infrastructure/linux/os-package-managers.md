---
title: "OS Package Managers (apt, dnf, brew)"
summary: "Installing system software."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["apt", "dnf", "brew", "yum", "apt-get"]
prereqs: ["package-manager"]
related: ["package-manager", "sudo-root", "linux", "dependency", "virtual-machine", "docker"]
---

An OS package manager installs, updates and removes system software from trusted repositories, and handles dependencies for you. Which one you use depends on the operating system:

| System | Tool |
|---|---|
| Debian, Ubuntu | `apt` |
| Fedora, RHEL and derivatives | `dnf` (older systems: `yum`) |
| Alpine | `apk` |
| macOS | `brew` (Homebrew, a third-party tool) |

```sh
# Debian/Ubuntu
sudo apt update              # refresh the list of available packages
sudo apt install nginx       # install (and its dependencies)
apt search redis             # find packages
sudo apt remove nginx        # uninstall

# Fedora/RHEL
sudo dnf install nginx

# macOS (no sudo needed)
brew install wget
```

Installing system-wide on Linux needs [root privileges](/t/sudo-root); Homebrew installs into your own area.

## Not the same as language package managers

pip, npm and cargo manage libraries for your project. OS package managers manage the system's own programs and shared libraries. See [package managers](/t/package-manager) for the general idea.

## Common mistakes

- **Forgetting to run `update` first**, then installing from a stale list.
- **Piping random scripts into a shell** (`curl ... | sudo bash`) when a vetted package exists.
- **Mixing sources** (adding unofficial repositories) until upgrades start breaking things.
- **Installing at "latest" in Dockerfiles** with no pinned version, so builds change over time. In containers, also clean the package cache in the same layer to keep images small.

Packages in distro repositories can be older than the project's newest release; that is a trade for stability.
