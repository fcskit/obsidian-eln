---
ELN version: 0.3.2
cssclass: wide-page
date created: 2023-05-25
author: Frieder Scheiba
note type: contact-list
tag: list/contacts
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```button
name New Contact
type command
action Templater: Insert assets/templates/New Contact.md
class accent-button
```

```dataview
TABLE WITHOUT ID
  file.link as Contact,
  contact.work.email as Email,
  contact.work.phone as Phone, 
  address.work.building as Building, 
  address.work.room as Room
FROM #contact AND !"assets"
SORT file.link ASC
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
