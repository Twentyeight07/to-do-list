const d = document,
  $form = d.querySelector(".task-form"),
  $title = d.querySelector(".task-title");

const setDataToEdit = (id, task) => {
  $title.textContent = "Editar tarea";
  $form.task.value = task;
  $form.id.value = id;
};

export default setDataToEdit;
