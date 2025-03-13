// npe_elements.js

/**
 * Creates a resizable input field.
 * @param {HTMLElement} parent - The parent element to append the input field to.
 * @param {string} value - The initial value of the input field.
 * @param {string} fullKey - The full key of the input field, in dot notation.
 * @param {string} dataType - The data type of the input field.
 * @param {Function} callback - The callback function to call when the input field is changed.
 * @returns {HTMLElement} - The input field element.
 */
function createResizableInput(parent, fullKey, value, inputType, dataType, callback) {
    const container = parent.createEl('div');
    container.className = 'resize-container';

    const span = parent.createEl('span');
    span.className = 'resize-text';
    span.textContent = value;
    container.appendChild(span);

    const input = parent.createEl('input', { type: inputType, value: value, attr: { 'data-key': fullKey, 'data-type': dataType } });
    input.className = 'resize-input';
    container.appendChild(input);

    
    // Add event listener to handle input events and resize the input field
    input.addEventListener('input', event => {
        span.textContent = input.value;
    });

    // Initialize the span text content
    span.textContent = input.value;

    input.oninput = () => {
        callback(input);
        fm.updateProperties(fullKey, inputType === 'checkbox' ? input.checked : input.value, dataType);
    };
    return container;
}

exports.createResizableInput = createResizableInput;