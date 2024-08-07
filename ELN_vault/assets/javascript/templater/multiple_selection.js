async function multiple_selection(tp, input_settings) {

    var settings = {
        prompt: 'Select item',
        option_string: '',
        option_prompt: '',
        option_template: '',
        option_output_folder: '',
        abort_string: 'Exit selection ...',
        page_selection: '',
        list: []
    }

    Object.keys(input_settings).forEach(key => {
        settings[key] = input_settings[key];
    });

    const prompt = settings.prompt;
    const option_string = settings.option_string;
    const option_prompt = settings.option_prompt;
    const option_template = settings.option_template;
    const option_output_folder = settings.option_output_folder;
    const abort_string = settings.abort_string;
    const page_selection = settings.page_selection;
    var list = settings.list;

    if (list.length == 0 && page_selection !== '') {
        var list = app.plugins.plugins.dataview.api
            .pages(page_selection)
            .sort(p => p.file.name, 'asc')
            .map(p => String([p.file.name]))
            .values;
    }

    if (!(option_string.trim() === '')) {
        list.push(option_string)
    }

    var selected_items = []
    var optional_items = []
    if ((Array.isArray(list) && list.length)) {
        list.push(abort_string)
        while (true) {
            var selection = await tp.system.suggester(list, list, false, prompt)
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

    /* Create new note from template if optional item has been selected */
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

    var yaml_list = '\n'
    if (selected_items.length > 0) {
        for (var index in selected_items) {
            yaml_list += ' '.repeat(6) + `- "[[${selected_items[index]}]]"\n`
        }
    } else {
        yaml_list = ' '.repeat(6) + '- no contact' + '\n'
    }

    return selected_items
}

module.exports = multiple_selection;