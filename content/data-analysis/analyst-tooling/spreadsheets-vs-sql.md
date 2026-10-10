---
title: "Spreadsheets vs SQL"
summary: "When the spreadsheet is the right tool and when it quietly stops being one."
levels: { data-analyst: junior }
aliases: ["spreadsheet vs SQL", "SQL or spreadsheet", "when to use SQL", "spreadsheet versus SQL"]
prereqs: ["sql", "spreadsheet-formulas"]
related: ["query-version-control", "ad-hoc-analysis", "self-service-analytics", "data-warehouse", "pivot-table"]
---

Both answer questions from a table of rows. The choice is really about what happens after the question is answered.

A spreadsheet is better for **exploration**. You can see the numbers, try an assumption, sort, filter, draw a chart and change your mind in seconds, with a stakeholder watching over your shoulder. For a one-off model, a small what-if, or a table a person will read, a grid is often the fastest honest path, and it is already open on their screen. Non-technical colleagues can also check your work in it, which is worth more than it sounds.

SQL is better for anything repeated, large, or in need of review. A query runs the same way every time against fresh data; a workbook has to be re-pointed at new data by hand. A query is text, so it can be reviewed, versioned and compared line by line ([query version control](/t/query-version-control)); a workbook's logic is spread across cells, hidden sheets and number formats. And a spreadsheet loads what it needs into the machine in front of you, which is fine for thousands of rows and painful for millions — a query leaves that work to the database ([data warehouse](/t/data-warehouse)).

The classic failure is the workbook **nobody dares change**: twenty tabs, a total in one tab referencing a hard-coded number in another, and exactly one person who remembers which cell to edit. It began as a quick analysis and quietly became infrastructure.

A reasonable split: explore in the spreadsheet, and when the answer has to be produced again, or someone outside the room has to trust it, rewrite it as a query and keep the workbook as a scratch pad ([ad hoc analysis](/t/ad-hoc-analysis)). Handing the result to self-service users usually means publishing the query, not the file ([self-service analytics](/t/self-service-analytics)).
