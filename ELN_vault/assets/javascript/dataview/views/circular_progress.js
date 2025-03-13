if (input && dv) {
  const dv_container = dv.container;
  const container = document.createElement("div");
  container.classList.add("progress-container");
  container.setAttribute("id", "cp-container");
  dv_container.appendChild(container);
  // get all input fields of class .task-list-item-checkbox in the current view-content div
  const checkboxes = document.querySelectorAll('div.view-content input.task-list-item-checkbox');
  // Convert NodeList to an array and filter out checkboxes that do not have the data-line attribute
  let checkboxesArray = Array.from(checkboxes).filter((checkbox) => checkbox.getAttribute('data-line') !== null);
  // get number of checked checkboxes
  let checkedCheckboxes = checkboxesArray.filter((checkbox) => checkbox.checked).length;
  // compute the progress
  let progress = Math.round(checkedCheckboxes / checkboxesArray.length * 100);

  const cp_container = document.createElement("div");
  cp_container.classList.add("circularprogress");
  container.appendChild(cp_container);
  const card = document.createElement("div");
  card.classList.add("card");
  cp_container.appendChild(card);
  const percent = document.createElement("div");
  percent.classList.add("percent");
  percent.style.setProperty('--clr', '#8bdaa9');
  percent.style.setProperty('--num', progress);
  card.appendChild(percent);
  const dot = document.createElement("div");
  dot.classList.add("dot");
  percent.appendChild(dot);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  percent.appendChild(svg);
  const circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle1.setAttribute("cx", "70");
  circle1.setAttribute("cy", "70");
  circle1.setAttribute("r", "70");
  svg.appendChild(circle1);
  const circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle2.setAttribute("cx", "70");
  circle2.setAttribute("cy", "70");
  circle2.setAttribute("r", "70");
  svg.appendChild(circle2);
  const number = document.createElement("div");
  number.classList.add("number");
  percent.appendChild(number);
  const h2 = document.createElement("h2");
  h2.innerHTML = `${progress}<span>%</span>`;
  number.appendChild(h2);
  const p = document.createElement("p");
  p.innerHTML = "tasks";
  number.appendChild(p);
  
  checkboxesArray.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      const isChecked = checkbox.checked; // Get the status of the checkbox
      // Update the number of checked checkboxes depending on the status of the checkbox
      checkedCheckboxes = isChecked ? checkedCheckboxes + 1 : checkedCheckboxes - 1;
      // Update the progress
      progress = Math.round(checkedCheckboxes / checkboxesArray.length * 100);
      // Update the progress value in the existing HTML
      percent.style.setProperty('--num', progress);
      h2.innerHTML = `${progress}<span>%</span>`;
    });
  });
}

