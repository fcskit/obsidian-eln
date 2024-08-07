---
ELN version: 0.3.2
cssclass: wide-page
date created: 2023-03-11
author: Frieder Scheiba
note type: meeting-list
tag: list/meeting
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

```dataview
TABLE WITHOUT ID
  meeting.date as Date,
  "[["+ file.name +"|"+ meeting.title +"]]" as Meeting,
  meeting.topics.title as Topics,
  meeting.type as Type
FROM #meeting AND !"assets"
SORT file.ctime DESC
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
