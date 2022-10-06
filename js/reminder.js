const d = document,
  db = JSON.parse(localStorage.getItem("myTasks"));

const reminder = () => {
  // Comprobamos si el navegador soporta las notificaciones
  if (!("Notification" in window)) {
    console.log(
      "Este navegador no es compatible con las notificaciones de escritorio"
    );
  } // Solicitamos permisos para enviar notificaciones
  else if (
    Notification.permission !== "denied" ||
    Notification.permission === "default"
  ) {
    Notification.requestPermission(function (permission) {});
  }

  db.forEach((el) => {
    let remind = new Date(el.reminder).getTime(),
      id = el.id;

    if (!remind) {
      return;
    } else {
      let reminderTempo = setInterval(() => {
        let aDate = new Date().getTime(),
          limitDate = remind - aDate;
        // console.log(limitDate);
        if (limitDate < 0) {
          // Si nos otorgaron permiso para las notificaciones la enviamos
          if (Notification.permission === "granted") {
            // Enviamos notificación con el recordatorio
            let notification = new Notification(`Recuerda: ${el.task}`);
            // De lo contrario enviamos una alerta
          } else {
            alert(`Recuerda: ${el.task}`);
          }
          let newDb = db.map((item) =>
            item.id == id ? { ...item, reminder: null } : item
          );
          localStorage.setItem("myTasks", JSON.stringify(newDb));
          clearInterval(reminderTempo);
        }
      }, 1000);
    }
  });
};

export default reminder;
