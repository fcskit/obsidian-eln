---
ELN version: 0.5.0
cssclasses:
  - normal-page
date created: 2025-03-13
author: Name Surname
note type: how-to
tags:
  - "#note/how-to"
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

1. All configuration and template files of the vault are located in the **assets** folder. Before you begin to create new notes you should edit the [[ELN Settings]] file and change the values for the note author and operators. The note author will be added to every note you create and the operators define a list of operators to choose from when you create a sample or analysis note. If you define only one operator this will be added as default to all your sample and analysis notes without showing a dialog to select the operator. 
   
   > [!Info] ELN Settings Info
   > The [[ELN Settings]] file stores all settings of the ELN as YAML metadata. The current ELN version (0.5.0) introduces a new dataviewjs based editor for nested metadata. This editor is similar to the native properties editor of obsidian, but supports nested properties which are essential for storing the metadata of ELN. Be aware that loading of the [[ELN Settings]] file may take a bit longer, since it contains a lot of metadata fields and rendering through a dataviewjs view is a bit slower than an a plugin. That said, one of the next milestones on the ELN development roadmap will be the migration of some of the core features, including the properties editor, into an obsidian plugin.

2. Open the [[Home]] dashboard page. The [[Home]] dashboard and [[ELN Dashboard]] give you an overview about your projects, samples, analyses, etc. that you have recently added to your vault. Open the [[Projects]] list page by clicking on the title of the project tile and create a new project by selecting the **New Project** button. This will add a folder to the **Projects** folder with the name of your project. This folder will also contain a sample list file, that dynamically lists all samples you add to your project.
3. Before starting to add your first sample, you should take some time to create new entries for the [[Chemicals]], [[Devices]] and [[Processes]] you use to create your samples. Devices define a set of parameters that will be added to a process when selecting the device during the process creation. Therefore, you should add the devices before defining your processes.
4. The processes you create serve as templates for the metadata added to your sample. So although you can assign values to the parameters of a process, it is generally a better idea to leave them blank unless you always use the same parameter values for your sample.
5. Once you set up your ELN vault and created the first samples, you may want to add analyses to your samples. Analyses can be added directly form the corresponding sample note. However, before adding an analysis you should create an instrument note for the analytical instrument. Similar to the device note where you can define the device parameters, you can define measurement parameters for each analytical method the device is offering. Again these parameters serve as template for the parameters added to your analytical notes. This is an example for an instrument note: [[ZEISS - Merlin]].



```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
