---
ELN version: 0.5.0
cssclasses:
  - wide-page
date created: 2023-03-27
author: Frieder Scheiba
note type: process-list
tags:
  - list/processes
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```button
name New Process
type command
action Templater: Insert assets/templates/New Process.md
class accent-button
```

```dataview
TABLE WITHOUT ID
  file.link as Process, 
  process.type as Type,
  process.devices as Devices,
  date-created as Date
FROM #process AND !"assets"
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
