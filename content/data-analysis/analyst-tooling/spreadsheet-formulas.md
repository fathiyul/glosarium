---
title: "Spreadsheet Formulas"
summary: "The cells that recalculate, and the ones that quietly stop being true."
levels: { data-analyst: junior }
aliases: ["spreadsheet formula", "cell formula", "formulas in spreadsheets", "spreadsheet function"]
prereqs: ["group-by", "sql"]
related: ["pivot-table", "lookup-functions", "spreadsheets-vs-sql", "data-cleaning"]
---

A formula is a cell that computes from other cells, so when an input changes the output follows. That is what makes a spreadsheet useful for exploring a number: change the assumption and the result moves. A cell holding a pasted value does not follow — it stays exactly where it was, which is sometimes what you want and often what you get by accident.

The recurring shapes are arithmetic across a row, an aggregate over a range, a lookup into another table ([lookup functions](/t/lookup-functions)), a conditional that returns different values by rule, and date arithmetic. Names, argument order and how text and blanks are treated differ between spreadsheet programs and between versions of the same program, so check the tool in front of you rather than trusting a name you learned somewhere else.

The classic mistake is **a formula that quietly stops being true**. **Sorting a range** breaks relative references, so a row can end up reading a different row's data with nothing visible changing. Filling a formula down two rows short leaves a gap that reads as zero. Pasting values over a range replaces formulas with constants, so the model stops responding to its inputs. The fix for that last one is to keep the formula in one cell and reference it, and to use an absolute reference when a formula should keep pointing at one constant while it is copied — most products have a syntax for exactly this.

One habit catches most of these: after editing, check that a total still equals the sum of its parts. When a spreadsheet grows past the point where you can check it that way, the logic belongs in a query that can be read top to bottom ([spreadsheets vs SQL](/t/spreadsheets-vs-sql)) or in a [pivot](/t/pivot-table) whose layout is visible on screen.
