---
title: "jq"
summary: "A command-line JSON processor."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["jq tool", "JSON processor"]
prereqs: ["shell-scripting"]
related: ["shell-scripting", "http-headers", "json-lines", "api-documentation"]
---

jq is a command-line tool for reading, filtering and transforming JSON. It takes a filter expression and applies it to the input, which lets you pull out fields, reshape records and compute totals in a shell pipeline without writing a script.

These examples were run against a small file of users:

```sh
jq '.users[] | {name, age}' users.json
jq -r '.users | map(select(.age > 40)) | .[].name' users.json
jq '[.users[].age] | add / length' users.json
```

The first prints each user's name and age, the second prints the names of users over 40, and the third prints the average age. The `-r` flag prints raw strings without quotes, which suits later stages in a pipeline.

The trade-off is that filters can become dense and hard to read, and jq's behaviour on malformed or unexpectedly typed data can surprise you. It works best for quick queries and small transformations. For larger data handling, use a language with proper types.

The classic mistake is building a pipeline on jq output without checking that the input has the expected shape, so a missing field silently produces `null` instead of an error. Test filters on a small sample first, and use `//` to set defaults deliberately. Pipelines like these often live in a [shell script](/t/shell-scripting) that also checks exit codes.
