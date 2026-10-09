---
title: "Dockerfile"
summary: "The recipe for building an image."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Dockerfile instructions", "docker build"]
prereqs: ["docker-image"]
related: ["docker-image", "image-layers", "multi-stage-build", "entrypoint-cmd", "minimal-base-images", "non-root-containers", "docker-compose"]
---

A Dockerfile is a text file of instructions that `docker build` follows to create an [image](/t/docker-image). Each instruction adds a [layer](/t/image-layers).

```dockerfile
FROM python:3.12-slim          # start from a base image
WORKDIR /app                   # set the working directory
COPY requirements.txt .        # copy only the dependency list first
RUN pip install --no-cache-dir -r requirements.txt
COPY . .                       # then copy the rest of the code
EXPOSE 8000                    # documents the port; doesn't publish it
CMD ["python", "-m", "myapp"]  # default command when the container starts
```

```sh
docker build -t myapp:1.0 .    # build from the Dockerfile in this folder
docker run --rm -p 8000:8000 myapp:1.0
```

The main instructions: `FROM` (base image), `COPY` (add files), `RUN` (run a command while building), `ENV` (set variables), `CMD` and `ENTRYPOINT` (what runs at start; see [entrypoint vs CMD](/t/entrypoint-cmd)).

## The classic mistake: bad ordering

Docker caches each layer and reuses it if nothing above it changed. If you `COPY . .` before installing dependencies, every code edit invalidates the cache and reinstalls everything. Copying the dependency file first, installing, then copying the code keeps rebuilds fast.

## Other habits

- **Pin the base image version** (`python:3.12-slim`, not `latest`) for repeatable builds.
- **Keep secrets out.** Anything copied or set during the build stays in the image's layers, even if you delete it in a later step.
- **Use a `.dockerignore`** file to leave out `.git`, `node_modules` and local env files.
- **Don't run as root.** See [non-root containers](/t/non-root-containers).
- Smaller images build, ship and start faster. See [multi-stage builds](/t/multi-stage-build) and [minimal base images](/t/minimal-base-images).
