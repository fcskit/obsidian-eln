---
ELN version: 0.5.0
cssclasses:
  - wide-page
date created: 2023-03-11
author: Frieder Scheiba
note type: meeting-list
tags:
  - list/meeting
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```button
name New Meeting
type command
action Templater: Insert assets/templates/New Meeting.md
class accent-button
```


## 2024

```dataview
TABLE WITHOUT ID
  meeting.date as Date,
  "[["+ file.name +"|"+ meeting.title +"]]" as Meeting,
  meeting.topics.title as Topics,
  meeting.type as Type
FROM #meeting AND !"assets"
WHERE file.ctime.year = 2024
SORT file.ctime DESC
```


## 2025

```dataview
TABLE WITHOUT ID
  meeting.date as Date,
  "[["+ file.name +"|"+ meeting.title +"]]" as Meeting,
  meeting.topics.title as Topics,
  meeting.type as Type
FROM #meeting AND !"assets"
WHERE file.ctime.year = 2025
SORT file.ctime DESC
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
