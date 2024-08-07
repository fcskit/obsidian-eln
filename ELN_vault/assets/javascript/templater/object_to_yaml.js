// get YAML formatted frontmatter from t_file
function array_to_yaml(array, level=0) {
    var yaml_str = ''
    const padding = '  '

    if (array.length) {
        
        if (!array.some(isNaN)) {
            // if array is numerical list
            yaml_str += `[${array}]\n`
        } else if (array.some((arr_val) => arr_val instanceof Object)) {
            yaml_str += '\n'
            for (var index in array) {
                yaml_str += `${padding.repeat(level+1)}-\n${object_to_yaml(array[index], level+2)}`
            }
        } else {
            yaml_str += '\n'
            for (var index in array) {
                if (array[index].trim().startsWith('#') || array[index].trim().startsWith('[[')) {
                    yaml_str += `${padding.repeat(level+1)}- "${array[index]}"\n`
                } else {
                    yaml_str += `${padding.repeat(level+1)}- ${array[index]}\n`
                }
            }
        }
    } else {
         yaml_str += '\n'
    }

    return yaml_str
}

function date_to_string(date) {
    return date.toJSON().split('T')[0]  
}

function object_to_yaml(obj, level=0) {
    var yaml_str = ''
    const padding = '  '
    
    for (var key in obj) {
        if (key === 'values') {
            console.log(`typeof '${key}' retuns ${typeof obj[key]}`)
            console.log(`'${key}' is of class: ${obj[key].constructor.name}`)
            if (obj[key].length) {
                console.log(`typeof first element retuns ${typeof obj[key][0]}`)
            }
        }
        var value = obj[key]
        if (value === null) {
            yaml_str += `${padding.repeat(level)}${key}: \n`
        } else if (value instanceof Array) {
            yaml_str += `${padding.repeat(level)}${key}: ${array_to_yaml(value, level)}`
        } else if (value instanceof Object) {
            if (value.constructor.name === 'DateTime'){
                yaml_str += `${padding.repeat(level)}${key}: ${date_to_string(value)}\n`
            } else {
                yaml_str += `${padding.repeat(level)}${key}:\n${object_to_yaml(value, level+1)}`
            }
        } else {
            yaml_str += `${padding.repeat(level)}${key}: ${value}\n`
        }
    }
    return yaml_str
}

module.exports = object_to_yaml;