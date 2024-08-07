---
ELN version: 0.3.2
cssclass: wide-page
date created: 2023-03-27
author: Frieder Scheiba
note type: analysis-list
tag: list/analysis
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```dataview
TABLE WITHOUT ID
  file.link as Analysis, 
  project.name as Project,
  analysis.method as Method, 
  file.ctime as Created,
  file.mtime as Modified
FROM #analysis AND !"assets"
SORT project.name, sample.name, analysis.method ASC
```


```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```