---
ELN version: 0.3.2
cssclass: wide-page
date created: 2023-05-14
author: Frieder Scheiba
note type: ELN-versions-list
tag: list
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

## Notes

The following table shows the ELN version, author, and modification date of the template on which the notes in your vault are based.

```dataview
TABLE WITHOUT ID
  file.link as Note, 
  eln-info.template as Template,
  eln-info.version as "Templ. Version",
  eln-info.author as "Templ. Author",
  note-type as " Note Type",
  dateformat(file.mtime, "yyyy-MM-dd") as "last modified"
WHERE eln-info.version
SORT eln-info.version, DESC, eln-info.template ASC
```

#### Notes without ELN Information

```dataview
TABLE WITHOUT ID
  file.link as Note, 
  note-type as "Note Type",
  file.mtime as modified,
  file.ctime as created 
FROM !"assets" AND !"Notes"
WHERE !eln-info.version
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