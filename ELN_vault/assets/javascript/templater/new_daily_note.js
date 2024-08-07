async function new_daily_note(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];

  // initialize OUTPUT FOLDER(S)
  let folder_daily_notes = 'Daily Notes';
  try {
    folder_daily_notes = eln_settings.folder['daily notes'];
  }
  catch (error) {
    console.log(`Folder "daily notes" not found in ELN settings. Using default folder "${folder_daily_notes}"`);
  }
  /**********************************************************************************/
  var author = '';
  try {
    author = eln_settings.note.author;
  }
  catch (error) {
    console.log(`note.author not found in ELN settings.`);
  }
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];
  // get year and mont form date_created
  const year = date_created.split('-')[0]
  const month = date_created.split('-')[1]
  // get month name
  const month_name = date.toLocaleString('default', { month: 'long' });
  // get week day
  const week_day = date.toLocaleString('default', { weekday: 'long' });

  const note_title = `${date_created} - ${week_day}, ${date.getDate()}. ${month_name}`;

  const note_content = `---
ELN version: ${eln_version}
cssclass: daily-note
banner: "![[obsidian-eln-banner.png]]"
banner_y: 0.336
date created: ${date_created}
author: ${author}
note type: daily-note
tag:
  - " #daily-note "
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
  await dv.view("/assets/javascript/dataview/views/daily_note_nav", {});
\`\`\`

<div class="title" style="color:#edf">
  ${note_title}
</div>

# Daily Note - ${note_title}

  - ### Tasks
    - [ ] Today 1
    - [ ] Today 2
    - [ ] Today 3


- ### 
  \`\`\`dataviewjs
  await dv.view("/assets/javascript/dataview/views/motivation_image", {});
  \`\`\`

- ### Progress
  \`\`\`dataviewjs
  await dv.view("/assets/javascript/dataview/views/circular_progress", {});
  \`\`\`

# Notes



\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
\`\`\`
`;

  // console.log(note_content);
  /**********************************************************************************/
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


  const filename = note_title;
  const folder = `${folder_daily_notes}/${year}/${month} ${month_name}`;

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

module.exports = new_daily_note;


