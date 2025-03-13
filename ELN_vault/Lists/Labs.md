---
ELN version: 0.5.0
cssclasses:
  - wide-page
date created: 2023-05-25
author: Frieder Scheiba
note type: lab-list
tags:
  - list/lab
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```button
name Add Lab
type command
action Templater: Insert assets/templates/New Lab.md
class accent-button
```

## Building 421

```dataview
TABLE WITHOUT ID
  file.link as Lab, 
  lab.name as Name,
  lab.type as Type,
  lab.building as Building,
  lab.room as Room,
  lab.contact as Contact
FROM #lab WHERE lab.building = 421
SORT file.link ASC
```

## Building 321

```dataview
TABLE WITHOUT ID
  file.link as Lab, 
  lab.name as Name,
  lab.type as Type,
  lab.building as Building,
  lab.room as Room,
  lab.contact as Contact
FROM #lab WHERE lab.building = 321
SORT file.link ASC
```


```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
