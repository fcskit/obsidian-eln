const fm = require('./npe_fm');
const utils = require('./npe_utils');
const links = require('./npe_links');
const el = require('./npe_elements')

const specialKeys = ['tags', 'tag', 'cssclass', 'cssclasses', 'author', 'series', 'project', 'sample', 'process', 'analysis'];

/**
 * Renders the frontmatter of a file.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {HTMLElement} parent - The parent element to render the frontmatter into.
 * @param {Object} frontmatter - The frontmatter object to render.
 * @param {string} [subKey=''] - The subkey to render, in dot notation.
 * @param {Array<string>} [filterKeys=[]] - The list of keys to filter out, in dot notation.
 */
function renderFrontMatter(obsidian, parent, frontmatter, subKey = '', filterKeys = []) {
    let parentKey = '';

    if (subKey !== '') {
        subKey.split('.').forEach(key => frontmatter = frontmatter[key]);
        parentKey = subKey;
    }
    const container = parent.createDiv({ cls: 'npe-view-container' });
    // Create container for buttons
    const buttonContainer = container.createDiv({ cls: 'npe-button-container' });
    // Create container for frontmatter
    const propertiesContainer = container.createDiv({ cls: 'npe-properties-container' });
    // Create a toggle button at the top of the container
    createToggleButton(obsidian, buttonContainer, propertiesContainer);
    // Create a reload button at the top of the container
    createReloadButton(obsidian, buttonContainer, propertiesContainer, parentKey, filterKeys);
    // Render the frontmatter object
    if (frontmatter) {
        renderObject(obsidian, frontmatter, propertiesContainer, filterKeys, 0, parentKey);
    } else {
        const infoContainer = propertiesContainer.createDiv({ cls: 'npe-info-container' });
        const infoIcon = infoContainer.createDiv({ cls: 'npe-info-icon' });
        utils.setIcon(obsidian, infoIcon, 'info');
        const infoMessage = infoContainer.createDiv({ cls: 'npe-info-message' });
        infoMessage.textContent = `No frontmatter found. This may happen when the view is loaded 
                   before Obsidian has built the metadata cache. Try to reload 
                   the properties by clicking the reload button.`;
    }
}

/**
 * Creates a toggle button to collapse or expand all properties.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {HTMLElement} parent - The parent element to append the toggle button to.
 */
function createToggleButton(obsidian, buttonContainer, propertiesContainer) {
    const toggleButton = buttonContainer.createDiv({ cls: 'npe-button' });
    const toggleIcon = toggleButton.createDiv({ cls: 'npe-button-icon' });
    const toggleLabel = toggleButton.createDiv({ cls: 'npe-button-label', text: 'Expand' });
    utils.setIcon(obsidian, toggleIcon, 'chevrons-down-up');

    let allCollapsed = true;

    const toggleAll = () => {
        const allPropertiesContainers = propertiesContainer.querySelectorAll('.npe-object-properties-container, .npe-array-objects-container');
        allPropertiesContainers.forEach(container => {
            container.classList.toggle('hidden', allCollapsed);
        });
        allCollapsed = !allCollapsed;
        utils.setIcon(obsidian, toggleIcon, allCollapsed ? 'chevrons-up-down' : 'chevrons-down-up');
        toggleLabel.textContent = allCollapsed ? 'Expand' : 'Collapse';
    };

    toggleButton.addEventListener('click', toggleAll);
}

/**
 * Creates a reload button to reload or refresh the frontmatter view.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {HTMLElement} buttonContainer - The container element for the buttons.
 * @param {HTMLElement} propertiesContainer - The container element for the frontmatter properties.
 * @param {Object} frontmatter - The frontmatter object to render.
 * @param {string} parentKey - The parent key in dot notation.
 * @param {Array<string>} filterKeys - The list of keys to filter out, in dot notation.
 * @returns {HTMLElement} - The reload button element.
 */
function createReloadButton(obsidian, buttonContainer, propertiesContainer, parentKey, filterKeys) {  
    const reloadButton = buttonContainer.createDiv({ cls: 'npe-button' });
    const reloadIcon = reloadButton.createDiv({ cls: 'npe-button-icon' });
    const reloadLabel = reloadButton.createDiv({ cls: 'npe-button-label', text: 'Reload' });
    utils.setIcon(obsidian, reloadIcon, 'refresh-cw');

    reloadButton.addEventListener('click', async () => {
        const activeFile = app.workspace.getActiveFile();
        let frontmatter = await app.metadataCache.getFileCache(activeFile).frontmatter;

        if (parentKey !== '') {
        parentKey.split('.').forEach(key => frontmatter = frontmatter[key]);
    }
        propertiesContainer.innerHTML = '';
        renderObject(obsidian, frontmatter, propertiesContainer, filterKeys, 0, parentKey);
    });

    return reloadButton;
}

