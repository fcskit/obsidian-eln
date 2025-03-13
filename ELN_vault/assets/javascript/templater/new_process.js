async function new_process(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];

  /**********************************************************************************/
  // initialize OUTPUT FOLDER(S)
  let folder_processes = 'Experiments/Processes';
  try {
    folder_processes = eln_settings.folder.processes;
  }
  catch (error) {
    console.log(`folder.processes not found in ELN settings. Using default folder "Experiments/Processes"`);
  }
  let device_folder = 'Resources/Devices';
  try {
    device_folder = eln_settings.folder.devices;
  }
  catch (error) {
    console.log(`folder.devices not found in ELN settings. Using default folder "Resources/Devices"`);
  }
  /**********************************************************************************/
  const author = await tp.user.get_author(tp);
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];

  /**********************************************************************************/
  // retrieve PROCESS_NAME  
  const process_name = await tp.system.prompt('Enter process name:', '');

  /**********************************************************************************/
  // let user select PROCESS_TYPE  
  const process_type_list = eln_settings.process.type;
  const process_type = await tp.system.suggester(
    process_type_list, process_type_list,
    false, 'Select process type:');

  /**********************************************************************************/
  // create YAML TAG string
  var process_type_tagified = process_type.replace(/\s-\s/g, '_').replace(/[\s]/g, '_');
  const tags_yaml = '\n  - " #process/' + process_type_tagified + ' "\n';

  /**********************************************************************************/
  // obtain list of devices
  let device_list = app.plugins.plugins.dataview.api
    .pages('#device ' + 'AND !"assets"')
    .sort(p => p.file.name, 'asc')
    .map(p => String([p.file.name]))
    .values;

  device_list.push('Exit selection');

  /**********************************************************************************/
  // let user select DEVICE(S)
  let devices_used = [];
  while (true) {
    let device_selected = await tp.system.suggester(
      device_list, device_list, true, 'Select device(s) used for the process:');
    if (device_selected === 'Exit selection') {
      break;
    } else {
      // add selected item to list of devices_used
      devices_used.push(device_selected);
      // get index of selected device
      const index = device_list.indexOf(device_selected);
      // remove selected item from list of devices
      if (index > -1) { // only remove item when item is found
        device_list.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  }
  /**********************************************************************************/
  // Create YAML DEVICE LIST for selected devices
  var yaml_device_list = '\n' +
    devices_used.map(device => "     -\n" +
      `       name: ${device}\n` +
      `       link: "[[${device}]]"`
    ).join('\n');

  /**********************************************************************************/
  // Create YAML PARAMETER string for selected devices
  var device_parameters_yaml = ''
  var level = 2
  for (var index in devices_used) {
    device_parameters_yaml += ' '.repeat(level * 0) +
      `# Device settings for ${devices_used[index]}\n`
    device_parameters_yaml += ' '.repeat(level * 2) +
      devices_used[index] + ':\n'
    const device_filename = device_folder + "/" + devices_used[index] + "/" + devices_used[index]
    if (await tp.file.exists(device_filename + ".md")) {
      const device_tfile = tp.file.find_tfile(device_filename)
      // const device_tfile = app.vault.getFirstLinkpathDest(devices_used[index], "")
      const device_meta = DataviewAPI.page(device_tfile.path)
      device_parameters_yaml += tp.user.object_to_yaml(
        device_meta.file.frontmatter.device.parameters, level + 1)
    }
  }

  const note_content = `---
ELN version: ${eln_version}
cssclass: normal-page
author: ${author}
date created: ${date_created}
note type: process
tag: ${tags_yaml}
process:
  name: ${process_name}
  type: ${process_type}
  description: ~~
  devices: ${yaml_device_list}
  parameters:
    parameter_1: ~~ unit
    parameter_2: ~~ unit
    parameter_3: ~~ unit
    ${device_parameters_yaml}
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/process", {obsidian: obsidian});
\`\`\`

## Process Description

1. Lorem ipsum quel dolorem
2. Lorem ipsum quel dolorem
3. Lorem ipsum quel dolorem


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

  const filename = process_name;
  // const folder = path.join(folder_processes, process_type);
  const folder = folder_processes + '/' + process_type;

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

module.exports = new_process;