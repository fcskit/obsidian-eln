async function new_task_list(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];

  /**********************************************************************************/
  // initialize OUTPUT FOLDER(S)
  let folder_tasks = 'Tasks';
  try {
    folder_tasks = eln_settings.folder.tasks;
  }
  catch (error) {
    console.log(`folder.tasks not found in ELN settings. Using default folder "Tasks"`);
  }
  /**********************************************************************************/
  const author = await tp.user.get_author(tp);
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];

  /**********************************************************************************/
  // retrieve TASK List Name  
  const task_list_name = await tp.system.prompt('Enter task list name:', '');

  /**********************************************************************************/

  const note_content = `---
ELN version: ${eln_version}
cssclass: task-list
author: ${author}
date created: ${date_created}
note type: task-list
tag:
  - " #task "
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`

## Progress
\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/circular_progress", {});
\`\`\`

## High Priority Tasks

- [ ] High Priority Task
	
## Medium Priority Tasks

- [ ] Medium Priority Task

## Low Priority Tasks

- [ ] Low Priority Task



\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
\`\`\`
`;

  const active_file = app.workspace.getActiveFile();
  // if return_type is not defined
  if (return_type === undefined) {
    // get content of active file
    const active_file_content = await app.vault.read(active_file);
    // check if active file is empty
    if (active_file_content === '') {
      return_type = "insert";
    }
    else {
      return_type = "create";
    }
  }

  const filename = task_list_name;
  const folder = folder_tasks;

  if (!app.vault.getAbstractFileByPath(folder)) {
    console.log(`${folder} does not exist.`);
    console.log(`Creating folder ...`);
    await app.vault.createFolder(folder)
  } else {
    console.log(`${folder} exists.`);
  }

  if (return_type === "insert") {
    // move and rename file
    // const new_file_path = path.join(folder, filename + ".md");
    const new_file_path = folder + '/' + filename + ".md";
    await app.vault.rename(active_file, new_file_path);
    return note_content;
  }
  else if (return_type === "create") {
    console.log(`Creating new sample note in folder ${folder} with name ${filename}`);
    const tfolder = app.vault.getAbstractFileByPath(folder);
    await tp.file.create_new(note_content, filename, true, tfolder);
    return '';
  }
}

module.exports = new_task_list;