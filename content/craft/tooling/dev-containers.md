---
title: "Dev Containers"
summary: "A reproducible development environment defined as a container."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["devcontainer", "development container"]
prereqs: ["docker-image"]
related: ["docker-image", "dockerfile", "container", "onboarding-yourself"]
---

A dev container is a development environment defined as a container. The project includes a configuration file that describes the tools, language versions and editor extensions needed to work on it. Anyone who opens the project in a supporting editor gets the same environment, inside a container, without installing those tools by hand.

```json
// .devcontainer/devcontainer.json (illustrative)
{
  "name": "orders-service",
  "image": "mcr.microsoft.com/devcontainers/python:3.12",
  "postCreateCommand": "pip install -r requirements.txt"
}
```

The configuration is committed with the code, so the environment is versioned along with it. A new team member can start working in minutes rather than spending a day setting up.

The trade-off is that containers need a runtime on each machine, and they can run slowly on some systems, particularly for file-heavy work. Changing the environment means rebuilding the container, which takes time. The setup also adds one more file to keep current.

The classic mistake is letting the dev container drift from production. If the development image uses a different database version or operating system, bugs that appear only in production will be hard to reproduce. Keep the versions aligned, and treat the container definition as part of the project. For the image that a dev container is built from, see [Dockerfile](/t/dockerfile), and for onboarding without a container, [onboarding yourself](/t/onboarding-yourself).
