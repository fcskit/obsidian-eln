async function new_note(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];

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

  const note_content = `---
ELN version: ${eln_version}
cssclass: normal-page
date created: ${date_created}
author: ${author}
note type: note
tag:
  - " #note "
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`





\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
\`\`\`
`;

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

  if (return_type === "insert") {
    return note_content;
  }
  else if (return_type === "create") {
    // initialize OUTPUT FOLDER(S)
    if (out_folder === "") {
      try {
        // get folder of active obsidian file
        out_folder = path.dirname(active_file.path);
        const filename = 'Untitled';
        const folder = out_folder;
        if (!app.vault.getAbstractFileByPath(folder)) {
          console.log(`${folder} does not exist.`);
          console.log(`Creating folder ...`);
          await app.vault.createFolder(folder)
        } else {
          console.log(`${folder} exists.`);
        }
        console.log(`Creating new note in folder ${folder} with name ${filename}`);
        const tfolder = app.vault.getAbstractFileByPath(folder);
        await tp.file.create_new(note_content, filename, true, tfolder);
      }
      catch (error) {
        console.log(`folder.processes not found in ELN settings.`);
        return;
      }
    }
  }
  else {
    return;
  }
}

module.exports = new_note;