const d = document,
  db = JSON.parse(localStorage.getItem("myTasks"));

const deleteTask = (id, task) => {
  let isDelete = confirm(`Are you shure you want to delete the task: ${task}?`);

  if (isDelete) {
    //filtro el id de la base de datos contra el id del botón "delete" que agregamos en "showTasks.js"
    let newDb = db.filter((el) => el.id != id);

    //vuelvo a actualizar la variable en el Local Storage y refresco la página para que refresquen los nuevos datos
    localStorage.setItem("myTasks", JSON.stringify(newDb));
    location.reload();
  } else {
    return;
  }
};

export default deleteTask;