/**
 * Adds a toggle event to fold/unfold a container.
 * @param {HTMLElement} iconContainer - The container element for the icon.
 * @param {HTMLElement} keyDiv - The container element for the key.
 * @param {HTMLElement} targetContainer - The container element to be toggled.
 */
function addToggleEvent(iconContainer, keyDiv, targetContainer) {
    const toggleContainer = () => {
        targetContainer.classList.toggle('hidden');
    };
    iconContainer.addEventListener('click', toggleContainer);
    keyDiv.addEventListener('click', toggleContainer);
}

/**
 * Renders an object and its properties.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {Object} obj - The object to render.
 * @param {HTMLElement} parent - The parent element to render the object into.
 * @param {Array<string>} filterKeys - The list of keys to filter out, in dot notation.
 * @param {number} level - The current level of nesting.
 * @param {string} parentKey - The parent key in dot notation.
 * @param {boolean} [isArrayItem=false] - Whether the object is an item in an array.
 * @returns {HTMLElement} - The rendered object element.
 */
function renderObject(obsidian, obj, parent, filterKeys = [], level = 0, parentKey = '', isArrayItem = false) {
    // console.log('renderObject has been called with obj:', obj, 'and parent:', parent);
    Object.entries(obj).forEach(([key, value]) => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        let isKeyOfArrayObject = false;

        // Check if the fullKey is in the filterKeys list
        if (filterKeys.includes(fullKey)) {
            return;
        }

        if (Array.isArray(value)) {
            const arrayContainer = parent.createDiv({
                cls: 'npe-array-container',
                attr: {
                    'data-level': level,
                    'data-type': 'array',
                    'data-key': fullKey
                 }
            });
            renderArray(obsidian, key, value, arrayContainer, level, fullKey, filterKeys);
        } else if (typeof value === 'object' && value !== null) {
            renderObjectContainer(obsidian, key, value, parent, level, fullKey, filterKeys, isArrayItem);
        } else {
            if (isArrayItem) {
                isKeyOfArrayObject = true;
            }
            const primitiveContainer = parent.createDiv({
                cls: 'npe-key-value-container',
                attr: {
                    'data-level': level,
                    'data-type': typeof value,
                    'data-key': fullKey
                }
            });
            renderPrimitive(obsidian, key, value, primitiveContainer, level, fullKey, isKeyOfArrayObject);
        }
    });
}

/**
 * Renders an array and its items.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {string} key - The key of the array.
 * @param {Array} array - The array to render.
 * @param {HTMLElement} container - The container element to render the array into.
 * @param {number} level - The current level of nesting.
 * @param {string} parentKey - The parent key in dot notation.
 * @param {Array<string>} filterKeys - The list of keys to filter out, in dot notation.
 */
function renderArray(obsidian, key, array, container, level, parentKey, filterKeys) {
    // console.log('renderArray has been called with key:', key, 'and array:', array, 'and parent:', container);
    const fullKey = parentKey;
    let dataType = array.every(item => typeof item === 'object' && item !== null) ? 'object' : 'primitive';

    let icon = 'list';

    if (dataType === 'primitive') {
        // Set class list of the container to make sure the correct styles are applied
        container.classList = 'npe-array-container npe-primitive-array';
        if (specialKeys.includes(key)) {
            const specialKeyData = utils.handleSpecialKey(key);
            icon = specialKeyData.icon;
        }
        // const container = parent.createDiv({ cls: 'npe-array-container', attr: { 'data-level': level } });
        const keyWrapper = container.createDiv({
            cls: 'npe-key-wrapper npe-array',
            attr: { 'style': `--npe-data-level: ${level};` }
        });
        const keyContainer = keyWrapper.createDiv({ cls: 'npe-key-container npe-array' });
        const iconContainer = keyContainer.createDiv({ cls: 'npe-icon-container' });
        utils.setIcon(obsidian, iconContainer, icon);
        const keyLabelDiv = keyContainer.createDiv({ cls: 'npe-key-label npe-array', text: key });
        keyLabelDiv.contentEditable = true;
        // Add event listener to rename the key of the array when the keyLabelDiv is edited
        keyLabelDiv.addEventListener('blur', () => {
            const newKey = keyLabelDiv.textContent.trim();
            if (newKey && newKey !== key) {
                fm.changeKeyName(fullKey, newKey);
                key = newKey;
                updateDataKeys(container, fullKey, newKey);
            }
        });
        // Add options button to change the data type of the key
        const optionsButton = keyWrapper.createDiv({ cls: 'npe-button npe-button-options' });
        utils.setIcon(obsidian, optionsButton, 'ellipsis');
        optionsButton.addEventListener('click', () => {
            changeDataTypeCallback(obsidian, container, key, parentKey, level, false);
        });
        
        // Add value container for the array
        const valueContainer = container.createDiv({ cls: 'npe-array-value-container',  attr: { 'style': `--npe-data-level: ${level};` } });
        renderArrayValueContainer(valueContainer, array, fullKey);
        // Add remove button to remove the array
        const removeButton = container.createDiv({ cls: 'npe-button npe-button-remove' });
        removeButton.textContent = '×';
        removeButton.addEventListener('click', () => {
            fm.updateProperties(fullKey, undefined, 'undefined');
            container.remove();
        });
    } else {
        // Add 'npe-object-array' class to the container
        renderObjectArray(obsidian, key, array, container, level, fullKey, filterKeys);
    }
}

