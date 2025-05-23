---
ELN version: 0.5.0
cssclass: note
date created: 2024-04-19
author: Frieder Scheiba
note type: how-to
tag:
  - " #note/how-to "
  - " #export"
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

# File Export

## Native PDF Export
Natively Obsidian only supports export to PDF files. The native pdf-export exports your rendered note as you see it in your editor including dynamic content of plugins like *dataview*.

Therefore, if you want to export your Obsidian ELN notes, this should be your preferred choice since these notes heavily rely on the dataview plugin to display metadata information.


## Enhancing Export Plugin

The [Enhancing Export](https://github.com/mokeyish/obsidian-enhancing-export) plugin offers a GUI to [pandoc](https://github.com/mokeyish/obsidian-enhancing-export), which is a universal document converter that allows you to convert markdown files to a variety of different formats, including docx, pptx, latex, pdf (via latex), html and many more.

The ELN vault comes preinstalled with this plugin and a set of custom pandoc word templates for manuscripts, reports and theses. There are corresponding markdown templates in the Writing folder ([[manuscript]], [[Report BMBF]], [[Master Thesis]]). 

To export them to word open the markdown template and choose `Export to...` from the options menu of the note.

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
