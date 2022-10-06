const d = document,
  db = JSON.parse(localStorage.getItem("myTasks")),
  $table = d.querySelector(".task-table"),
  $form = d.querySelector(".task-form"),
  $title = d.querySelector(".task-title"),
  $template = d.getElementById("task-template").content,
  $fragment = d.createDocumentFragment();

const editTask = () => {
  let editedTask = {
    id: $form.id.value,
    task: $form.task.value,
  };

  console.log(editedTask.id);

  db.forEach((el) => console.log(el.id, editedTask.id));

  const newDb = db.map((el) =>
    el.id == editedTask.id ? { ...el, task: editedTask.task } : el
  );
  console.log(newDb);
  // console.log(db);

  localStorage.setItem("myTasks", JSON.stringify(newDb));
  location.reload();
};

export default editTask;