/** Render array value container
 * @param {HTMLElement} valueContainer - The container element for the array value.
 * @param {Array} array - The array to render.
 * @param {string} fullKey - The full key in dot notation.
 */
function renderArrayValueContainer(valueContainer, array, fullKey) {
    array.forEach((item, index) => {
        let input;
        const itemDataType = utils.getDataType(item);
        const itemContainer = valueContainer.createDiv({ cls: 'npe-list-item' });
        if (itemDataType === 'link') {
            item = item.slice(2, -2);
            // input = itemContainer.createEl('input', { type: 'text', value: item, attr: { 'data-key': `${fullKey}.${index}`, 'data-type': itemDataType } });
            const linkElement = links.createInternalLinkElement(item, itemContainer, `${fullKey}.${index}`);
        } else if (itemDataType === 'external-link') {
            const linkEl = links.createExternalLinkElement(item, itemContainer, `${fullKey}.${index}`);
            // itemContainer.appendChild(linkEl);
        } else if (itemDataType === 'string' || itemDataType === 'number') {
            input = itemContainer.createDiv({ cls: 'npe-list-item-value', text: item});
            input.contentEditable = true;
            input.addEventListener('blur', () => {
                fm.updateProperties(`${fullKey}.${index}`, input.textContent, itemDataType);
            });
        } else {
            let inputType;
            switch (itemDataType) {
                case 'date':
                    inputType = 'date';
                    break;
                case 'boolean':
                    inputType = 'checkbox';
                    break;
                default:
                    inputType = 'text';
            }
            input = itemContainer.createEl('input', { type: inputType, value: item, attr: { 'data-key': `${fullKey}.${index}`, 'data-type': itemDataType } });
            input.oninput = () => {
                fm.updateProperties(`${fullKey}.${index}`, input.value, itemDataType);
                // Update the array item with the new value
                array[index] = input.value;
            };
        }
        // Add button to remove the array item
        const removeButton = itemContainer.createDiv({ cls: 'npe-button npe-button-remove' });
        removeButton.textContent = '×';
        removeButton.addEventListener('click', () => {
            // Get current array from the frontmatter
            array = fm.getFrontmatterValue(fullKey);
            array.splice(index, 1);
            // Clear content of the value container
            valueContainer.innerHTML = '';
            renderArrayValueContainer(valueContainer, array, fullKey);
            fm.updateProperties(fullKey, array, 'array');
        });
    });
    // Add 'Add' button to add a new item to the array
    const addButton = valueContainer.createDiv({ cls: 'npe-button npe-button-add' });
    addButton.textContent = '+';
    addButton.addEventListener('click', () => {
        // get current array from the frontmatter
        array = fm.getFrontmatterValue(fullKey);
        const newItem = 'new item';
        array.push(newItem);
        // Clear content of the value container
        valueContainer.innerHTML = '';
        renderArrayValueContainer(valueContainer, array, fullKey);
        fm.updateProperties(fullKey, array, 'array');
    });
}

/**
 * Renders an object container and its properties.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {string} key - The key of the object.
 * @param {Object} value - The object to render.
 * @param {HTMLElement} parent - The parent element to render the object into.
 * @param {number} level - The current level of nesting.
 * @param {string} fullKey - The full key in dot notation.
 * @param {Array<string>} filterKeys - The list of keys to filter out, in dot notation.
 * @param {boolean} [isArrayItem=false] - Whether the object is an item in an array.
 */
