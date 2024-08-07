---
ELN version: 0.3.2
cssclass: wide-page
date created: 2023-03-11
author: Frieder Scheiba
note type: project-list
tag: list/projects
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```button
name New Project
type command
action Templater: Insert assets/templates/New Project.md
class accent-button
```

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link as Project, 
  author as Author, 
  project.start as Start,
  project.end as End,
  project.type as Type, 
  date-created as Date
FROM #project 
WHERE project.status = "active"
```

## Completed Projects

```dataview
TABLE WITHOUT ID
  file.link as project, 
  author as Author, 
  project.start as Start,
  project.end as End,
  project.type as Type, 
  date-created as Date
FROM #project 
WHERE project.status = "completed"
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
