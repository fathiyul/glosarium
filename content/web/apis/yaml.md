---
title: "YAML"
summary: "A human-friendly data format common in configuration files."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["YAML Ain't Markup Language", ".yml", "yaml file"]
prereqs: ["json"]
related: ["json", "serialization", "app-configuration", "docker-compose", "infrastructure-as-code"]
---

YAML is a human-friendly data format, popular for configuration files (Docker Compose, Kubernetes, CI pipelines, many tools). It represents the same kind of data as [JSON](/t/json), using indentation instead of braces.

```yaml
name: shop-api
version: 1.4.0
debug: false
port: 8080
tags:
  - web
  - python
database:
  host: localhost
  port: 5432
  credentials:
    user: app
# a comment
```

The equivalent JSON would need braces, quotes and commas. YAML also supports comments, which JSON doesn't.

## Basics

- **Indentation** shows structure. Use spaces, never tabs.
- **Mappings** (`key: value`) are like dictionaries. **Lists** use `- item`.
- **Scalars** are guessed: numbers, booleans, null and strings.
- **Multi-line strings** with `|` (keep newlines) or `>` (fold them).
- **Anchors and aliases** (`&base`, `*base`) let you reuse blocks.

## The gotchas

YAML's convenience causes surprises:

- **Type guessing.** `no`, `yes`, `on`, `off` can be read as booleans in some versions (the "Norway problem": `NO` as a country code becomes `false`). `1.10` becomes the number 1.1. A leading zero or a value like `1e3` may be interpreted as a number. **Quote strings** when in doubt: `version: "1.10"`, `country: "NO"`.
- **Indentation errors** change meaning, or break parsing.
- **Empty values** are null.
- **Colons in strings** need quoting (`title: "Note: read this"`).
- **Security**: some parsers can construct arbitrary objects. Use safe loaders (`yaml.safe_load` in Python).
- **Big files get hard to read.** Splitting or using templates helps.

```python
import yaml
config = yaml.safe_load(open("config.yaml"))
```

Validate configuration against a schema where possible, and use a linter (such as yamllint). For machine-to-machine data, JSON is stricter and less ambiguous ([JSON](/t/json)).
