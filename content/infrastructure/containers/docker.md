---
title: "Docker"
summary: "The most common tool for building and running containers."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Docker", "docker container", "Docker Engine", "Docker CLI", "dockerize"]
prereqs: ["container", "basic-shell-commands"]
related: ["dockerfile", "docker-image", "docker-compose", "docker-volume", "port-mapping", "container-vs-vm"]
core: [backend]
---

**Docker** is the most widely used tool for building and running **containers**: packaged applications that carry their dependencies
with them and run isolated from the rest of the system. "It works on my machine" becomes "it works wherever the
container runs".

Two concepts to keep apart:

- An **image** is the packaged, read-only template: your code, runtime and libraries ([Docker image](/t/docker-image)).
- A **container** is a running instance of an image ([container](/t/container)).

A simple `Dockerfile` describes how to build an image:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

(See [Dockerfile](/t/dockerfile).)

## Everyday commands

```sh
docker build -t myapp .                  # build an image from the Dockerfile in this folder
docker run -p 8080:8000 myapp            # run it, mapping host port 8080 to container port 8000
docker run -d --name web myapp           # run in the background
docker ps                                # list running containers  (-a: include stopped)
docker logs -f web                       # view output
docker exec -it web sh                   # open a shell inside it
docker stop web && docker rm web
```

## Things to know early

- **Containers are disposable.** Their filesystem disappears when the container is removed. Keep data you need in a
  [volume](/t/docker-volume) or an external database ([ephemeral filesystem](/t/ephemeral-filesystem)).
- **Ports must be published** (`-p host:container`) to be reachable from outside ([port mapping](/t/port-mapping)). Inside the container,
  a server should listen on `0.0.0.0`, not `127.0.0.1`.
- **Layers are cached.** Order Dockerfile steps from least to most frequently changed (install dependencies before copying your source),
  so rebuilds are fast ([image layers](/t/image-layers)).
- **Add a `.dockerignore`** to keep `.git`, `node_modules` and local `.env` files out of the image.
- **Don't bake secrets into images.** They stay in the layers. Pass them at run time.
- Use [Docker Compose](/t/docker-compose) to run an app with its database and other services together.
- A container isn't a virtual machine: it shares the host's kernel ([containers vs VMs](/t/container-vs-vm)).

Docker is one implementation of a standard ([OCI](/t/oci)). Other tools can run the same images.
