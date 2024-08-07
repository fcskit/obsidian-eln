---
ELN version: 0.3.2
cssclass: wide-page
date created: 2023-03-27
author: Frieder Scheiba
note type: note-list
tag: list/notes
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```button
name New Note
type command
action Templater: Insert assets/templates/New Note.md
class accent-button
```

```dataview
TABLE WITHOUT ID
  file.link as "Note", 
  author as Author,
  note-type as Type,
  date-created as Date
FROM "Notes"
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