function renderObjectContainer(obsidian, key, value, parent, level, fullKey, filterKeys, isArrayItem = false) {
    // console.log('renderObjectContainer has been called with key:', key, 'and value:', value, 'and parent:', parent);
    let icon = 'box';
    if (specialKeys.includes(key)) {
        const specialKeyData = utils.handleSpecialKey(key);
        icon = specialKeyData.icon;
    }
    const container = parent.createDiv({ cls: 'npe-object-container', attr: { 'data-level': level, 'data-key': fullKey } });
    const keyContainer = container.createDiv({ cls: 'npe-object-key-container', attr: { 'style': `--npe-data-level: ${level};` } });
    const keyWrapper = keyContainer.createDiv({ cls: 'npe-object-key-wrapper' });
    const keyDiv = keyWrapper.createDiv({ cls: 'npe-object-key' });
    const iconContainer = keyDiv.createDiv({ cls: 'npe-icon-container' });
    utils.setIcon(obsidian, iconContainer, icon);
    const keyLabelDiv = keyDiv.createDiv({ cls: 'npe-object-key-label', text: key });
    const editableDiv = keyDiv.createDiv({ cls: 'npe-make-editable' }); 

    // Add event listener to rename the key of the object when the keyDiv is clicked
    editableDiv.addEventListener('click', () => {
        keyLabelDiv.contentEditable = true;
        keyLabelDiv.focus();
        // Set cursor to the end of the text in the keyLabelDiv
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(keyLabelDiv);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    });
    keyLabelDiv.addEventListener('blur', async () => {
        // Get current fullKey from the data-key attribute of the container
        let fullKey = container.getAttribute('data-key');
        const newKey = keyLabelDiv.textContent.trim();
        if (newKey && newKey !== key) {
            await fm.changeKeyName(fullKey, newKey);
            // Update key and fullKey to the new values
            key = newKey;
            updateDataKeys(container, fullKey, newKey);
        }
        keyLabelDiv.contentEditable = false;
    });
    // Add button to add new property to the object
    const addButton = keyWrapper.createDiv({ cls: 'npe-button npe-button-add' });
    addButton.textContent = '+';
    const valueSpacer = keyContainer.createDiv({ cls: 'npe-object-value-spacer' });
    // Add button to remove the object
    const removeButton = keyContainer.createDiv({ cls: 'npe-button npe-button-remove' });
    removeButton.textContent = '×';


    // Add click event to fold/unfold properties
    const propertiesContainer = container.createDiv({ cls: 'npe-object-properties-container' });
    if (level > 0) {
        propertiesContainer.classList.add('hidden');
    }
    /********************************************************/
    /*         Event listeners for object container         */
    /********************************************************/
    // Add click event to fold/unfold properties
    addToggleEvent(iconContainer, keyLabelDiv, propertiesContainer);
    // Add click event to add new property to the object
    addButton.addEventListener('click', () => {
        const newKey = 'new key';
        const newValue = 'new value';
        value[newKey] = newValue;
        // Clear content of the properties container
        propertiesContainer.innerHTML = '';
        renderObject(obsidian, value, propertiesContainer, filterKeys, level, fullKey);
        fm.updateProperties(fullKey, value, 'object');
    });
    // Add click event to remove the object
    removeButton.addEventListener('click', () => {
        fm.updateProperties(fullKey, undefined, 'undefined');
        container.remove();
    });

    renderObject(obsidian, value, propertiesContainer, filterKeys, level + 1, fullKey);
}

/**
 * Renders an object array and its items.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {string} key - The key of the object array.
 * @param {Array} array - The object array to render.
 * @param {HTMLElement} container - The container element to render the object array into.
 * @param {number} level - The current level of nesting.
 * @param {string} parentKey - The parent key in dot notation.
 * @param {Array<string>} filterKeys - The list of keys to filter out, in dot notation.
 */
