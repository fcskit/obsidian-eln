---
ELN version: 0.4.2
cssclass: normal-page
date created: 2024-07-17
author: Frieder Scheiba
note type: contact
tag: contact
name:
  title:
  given name: Joe
  family name: Public
contact:
  work:
    email: joe.public@something.edu
    phone: +01 xxx xxx xxx
    mobile: 
    fax: +01 xxx xxx xxx
address:
  work:
    affiliation: Affiliation XYZ
    division: Institute for Science
    street: Science Plaza 1
    building: 100
    room: 42
    city: City
    zip code: XXXXX
    country: Country
job position: Position
group: Group
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/contact", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
