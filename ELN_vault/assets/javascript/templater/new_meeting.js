function addMinutes(time, minutes) {
  var date = new Date(new Date('1970-01-01T' + time + 'Z').getTime() + minutes * 60000);
  var time = date.toTimeString().split(' ')[0];
  // format time as HH:MM
  time = time.split(':').slice(0, 2).join(':');
  return time;
}

async function new_meeting(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];

  // initialize OUTPUT FOLDER(S)
  let folder_meetings = 'Meetings';
  try {
    folder_meetings = eln_settings.folder.meetings;
  }
  catch (error) {
    console.log(`folder.processes not found in ELN settings. Using default folder "Meetings"`);
  }
  /**********************************************************************************/
  const author = await tp.user.get_author(tp);
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];
  // get year and mont form date_created
  const year = date_created.split('-')[0]
  const month = date_created.split('-')[1]
  // get month name
  const month_name = date.toLocaleString('default', { month: 'long' });
  // calculate quarters from minutes
  const quarters = date.getMinutes() / 15;
  // round to nearest quarter
  const quarters_rounded = (quarters % 1 < 0.5 ? Math.floor(quarters) : Math.ceil(quarters));
  // compose rounded starting time in 24h format
  var minutes = "00";
  if (quarters_rounded > 0 && quarters_rounded < 4) {
    minutes = quarters_rounded * 15;
  }
  const starting_time = (quarters_rounded < 4 ? date.getHours() + ":" + minutes : date.getHours() + 1 + ":" + minutes);
  // get meeting title
  var meeting_title = await tp.system.prompt('Enter meeting title:', '')

  const note_content = `---
ELN version: ${eln_version}
cssclass: meeting
date created: ${date_created}
author: ${author}
note type: meeting
tag:
  - " #meeting "
meeting:
   title: ${meeting_title}
   type: ~~
   date: ${date_created}
   time: ${starting_time}
   location: ~~
   participants:
     - First Participant
     - Second Participant
   topics:
     - time: ${starting_time}
       title: 1st Topic
       contributor: ""
     - time: ${addMinutes(starting_time, 15)}
       title: 2nd Topic
       contributor: ""
     - time: ${addMinutes(starting_time, 30)}
       title: 3rd Topic
       contributor: ""
project:
   name: ~~
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`

## Meeting Info

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting", {obsidian: obsidian});
\`\`\`


## Agenda & Minutes

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/meeting_topics", {  });
\`\`\`


\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
\`\`\`
`;

  /**********************************************************************************/
  // set path for output folder
  var folder = ""
  if (month < 10) {
    folder = `${folder_meetings}/${year}/${month} ${month_name}`
  } else {
    folder = `${folder_meetings}/${year}/${month} ${month_name}`
  }
  // try creating the folder if it does not exist
  if (!app.vault.getAbstractFileByPath(folder)) {
    console.log(`${folder} does not exist.`);
    console.log(`Creating folder ...`);
    try {
      await app.vault.createFolder(folder);
    }
    catch (error) {
      console.log(`An error occured while creating the meeting note.`);
      return;
    }
  }
  else {
    console.log(`${folder} exists.`);
  }
  // set filename
  var filename = `${date_created} - ${meeting_title}`;
  // while (app.vault.getAbstractFileByPath(path.join(folder, filename + ".md"))) {
  while (app.vault.getAbstractFileByPath(folder + '/' + filename + ".md")) {
    console.log(`A note with the name ${filename} already exists.`);
    meeting_title = await tp.system.prompt(
      'A meeting note with the same title already exist for that day.\n'
      + 'Please enter a new meeting name:', '');
    filename = `${date_created} - ${meeting_title}`;
  }
  // get language of the obsidian vault
  const lang = window.localStorage.getItem('language');
  // var untitled_note_name = "";
  // switch (lang) {
  //   case 'de':
  //     untitled_note_name = "Unbenannt";
  //     break;
  //   case 'en', 'null':
  //     untitled_note_name = "Untitled";
  //     break;
  //   default:
  //     untitled_note_name = "Untitled";
  // }

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
    // move and rename file
    // const new_file_path = path.join(folder, filename + ".md");
    const new_file_path = folder + '/' + filename + ".md";
    await app.vault.rename(active_file, new_file_path);
    return note_content;
  }
  else if (return_type === "create") {
    if (out_folder === "") {  
      try {
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
        console.log(`An error occured while creating the meeting note.`);
        return '';
      }
      return '';
    }
  }
  else {
    return '';
  }
}

module.exports = new_meeting;