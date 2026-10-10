---
title: "Text Processing (sed, awk, cut, sort)"
summary: "Command-line tools for slicing and transforming text."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["sed", "awk", "grep", "cut and sort"]
prereqs: ["basic-shell-commands"]
related: ["regular-expression", "unix-philosophy", "shell-scripting", "json-lines"]
---

Unix ships small tools that each do one thing and pass text to the next. Together they handle most log-tailing, one-off reports and data munging without opening an editor.

```sh
cut -d, -f1,3 report.csv               # columns 1 and 3 of a CSV
sort counts.txt | uniq -c              # count duplicate lines
awk -F, '$3 > 100 { print $1 }' report.csv   # filter rows by a field
sed 's/old/new/g' config.txt           # replace text
grep -i "timeout" app.log | wc -l      # count matching lines
```

The strength is composition: every command reads standard input and writes standard output, so you chain them with `|`. That's the [Unix philosophy](/t/unix-philosophy) in practice.

Frontend engineers meet these when slicing build output and asset lists; data engineers for shaping exports and quick sanity checks; backend engineers for logs and metric dumps.

The classic mistakes:

- **Trusting a naive parser.** `cut` and `awk -F,` break on CSV fields that contain the delimiter inside quotes. Use a real CSV library for real data.
- **Using `sed` on structured data.** Editing JSON or XML with regex is fragile; use `jq` for JSON. See [JSON lines](/t/json-lines).
- **Forgetting sort order.** `sort` respects the locale, so it can behave differently across machines. Set `LC_ALL=C` for byte order, or sort with explicit keys: `sort -t, -k3 -n`.
- **Regex surprises.** Special characters and greediness trip people up; check [regular expressions](/t/regular-expression).

**When not to use them:** once the logic needs loops, state or error handling, move to a script or a real language. A pipeline is great for a line or two of transformation, not a program. See [shell scripting](/t/shell-scripting).
