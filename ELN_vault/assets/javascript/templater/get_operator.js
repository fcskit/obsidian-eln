/**
 * Get the author from the ELN settings file
 * @param {object} tp - the templater object to access the templater API
 * @returns {object} operator - the operator name and initials
 */

async function get_operator(tp) {
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  let operator = {name: '', initials: ''};
  const dv_operators = get_property(eln_settings, 'operators');
  // console.log(`operator_list: ${dv_operators}`);
  // console.log(`typeof operator_list: ${JSON.stringify(dv_operators)}`);

    if (dv_operators instanceof Object) {
        if (dv_operators instanceof Array) {
            if (dv_operators.length >= 1) {
                if (dv_operators.length == 1) {
                    operator = dv_operators[0];
                } else {
                    const operator_list = dv_operators.map(o => o.name);
                    const index_list = dv_operators.map((_, i) => i);
                    const index = await tp.system.suggester(
                        operator_list, index_list, false, 'Select operator:');
                    operator = dv_operators[index];
                }
            } else {
                operator.name = await tp.system.prompt('Enter operator name:');
                operator.initials = await tp.system.prompt('Enter operator initials:');
            } 
        } else {
            const operator_list = Object.keys(dv_operators)
            if (operator_list.length == 1) {
                operator.name = operator_list[1];
                operator.initials = dv_operators[operator.name].initials;
            } else if (operator_list.length > 1) {
                operator.name = await tp.system.suggester(
                    operator_list, operator_list, false, 'Select operator:');
                operator.initials = dv_operators[operator.name].initials;
            } else {
                operator.name = await tp.system.prompt('Enter operator name:');
                operator.initials = await tp.system.prompt('Enter operator initials:');
            }
        }
    } else {
        operator.name = await tp.system.prompt('Enter operator name:');
        operator.initials = await tp.system.prompt('Enter operator initials:');
    }
    console.log(`operator: ${JSON.stringify(operator)}`);
    return operator;
}

function get_property() {
  if (arguments.length >= 2) {
    var obj = arguments[0];
    const keys = Array.from(arguments).slice(1);
    for (var i in keys) {
      if (obj.hasOwnProperty(keys[i])) {
        obj = obj[keys[i]];
      } else {
        console.log(`Property "${keys[i]}" not found in object.`);
        return null;
      }
    }
    return obj;
  }
  else {
    console.log('Function get_property requires at least two arguments.');
    return null;
  }
}

module.exports = get_operator;
