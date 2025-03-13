/**
 * Get the author from the ELN settings file
 * @param {object} tp - the templater object to access the templater API
 * @returns {string} author
 */

async function get_author(tp) {
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  let author = get_property(eln_settings, 'note', 'author');
  // check if the author is a list
  if (author instanceof Array) {
    if (author.length >= 1) {
      if (author.length == 1) {
        author = author[0].name;
      } else {
        const author_list = author.map(a => a.name);
        author = await tp.system.suggester(author_list, author_list, false, 'Select author:');
      }
    }
    else {
      author = await tp.system.prompt('Enter author name:', '');
    }
  } else if (typeof author === 'string') {
    if (author === '') {
      author = await tp.system.prompt('Enter author name:', '');
    }
  } else {
    author = await tp.system.prompt('Enter author name:', '');
  }
  return author;
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

module.exports = get_author;
