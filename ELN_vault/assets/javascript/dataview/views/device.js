const rootKey = "__root__";

if (input && dv) {
  const properties = dv.el("div", "", { cls: "note-properties", attr: { id: "properties-container" } });
  // Set up a tree-like dict of all the directory {path : ul element} mappings
  let listTree = {};
  let header = "Properties";
  let obj = {};
  const frontmatter = dv.current().file.frontmatter
  if (Object.keys(input).length === 0 && input.constructor === Object && frontmatter.hasOwnProperty("note type")) {
    const note_type = frontmatter["note type"];
    switch (note_type) {
      case "electrochemical cell":
        header = "Cell Properties";
        obj = frontmatter["cell"];
        break;
      case "device":
        header = "Device Properties";
        obj = frontmatter["device"];
        break;
      case "instrument":
        header = "Instrument Properties";
        obj = frontmatter["instrument"];
        break;
      case "chemical":
        header = "Chemical Properties";
        obj = frontmatter["chemical"];
        break;
      case "electrode":
        header = "Electrode Properties";
        obj = frontmatter["electrode"];
        break;
      case "reference electrode":
        header = "Reference Electrode Properties";
        obj = frontmatter["electrode"];
        break;
      case "process":
        header = "Process Properties";
        obj = frontmatter["process"];
        break;
      case "sample":
        header = "Sample Properties";
        obj = frontmatter["sample"];
        break;
      case "analysis":
        header = "Analysis Properties";
        obj = frontmatter["analysis"];
        break;
      case "lab":
        header = "Lab Properties";
        obj = frontmatter["lab"];
        break;
      default:
        obj = frontmatter;
    }
  }
  else {
    let key = "";
    // check if input has property "key"
    if (input.hasOwnProperty("key")) {
      obj = frontmatter[input.key];
      key = input.key;
    }
    else {
      obj = frontmatter;
    }
    if (input.hasOwnProperty("header")) {
      header = input.header;
    }
    else {
      // if key is not empty, capitalize the first letter
      if (key !== "") {
        key = key.charAt(0).toUpperCase() + key.slice(1);
      }
      header = `${key} Properties`;
    }
  }
  dv.header(2, header, { container: properties });
  listTree[rootKey] = dv.el("ul", "", { container: properties });
  yaml_object_to_list(obj, listTree, 0, "");
}

function yaml_object_to_list(obj, listTree, level, parent) {

  if (parent === "") {
    parent = rootKey;
  }

  const objkeys = Object.keys(obj);

  objkeys.forEach(okey => {
    if (obj[okey] instanceof Object) {
      if (obj[okey] instanceof Array) {
        const parentEl = listTree[parent];
        // check if the array contains an object 
        if (obj[okey].length > 0 && obj[okey].some((e) => e instanceof Object) ) {
          const listEl = dv.el("li", "", { container: parentEl });
          dv.el("div", okey, { container: listEl, cls: "property-object" });
          listTree[okey] = dv.el("ul", "", { container: parentEl });
          obj[okey].forEach(entry => {
            if (entry instanceof Object) {
              const listEl = dv.el("li", "", { container: parentEl });
              dv.el("div", okey, { container: listEl, cls: "property-object" });
              listTree[okey] = dv.el("ul", "", { container: parentEl })
              yaml_object_to_list(entry, listTree, level + 1, okey)
            }
            else {
              const parentEl = listTree[parent];
              dv.el("li", `${entry}`, { container: parentEl });
            }
          })
        }
        else {
          const data_type = "list"
          const listEl = dv.el("li", "", { container: parentEl });
          dv.el("div", okey, { container: listEl, cls: "property-key", attr: { "data-type": data_type } });
          const list_container = dv.el("div", "", { container: listEl, cls: "property-list-container", attr: { "data-type": data_type } });
          obj[okey].forEach(element => {
            const data_type = get_data_type(okey, obj[okey]);
            dv.el("div", element, { container: list_container, cls: "property-list-item", attr: { "data-type": data_type } });
          });
        }     
        // console.log(JSON.stringify(obj[okey]))
      } else {
        const parentEl = listTree[parent];
        const listEl = dv.el("li", "", { container: parentEl });
        dv.el("div", okey, { container: listEl, cls: "property-object" });
        listTree[okey] = dv.el("ul", "", { container: parentEl });
        yaml_object_to_list(obj[okey], listTree, level + 1, okey)
      }
    } else {
      // determine data type of obj[okey]
      const data_type = get_data_type(okey, obj[okey]);
      const parentEl = listTree[parent];
      const listEl = dv.el("li", "", { container: parentEl });
      dv.el("div", okey, { container: listEl, cls: "property-key", attr: { "data-type": data_type } });
      dv.el("div", obj[okey], { container: listEl, cls: "property-value", attr: { "data-type": data_type } });
    }
  });
}

function get_data_type(key, value) {
  let data_type = "string";
  if (typeof value === "number") {
    data_type = "number";
  }
  else if (typeof value === "boolean") {
    data_type = "boolean";
  }
  else if (typeof value === "object") {
    data_type = "object";
  }
  else {
    switch (key.toLowerCase()) {
      case "date":
        data_type = "date";
        break;
      case "time":
        data_type = "time";
        break;
      case "link":
        data_type = "link";
        break;
      default:
        data_type = "string";
    }
  }
  return data_type;
}

function add_script_collapsible() {
  const id = "collapsible-script";
  // check if script already exists
  if (document.getElementById(id)) {
    return;
  }
  const script = document.createElement("script");
  script.id = id;

  /* script.innerHTML = `
  const coll = document.getElementsByClassName("property-object");
  let i;
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }
  `; */
  script.innerHTML = `
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
  `;
  document.body.appendChild(script);
}

function set_property_style() {
  const id = "property-style";
  // check if style already exists
  if (document.getElementById(id)) {
    return;
  }
  const style = document.createElement("style");
  style.innerHTML = `
  .property-object {
    cursor: pointer;
    user-select: none;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
  }
  .property-object.active, .property-object:hover {
    background-color: #ddd;
  }
  .property-object:after {
    content: '\\002B';
    color: #777;
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }
  .property-object.active:after {
    content: "\\2212";
  }
  .property-object + ul {
    padding: 0 0 0 20px;
    display: none;
    overflow: hidden;
  }
  .property-object + ul {
    display: block;
  }
  .property-key {
    font-weight: bold;
  }
  .property-value {
    margin-left: 20px;
  }
  .property-array-value {
    margin-left: 20px;
  }
  .property-object {
    margin-left: 20px;
  }
  .property-object.active + ul {
    display: block;
  }
  `;
  document.head.appendChild(style);
}

function set_collapsible_style() {
  const style = document.createElement("style");
  style.innerHTML = `
  .collapsible {
    background-color: #777;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }

  .active, .collapsible:hover {
    background-color: #555;
  }

  .content {
    padding: 0 18px;
    display: none;
    overflow: hidden;
    background-color: #f1f1f1;
  }
  `;
  document.head.appendChild(style);
}


function add_element(parentEl, tag, text, cls, attr) {
  const el = document.createElement(tag);
  if (text) {
    el.innerHTML = text;
  }
  if (cls) {
    el.className = cls;
  }
  if (attr) {
    for (let key in attr) {
      el.setAttribute(key, attr[key]);
    }
  }
  parentEl.appendChild(el);
  return el;
}