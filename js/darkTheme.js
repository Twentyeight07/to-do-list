const d = document,
  ls = localStorage,
  userTheme = localStorage.getItem("myTheme"),
  $darkThemeBtn = d.querySelector(".dark-theme-btn"),
  $icon = d.querySelector(".material-symbols-outlined"),
  $header = d.querySelector("header"),
  $body = d.querySelector("body"),
  $subBtn = d.querySelector(".button-form"),
  $secTitle = d.querySelectorAll(".section-title"),
  $table = d.querySelector("table");

export default function darkTheme() {
  //Para modificar el ícono del botón puedo modificar el text content del mismo dependiendo del valor de la variable "theme" en el LocalStorage

  let sun = "light_mode",
    moon = "dark_mode";

  const lightMode = () => {
    $header.classList.remove("main-dark-theme");
    $subBtn.classList.remove("main-dark-theme");
    $body.classList.remove("dark-theme");
    $table.classList.remove("dark-surface");
    $secTitle.forEach((el) => el.classList.remove("dark-section-title"));
    $icon.textContent = moon;
    ls.setItem("myTheme", "light");
  };

  const darkMode = () => {
    $header.classList.add("main-dark-theme");
    $subBtn.classList.add("main-dark-theme");
    $body.classList.add("dark-theme");
    $table.classList.add("dark-surface");
    $secTitle.forEach((el) => el.classList.add("dark-section-title"));
    $icon.textContent = sun;
    ls.setItem("myTheme", "dark");
  };

  d.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target === $darkThemeBtn) {
      if ($icon.textContent === moon) {
        darkMode();
      } else {
        lightMode();
      }
    }
  });

  d.addEventListener("DOMContentLoaded", (e) => {
    if (userTheme === "light") lightMode();
    if (userTheme === "dark") darkMode();
  });
}
