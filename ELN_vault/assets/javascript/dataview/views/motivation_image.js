if (input && dv) {
  const fs = require('fs');

  const vault_folder = app.vault.adapter.basePath;
  const folder_images = 'assets/images/Motivation/';
  // get all images from the folder
  let images = fs.readdirSync(vault_folder + '/' + folder_images)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
  // randomly select an image
  let image = images[Math.floor(Math.random() * images.length)];
  const img_tfile = app.vault.getAbstractFileByPath(folder_images + image);
  const img_path = app.vault.getResourcePath(img_tfile);
  
  const html = `<img class="motivation-img" src="${img_path}">`

  const container = dv.el("div", "", { cls: "motivation-img-container"});
  container.innerHTML = html;
}