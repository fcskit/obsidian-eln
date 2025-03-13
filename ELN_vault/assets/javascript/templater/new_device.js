async function new_device(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];
  /**********************************************************************************/
  // initialize OUTPUT FOLDER(S)
  let folder_devices = 'Resources/Devices';
  try {
    folder_devices = eln_settings.folder.devices
  }
  catch (error) {
    console.log(`folder.devices not found in ELN settings. Using default folder "${folder_devices}"`);
  }
  /**********************************************************************************/
  const author = await tp.user.get_author(tp);
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];

  /**********************************************************************************/
  const manufacturer = await tp.system.prompt("Enter manufacturer:", "")
  const model = await tp.system.prompt("Enter model:", "")
  const device_name = await tp.system.prompt("Enter device name:", manufacturer + " - " + model)
  const building = await tp.system.prompt("Enter building:", "")
  const room = await tp.system.prompt("Enter room:", "")

  /**********************************************************************************/
  /*                              ENTER DEVICE TYPE(S)                              */
  /**********************************************************************************/

  // initialize variables for selection dialog
  var prompt = 'Select device type(s):'
  var option_string = ''
  var abort_string = 'Exit selection'

  // assign a copy of the device type list 
  var list = eln_settings.device.type.map(x => x)

  console.log(JSON.stringify(list))

  var selected_items = []
  if ((Array.isArray(list) && list.length)) {
    if (!option_string.trim() === '') {
      list.push(option_string)
    }
    list.push(abort_string)
    while (true) {
      var selection = await tp.system.suggester(list, list, false, prompt)
      if (selection === abort_string) {
        break
      } else {
        // add selected item to list of selected items
        selected_items.push(selection)
        // get index of selected item
        const index = list.indexOf(selection);
        if (index > -1) { // only remove item when item is found
          list.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
  } else if (list.length == 0) {
    console.log('Variable "list" passed to function tp_multiple_selection is empty.')
  } else {
    console.log(`Variable "list" passed to function tp_multiple_selection is no Array but of type: ${typeof list}`)
    console.log(`... and contains: ${JSON.stringify(list)}`)
  }

  var types = selected_items

  // create TYPE and TAG string for YAML frontmatter
  var types_yaml = ''
  var tags_yaml = ''
  if (types.length > 0) {
    for (var index in types) {
      types_yaml += '\n' + ' '.repeat(5) + `- ${types[index]}`
      tags_yaml += '\n  - " #device/' +
        types[index].replace(/[\s]/g, '_') + '/' +
        manufacturer.replace(/[\s]/g, '_') + '_' +
        model.replace(/[\s]/g, '_') + '"'
    }
  } else {
    types_yaml += '\nnone'
    tags_yaml += '\n  - " #device/' +
      'no_type' + '/' +
      manufacturer.replace(/[\s]/g, '_') + '_' +
      model.replace(/[\s]/g, '_') + '"'
  }

  /**********************************************************************************/
  /*                           SELECT CONTACT PERSON(S)                             */
  /**********************************************************************************/
  prompt = 'Select contact person(s):'
  option_string = 'New Contact ...'
  const option_prompt = 'Enter contact name:'
  const option_template = 'Contact - Template'
  const option_output_folder = eln_settings.folder.contacts
  abort_string = 'Exit selection'
  const page_selection = '#contact AND !"assets"'

  var list = app.plugins.plugins.dataview.api
    .pages(page_selection)
    .sort(p => p.file.name, 'asc')
    .map(p => String([p.file.name]))
    .values;

  if (!(option_string.trim() === '')) {
    list.push(option_string)
  }

  var selected_items = []
  var optional_items = []
  if ((Array.isArray(list) && list.length)) {
    list.push(abort_string)
    while (true) {
      var selection = await tp.system.suggester(list, list, true, prompt)
      if (selection === abort_string) {
        break
      } else if (selection === option_string) {
        const new_item = await tp.system.prompt(option_prompt, '')
        optional_items.push(new_item)
        selected_items.push(new_item)
      } else {
        // add selected item to list of selected items
        selected_items.push(selection)
        // get index of selected item
        const index = list.indexOf(selection);
        if (index > -1) { // only remove item when item is found
          list.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
  } else if (list.length == 0) {
    console.log('Varibale "list" passed to function tp_multiple_selection is empty.')
  } else {
    console.log(`Varibale "list" passed to function tp_multiple_selection is no Array but of type: ${typeof list}`)
    console.log(`... and contains: ${JSON.stringify(list)}`)
  }

  if (optional_items.length) {
    for (var index in optional_items) {
      var new_note_template_str = ''
      const new_note_filename = optional_items[index]
      const new_note_template_name = option_template
      const new_note_template = tp.file.find_tfile(new_note_template_name)
      const output_folder_path = option_output_folder
      const output_folder = app.vault.getAbstractFileByPath(output_folder_path)
      await tp.file.create_new(new_note_template, new_note_filename, false, output_folder)
    }
  }

  var yaml_list = ''
  if (selected_items.length > 0) {
    for (var index in selected_items) {
      yaml_list += `\n${' '.repeat(6)}- "[[${selected_items[index]}]]"`
    }
  } else {
    yaml_list = `\n${' '.repeat(6)}- no contact`
  }

  const contact_persons_yaml = yaml_list
  
  const note_content = `---
ELN version: ${eln_version}
cssclass: normal-page
date created: ${date_created}
author: ${author}
note type: device
tag: ${tags_yaml}
device:
  name: ${device_name}
  type: ${types_yaml}
  manufacturer: ${manufacturer}
  model: ${model}
  location:
    building: ${building}
    room: ${room}
  contact: ${contact_persons_yaml}
  documentation: 
    - "[[${device_name} (Manual).pdf|Manual]]"
  url: "[link to manufacturer]()"
  info:
    info_1: ~~
    info_2: ~~
  parameters:
    parameter_1: ~~ unit
    parameter_2: ~~ unit
    parameter_3: ~~ unit
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`

![[dummy-image-device.png]]

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/device", {obsidian: obsidian});
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
  
  const filename = device_name;
  // const folder = path.join(folder_devices, device_name);
  const folder = folder_devices + '/' + device_name;

  if (!app.vault.getAbstractFileByPath(folder)) {
    console.log(`${folder} does not exist.`);
    console.log(`Creating folder ...`);
    await app.vault.createFolder(folder)
    await app.vault.createFolder(folder + "/Documents")
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

module.exports = new_device;