---
title: "Docker Compose"
summary: "Running multi-container setups from one YAML file."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["compose", "docker-compose.yml", "compose file"]
prereqs: ["docker", "yaml"]
related: ["docker", "dockerfile", "docker-volume", "port-mapping", "container-networking", "environment-variable", "container-logs"]
---

Docker Compose defines and runs a multi-container app from one YAML file. Instead of typing several long `docker run` commands, you describe the services once and start everything together. It is mostly used for local development and small setups.

```yaml
# compose.yaml
services:
  api:
    build: .                      # build from the Dockerfile in this folder
    ports:
      - "8000:8000"               # host:container
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - dbdata:/var/lib/postgresql/data

volumes:
  dbdata:
```

```sh
docker compose up -d        # create and start everything in the background
docker compose logs -f api  # follow one service's logs
docker compose down         # stop and remove containers (named volumes stay)
```

## Things worth knowing

- **Services reach each other by name.** Compose puts them on a shared network, so the API connects to host `db`, not `localhost`. See [container networking](/t/container-networking).
- **The volume keeps the database.** Without it, the data is lost when the container is removed. See [volumes](/t/docker-volume). `docker compose down -v` deletes volumes too.
- **`depends_on` controls start order, not readiness.** The database container may be started before it can accept connections, so your app needs to retry or use a health check.
- **Don't commit real secrets** in the file. Use an `.env` file that is git-ignored, or a secrets mechanism.

For running containers across many machines in production, teams usually move to an orchestrator. See [container orchestration](/t/container-orchestration).
