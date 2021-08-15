var editar = JSON.parse(localStorage.getItem("evento"));
console.log(editar);
document.getElementById("evento-title").value = editar.Titulo;
document.getElementById("evento-tipo").value = editar.Tipo;
document.getElementById("evento-direccion").value = editar.Direccion;
document.getElementById("evento-sector").value = editar.Sector;
document.getElementById("evento-provincia").value = editar.Provincia;
document.getElementById("evento-inicio").value = editar.FechaInicio;
document.getElementById("evento-fin").value = editar.FechaFin;
document.getElementById("evento-descripcion").value = editar.Descripcion;

const db = firebase.firestore();
var storageRef = firebase.storage().ref();
var imagen = document.getElementById("evento-imagen");

const eventoForm = document.getElementById("Evento-form");

const updateEvento = (id, updateevento) =>
  db.collection("Eventos").doc(id).update(updateevento);

eventoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = eventoForm["evento-title"].value;
  const tipo = eventoForm["evento-tipo"].value;
  const direccion = eventoForm["evento-direccion"].value;
  const sector = eventoForm["evento-sector"].value;
  const provincia = eventoForm["evento-provincia"].value;
  const fechainicio = eventoForm["evento-inicio"].value;
  const fechafin = eventoForm["evento-fin"].value;
  const descripcion = eventoForm["evento-descripcion"].value;

  if (document.getElementById("evento-imagen").files.length == 0) {
    const response = await updateEvento(editar.id, {
      Titulo: title,
      Tipo: tipo,
      Direccion: direccion,
      Sector: sector,
      Provincia: provincia,
      FechaInicio: fechainicio,
      FechaFin: fechafin,
      Descripcion: descripcion,
    });
    window.location.href = "./Eventos.html";
  } else {
    var reader = new FileReader();
    var imagensubir = imagen.files[0];
    console.log(imagensubir);
    var uploadTask = storageRef
      .child("Eventos/" + Date.parse(dateTime) + imagensubir.name)
      .put(imagensubir);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        // Handle unsuccessful uploads
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(async function (downloadURL) {
            console.log("File available at", downloadURL);
            const response = await updateEvento(editar.id, {
              Titulo: title,
              Tipo: tipo,
              Direccion: direccion,
              Sector: sector,
              Provincia: provincia,
              FechaInicio: fechainicio,
              FechaFin: fechafin,
              Descripcion: descripcion,
              Url: downloadURL,
            });
          });
        window.location.href = "./Eventos.html";
      }
    );
  }
});
