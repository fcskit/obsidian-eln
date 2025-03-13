async function get_sample_properties(tp) {
  /**********************************************************************************/
  /* Compose metadata information for sample with user interaction                  */
  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings['ELN version']
  /**********************************************************************************/
  // initialize OUTPUT FOLDERS
  const folder_samples = eln_settings.folder.samples
  const folder_sample_types = eln_settings.folder['sample types']
  const folder_processes = eln_settings.folder.processes
  const folder_projects = eln_settings.folder['projects']
  const folder_custom_templates = eln_settings.folder['custom templates']

  // get author name from settings
  const author = await tp.user.get_author(tp);
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];
  /**********************************************************************************/
  /*                           LET USER SELECT OPERATOR                             */
  /**********************************************************************************/
  const operator = await tp.user.get_operator(tp);

  const operator_name = operator.name;
  const operator_initials = operator.initials;
  /**********************************************************************************/
  // obtain LIST of exsiting PROJECTS
  const project_list = app.plugins.plugins.dataview.api
    .pages('#project AND !"assets"')
    .sort(p => p.file.name, 'asc')
    .map(p => String([p.file.name]))
    .values;

  /**********************************************************************************/
  // extract PROJECT NAME from note title
  const note_title = tp.file.title
  const project_guessed = note_title.slice(0, -13)
  console.log(`Project name seems to be "${project_guessed}"`)

  // ceck if project is in project_list
  let project_name = ''

  if (project_list.indexOf(project_guessed) > -1) {
    console.log(`  The project name "${project_guessed}" extracted form the note title is valid.`)
    project_name = project_guessed
  } else {
    console.log(`   The project name "${project_guessed}" extracted form the note title is invalid.`)
    project_name = await tp.system.suggester(project_list, project_list, false, 'Select project:')
  }

  /**********************************************************************************/
  // obtain LIST of SAMPLE TYPES from vault
  const sample_types_file = "assets/Sample Types.md";
  const sample_types_tfile = app.vault.getAbstractFileByPath(sample_types_file);
  const sample_types_meta = app.metadataCache.getFileCache(sample_types_tfile).frontmatter;

  const sample_type_list = Object.keys(sample_types_meta)

  /**********************************************************************************/
  // let user select SAMPLE_TYPE
  var sample_type = ''
  if (sample_type_list instanceof Array) {
      if (sample_type_list.length > 1) {
          sample_type = await tp.system.suggester(sample_type_list, sample_type_list, false, 'Select sample type:')
      } else if (sample_type_list.length == 1) {
          sample_type = sample_type_list[0]
      }
  }

  /**********************************************************************************/
  // use DataviewAPI to access META DATA of PROJECT
  const project_file = folder_projects + "/" + project_name + "/" + project_name + ".md"
  const project_tfile = tp.file.find_tfile(project_file)
  const project_meta = app.metadataCache.getFileCache(project_tfile).frontmatter

  /**********************************************************************************/
  // get SAMPLE_NAME and move file
  // compose default sample name
  const project_abbrev = project_meta.project.abbreviation
  var sample_type_abbrev = ''
  if (sample_type === 'compound') {
    sample_type_abbrev = 'cp'
  } else if (sample_type === 'electrode') {
    sample_type_abbrev = 'el'
  } else if (sample_type === 'electrochemical cell') {
    sample_type_abbrev = 'cell'
  } else {
    sample_type_abbrev = 'sp'
  }
  var default_sample_name_base = operator.initials + "-" + project_abbrev + "-" + sample_type_abbrev
  const sample_output_folder = folder_samples + "/" + project_name + "/" + sample_type
  var counter = 1
  while (true) {
    // append number to filename
    if (counter < 10) {
      default_sample_name = default_sample_name_base + "00" + counter
    } else if (counter < 100) {
      default_sample_name = default_sample_name_base + "0" + counter
    } else {
      default_sample_name = default_sample_name_base + counter
    }
    // check if file already exist, if true increase number and try again
    file_path = sample_output_folder + "/" + default_sample_name
    if (await tp.file.exists(file_path + ".md")) {
      console.log(`File ${default_sample_name} already exists.`)
      counter = counter + 1
    } else {
      break
    }
  }

  // Ask user to confirm or enter SAMPLE_NAME
  const sample_name = await tp.system.prompt("Enter sample name:", default_sample_name)

  /**********************************************************************************/
  /*                     GET YAML FOR SELECTED SAMPLE TYPE                          */
  /**********************************************************************************/
  var sample_type_dv_obj = sample_types_meta[sample_type]


  // ####### Define variables
  var list = [];
  var selection = ''
  var amount = '';
  var select_prompt = '';
  var enter_prompt = '';
  var amount_prompt = '';

  /*********************************************************************************/
  /*                            COUMPOUND Samples                                  */
  /*********************************************************************************/
  if (sample_type == 'compound') {
    const chemical_formula = await tp.system.prompt('Enter chemical formula (use _{...} for sub- and ^{...} for superscript:', '')
    sample_type_dv_obj['chemical formula'] = '$' + chemical_formula + '$'

    /******************************************************************************/
    // Let user enter RAW MATERIALS and composition for COMPOUND

    // obtain LIST of CHEMICALS from vault
    var chemical_list = app.plugins.plugins.dataview.api
      .pages('#chemical ' + 'AND !"assets"')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    chemical_list.push('Add sample(s) ...')
    chemical_list.push('Exit selection')

    let raw_materials = []
    while (true) {
      let raw_material = await tp.system.suggester(chemical_list, chemical_list, true, 'Select raw material(s) from chemicals:')
      if (raw_material === 'Exit selection') {
        break
      } else if (raw_material === 'Add sample(s) ...') {
        let sample_list = app.plugins.plugins.dataview.api
          .pages('#sample ' + 'AND !"assets"')
          // .where(p => p.project.name == project_name)
          .where(p => p.sample.type == 'compound')
          .sort(p => p.file.name, 'asc')
          .map(p => String([p.file.name]))
          .values;

        if ((Array.isArray(sample_list) && sample_list.length)) {
          sample_list.push('Exit selection')
          while (true) {
            raw_material = await tp.system.suggester(sample_list, sample_list, true, 'Select raw material(s) from samples:')
            if (raw_material === 'Exit selection') {
              break
            } else {
              // add selected item to list of raw materials
              raw_materials.push(raw_material)
              // get index of selected raw_material
              const index = sample_list.indexOf(raw_material);
              if (index > -1) { // only remove item when item is found
                sample_list.splice(index, 1); // 2nd parameter means remove one item only
              }
            }
          }
          break
        } else {
          break
        }
      } else {
        // add selected item to list of raw materials
        raw_materials.push(raw_material)
        // get index of selected raw_material
        const index = chemical_list.indexOf(raw_material);
        if (index > -1) { // only remove item when item is found
          chemical_list.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }

    /*****************************************************************************/
    // ask user to enter COMPOSITION
    let masses_volumes = []
    for (let index in raw_materials) {
      let mass = await tp.system.prompt("Enter mass or volume of " + raw_materials[index] + " including unit separated by a blank space:", "")
      masses_volumes.push(mass)
    }

    /*****************************************************************************/
    // parse MASS or VOLUME string and update dv_obj
    sample_type_dv_obj['educts'] = [];
    for (let index in raw_materials) {
      var mass_or_volume = masses_volumes[index]
      var value_unit = mass_or_volume.trim().split(' ')
      if (value_unit.length == 2) {
        var value = value_unit[0]
        var unit = value_unit[1]
        switch (unit.toLowerCase()) {
          case 't':
          case 'kg':
          case 'g':
          case 'mg':
          case 'µg':
          case 'ng':
            rm_mass = `${value} ${unit}`;
            rm_volume = '~~';
            break;
          case 'l':
          case 'ml':
          case 'µl':
          case 'cm3':
          case 'm3':
            rm_mass = '~~';
            rm_volume = `${value} ${unit}`;
            break;
          default:
            console.log(`Unknown unit string '${unit}'. No value will be assigned to mass or volume of raw material '${raw_materials[index]}'`)
            rm_mass = '~~';
            rm_volume = '~~';
        }
      } else {
        console.log(`Ill formatted volume or mass string. Make sure to specify mass or volume with unit separated by one blanke space character.`)
        rm_mass = '~~';
        rm_volume = '~~';
      }

      sample_type_dv_obj['educts'].push({
        name: raw_materials[index],
        mass: rm_mass,
        volume: rm_volume
      })
    }
    /*********************************************************************************/
    /*                            ELECTRODE Samples                                  */
    /*********************************************************************************/
  } else if (sample_type === 'electrode') {
    console.log('Selecting properties for electrode sample ...')
    // Select ACTIVE MATERIAL
    console.log('Atempting to retrieve list of compounds ...')
    const active_material_sample_list = app.plugins.plugins.dataview.api
      .pages('#sample AND !"assets"')
      .where(p => p.sample.type === 'compound')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;
    console.log(active_material_sample_list)

    console.log('Atempting to retrieve list of active materials ...')
    const active_material_chemical_list = app.plugins.plugins.dataview.api
      .pages('#chemical AND !"assets"')
      .where(p => p.chemical.type === 'active material')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;
    console.log(active_material_chemical_list)

    active_material_list = active_material_sample_list.concat(
      active_material_chemical_list)

    list = active_material_list
    select_prompt = 'Select active material:'
    enter_prompt = 'Enter active material:'
    amount_prompt = 'Enter mass of active material with unit separated by a blank space:'
    if (list.length > 0) {
      selection = await tp.system.suggester(list, list, false, select_prompt)
    } else {
      selection = await tp.system.prompt(enter_prompt, '')
    }
    if (selection !== '') {
      amount = await tp.system.prompt(amount_prompt, '')
    }
    sample_type_dv_obj['active material']['name'] = selection
    sample_type_dv_obj['active material']['link'] = `"[[${selection}]]"`
    sample_type_dv_obj['active material']['mass'] = amount

    // Select electrode BINDER
    const binder_list = app.plugins.plugins.dataview.api
      .pages('#chemical AND !"assets"')
      .where(p => p.file.frontmatter
        .chemical.type === 'binder' &&
        (p.file.frontmatter.chemical['field of use'] === 'electrode' ||
          p.file.frontmatter.chemical['field of use'].includes('electrode'))
      )
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    const ms_settings = {
      prompt: 'Select electrode binder:',
      abort_string: 'Exit selection ...',
      list: binder_list
    }
    const binder_selection = await tp.user.multiple_selection(tp, ms_settings)
    if (binder_selection.length > 0) {
      // get binder mass for each selected binder
      sample_type_dv_obj['binder'] = []
      for (let binder of binder_selection) {
        amount = await tp.system.prompt(`Enter mass of ${binder} with unit separated by a blank space:`, '')
        sample_type_dv_obj['binder'].push({
          name: binder,
          link: `"[[${binder}]]"`,
          mass: amount
        })
      }
    }
    else {
      sample_type_dv_obj['binder'] = []
    }
    // list = binder_list
    // selection = ''
    // select_prompt = 'Select electrode binder:'
    // enter_prompt = 'Enter name of electrode binder:'
    // amount_prompt = 'Enter mass of binder with unit separated by a blank space:'
    // if (list.length > 0) {
    //   selection = await tp.system.suggester(list, list, false, select_prompt)
    // } else {
    //   selection = await tp.system.prompt(enter_prompt, '')
    // }
    // if (selection !== '') {
    //   amount = await tp.system.prompt(amount_prompt, '')
    // }
    // sample_type_dv_obj['binder']['name'] = `"[[${selection}]]"`
    // sample_type_dv_obj['binder']['mass'] = amount

    // Select conductive ADDITIVE
    const additive_list = app.plugins.plugins.dataview.api
      .pages('#chemical AND !"assets"')
      .where(p => p.file.frontmatter
        .chemical.type === 'conductive additive' &&
        p.file.frontmatter.chemical['field of use'].includes('electrode'))
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    const additive_settings = {
      prompt: 'Select conductive additive:',
      abort_string: 'Exit selection ...',
      list: additive_list
    }
    const additive_selection = await tp.user.multiple_selection(tp, additive_settings)
    if (additive_selection.length > 0) {
      // get additive mass for each selected additive
      sample_type_dv_obj['conductive additive'] = []
      for (let additive of additive_selection) {
        amount = await tp.system.prompt(`Enter mass of ${additive} with unit separated by a blank space:`, '')
        sample_type_dv_obj['conductive additive'].push({
          name: additive,
          link: `"[[${additive}]]"`,
          mass: amount
        })
      }
    }
    else {
      sample_type_dv_obj['conductive additive'] = []
    }

    // Select SOLVENT
    const solvent_list = app.plugins.plugins.dataview.api
      .pages('#chemical AND !"assets"')
      .where(p => p.file.frontmatter
        .chemical.type === 'solvent' &&
        p.file.frontmatter
          .chemical['field of use'] === 'electrode')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    const solvent_settings = {
      prompt: 'Select slurry solvent:',
      abort_string: 'Exit selection ...',
      list: solvent_list
    }

    const solvent_selection = await tp.user.multiple_selection(tp, solvent_settings)
    if (solvent_selection.length > 0) {
      // get solvent volume for each selected solvent
      sample_type_dv_obj['solvent'] = []
      for (let solvent of solvent_selection) {
        amount = await tp.system.prompt(`Enter volume of ${solvent} with unit separated by a blank space:`, '')
        sample_type_dv_obj['solvent'].push({
          name: solvent,
          link: `"[[${solvent}]]"`,
          volume: amount
        })
      }
    }
    else {
      sample_type_dv_obj['solvent'] = []
    }

    // list = solvent_list
    // selection = ''
    // select_prompt = 'Select slurry solvent:'
    // enter_prompt = 'Enter name of slurry solvent:'
    // amount_prompt = 'Enter volume of slurry solvent with unit separated by a blank space:'
    // if (list.length > 0) {
    //   selection = await tp.system.suggester(list, list, false, select_prompt)
    // } else {
    //   selection = await tp.system.prompt(enter_prompt, '')
    // }
    // if (selection !== '') {
    //   amount = await tp.system.prompt(amount_prompt, '')
    // }
    // sample_type_dv_obj['solvent']['name'] = `"[[${selection}]]"`
    // sample_type_dv_obj['solvent']['volume'] = amount

    // Select CURRENT COLLECTOR
    const current_collector_list = app.plugins.plugins.dataview.api
      .pages('#chemical AND !"assets"')
      .where(p => p.file.frontmatter
        .chemical.type === 'current collector' &&
        p.file.frontmatter
          .chemical['field of use'] === 'electrode')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    list = current_collector_list
    selection = ''
    select_prompt = 'Select current collector:'
    enter_prompt = 'Enter name of current collector:'
    var width_prompt = 'Enter width of current collector substrate:'
    var length_prompt = 'Enter length of current collector substrate:'
    var width = '~~ mm'
    var length = '~~ mm'

    if (list.length > 0) {
      selection = await tp.system.suggester(list, list, false, select_prompt)
    } else {
      selection = await tp.system.prompt(enter_prompt, '')
    }
    if (selection !== '') {
      width = await tp.system.prompt(width_prompt, '')
      length = await tp.system.prompt(length_prompt, '')
    }
    sample_type_dv_obj['current collector']['name'] = selection;
    sample_type_dv_obj['current collector']['link'] = `"[[${selection}]]"`;
    sample_type_dv_obj['current collector']['width'] = width;
    sample_type_dv_obj['current collector']['length'] = length;

    /*********************************************************************************/
    /*                        ELECTROCHEMICAL CELL Samples                           */
    /*********************************************************************************/
  } else if (sample_type === 'electrochemical cell') {

    var selection_meta;

    // Let user select CELL TYPE
    const cell_list = app.plugins.plugins.dataview.api
      .pages('#electrochemical-cell ' + 'AND !"assets"')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    cell_list.push('undefined')

    list = cell_list
    selection = ''
    select_prompt = 'Select cell type:'

    if (list.length > 1) {
      selection = await tp.system.suggester(list, list, false, select_prompt)
    } else {
      selection = 'undefined'
    }

    // // get meta data of selected cell type
    if (selection !== 'undefined') {
      selection_meta = DataviewAPI.page(tp.file.find_tfile(selection).path)
      // check if cell type is defined in meta data
      if (!('cell' in selection_meta)) {
        console.log(`Cell type not defined in meta data of ${selection}.`)
        cell_meta = {};
        cell_type = 'undefined'
      }
      else {
        cell_meta = selection_meta['cell']
        if (!('type' in cell_meta)) {
          console.log(`Cell type not defined in meta data of ${selection}.`)
          cell_type = 'undefined'
        }
        else {
          cell_type = cell_meta['type']
        }
        if (!('dimensions' in cell_meta)) {
          console.log(`Cell dimensions not defined in meta data of ${selection}.`)
        }
        else {
          cell_dimensions = cell_meta['dimensions']
          if (!('electrode' in cell_dimensions)) {
            console.log(`Electrode dimensions not defined in meta data of ${selection}.`)
          }
          else {
            electrode_dimensions = cell_dimensions['electrode']
            if (!('area' in electrode_dimensions)) {
              console.log(`Electrode area not defined in meta data of ${selection}.`)
              electrode_area = '~~ cm²'
            }
            else {
              electrode_area = electrode_dimensions['area']
            }
          }
        }
      }
    }
    else {
      cell_meta = {};
      cell_type = 'undefined'
      electrode_area = '~~ cm²'
    }
    // // add copy of cell meta data to sample_type_dv_obj
    // sample_type_dv_obj['cell'] = selection_meta['cell']
    // sample_type_dv_obj['cell'] = addProperty(sample_type_dv_obj['cell'], 'name', `"[[${selection}]]"`, 0)
    sample_type_dv_obj['cell']['name'] = selection;
    sample_type_dv_obj['cell']['link'] = `"[[${selection}]]"`;
    sample_type_dv_obj['cell']['type'] = cell_type;
      
    // Let user select WORKING ELECTRODE
    const electrode_list = app.plugins.plugins.dataview.api
      .pages('#sample ' + 'AND !"assets"')
      .where(p => p.sample.type === 'electrode')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    var we_electrode = ''
    if (electrode_list.length > 0) {
      we_electrode = await tp.system.suggester(electrode_list, electrode_list, false, 'Select working electrode:')
      // let user enter active material mass of working electrode
      const am_mass = await tp.system.prompt('Enter mass of active material with unit separated by a blank space:', '')
      // let user enter total mass of working electrode
      const total_mass = await tp.system.prompt('Enter total mass of working electrode with unit separated by a blank space:', '')
      sample_type_dv_obj['working electrode']['name'] = we_electrode
      sample_type_dv_obj['working electrode']['link'] = `"[[${we_electrode}]]"`
      sample_type_dv_obj['working electrode']['active material mass'] = am_mass
      sample_type_dv_obj['working electrode']['total mass'] = total_mass
      sample_type_dv_obj['working electrode']['area'] = electrode_area
    }
    else {
      sample_type_dv_obj['working electrode']['name'] = '~~'
      sample_type_dv_obj['working electrode']['name'] = '[[~~]]'
      sample_type_dv_obj['working electrode']['active material mass'] = '~~'
      sample_type_dv_obj['working electrode']['total mass'] = '~~'
      sample_type_dv_obj['working electrode']['area'] = electrode_area
    }

    // Let user select COUNTER ELECTRODE
    const std_electrode_list = app.plugins.plugins.dataview.api
      .pages('#electrode/standard ' + 'AND !"assets"')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    var ce_electrode = ''
    if (std_electrode_list.length > 0) {
      std_electrode_list.push('Select electrode sample ...')
      ce_electrode = await tp.system.suggester(std_electrode_list, std_electrode_list, false, 'Select counter electrode:')
      if (ce_electrode === 'Select electrode sample ...') {
        if (electrode_list.length > 0) {
          ce_electrode = await tp.system.suggester(electrode_list, electrode_list, false, 'Select counter electrode:')
        }
      }
    } else {
      if (electrode_list.length > 0) {
        ce_electrode = await tp.system.suggester(electrode_list, electrode_list, false, 'Select counter electrode:')
      }
    }
    sample_type_dv_obj['counter electrode']['name'] = ce_electrode;
    sample_type_dv_obj['counter electrode']['link'] = `"[[${ce_electrode}]]"`;

    // Let user select REFERENCE ELECTRODE
    const ref_electrode_list = app.plugins.plugins.dataview.api
      .pages('#electrode/reference AND !"assets"')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    ref_electrode_list.push('none')

    list = ref_electrode_list
    selection = ''
    select_prompt = 'Select reference electrode:'

    if (list.length > 1) {
      selection = await tp.system.suggester(list, list, false, select_prompt)
    } else {
      selection = 'none'
    }

    if (selection !== 'none') {
      const ref_electrode_meta = DataviewAPI.page(tp.file.find_tfile(selection).path)
      amount = ref_electrode_meta['standard electrode potential']
    }
    sample_type_dv_obj['reference electrode']['name'] = selection;
    sample_type_dv_obj['reference electrode']['link'] = `"[[${selection}]]"`;
    sample_type_dv_obj['reference electrode']['potential'] = amount;

    // Let user select ELECTROLYTE
    const electrolyte_list = app.plugins.plugins.dataview.api
      .pages('#chemical AND !"assets"')
      .where(p => p.chemical.type === 'electrolyte')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    electrolyte_list.push('none')

    list = electrolyte_list
    selection = ''
    select_prompt = 'Select electrolyte:'
    amount_prompt = 'Enter electrolyte volume with unit separated by a blank space:'

    if (list.length > 1) {
      selection = await tp.system.suggester(list, list, false, select_prompt)
    } else {
      selection = 'none'
    }

    var composition = '~~'
    if (selection !== 'none') {
      const electrolyte_meta = DataviewAPI.page(tp.file.find_tfile(selection).path)
      composition = electrolyte_meta.chemical.composition
      amount = await tp.system.prompt(amount_prompt, '')
    }
    sample_type_dv_obj['electrolyte']['name'] = selection;
    sample_type_dv_obj['electrolyte']['link'] = `"[[${selection}]]"`;
    sample_type_dv_obj['electrolyte']['composition'] = composition;
    sample_type_dv_obj['electrolyte']['volume'] = amount;

    // Let user select SEPARATOR
    const separator_list = app.plugins.plugins.dataview.api
      .pages('#chemical AND !"assets"')
      .where(p => p.chemical.type === 'separator')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;

    separator_list.push('none')

    list = separator_list
    selection = ''
    select_prompt = 'Select separator:'
    amount_prompt = 'Select number of layers:'

    if (list.length > 1) {
      selection = await tp.system.suggester(list, list, false, select_prompt)
    } else {
      selection = 'none'
    }

    var property = '~~'
    if (selection !== 'none') {
      const selection_meta = DataviewAPI.page(tp.file.find_tfile(selection).path)
      property = selection_meta.chemical.properties.thickness
      amount = await tp.system.suggester(['1 layer', '2 layers', '3 layers', '4 layers'], [1, 2, 3, 4], false, amount_prompt)
    }
    sample_type_dv_obj['separator']['name'] = selection;
    sample_type_dv_obj['separator']['link'] = `"[[${selection}]]"`;
    sample_type_dv_obj['separator']['thickness'] = property;
    sample_type_dv_obj['separator']['layers'] = amount;
  }

  /*********************************************************************************/
  /*                       Compose YAML for SAMPLE_TYPE                            */
  /*********************************************************************************/
  var sample_yaml = ''
  if (sample_type !== '') {
    sample_yaml += tp.user.object_to_yaml(sample_type_dv_obj, 1)
  }

  /*********************************************************************************/
  /*                                 .........                                     */
  /*                                 PROCESSES                                     */
  /*                                 °°°°°°°°°                                     */
  /*********************************************************************************/

  // obtain LIST of PROCESSES from vault
  var process_list = app.plugins.plugins.dataview.api
    .pages('#process ' + 'AND !"assets"')
    .sort(p => p.file.name, 'asc')
    .map(p => String([p.file.name]))
    .values;

  // ask user to select PROCESSES from list
  // generic code block for user selection of multiple items
  var list = process_list
  const prompt = 'Select process(es) used to prepare the sample:'
  const abort_string = 'Exit selection'

  var selected_items = []
  if ((Array.isArray(list) && list.length)) {
    list.push(abort_string)
    while (true) {
      var selection = await tp.system.suggester(list, list, true, prompt)
      if (selection === abort_string || list.length == 1) {
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
    console.log('Variable "list" passed during process selection is empty.')
  } else {
    console.log(`Variable "list" passed during process selection is no Array but of type: ${typeof list}`)
    console.log(`... and contains: ${JSON.stringify(list)}`)
  }

  const processes = selected_items

  var processes_yaml = ''
  for (var item in processes) {
    // const process_filename = folder_processes + "/" + processes[item] + ".md"
    // if (await tp.file.exists(process_filename)) {
      // const process_tfile = app.vault.getAbstractFileByPath(process_filename);
      const process_tfile = app.metadataCache.getFirstLinkpathDest(processes[item], "")
      const process_meta = app.metadataCache.getFileCache(process_tfile).frontmatter.process;
      processes_yaml += `  # Process parameters for ${processes[item]}\n`
      processes_yaml += `  ${processes[item]}:\n`
      processes_yaml += tp.user.object_to_yaml(
        process_meta, 2)
    // } else {
    //   console.log(`Process file "${process_filename}" not found!`)
    // }
  }

  /**********************************************************************************/
  // retrieve SAMPLE_DESCRIPTION
  const sample_description = await tp.system.prompt("Enter sample description:", "", false, true)

  return {
    eln_version,
    folder_samples,
    folder_custom_templates,
    author,
    date_created,  
    operator_name,
    operator_initials,
    project_name,
    sample_type,
    sample_name,
    sample_yaml,
    processes,
    processes_yaml,
    sample_description
  }
}

async function new_sample(tp, return_type, out_folder) {

  var path = require('path');

  const sample_properties = await get_sample_properties(tp);

  const note_content = `---
ELN version: ${sample_properties.eln_version}
cssclass: wide-page
date created: ${sample_properties.date_created}
author: ${sample_properties.author}
note type: sample
tag:
  - " #sample/${sample_properties.project_name.replace(' ', '-')} "
  - " #sample/${sample_properties.sample_type} "
project:
  name: ${sample_properties.project_name}
  type: undefined
series:
  part of collection: false
  name: none
  type: none
  number of samples: 0
  sample id: 0
sample:
  name: ${sample_properties.sample_name}
  type: ${sample_properties.sample_type}
  description: ${sample_properties.sample_description}
${sample_properties.sample_yaml}
process:
${sample_properties.processes_yaml}
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`button
name Add Analysis
type command
action Templater: Insert assets/templates/New Analysis.md
class accent-button
\`\`\`


> [!Example] TOC
> - [[#Properties]]
> - [[#Processing]]
> - [[#My Notes]]
> - [[#Characterization]]
> - [[#Electrochemical Characterization]]

## Properties

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/sample", { obsidian: obsidian });
\`\`\`

## Processing

**Open process description**
${sample_properties.processes.map(p => `- [[${p}]]`).join('\n')}

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/process", { obsidian: obsidian });
\`\`\`


## My Notes

> [!Info]
> Add your notes for this sample here.

## Characterization

\`\`\`dataview
TABLE WITHOUT ID
    file.link as Analysis,
    analysis["method"] as Method,
    analysis["operator"] as Operator,
    analysis["date"] as Date,
    analysis["status"] as Status
FROM #analysis 
WHERE sample.name = this.sample.name
\`\`\`

## Electrochemical Characterization

\`\`\`dataview
TABLE WITHOUT ID
    file.link as Analysis,
    sample["working electrode"]["name"] as "WE Electrode",
    sample["electrolyte"]["name"] as Electrolyte,
    analysis["method"] as Method,
    analysis["parameters"]["cycles"] as Cycles,
    analysis["parameters"]["Ewe min"] as Ewe_min,
    analysis["parameters"]["Ewe max"] as Ewe_max,
    analysis["date"] as Date,
    analysis["status"] as Status
FROM #analysis
WHERE sample.name = this.sample.name AND analysis.method = "GCPL"
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
\`\`\``;

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

  // const sample_base_folder = path.join(sample_properties.folder_samples, sample_properties.project_name, sample_properties.sample_type);
  const sample_base_folder = sample_properties.folder_samples + '/' +
    sample_properties.project_name + '/' + sample_properties.sample_type;
  // set relative path to new note
  const sample_filename = sample_properties.sample_name;

  // check if folder exists
  if (!app.vault.getAbstractFileByPath(sample_base_folder)) {
      console.log(`${sample_base_folder} does not exist.`);
      console.log(`Creating sample folder ...`);
      await app.vault.createFolder(sample_base_folder)
  } else {
      console.log(`${sample_base_folder} exists.`);
  }

  if (return_type === "insert") {
    // move and rename file
    // const new_file_path = path.join(sample_base_folder, sample_filename + ".md");
    const new_file_path = sample_base_folder + '/' + sample_filename + ".md";
    await app.vault.rename(active_file, new_file_path);
    return note_content;
  }
  else if (return_type === "create") {
    // create new file
    console.log(`Creating new sample note in folder ${sample_base_folder} with name ${sample_filename}`);
    const sample_folder = app.vault.getAbstractFileByPath(sample_base_folder);
    await tp.file.create_new(note_content, sample_filename, true, sample_folder);
    return '';
  }
}

module.exports = new_sample;