---
title: "Multi-Stage Build"
summary: "Building in one stage and shipping a small final image."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["Docker multi-stage build", "multistage Dockerfile", "multi-stage Dockerfile", "builder pattern"]
prereqs: ["dockerfile", "image-layers"]
related: ["dockerfile", "docker-image", "minimal-base-images", "image-layers", "image-scanning", "non-root-containers"]
core: [backend]
---

A **multi-stage build** uses **several `FROM` stages in one Dockerfile**: you build the app in a big "builder" stage that has compilers and tools, then copy **only the finished output** into a small final stage. The shipped image contains just what's needed to run, not the tools used to build.

```dockerfile
# Stage 1: build (large image with the full toolchain)
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime (small image, only what's needed to serve)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

Only the last stage becomes the image. The `node:20` layers, the `node_modules` folder and the source code never reach it.

For compiled languages, the effect is dramatic:

```dockerfile
FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /out/server ./cmd/server

FROM gcr.io/distroless/static     # a minimal base with almost nothing in it
COPY --from=build /out/server /server
ENTRYPOINT ["/server"]
```

## Why it matters

- **Smaller images**: faster to push, pull and start, and cheaper to store ([minimal base images](/t/minimal-base-images)).
- **Smaller attack surface**: no compilers, package managers or shells for an attacker to use, and fewer packages with vulnerabilities ([image scanning](/t/image-scanning)).
- **One Dockerfile** replaces separate build scripts and fragile cleanup tricks.
- **No secrets or source left in layers**, as long as you don't copy them across (but still don't put secrets in build args).
- **Better caching**: order steps so dependency installation is cached ([image layers](/t/image-layers)).

## Tips

- **Name your stages** (`AS build`) and use `COPY --from=build` to pull in exactly the files you need.
- **Copy dependency manifests first** and install, then copy the rest, so changing source doesn't invalidate the dependency layer.
- **Use separate stages for tests** or linting (`FROM build AS test`), and build a specific target with `docker build --target test .`.
- **Run as a non-root user** in the final stage ([non-root containers](/t/non-root-containers)).
- **Pin base image versions** rather than `latest` ([image tags](/t/image-tags)).
- Make sure the final image has what the app needs at runtime (certificates, timezone data, shared libraries). Too-minimal images can fail in confusing ways.

It's one of the easiest wins in [Dockerfile](/t/dockerfile) practice.