function renderObjectArray(obsidian, key, array, container, level, parentKey, filterKeys) {
    // console.log('renderObjectArray has been called with key:', key, 'and array:', array, 'and container:', container);
    // Update the class list of the container to make sure the correct styles are applied
    container.classList = 'npe-array-container npe-object-array';
    const fullKey = parentKey;
    let icon = 'boxes';
    if (specialKeys.includes(key)) {
        const specialKeyData = utils.handleSpecialKey(key);
        icon = specialKeyData.icon;
    }
    // const container = parent.createDiv({
    //     cls: 'npe-object-array-container',
    //     attr: { 'data-level': level, 'data-key': fullKey }
    // });
    const keyContainer = container.createDiv({
        cls: 'npe-object-key-container',
        attr: { 'style': `--npe-data-level: ${level};` }
    });
    const keyWrapper = keyContainer.createDiv({ cls: 'npe-object-key-wrapper' });
    const keyDiv = keyWrapper.createDiv({ cls: 'npe-object-key' });
    const iconContainer = keyDiv.createDiv({ cls: 'npe-icon-container' });
    utils.setIcon(obsidian, iconContainer, icon);
    const keyLabelDiv = keyDiv.createDiv({ cls: 'npe-object-key-label', text: key });
    const editableDiv = keyDiv.createDiv({ cls: 'npe-make-editable' });

    // Add event listener to rename the key of the object array when the keyDiv is clicked
    editableDiv.addEventListener('click', () => {
        keyLabelDiv.contentEditable = true;
        keyLabelDiv.focus();
        // Set cursor to the end of the text in the keyLabelDiv
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(keyLabelDiv);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    });
    keyLabelDiv.addEventListener('blur', async () => {
        // Get current fullKey from the data-key attribute of the container
        let fullKey = container.getAttribute('data-key');
        const newKey = keyLabelDiv.textContent.trim();
        if (newKey && newKey !== key) {
            await fm.changeKeyName(fullKey, newKey);
            // Update key and fullKey to the new values
            key = newKey;
            updateDataKeys(container, fullKey, newKey);
        }
        keyLabelDiv.contentEditable = false;
    }
    );

    // Add click event to fold/unfold array items
    const arrayContainer = container.createDiv({ cls: 'npe-array-objects-container' });
    if (level > 0) {
        arrayContainer.classList.add('hidden');
    }
    addToggleEvent(iconContainer, keyLabelDiv, arrayContainer);

    // Add button to add new object to the array
    const addButton = keyWrapper.createDiv({ cls: 'npe-button npe-button-add' });
    addButton.textContent = '+';
    addButton.addEventListener('click', () => {
        // Array may have changed. Get the current value of the array from the frontmatter
        array = fm.getFrontmatterValue(fullKey);
        // Get keys of the first object in the array
        if (array.length === 0) {
            array.push({});
        } else {
            const keys = Object.keys(array[0]);
            const newObj = keys.reduce((accumulator, key) => {
                accumulator[key] = '~~';
                return accumulator;
            }, {});
            array.push(newObj);
        }
        // Render new object
        const index = array.length - 1;
        renderObjectOfArray(obsidian, key, array[index], index, arrayContainer, level, `${fullKey}.${index}`, filterKeys);
        // Update the array in the frontmatter
        fm.updateProperties(fullKey, array, 'array');
    });

    const valueSpacer = keyContainer.createDiv({ cls: 'npe-object-value-spacer' });
    // Add button to remove the object array
    const removeButton = keyContainer.createDiv({ cls: 'npe-button npe-button-remove' });
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
        fullKey = container.getAttribute('data-key');
        fm.updateProperties(fullKey, undefined, 'undefined');
        container.remove();
    });

    array.forEach((item, index) => {
        const itemContainer = renderObjectOfArray(obsidian, key, item, index, arrayContainer, level, `${fullKey}.${index}`, filterKeys);
    });
}

/**
 * Renders an object of an object array.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {string} key - The key of the object.
 * @param {Object} item - The object to render.
 * @param {number} index - The index of the object in the array.
 * @param {HTMLElement} parent - The parent element to render the object into.
 * @param {number} level - The current level of nesting.
 * @param {string} fullKey - The full key in dot notation.
 * @param {Array<string>} filterKeys - The list of keys to filter out, in dot notation.
 * @returns {HTMLElement} - The rendered object element.
 */
