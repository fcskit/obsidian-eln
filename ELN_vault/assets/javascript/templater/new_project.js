async function new_project(tp, return_type, out_folder) {
  var path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];
  /**********************************************************************************/
  // initialize OUTPUT FOLDER(S)
  var folder_projects;
  try {
    folder_projects = eln_settings.folder.projects;
  }
  catch (error) {
    console.log(`folder.projects not found in ELN settings.`);
    return;
  }
  /**********************************************************************************/
  const author = await tp.user.get_author(tp);
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];

  const project_name = await tp.system.prompt("Enter project name:", "");

  // Ask user for project abbreviation
  const project_abbreviation = await tp.system.prompt("Enter project abbreviation:", "");

const note_content = `---
ELN version: ${eln_version}
cssclass: dashboard, wide-page
banner: "![[obsidian-eln-banner.png]]"
banner_y: 0.5
author: ${author}
date created: ${tp.date.now()}
note type: project
tag:
  - " #project/${project_name.replace(' ', '_')} "
project:
   name: ${project_name}
   abbreviation: ${project_abbreviation}
   type: science
   status: active
   start: 2023-03-01
   end: 2024-02-28
   duration: 3 years
   funding agency: ~~
   funding code: ~~
   title: ~~
   subproject: ~~
   acronym: ~~
   project coordinator science: ~~
   project manager administation: ~~
   reports:
      -
         type: interim report
         due date: YYYY-MM-dd
         link: "[[Interim Report-${project_name}-YYYY-MM]]"
      -
         type: interim report
         due date: YYYY-MM-dd
         link: "[[Interim Report-${project_name}-YYYY-MM]]"
      -
         type: milestone report
         due date: YYYY-MM-dd
         link: "[[Milestone Report-${project_name}-YYYY-MM]]"
      -
         type: final report
         due date: YYYY-MM-dd
         link: "[[Milestone Report-${project_name}-YYYY-MM]]"
---

\`= "<div class='title' style='color:#edf'>" + this.file.name + "</div>"\`

# Experiments

- ### [[Samples - ${project_name}|Samples]]
  \`\`\`dataview
  LIST
  FROM #sample AND!"assets"
  WHERE project.name = this.project.name
  SORT file.mtime.ts DESC
  LIMIT 6
  \`\`\`

- ### [[Analyses]]
  \`\`\`dataview
  LIST
  FROM #analysis  AND!"assets"
  WHERE project.name = this.project.name
  SORT file.mtime.ts DESC
  LIMIT 6
  \`\`\`

- ### [[ Processes]]
  \`\`\`dataview
  LIST
  FROM #process  AND!"assets"
  SORT file.mtime.ts DESC
  LIMIT 6
  \`\`\`

- ### Project Meetings
  \`\`\`dataview
  LIST
  FROM #meeting AND!"assets"
  WHERE project.name = this.project.name
  SORT file.mtime.ts DESC
  LIMIT 6
  \`\`\`

- ### Other Meetings
	- [[Clustertreffen 3 (2022 Nov, München)]]
 

# Important Dates

- ### General
	**Project start:** \`=this.project.start\`
	**Project end:** \`=this.project.end\`

- ### Reports
  \`\`\`dataviewjs
  var querry = Object.entries(dv.current().file.frontmatter.project.reports)
        .map(q => '- [ ] ' + q[1].type + '[due::' + q[1]['due date'] + ']')
  dv.paragraph(querry)
  \`\`\`

- ### Upcoming Meetings
	- 17.11.2022 Clustertreffen München

# People

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

  const filename = project_name;
  // const folder = path.join(folder_projects, project_name);
  const folder = folder_projects + '/' + project_name;

  if (!app.vault.getAbstractFileByPath(folder)) {
      console.log(`${folder} does not exist.`);
      console.log(`Creating folder ...`);
      await app.vault.createFolder(folder)
  } else {
      console.log(`${folder} exists.`);
  }
  // Create new Sample List for project
  await tp.user.new_sample_list(tp, project_name);

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
    // function needs to retutn an empty string, since it is called by a button 
    // using the insert template shorcut templater action 
    return '';
  }
}

module.exports = new_project;