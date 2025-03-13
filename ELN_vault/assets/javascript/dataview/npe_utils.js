// npe_utils.js

/**
 * Sets an icon for a container.
 * @param {Object} obsidian - The Obsidian API object.
 * @param {HTMLElement} container - The container element to set the icon for.
 * @param {string} icon - The icon name.
 */
function setIcon(obsidian, container, icon) {
    const icons = require('./npe_icons');
    if (obsidian) {
        obsidian.setIcon(container, icon);
    } else {
        const icon_name = icon.replace(/-/g, '_');
        container.innerHTML = icons[icon_name];
    }
}

/**
 * Get data type of a value.
 * @param {*} value - The value to get the data type of.
 * @returns {string} The data type of the value.
 */
function getDataType(value) {
    if (typeof value === 'string') {
        return detectStringType(value).dataType;
    } else if (typeof value === 'number') {
        return 'number';
    } else if (typeof value === 'boolean') {
        return 'boolean';
    } else {
        return 'unknown';
    }
}
/**
 * Detects the type of a string value.
 * @param {string} value - The string value to detect the type of.
 * @returns {Object} An object containing the data type and the value.
 */
function detectStringType(value) {
    let strType;
    if (value.startsWith('[[') && value.endsWith(']]')) {
        strType = 'link';
        value = value.slice(2, -2);
    // match markdown style external links
    } else if (value.match(/^\[.*\]\(.*\)$/)) {
        strType = 'external-link';
    // match date format
    } else if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
        strType = 'date';
    // match Latex formula
    } else if (value.match(/^\$.*\$$/)) {
        strType = 'latex';
        value = value.slice(1, -1);
    } else {
        strType = 'string';
    }
    return {
        dataType: strType,
        value: value,
    };
}

/**
 * Simple latex to HTML conversion. Supports sub- and superscript,
 * greek letters, and some basic math symbols.
 * @param {string} latex - The latex formula to convert to HTML.
 * @returns {string} The HTML representation of the latex formula.
 */
