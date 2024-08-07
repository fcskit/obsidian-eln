async function new_contact(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];
  /**********************************************************************************/
  // initialize OUTPUT FOLDER(S)
  let folder_contacts = 'Contacts';
  try {
    folder_contacts = eln_settings.folder.contacts
  }
  catch (error) {
    console.log(`folder.contacts not found in ELN settings. Using default folder "${folder_contacts}"`);
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

  /**********************************************************************************/
  var given_name = ''
  var family_name = ''

  given_name = await tp.system.prompt('Enter given name(s):', '')
  family_name = await tp.system.prompt('Enter family name:', '')

  note_title = given_name + " " + family_name
  
  const note_content = `---
ELN version: ${eln_version}
cssclass: normal-page
date created: ${date_created}
author: ${author}
note type: contact
tag: contact
name:
  title:
  given name: ${given_name}
  family name: ${family_name}
contact:
  work:
    email: name@domain.edu
    phone: +49 721 608 xxxx
    mobile: 
    fax:
address:
  work:
    affiliation: Karlsruher Institut für Technologie (KIT)
    division: Institut für Angewandte Materialien (IAM-ESS)
    street: Hermann-von-Helmholtz-Platz 1
    building: ~~
    room: ~~
    city: Eggenstein-Leopoldshafen
    zip code: 76344
    country: Germany
job position: ~~
group: ~~
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/contact", {});
\`\`\`

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

  const filename = note_title;
  const folder = folder_contacts;

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
    console.log(`Creating new contact note in folder ${folder} with name ${filename}`);
    const tfolder = app.vault.getAbstractFileByPath(folder);
    await tp.file.create_new(note_content, filename, true, tfolder);
    return '';
  }
}

module.exports = new_contact;