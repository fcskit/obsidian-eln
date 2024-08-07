---
ELN version: 0.3.2
cssclass: wide-page
date created: 2023-03-07
author: Frieder Scheiba
note type: publication-list
tag: list/publications
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```dataview
TABLE WITHOUT ID
  "[[" + file.name + "|" + title + "]]" as Title, 
  author[0] as "First Author", 
  publication as publication,
  dateformat(date, "yyyy") as Year
FROM "Literature/Publications"
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
