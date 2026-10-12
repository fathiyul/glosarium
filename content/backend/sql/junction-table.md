---
title: "Junction Table"
summary: "A table linking two others in a many-to-many relationship."
levels: { backend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["join table", "bridge table", "associative table"]
prereqs: ["relationship-types"]
related: ["relationship-types", "constraint", "schema"]
---

A junction table links two other tables in a many-to-many relationship. A student can take many courses, and a course has many students, so neither table can hold a single foreign key to the other. The junction table holds one row for each pairing.

```sql
CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE courses  (id INTEGER PRIMARY KEY, title TEXT NOT NULL);

CREATE TABLE enrollments (
  student_id  INTEGER NOT NULL REFERENCES students(id),
  course_id   INTEGER NOT NULL REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);
```

The composite primary key stops the same student being enrolled in the same course twice. The junction table can also carry data about the link itself, such as an `enrolled_at` date or a grade.

The classic mistake is storing a list of IDs in one column, such as `course_ids = '3,7,12'`. You can't enforce foreign keys on that, and every query has to parse the string. Use a junction table so the database can check each link.
