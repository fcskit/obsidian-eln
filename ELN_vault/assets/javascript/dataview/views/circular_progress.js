if (input && dv) {
  let tasks_completed = dv.current().file.tasks.completed.filter((t) => t == true).length;
  let all_tasks = dv.current().file.tasks.length;
  let progress = Math.round(tasks_completed/all_tasks * 100);
  const html = `<div class='cicularprogress'>
  <div class='card'>
    <div class='percent' style='--clr:#8bdaa9;--num:${progress}'>
      <div class='dot'></div>
      <svg>
        <circle cx='70' cy='70' r='70' />
        <circle cx='70' cy='70' r='70' />
      </svg>
      <div class='number'>
        <h2>${progress}<span>%</span></h2>
        <p>tasks</p>
      </div>
    </div>
  </div>
  </div>`

  const container = dv.el("div", "", { cls: "progress-container", attr: { id: "cp-container" } });
  container.innerHTML = html;
}