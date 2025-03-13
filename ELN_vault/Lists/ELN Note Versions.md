---
ELN version: 0.5.0
cssclasses:
  - wide-page
date created: 2023-05-14
author: Frieder Scheiba
note type: ELN-versions-list
tags:
  - list
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

## Notes

The following table shows the ELN version, author, note type and modification date of the notes in your vault.

```dataview
TABLE WITHOUT ID
  file.link as Note, 
  eln-version as "ELN Version",
  author as "Author",
  note-type as " Note Type",
  dateformat(file.mtime, "yyyy-MM-dd") as "last modified"
WHERE eln-version
SORT eln-version, DESC
```

#### Notes without ELN Information

```dataview
TABLE WITHOUT ID
  file.link as Note, 
  note-type as "Note Type",
  file.mtime as modified,
  file.ctime as created 
FROM !"assets"
WHERE !eln-version
SORT note-type, file.ctime DESC
```

## Templates

The following table shows the modification and creation date of all templates in the template folder.

```dataview
TABLE WITHOUT ID
  file.link as Template, 
  file.mtime as modified,
  file.ctime as created 
FROM "assets/templates"
SORT file.mtime DESC
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```