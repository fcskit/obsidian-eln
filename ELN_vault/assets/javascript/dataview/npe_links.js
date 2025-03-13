// npe_links.js
const el = require('./npe_elements');
const utils = require('./npe_utils')
const fm = require('./npe_fm');

/**
 * Converts an obsidian filename into a link
 * @param { string } filename - The filename of md file without extension.
 * @returns { HTMLElement } - The link element.
 */
function createInternalFileLink(filename) {
    // find file by filename and get its tfile
    // const tfile = app.metadataCache.getFirstLinkpathDest(filename)

    displayText = filename;
    linkText = filename;
    return createFragment().createEl("a", {
            attr: {
                'data-href': linkText,
                target: "_blank",
                rel: "noopener nofollow"
            },
            href: linkText,
            cls: "internal-link",
            text: displayText,
        });
}

/**
 * 
 * @param {string} filename - The filename of md file without extension.
 * @param {Object} obsidian - The Obsidian API object.
 * @returns {HTMLElement} - The link element with icon. 
 */
function createInternalFileLinkWithIcon(filename, obsidian) {
    const link = createInternalFileLink(filename);
    // remove the text content
    link.textContent = '';
    const iconContainer = link.createEl('div', {
        alt: filename,
        cls: 'clickable-icon',
        attr: {'aria-label': `Open ${filename}`}
    });
    utils.setIcon(obsidian, iconContainer, 'link');
    return link;
}

/**
 * Creates a link element for an external URL.
 * @param {string} url - The URL to link to.
 * @param {string} displayText - The text to display for the link.
 * @returns {HTMLElement} - The link element.
 */
function createExternalLink(url, displayText) {
    return createFragment().createEl("a", {
        attr: {
            href: url,
            target: "_blank",
            rel: "noopener nofollow"
        },
        text: displayText
    });
}

/**
 * Creates a link element for an external URL with an icon.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {string} url - The URL to link to.
 * @param {string} displayText - The text to display for the link.
 * @param {string} icon - The icon name.
 * @returns {HTMLElement} - The link element.
 */
function createExternalLinkWithIcon(obsidian, url, displayText, icon) {
    const link = createExternalLink(url, displayText);
    // remove the text content
    link.textContent = '';
    const iconContainer = link.createDiv({ cls: 'clickable-icon' });
    utils.setIcon(obsidian, iconContainer, icon);
    return link;
}

/**
 * Creates internal link element.
 */
function createInternalLinkElement(internalLink, parent, fullKey) {
    // const linkText = value.match(/\[\[(.*?)\]\]/)[1];
    const linkDiv = parent.createDiv({ cls: 'npe-editable-link' });
    const link = linkDiv.createEl("a", {
            attr: {
                'data-href': internalLink,
                target: "_blank",
                rel: "noopener nofollow"
            },
            href: internalLink,
            cls: "internal-link",
            text: internalLink,
        });
    const editableDiv = linkDiv.createDiv({ cls: 'npe-make-editable' });
    // Register event listner for editableDiv to make the link editable
    editableDiv.addEventListener('click', () => {
        link.contentEditable = true;
        link.focus();
        // Set the cursor to the end of the text
        const range = document.createRange();
        range.selectNodeContents(link);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });
    // Register event listner for link to update the frontmatter as well as href and data-href attributes
    link.addEventListener('blur', () => {
        fm.updateProperties(fullKey, link.textContent, 'link');
        link.setAttribute('href', link.textContent);
        link.setAttribute('data-href', link.textContent);
        link.contentEditable = false;
    });
}

/**
 * Creates external link element.
 */
function createExternalLinkElement(value, parent, fullKey) {
    if (typeof value !== 'string') {
        // assign dummy url
        value = '[example link](https://example.com)';
    }
    const linkText = value.match(/\[(.*?)\]/)[1];
    const linkUrl = value.match(/\((.*?)\)/)[1];
    const linkDiv = parent.createDiv({ cls: 'npe-editable-link' });
    const link = linkDiv.createEl("a", {
        attr: {
            href: linkUrl,
            target: "_blank",
            rel: "noopener nofollow"
        },
        text: linkText
    });
    const editableDiv = linkDiv.createDiv({ cls: 'npe-make-editable' });

    // Register event listener for editableDiv to make the link editable
    editableDiv.addEventListener('click', () => {
        link.contentEditable = true;
        // get current link text and url from the frontmatter
        const value = fm.getFrontmatterValue(fullKey);
        const linkText = value.match(/\[(.*?)\]/)[1];
        const linkUrl = value.match(/\((.*?)\)/)[1];
        link.textContent = `[${linkText}](${linkUrl})`;
        // deactivate the link while editing
        link.removeAttribute('href');
        link.focus();
        // Set the cursor to the end of the text
        const range = document.createRange();
        range.selectNodeContents(link);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });

    // Register event listener for link to update the frontmatter as well as href attribute
    link.addEventListener('blur', () => {
        const newValue = link.textContent;
        const newLinkText = newValue.match(/\[(.*?)\]/)[1];
        const newLinkUrl = newValue.match(/\((.*?)\)/)[1];
        fm.updateProperties(fullKey, newValue, 'external-link');
        link.setAttribute('href', newLinkUrl);
        link.textContent = newLinkText;
        link.contentEditable = false;
        // reactivate the link after editing
        link.setAttribute('href', newLinkUrl);
    });
}

exports.createInternalFileLink = createInternalFileLink;
exports.createInternalFileLinkWithIcon = createInternalFileLinkWithIcon;
exports.createExternalLink = createExternalLink;
exports.createExternalLinkWithIcon = createExternalLinkWithIcon;
exports.createInternalLinkElement = createInternalLinkElement;
exports.createExternalLinkElement = createExternalLinkElement;
