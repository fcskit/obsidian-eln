---
ELN version: 0.4.2
cssclass: wide-page, dashboard
banner: "![[obsidian-eln-banner.png]]"
banner_y: 0.336
date created: 2023-03-25
author: Frieder Scheiba
note type: dashboard
tag: dashboard
---

<div class="title" style="color:#edf">HOME</div>


# Work
- ### [[Projects]]
  ```dataview
  LIST
  FROM #project
  WHERE project.status = "active"
  ```

- ### [[Lists]]
	- [[Processes]]
	- [[Samples]]
	- [[Analyses]]
	- [[Chemicals]]
	- [[Devices]]
	- [[Instruments]]

- ### [[Meetings]]
  ```dataview
  LIST
  FROM #meeting AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Daily Notes]]
  ```dataview
  LIST
  FROM #daily-note  AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ``` 

- ### Literature
	 - [[Books]]
	 - [[Publications]]

- ### [[Notes]]
  ```dataview
  LIST
  FROM "Notes" AND !"assets"
  WHERE note-type != "tutorial"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### Tutorials
   - [[Get started with Obsidian]]
   ```dataview
        LIST
        FROM "Notes"
        WHERE note-type = "tutorial"
        SORT file.mtime.ts ASC
        LIMIT 4
   ``` 

- ### Miscellaneous
	 - [[Electrochemical Glossary]]
	 - [[Conferences]]


# Recently Edited
- 
  ```dataviewjs
    dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").slice(0, 5).file.link)
   ```
- 
  ```dataviewjs
    dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").slice(5, 10).file.link)
   ```
- 
  ```dataviewjs
    dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").slice(10, 15).file.link)
   ```


# Open Tasks

```dataviewjs

const querry=dv.pages('!"assets" AND !"Notes/HowTos"').file.tasks
     .where(t => !t.completed && !t.checked)

// console.log(JSON.stringify(querry))

var note_list = querry.map(t => t.path).values
note_list = Array.from(new Set(note_list)).sort()
const n_notes = note_list.length

var index = 0
if (n_notes >= 3) {
    dv.taskList(querry.where(q => { return q.path === note_list[index + 0] || q.path == note_list[index + 1] || q.path == note_list[index + 2] } ))
    index += 3
    if (n_notes >= 6) {
        dv.taskList(querry.where(q => { return q.path === note_list[index + 0] || q.path == note_list[index + 1] || q.path == note_list[index + 2] } ))
        index += 3
        if (n_notes >= 9) {
            dv.taskList(querry.where(q => { return q.path === note_list[index + 0] || q.path == note_list[index + 1] || q.path == note_list[index + 2] } ))
            index += 3
            if (n_notes >= 12) {
                dv.taskList(querry.where(q => { return q.path === note_list[index + 0] || q.path == note_list[index + 1] || q.path == note_list[index + 2] } ))
                index += 3
            }    
        }
    }
}
const remaining_notes = n_notes % 3
if (remaining_notes == 1) {
    dv.taskList(querry.where(q => { return q.path === note_list[index + 0]  } ))
} else if (remaining_notes == 2) {
    dv.taskList(querry.where(q => { return q.path === note_list[index + 0] || q.path === note_list[index + 1] } ))
}
```

# Vault Info

- ### 〽️ Stats
	-  File Count: **`$=dv.pages().length`**
	-  Number of Samples: **`$=dv.pages('#sample AND !"assets"').length`**
	-  Number of Analsyes: **`$=dv.pages('#analysis AND !"assets"').length`**
	-  Number of Processes: **`$=dv.pages('#process AND !"assets"').length`**



```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
