const d = document,
  db = JSON.parse(localStorage.getItem("myTasks")),
  $form = d.querySelector(".task-form");

const addTask = () => {
  let hour = $form.time.value;

  let task = {
    id: new Date().getTime(),
    task: $form.task.value,
    reminder: new Date(hour),
  };
  /*Seteo en el Local Storage un arreglo que contiene lo que ya tenía el Local Storage (en la variable DB) más lo que el usuario coloque en el input de "tarea" */

  localStorage.setItem("myTasks", JSON.stringify([...db, task]));
  location.reload();
};

export default addTask;