function renderObjectOfArray(obsidian, key, item, index, parent, level, fullKey, filterKeys) {
    const itemContainer = parent.createDiv({ cls: 'npe-array npe-object-container', attr: { 'data-key': fullKey } });
    const itemKeyContainer = itemContainer.createDiv({ cls: 'npe-object-key-container', attr: { 'style': `--npe-data-level: ${level + 1};` } });
    const itemKeyWrapper = itemKeyContainer.createDiv({ cls: 'npe-object-key-wrapper' });
    const itemKeyDiv = itemKeyWrapper.createDiv({ cls: 'npe-object-key' });
    const itemIconContainer = itemKeyDiv.createDiv({ cls: 'npe-icon-container' });
    utils.setIcon(obsidian, itemIconContainer, 'box');
    // Check if the object has a 'name' key
    const name = item.name ? item.name : `${key} ${index + 1}`;
    const itemKeyLabelDiv = itemKeyDiv.createDiv({ cls: 'npe-object-key-label', text: name });

    // Add and edit Div to rename the key of the object if the object has a 'name' key
    if (item.name) {
        const editableDiv = itemKeyDiv.createDiv({ cls: 'npe-make-editable' });

        editableDiv.addEventListener('click', () => {
            itemKeyLabelDiv.contentEditable = true;
            itemKeyLabelDiv.focus();
            // Set cursor to the end of the text in the keyLabelDiv
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(itemKeyLabelDiv);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        });
        itemKeyLabelDiv.addEventListener('blur', async () => {
            // Change the value of the 'name' key in the object
            item.name = itemKeyLabelDiv.textContent.trim();
            // Get current fullKey from the data-key attribute of the container
            let fullKey = itemContainer.getAttribute('data-key');
            // Update the object in the frontmatter
            fm.updateProperties(fullKey, item, 'object');
            // Set contentEditable to false
            itemKeyLabelDiv.contentEditable = false;
            // Update the value of the 'name' key in the object
            // Get the key-value container of the 'name' key in the object
            const nameKeyValueContainer = itemContainer.querySelector('.npe-key-value-container[data-key$=".name"]');
            // Update the text content of the value input element
            nameKeyValueContainer.querySelector('.npe-meta-value input').value = item.name;
        });
    }
    // Add button to add a new property to the object
    const addButton = itemKeyWrapper.createDiv({ cls: 'npe-button npe-button-add' });
    addButton.textContent = '+';
    addButton.addEventListener('click', () => {
        // Get key from the data-key attribute of the container
        const fullKey = itemContainer.getAttribute('data-key');
        // Get current value of the object
        item = fm.getFrontmatterValue(fullKey);
        // console.log('Current value of the object:', item);
        // Add new property to the object
        const newKey = 'new key';
        item[newKey] = 'new value';
        // console.log('New value of the object:', item);
        // Clear content of the properties container
        propertiesContainer.innerHTML = '';
        renderObject(obsidian, item, propertiesContainer, filterKeys, level + 2, fullKey, true);
        // Update the object in the frontmatter
        fm.updateProperties(fullKey, item, 'object');
    });
    const valueSpacer = itemKeyContainer.createDiv({ cls: 'npe-object-value-spacer' });
    // Add button to remove the object
    const removeButton = itemKeyContainer.createDiv({ cls: 'npe-button npe-button-remove' });
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
        // Get fullKey from the data-key attribute of the container
        const fullKey = itemContainer.getAttribute('data-key');
        const arrayKey = fullKey.split('.').slice(0, -1).join('.');
        // Get current value of the array
        const array = fm.getFrontmatterValue(arrayKey);
        // Remove the object from the array
        array.splice(index, 1);
        // Update the array in the frontmatter
        fm.updateProperties(arrayKey, array, 'array');
        // Remove the object container
        itemContainer.remove();
        // If we remove an object from the array, we need to update the keys of the following objects
        const renderedObjects = parent.querySelectorAll('.npe-object-container');
        renderedObjects.forEach((item, index) => {
            updateArrayDataKeyIndices(item, index);
        });
    });
    const propertiesContainer = itemContainer.createDiv({ cls: 'npe-object-properties-container hidden' });
    addToggleEvent(itemIconContainer, itemKeyLabelDiv, propertiesContainer);
    renderObject(obsidian, item, propertiesContainer, filterKeys, level + 2, fullKey, true);
    return itemContainer;
}

/**
 * Recursively updates the data-key attribute of the children of an element.
 * @param {HTMLElement} element - The element to update the data-key attribute of its children.
 * @param {number} index - The new index of the object in the array.
 */
function updateArrayDataKeyIndices(element, index) {
    // Get classes of the element
    const classes = element.classList;
    // Check if classes contain 'npe-object-container' and 'npe-array'
    if (classes.contains('npe-object-container') && classes.contains('npe-array')) {
        // Get the full key from the data-key attribute of the element
        const fullKey = element.getAttribute('data-key');
        // Determine the base key of the object
        const baseKey = fullKey.split('.').slice(0, -1).join('.');
        // Update the data-key attribute of the element
        const newKey = `${baseKey}.${index}`;
        element.setAttribute('data-key', newKey);
        // Recursivly update the data-key attribute of the children
        const children = element.querySelectorAll('[data-key]');
        children.forEach(child => {
            // Get the key name of the child without the old full key
            const fullKeyLength = fullKey.length;            
            const childKey = child.getAttribute('data-key').slice(fullKeyLength + 1);
            // Update the key name of the child
            const newChildKey = `${newKey}.${childKey}`;
            child.setAttribute('data-key', newChildKey);
        });
    } else {
        // console.log('Waring: data-key attribute not updated. Element does not have the required classes.');
    }
}

/**
 * Recursively update the data-key attribute of an element and
 * its children when the key of the element is renamed.
 * @param {HTMLElement} element - The element to update the data-key attribute of its children.
 * @param {string} oldKey - The old key name of the parent element as full key in dot notation.
 * @param {string} newKey - The new key name of the parent element.
 */
function updateDataKeys(element, oldKey, newKey) {
    const keybase = oldKey.split('.').slice(0, -1).join('.');
    const newFullKey = `${keybase}.${newKey}`;
    element.setAttribute('data-key', newFullKey);
    const children = element.querySelectorAll('[data-key]');
    children.forEach(child => {
        const fullKey = child.getAttribute('data-key');
        const newFullKeyChild = fullKey.replace(oldKey, newFullKey);
        child.setAttribute('data-key', newFullKeyChild);
    });
}

