---
title: "Hot Reloading in Containers"
summary: "Seeing code changes instantly while developing in Docker."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["docker hot reload", "live reload in docker", "docker dev environment"]
prereqs: ["bind-mount-vs-volume", "docker"]
related: ["hot-module-replacement", "dev-server", "docker-compose", "vite", "build-tool"]
---

Developing inside Docker shouldn't mean rebuilding the image on every keystroke. **Hot reloading** gives you the same instant feedback you get locally: save a file and the running app updates.

The recipe has two parts:

1. **Mount your source into the container** so it sees your edits — a [bind mount](/t/bind-mount-vs-volume).
2. **Run a dev server** that watches files and reloads, like [hot module replacement](/t/hot-module-replacement) in a frontend [dev server](/t/dev-server).

```yaml
# docker-compose.yml
services:
  web:
    build: .
    command: npm run dev
    ports: ["3000:3000"]
    volumes:
      - .:/app
      - /app/node_modules   # keep the image's deps, don't shadow them
```

That last line is the important one. Mounting `.` over `/app` also hides the `node_modules` installed while building the image. An anonymous volume at that path keeps the container's own copy in place, so the host's dependencies don't overwrite the container's.

The classic mistakes:

- **Using the production image for dev.** A compiled, optimized build won't watch files. Make a dev target, or override the command.
- **Forgetting the mount**, so edits land on the host while the container keeps running old code.
- **File watching across operating systems.** On macOS and Windows the host filesystem events may not reach the container, so the watcher never fires; enable polling (for example a watch option or `CHOKIDAR_USEPOLLING`). Slower, but reliable.
- **Mounting a huge directory**, which makes the build context and file watching slow.

Keep this setup for development only. In production you bake the code into the image and run the built artifact, with no source mounts. Tools like [Vite](/t/vite) are built around this dev-versus-prod split; see [build tools](/t/build-tool).
