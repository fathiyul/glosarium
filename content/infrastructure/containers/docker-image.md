---
title: "Image"
summary: "A read-only template that containers are created from."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Docker image", "container image", "image"]
prereqs: ["container"]
related: ["container", "dockerfile", "image-layers", "image-tags", "container-registry", "oci", "union-filesystem"]
---

An image is a read-only template that contains everything needed to run a program: a minimal file system, your code, its dependencies and the default command. A [container](/t/container) is a running instance of an image. One image can start any number of containers, and all start from the same state.

An image is built in [layers](/t/image-layers) from a [Dockerfile](/t/dockerfile), then stored under a name and tag in a [registry](/t/container-registry).

```sh
docker build -t myapp:1.0 .      # create an image
docker images                    # list local images
docker run myapp:1.0             # start a container from it
docker pull postgres:16          # download one from a registry
docker rmi myapp:1.0             # delete a local image
```

A useful comparison: the image is like a class (or a recipe), the container is like an object (or a meal made from it). Changing a running container doesn't change the image.

## Names, tags and digests

`myapp:1.0` is a name plus a **tag**. Tags are labels that can be moved to a different image later, so `:latest` can mean different things on different days. A **digest** (`myapp@sha256:...`) points at exactly one image and never changes. See [image tags](/t/image-tags).

## Practical points

- **Build once, run anywhere.** The same image goes from CI to staging to production, which removes "different on the server" bugs.
- **Smaller is better**: faster pulls and fewer things to attack. See [minimal base images](/t/minimal-base-images).
- Everything in the image can be read by anyone who gets the image. Don't bake in secrets.
- Images contain third-party packages that may have known vulnerabilities; scan them. See [image scanning](/t/image-scanning).