/**
 * Renders a primitive value.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {string} key - The key of the primitive value.
 * @param {*} value - The primitive value to render.
 * @param {HTMLElement} container - key-value container to render the primitive value into.
 * @param {number} level - The current level of nesting.
 * @param {string} fullKey - The full key in dot notation.
 * @param {boolean} [isKeyOfArrayObject=false] - Whether the key is a key of an object in an array.
 */
function renderPrimitive(obsidian, key, value, container, level, fullKey, isKeyOfArrayObject = false) {
    let icon;
    let dataType = typeof value;
    let inputType;
    let inputValue = value;
    let callback;

    if (dataType === 'string') {
        const stringType = utils.detectStringType(value);
        inputValue = stringType.value;
        dataType = stringType.dataType;
        switch (dataType) {
            case 'link':
                icon = 'link';
                inputType = 'text';
                dataType = 'link';
                break;
            case 'external-link':
                icon = 'link';
                inputType = 'url';
                dataType = 'external-link';
                break;
            case 'date':
                icon = 'calendar';
                inputType = 'date';
                dataType = 'date';
                break;
case 'latex':
                icon = 'sigma';
                inputType = 'text';
                dataType = 'latex';
                break;
            default:
                icon = 'text';
                inputType = 'text';
                dataType = 'text';
        }
        callback = (input) => { input.value = input.value; };
    } else if (dataType === 'number') {
        icon = 'binary';
        inputType = 'number';
        callback = (input) => { input.value = parseFloat(input.value); };
    } else if (dataType === 'boolean') {
        icon = 'check';
        inputType = 'checkbox';
        inputValue = value ? 'checked' : '';
        callback = (input) => { input.value = input.checked; };
    } else {
        dataType = 'unknown';
        icon = 'help-circle';
    }
    // Check if the key is a special key
    if (specialKeys.includes(key)) {
        const specialKeyData = utils.handleSpecialKey(key);
        icon = specialKeyData.icon;
    }

    // Set the data-type attribute of the container
    container.setAttribute('data-type', dataType);

        const keyWrapper = container.createDiv({
        cls: 'npe-primitive npe-key-wrapper',
        attr: { 'style': `--npe-data-level: ${level};` }
    });
    const keyContainer = keyWrapper.createDiv({ cls: 'npe-key-container npe-primitive' });
    const iconContainer = keyContainer.createDiv({ cls: 'npe-icon-container' });
    utils.setIcon(obsidian, iconContainer, icon);

    // Create editable key div
    const keyLabelDiv = keyContainer.createDiv({
        cls: 'npe-primitive npe-key-label npe-editable-key',
        attr: { 'style': `--npe-data-level: ${level};` },
        text: key
    });
    keyLabelDiv.contentEditable = true;

    // Add options button after the key div to change the type of the value
    const optionsButton = keyWrapper.createDiv({ cls: 'npe-button npe-button-options' });
    // add ellipsis icon to the options button
    utils.setIcon(obsidian, optionsButton, 'ellipsis');
    optionsButton.addEventListener('click', () => {
        changeDataTypeCallback(obsidian, container, key, fullKey, level, isKeyOfArrayObject);
    });

    // Add event listener for blur event to update the key name
    keyLabelDiv.addEventListener('blur', async () => {
        // Get current fullKey from the data-key attribute of the container
        let fullKey = container.getAttribute('data-key');
        const newKey = keyLabelDiv.textContent.trim();
        if (newKey && newKey !== key) {
            await fm.changeKeyName(fullKey, newKey);
            // Update key and fullKey to the new values
            key = newKey;
            fullKey = fullKey.split('.').slice(0, -1).concat(newKey).join('.');
            // Update the data-key attribute of the container
            container.setAttribute('data-key', fullKey);
        }
    });
    const valueDiv = container.createDiv({ cls: 'npe-meta-value' });

    // Add button to remove the property
    const removeButton = container.createDiv({ cls: 'npe-button npe-button-remove' });
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
        // Get fullKey from the data-key attribute of the container
        const fullKey = container.getAttribute('data-key');
        fm.updateProperties(fullKey, undefined, 'undefined');
        container.remove();
    });

    if (dataType === 'external-link') {
        links.createExternalLinkElement(inputValue, valueDiv, fullKey);
    } else if (dataType === 'link') {
        const linkText = value.slice(2, -2);
        const linkElement = links.createInternalLinkElement(linkText, valueDiv, fullKey);
        // valueDiv.appendChild(linkElement);
} else if (dataType === 'latex') {
        let htmlFormula = inputValue;
        htmlFormula = utils.latexToHTML(htmlFormula);

        const latexDiv = valueDiv.createDiv({ cls: 'npe-latex' });
        latexDiv.innerHTML = htmlFormula;
        latexDiv.addEventListener('click', () => {
            let value = fm.getFrontmatterValue(fullKey);
            value = value.slice(1, -1);
            latexDiv.innerHTML = value;
            latexDiv.contentEditable = true;
            latexDiv.focus();
        });
        latexDiv.addEventListener('blur', () => {
            const newValue = latexDiv.textContent;
            fm.updateProperties(fullKey, newValue, 'latex');
            latexDiv.innerHTML = utils.latexToHTML(newValue);
            latexDiv.contentEditable = false;
        });
    } else if (inputType) {
        const input = valueDiv.createEl('input', { type: inputType, value: inputValue, attr: { 'data-key': fullKey } });
        // const input = el.createResizableInput(valueDiv, fullKey, inputValue, inputType, dataType, callback);
        if (inputType === 'checkbox') {
            input.checked = value;
        }

        input.addEventListener('blur', () => {
            callback(input);
            // Get fullKey from the data-key attribute of the container
            const fullKey = container.getAttribute('data-key');
            fm.updateProperties(fullKey, inputType === 'checkbox' ? input.checked : input.value, dataType);
            // If the key is a key of an object in an array and has a name proerty, update the displayed
            //  name of the object to reflect the new value of the name property
            if (isKeyOfArrayObject && key === 'name') {
                // Get the get the container of the object in the array
                // The container has the class 'npe-object-container' and
                // the attribute 'data-key' set to the fullKey of the object
                const objectFullKey = fullKey.split('.').slice(0, -1).join('.');
                // console.log('name property of object with key', objectFullKey, 'will be updated to', input.value);
                const objectItemContainer = document.querySelector('.npe-object-container[data-key="' + objectFullKey + '"]');
                // console.log('objectItemContainer:', objectItemContainer);
                // Get the key-label div of the object
                const objectKeyLabelDiv = objectItemContainer.querySelector('.npe-object-key-label');
                // Update the text content of the key-label div
                objectKeyLabelDiv.textContent = input.value;
                // console.log('objectKeyLabelDiv:', objectKeyLabelDiv);
            }
        });
    } else {
        valueDiv.textContent = value;
    }
}

