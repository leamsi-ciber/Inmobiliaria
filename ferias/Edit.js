var editar = JSON.parse(localStorage.getItem("feria"));
console.log(editar);
document.getElementById("feria-title").value = editar.Titulo;
document.getElementById("feria-direccion").value = editar.Direccion;
document.getElementById("feria-sector").value = editar.Sector;
document.getElementById("feria-provincia").value = editar.Provincia;
document.getElementById("feria-inicio").value = editar.FechaInicio;
document.getElementById("feria-fin").value = editar.FechaFin;
document.getElementById("feria-descripcion").value = editar.Descripcion;

const db = firebase.firestore();
var storageRef = firebase.storage().ref();
var imagen = document.getElementById("feria-imagen");
const feriaForm = document.getElementById("Feria-form");

const updateFeria = (id, updateferia) =>
  db.collection("Ferias").doc(id).update(updateferia);

feriaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = feriaForm["feria-title"].value;
  const direccion = feriaForm["feria-direccion"].value;
  const sector = feriaForm["feria-sector"].value;
  const provincia = feriaForm["feria-provincia"].value;
  const fechainicio = feriaForm["feria-inicio"].value;
  const fechafin = feriaForm["feria-fin"].value;
  const descripcion = feriaForm["feria-descripcion"].value;

  if (document.getElementById("feria-imagen").files.length == 0) {
    const response = await updateFeria(editar.id, {
      Titulo: title,
      Direccion: direccion,
      Sector: sector,
      Provincia: provincia,
      FechaInicio: fechainicio,
      FechaFin: fechafin,
      Descripcion: descripcion,
    });
    window.location.href = "./Ferias.html";
  } else {
    var reader = new FileReader();
    var imagensubir = imagen.files[0];
    console.log(imagensubir);
    var uploadTask = storageRef
      .child("Ferias/" + editar.FechaRegistro + imagensubir.name)
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
            const response = await updateFeria(editar.id, {
              Titulo: title,
              Direccion: direccion,
              Sector: sector,
              Provincia: provincia,
              FechaInicio: fechainicio,
              FechaFin: fechafin,
              Descripcion: descripcion,
              Url: downloadURL,
            });
            window.location.href = "./Ferias.html";
          });
      }
    );
  }
});
