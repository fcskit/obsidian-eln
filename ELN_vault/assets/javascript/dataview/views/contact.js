const rootKey = "__root__";

if (input && dv) {
  const path = require("path");
  const properties = dv.el("div", "", { cls: "note-properties", attr: { id: "properties-container" } });
  
  let contact_view = {};
  const frontmatter = dv.current().file.frontmatter;
  const title = (frontmatter.name.title) ? frontmatter.name.title : "";
  let header = `${title} ${frontmatter.name['given name']} ${frontmatter.name['family name']}`;
  dv.header(2, header, { container: properties });
  var contact_photo = `${frontmatter.name['given name']}-${frontmatter.name['family name']}.jpg`;
  if (!app.vault.getAbstractFileByPath(`assets/images/People/${contact_photo}`)) {
    contact_photo = "Dummy-Contact-Icon.png";
  }
  const contact_photo_tfile = app.vault.getAbstractFileByPath(`assets/images/People/${contact_photo}`);
  const contact_photo_uri = app.vault.getResourcePath(contact_photo_tfile);
  dv.el("img", "", { container: properties, attr: { width: 200, src: contact_photo_uri, alt: "Contact Photo" } });
  contact_view[rootKey] = dv.el("ul", "", { container: properties });
  yaml_object_to_list(frontmatter.contact, contact_view, 0, "");
  yaml_object_to_list(frontmatter.address, contact_view, 0, "");
  // const inst_responsibility = dv.pages('#instrument').where(p => p.instrument.contact.toString().includes(dv.current().file.name)).file.link;
  // const further_info_html = `<h4>Further Information</h4>
  // <p><strong>Position</strong> ${frontmatter['job position']}</p>
  // <p>Device responsibility</p>
  // <p>Instrument responsibility</p>
  // ${inst_responsibility}
  // <p>Lab responsibility</p>`;
  // properties.insertAdjacentHTML("beforeend", further_info_html);
}

function yaml_object_to_list(obj, contact_view, level, parent) {

  if (parent === "") {
    parent = rootKey;
  }

  const objkeys = Object.keys(obj);

  objkeys.forEach(okey => {
    if (obj[okey] instanceof Object) {
      if (obj[okey] instanceof Array) {
        const parentEl = contact_view[parent];
        // check if the array contains an object 
        if (obj[okey].length > 0 && obj[okey].some((e) => e instanceof Object) ) {
          const listEl = dv.el("li", "", { container: parentEl });
          dv.el("div", okey, { container: listEl, cls: "property-object" });
          contact_view[okey] = dv.el("ul", "", { container: parentEl });
          obj[okey].forEach(entry => {
            if (entry instanceof Object) {
              const listEl = dv.el("li", "", { container: parentEl });
              dv.el("div", okey, { container: listEl, cls: "property-object" });
              contact_view[okey] = dv.el("ul", "", { container: parentEl })
              yaml_object_to_list(entry, contact_view, level + 1, okey)
            }
            else {
              const parentEl = contact_view[parent];
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
        const parentEl = contact_view[parent];
        const listEl = dv.el("li", "", { container: parentEl });
        dv.el("div", okey, { container: listEl, cls: "property-object" });
        contact_view[okey] = dv.el("ul", "", { container: parentEl });
        yaml_object_to_list(obj[okey], contact_view, level + 1, okey)
      }
    } else {
      // determine data type of obj[okey]
      const data_type = get_data_type(okey, obj[okey]);
      const parentEl = contact_view[parent];
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