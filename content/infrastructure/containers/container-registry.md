---
title: "Container Registry"
summary: "Where images are stored and pulled from."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Docker registry", "image registry", "Docker Hub"]
prereqs: ["docker-image"]
related: ["docker-image", "image-tags", "dockerfile", "image-scanning", "oci", "docker"]
---

A container registry is a server that stores [images](/t/docker-image) so they can be shared. You build an image once, **push** it to a registry, and any machine with access can **pull** it and run it.

Well-known examples are Docker Hub (the default for Docker), GitHub Container Registry, and the registries run by the main cloud providers. Companies often run a private one.

An image name tells you where it lives:

```
registry.example.com/team/api:1.4.2
└── registry ───────┘ └─repo──┘ └tag┘
```

If no registry is given, Docker assumes Docker Hub (`python:3.12` means an image from Docker Hub's library of official images).

```sh
docker build -t registry.example.com/team/api:1.4.2 .
docker login registry.example.com
docker push registry.example.com/team/api:1.4.2

# on a server, in CI, or on a teammate's laptop:
docker pull registry.example.com/team/api:1.4.2
```

## How it fits in a workflow

CI builds the image from a [Dockerfile](/t/dockerfile), pushes it to the registry, and the deployment tool pulls exactly that image on the servers.

## Things to watch

- **Tags can move.** `:latest` or `:1.4` can point to a different image tomorrow. Deploy a specific version tag, or an image digest for exact reproducibility. See [image tags](/t/image-tags).
- **Public means public.** Anything pushed to a public repository is readable by everyone, so never bake secrets into an image.
- Pulling from unknown publishers is like running unknown code. Prefer official or verified images, and scan them. See [image scanning](/t/image-scanning).
- Rate limits and outages. Public registries can limit anonymous pulls; many teams mirror or host their own for reliability.
