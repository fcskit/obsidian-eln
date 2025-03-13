// frontmatter.js
/**
 * Get frontmatter value by key.
 * @param {string} fullKey - The key of the frontmatter property, in dot notation.
 * @returns {*} The value of the frontmatter property.
 */
function getFrontmatterValue(fullKey) {
    // console.log('getFrontmatterValue has been called with fullKey:', fullKey);
    const currentFile = app.workspace.getActiveFile();
    const frontmatter = app.metadataCache.getFileCache(currentFile).frontmatter;
    const keys = fullKey.split('.');
    let value = frontmatter;

    // Traverse the keys to reach the target property
    for (let i = 0; i < keys.length; i++) {
        if (!value[keys[i]]) {
            return undefined;
        }
        value = value[keys[i]];
    }
    // console.log('value:', value);
    return value;
}

/**
 * Updates the frontmatter of the current file.
 * @param {string} key - The key of the frontmatter property, in dot notation.
 * @param {*} value - The new value to set for the frontmatter property.
 * @param {string} [dataType='string'] - The data type of the new value.
 */
async function updateProperties(key, value, dataType = 'string') {
    // console.log('updateProperties has been called with key:', key, 'and value:', value, 'and dataType:', dataType);
    const currentFile = app.workspace.getActiveFile();

    switch (dataType) {
        case 'string':
            value = value.toString();
            break;
        case 'link':
            value = `[[${value}]]`;
            break;
        case 'external-link':
            value = value.toString();
            break;
        case 'number':
            value = Number(value);
            break;
        case 'boolean':
            break;
        case 'latex':
            value = `$${value}$`;
            break;
        default:
            break;
    }

    // set value to undefined if it is NaN, null, or an empty object
    switch (value) {
        case NaN:
        case null:
        case {}:
            value = undefined;
    }

    // if the value is undefined, remove the property from the frontmatter
    if (value === undefined) {
        console.log('value is undefined. Removing the property from the frontmatter');
        await app.fileManager.processFrontMatter(currentFile, frontmatter => {
            const keys = key.split('.');
            let obj = frontmatter;

            // get the parent object of the target property
            let parent;
            if (keys.length > 1) {
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!obj[keys[i]]) {
                        obj[keys[i]] = {};
                    }
                    obj = obj[keys[i]];
                }
                parent = obj;
            }

            // Remove the target property
            // Check if parent is an array
            console.log(`Checking if ${keys[keys.length - 2]} is an array`);
            console.log(`${keys[keys.length - 2]}:`, parent);
            if (Array.isArray(parent)) {
                // Remove the item from the array
                console.log('Removing the item from the array');
                parent.splice(keys[keys
                    .length - 1], 1);
            } else {
                // Remove the property from the object
                console.log('Removing the property from the object');
                delete parent[keys[keys.length - 1]];
            }
        });
    } else {
        // update the property in the frontmatter
        await app.fileManager.processFrontMatter(currentFile, frontmatter => {
            const keys = key.split('.');
            let obj = frontmatter;

            // Traverse the keys to reach the target property
            for (let i = 0; i < keys.length - 1; i++) {
                if (!obj[keys[i]]) {
                    obj[keys[i]] = {};
                }
                obj = obj[keys[i]];
            }

            // Update the target property
            obj[keys[keys.length - 1]] = value;
        });
    }
}

/**
 * Changes a key name of the frontmatter of the current file.
 * @param {string} key - The key of the frontmatter property, in dot notation.
 * @param {string} newKey - The new key name to set for the frontmatter property.
 */
async function changeKeyName(key, newKey) {
    console.log('changeKeyName has been called with key:', key, 'and newKey:', newKey);
    const currentFile = app.workspace.getActiveFile();
    const frontmatter = app.metadataCache.getFileCache(currentFile).frontmatter;

    await app.fileManager.processFrontMatter(currentFile, frontmatter => {
        const keys = key.split('.');
        let obj = frontmatter;
        let parent;
        let lastKey = keys[keys.length - 1];

        // Traverse the keys to reach the parent object of the target property
        for (let i = 0; i < keys.length - 2; i++) {
            // Check if the current key does not exist in the object
            if (!obj[keys[i]]) {
                // If the key does not exist, create an empty object for it
                obj[keys[i]] = {};
            }
            // Move to the next level in the object hierarchy
            obj = obj[keys[i]];
        }

        // The parent object of the key to be renamed
        parent = obj;
        const targetKey = keys[keys.length - 2];
        // console.log('targetKey:', targetKey);

        // Rename the key in the parent object
        const newObj = renameObjectKey({ oldObject: parent[targetKey], oldKey: lastKey, newKey });
        // console.log('newObj:', newObj);

        // Replace the old object with the new object
        parent[targetKey] = newObj;
    });
}

function renameObjectKey({ oldObject, oldKey, newKey }) {
    const keys = Object.keys(oldObject);
    const newObject = keys.reduce((accumulator, currentKey) => {
        if (currentKey === oldKey) {
            accumulator[newKey] = oldObject[oldKey];
        } else {
            accumulator[currentKey] = oldObject[currentKey];
        }
        return accumulator;
    }, {});

    return newObject;
}

/**
 * Add a new key to the frontmatter of the current file.
 * @param {string} key - The key of the frontmatter property, in dot notation.
 * @param {*} value - The value to set for the frontmatter property.
 * @param {string} [dataType='string'] - The data type of the value.
 */
async function addProperty(key, value, dataType = 'string') {
    const currentFile = app.workspace.getActiveFile();
    const frontmatter = app.metadataCache.getFileCache(currentFile).frontmatter;

    switch (dataType) {
        case 'string':
            value = value.toString();
            break;
        case 'link':
            value = `[[${value}]]`;
            break;
        case 'external-link':
            value = value.toString();
            break;
        case 'number':
            value = Number(value);
            break;
        case 'boolean':
            break;
        default:
            break;
    }

    await app.fileManager.processFrontMatter(currentFile, frontmatter => {
        const keys = key.split('.');
        let obj = frontmatter;

        // Traverse the keys to reach the target property
        for (let i = 0; i < keys.length - 1; i++) {
            if (!obj[keys[i]]) {
                obj[keys[i]] = {};
            }
            obj = obj[keys[i]];
        }

        // Add the new property
        obj[keys[keys.length - 1]] = value;
    });
}

exports.getFrontmatterValue = getFrontmatterValue;
exports.addProperty = addProperty;
exports.updateProperties = updateProperties;
exports.changeKeyName = changeKeyName;