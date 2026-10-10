---
title: "ENTRYPOINT and CMD"
summary: "What runs when a container starts."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["docker entrypoint", "docker cmd", "entrypoint vs cmd"]
prereqs: ["dockerfile", "docker-image"]
related: ["docker", "graceful-degradation", "signal", "container-orchestration"]
---

Two instructions in a [Dockerfile](/t/dockerfile) decide what runs when a container starts: `ENTRYPOINT` and `CMD`. They're easy to confuse because both can hold a command.

- **`CMD`** sets a *default* command or its arguments. `docker run image something-else` replaces it.
- **`ENTRYPOINT`** sets the *executable*. Extra arguments on `docker run image --flag` are appended to it, not used to replace it.

They're often combined — the entrypoint is the program, the CMD its default arguments:

```dockerfile
ENTRYPOINT ["python", "app.py"]
CMD ["--port", "8000"]
```

`docker run myimage` runs `python app.py --port 8000`; `docker run myimage --port 9000` runs `python app.py --port 9000`.

Use the **exec form** (a JSON array) rather than the shell form. `CMD python app.py` wraps the command in `/bin/sh -c`, and the shell becomes PID 1. When the orchestrator sends `SIGTERM`, the shell may not forward it to `python`, so your app is killed hard instead of shutting down cleanly (see [signals](/t/signal) and [graceful shutdown](/t/graceful-shutdown)). Exec form makes your process PID 1, so signals and exit codes behave as expected.

The classic mistakes:

- Putting setup logic in `CMD` and then being puzzled when it vanishes because something overrode the command. Do setup at build time or in an entrypoint script.
- Using the shell form and losing signal handling and clean shutdown.
- Assuming `--entrypoint` is the normal override. It works with `docker run`, but it can't express complex commands; prefer a wrapper script.

Rule of thumb: `ENTRYPOINT` for the one thing the image *is*, `CMD` for what can reasonably vary.
