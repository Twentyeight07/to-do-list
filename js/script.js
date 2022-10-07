import addTask from "./addTask.js";
import darkTheme from "./darkTheme.js";
import deleteTask from "./deleteTask.js";
import editTask from "./editTask.js";
import init from "./init.js";
import reminder from "./reminder.js";
import setDataToEdit from "./setDataToEdit.js";
import showTasks from "./showTasks.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  init();
  showTasks();
});

d.addEventListener("submit", (e) => {
  if (e.target === d.querySelector(".task-form")) {
    e.preventDefault();
    if (!e.target.id.value) {
      addTask();
    } else {
      // console.log("edit");
      editTask();
    }
  }
});

d.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.matches(".edit")) {
    // console.log(e.target);
    setDataToEdit(e.target.dataset.id, e.target.dataset.task);
  } else if (e.target.matches(".delete ")) {
    // console.log("delete");
    deleteTask(e.target.dataset.id, e.target.dataset.task);
  }
});

darkTheme();
reminder();

/**************************** Service Worker ********************************/

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("Succesfull SW registration!", reg))
    .catch((err) => console.warn("Registration error:" + err));
}