function latexToHTML(latex) {
    const greekLetters = {
        alpha: '&alpha;',
        beta: '&beta;',
        gamma: '&gamma;',
        delta: '&delta;',
        epsilon: '&epsilon;',
        zeta: '&zeta;',
        eta: '&eta;',
        theta: '&theta;',
        iota: '&iota;',
        kappa: '&kappa;',
        lambda: '&lambda;',
        mu: '&mu;',
        nu: '&nu;',
        xi: '&xi;',
        omicron: '&omicron;',
        pi: '&pi;',
        rho: '&rho;',
        sigma: '&sigma;',
        tau: '&tau;',
        upsilon: '&upsilon;',
        phi: '&phi;',
        chi: '&chi;',
        psi: '&psi;',
        omega: '&omega;',
        Alpha: '&Alpha;',
        Beta: '&Beta;',
        Gamma: '&Gamma;',
        Delta: '&Delta;',
        Epsilon: '&Epsilon;',
        Zeta: '&Zeta;',
        Eta: '&Eta;',
        Theta: '&Theta;',
        Iota: '&Iota;',
        Kappa: '&Kappa;',
        Lambda: '&Lambda;',
        Mu: '&Mu;',
        Nu: '&Nu;',
        Xi: '&Xi;',
        Omicron: '&Omicron;',
        Pi: '&Pi;',
        Rho: '&Rho;',
        Sigma: '&Sigma;',
        Tau: '&Tau;',
        Upsilon: '&Upsilon;',
        Phi: '&Phi;',
        Chi: '&Chi;',
        Psi: '&Psi;',
        Omega: '&Omega;',
    };
    const subSup = {
        '^': 'sup',
        '_': 'sub',
    };
    const mathSymbols = {
        'pm': '&plusmn;',
        'mp': '∓',
        'times': '&times;',
        'div': '&divide;',
        'cdot': '&middot;',
        'ast': '&lowast;',
        'star': '&starf;',
        'circ': '&cir;',
        'bullet': '&bull;',
        'sqrt': '&radic;',
        'sqrt\\[3\\]': '∛',
        'sqrt\\[4\\]': '∜',
        'infty': '&infin;',
        'int': '&int;',
        'sum': '&sum;',
        'prod': '&prod;',
        'coprod': '&coprod;',
    };
    const mathFunctions = {
        'sin': 'sin',
        'cos': 'cos',
        'tan': 'tan',
        'cot': 'cot',
        'sec': 'sec',
        'csc': 'csc',
        'lim': 'lim',
        'log': 'log',
        'ln': 'ln',
        'sin': 'sin',
        'cos': 'cos',
        'tan': 'tan',
        'cot': 'cot',
        'sec': 'sec',
        'csc': 'csc',
        'arcsin': 'arcsin',
        'arccos': 'arccos',
        'arctan': 'arctan',
        'sinh': 'sinh',
        'cosh': 'cosh',
        'tanh': 'tanh',
        'coth': 'coth',
        'sech': 'sech',
        'csch': 'csch',
        'arcsinh': 'arcsinh',
        'arccosh': 'arccosh',
        'arctanh': 'arctanh',
        'arccoth': 'arccoth',
        'arcsech': 'arcsech',
        'arccsch': 'arccsch',
    };
    const mathOperators = {
        '\\*': '&times;',
        '\\/': '&divide;',
        '\\+': '+',
        '\\-': '&minus;',
        '\\=': '=',
        '\\<': '&lt;',
        '\\>': '&gt;',
        '\\!=': '&ne;',
        '\\<=': '&le;',
        '\\>=': '&ge;',
    };

    let html = latex;

    // Convert math operators
    // math operators are converted first to avoid conflicts with other symbols, in particular
    // the < and > symbols which are used in HTML tags
    Object.keys(mathOperators).forEach((mo) => {
        html = html.replace(new RegExp(mo, 'g'), mathOperators[mo]);
        // console.log('html after mathOperators:', html);
    });
    // Convert math symbols
    Object.keys(mathSymbols).forEach((ms) => {
        html = html.replace(new RegExp(`\\\\${ms}`, 'g'), mathSymbols[ms]);
        // console.log('html after mathSymbols:', html);
    });
    // Convert math functions with <span> and class 'npe-math-function'
    Object.keys(mathFunctions).forEach((mf) => {
        html = html.replace(new RegExp(`\\\\${mf}(?:\\{([^}]*)\\}|\\(([^)]*)\\))`, 'g'), `<span class="npe-math-function">${mathFunctions[mf]}($1$2)</span>`);
        // console.log('html after mathFunctions:', html);
    });
    // Convert greek letters
    Object.keys(greekLetters).forEach((gl) => {
        html = html.replace(new RegExp(`\\\\${gl}`, 'g'), greekLetters[gl]);
        // console.log('html after greek:', html);
    });
    // Convert sub- and superscript
    Object.keys(subSup).forEach((ss) => {
        // Match multiple characters in sub- and superscript
        html = html.replace(new RegExp(`\\${ss}\\{([^}]*)\\}`, 'g'), `<${subSup[ss]}>$1</${subSup[ss]}>`);
        // Match single characters in sub- and superscript
        html = html.replace(new RegExp(`\\${ss}([^}])`, 'g'), `<${subSup[ss]}>$1</${subSup[ss]}>`);
        // console.log('html after subSup:', html);
    });

    return html;
}

/**
 * Returns the special key data for a given key.
 * @param {string} key - The key to get the special key data for.
 * @returns {Object} An object containing the icon for the special key.
 */
function handleSpecialKey(key) {
    const specialKeyData = {
        tags: { icon: 'tags' },
        tag: { icon: 'tags' },
        cssclass: { icon: 'paintbrush' },
        cssclasses: { icon: 'paintbrush' },
        author: { icon: 'user-pen' },
        series: { icon: 'gallery-vertical-end' },
        sample: { icon: 'atom' },
        process: { icon: 'route' },
        project: { icon: 'badge-check' },
        analysis: { icon: 'microscope' },
    };
    return specialKeyData[key] || { icon: 'list' };
}

exports.setIcon = setIcon;
exports.getDataType = getDataType;
exports.detectStringType = detectStringType;
exports.latexToHTML = latexToHTML;
exports.handleSpecialKey = handleSpecialKey;