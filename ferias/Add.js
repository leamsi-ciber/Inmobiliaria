const db = firebase.firestore();
const feriaForm = document.getElementById("Feria-form");
var storageRef = firebase.storage().ref();
var imagen = document.getElementById("feria-imagen");

feriaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = feriaForm["feria-title"].value;
  const direccion = feriaForm["feria-direccion"].value;
  const sector = feriaForm["feria-sector"].value;
  const provincia = feriaForm["feria-provincia"].value;
  const fechainicio = feriaForm["feria-inicio"].value;
  const fechafin = feriaForm["feria-fin"].value;
  const descripcion = feriaForm["feria-descripcion"].value;

  var today = new Date();
  var fecha =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = fecha + " " + time;

  var reader = new FileReader();
  var imagensubir = imagen.files[0];
  console.log(imagensubir);
  var uploadTask = storageRef
    .child("Ferias/" + Date.parse(dateTime) + imagensubir.name)
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
          const response = await db
            .collection("Ferias")
            .doc()
            .set({
              Titulo: title,
              Direccion: direccion,
              Sector: sector,
              Provincia: provincia,
              FechaInicio: fechainicio,
              FechaFin: fechafin,
              Descripcion: descripcion,
              Url: downloadURL,
              FechaRegistro: Date.parse(dateTime),
            });
          window.location.href = "./Ferias.html";
        });
    }
  );
});
