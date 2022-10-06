const d = document,
  ls = localStorage;

let myTasksInit = JSON.parse(ls.getItem("myTasks")) || [];
let myThemeInit = ls.getItem("myTheme") || "light";

const init = () => {
  const myTasks = () => {
    let setTasks = ls.getItem("myTasks")
      ? JSON.parse(ls.getItem("myTasks"))
      : ls.setItem("myTasks", JSON.stringify(myTasksInit));

    return setTasks;
  };

  const myTheme = () => {
    let setTheme = ls.getItem("myTheme")
      ? ls.getItem("myTheme")
      : ls.setItem("myTheme", myThemeInit);

    return setTheme;
  };

  myTasks();
  myTheme();
};

export default init;
