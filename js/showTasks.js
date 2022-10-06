const d = document,
  db = JSON.parse(localStorage.getItem("myTasks")),
  $table = d.querySelector(".task-table"),
  $form = d.querySelector(".task-form"),
  $title = d.querySelector(".task-title"),
  $template = d.getElementById("task-template").content,
  $fragment = d.createDocumentFragment();

const showTasks = () => {
  if (!db || db.length < 1) {
    // console.log("Empty");
    $table.querySelector(
      "tbody"
    ).innerHTML = `<td colSpan="3"><h2><b>Sin Tareas pendientes</b></h2></td>`;
  } else {
    // console.log("Check");
    db.forEach((el) => {
      /*Le asigno el id y valores al botón de editar para poder asignarlos al formulario cuando desee editar una tarea. También le asigno el id al botón de eliminar para saber que tarea deseo eliminar*/
      $template.querySelector(".task-name").textContent = el.task;
      $template.querySelector(".task-reminder").textContent = el.reminder
        ? new Date(el.reminder).toLocaleTimeString()
        : "No";
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".edit").dataset.task = el.task;
      $template.querySelector(".delete").dataset.id = el.id;
      $template.querySelector(".delete").dataset.task = el.task;

      // console.log(el);
      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
  }

  $table.querySelector("tbody").appendChild($fragment);
};

export default showTasks;
