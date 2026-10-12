---
title: "Spreadsheets for Analysis"
summary: "The grid as a first analysis tool: sorting, filtering, pivots and formulas."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["spreadsheet analysis", "Excel analysis", "Google Sheets"]
prereqs: ["descriptive-analysis", "spreadsheet-formulas"]
related: ["pivot-table", "spreadsheet-formulas", "spreadsheets-vs-sql", "descriptive-analysis", "data-visualization"]
---

A **spreadsheet** is where most analysis starts and much of it stays: paste or import data, sort, filter, [pivot](/t/pivot-table), chart, share a link. For datasets that fit in memory and questions one person can hold in their head, nothing beats the grid's immediacy — every intermediate value visible, every change instantly recomputed.

```text
import CSV → clean with filters → pivot-table summary → chart → share link
(all visible, all undoable, all in one file)
```

Know its edges. Spreadsheets silently coerce types (gene names become dates, IDs lose leading zeros), break references on row moves, and hide logic in cell formulas nobody audits. Version control is filenames, and "final_v7_REAL" is a running joke because it keeps happening.

The classic mistakes:

- Analysis that outgrew the grid. Tens of thousands of rows with VLOOKUP chains recomputing on every keystroke — slow, fragile, unauditable. Past a few hundred thousand rows (or any need for repeatability), move to SQL (see [spreadsheets vs SQL](/t/spreadsheets-vs-sql)).
- No separation of raw and worked data. Editing the imported values in place destroys the ability to re-derive. Keep one untouched raw sheet; do all work on copies with [formulas](/t/spreadsheet-formulas) that show their logic.
- Copy-paste values without provenance. A number detached from its query and its date rots silently. Note source, extraction date and filters on the sheet itself.
- Sharing the file instead of the answer. A 40-tab workbook is not a deliverable. Summarise the finding up front; link the workbook as backup.

**When to graduate:** repeating the same spreadsheet monthly (automate the pipeline), joining more than a few tables (use a database), or sharing logic with others (versioned queries beat cell formulas). The spreadsheet remains the fastest scratchpad and the best last-mile presentation layer — just not the system of record.