/**
 * Callback function to change the data type of a key.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {HTMLElement} container - The container element.
 * @param {string} key - The key of the value.
 * @param {string} fullKey - The full key in dot notation.
 * @param {number} level - The current level of nesting.
 * @param {boolean} isKeyOfArrayObject - Whether the key is a key of an object in an array.
 */
function changeDataTypeCallback(obsidian, container, key, fullKey, level, isKeyOfArrayObject) {
    const dataTypes = ['text', 'number', 'boolean', 'link', 'object', 'array'];
    const defaultValues = {
        'text': 'new text',
        'number': 0,
        'boolean': false,
        'link': 'new link',
        'object': { newKey: 'new value' },
        'array': ['item1', 'item2']
    };

    const contextmenu = container.createDiv({ cls: 'npe-menu' });
    dataTypes.forEach(newDataType => {
        const option = contextmenu.createDiv({ cls: 'npe-menu-item' });
        option.textContent = newDataType;
        option.addEventListener('click', () => {
            let newValue = defaultValues[newDataType];
            let newInputValue = newValue;
            contextmenu.remove();
            if (newDataType !== container.getAttribute('data-type')) {
                const value = fm.getFrontmatterValue(fullKey);
                if (newDataType === 'object') {
                    if (value) newValue = { key: value };
                    container.innerHTML = '';
                    container.setAttribute('data-type', newDataType);
                    container.className = 'npe-object-container';
                    renderObjectContainer(obsidian, key, newValue, container, level, fullKey, []);
                    fm.updateProperties(fullKey, newValue, 'object');
                } else if (newDataType === 'array') {
                    if (value) newValue = [value];
                    container.innerHTML = '';
                    container.setAttribute('data-type', newDataType);
                    container.className = 'npe-array-container';
                    renderArray(obsidian, key, newValue, container, level, fullKey, []);
                    fm.updateProperties(fullKey, newValue, 'array');
                } else {
                    if (value) {
                        if (newDataType === 'link' && container.getAttribute('data-type') === 'text') {
                            newValue = `[[${value}]]`;
                            newInputValue = value;
                        } else if (newDataType === 'text' && container.getAttribute('data-type') === 'link') {
                            newValue = value.slice(2, -2);
                            newInputValue = newValue;
                        }
                    }
                    container.innerHTML = '';
                    container.setAttribute('data-type', newDataType);
                    renderPrimitive(obsidian, key, newValue, container, level, fullKey, isKeyOfArrayObject);
                    fm.updateProperties(fullKey, newInputValue, newDataType);
                }
            }
        });
    });
}

exports.renderFrontMatter = renderFrontMatter;