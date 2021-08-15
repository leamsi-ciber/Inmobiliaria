const db = firebase.firestore();
const ofertaForm = document.getElementById("Oferta-form");
var storageRef = firebase.storage().ref();
var imagen = document.getElementById("oferta-imagen");

ofertaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = ofertaForm["oferta-title"].value;
  const habitaciones = ofertaForm["oferta-habitaciones"].value;
  const baños = ofertaForm["oferta-baños"].value;
  const tipo = ofertaForm["oferta-tipo"].value;
  const direccion = ofertaForm["oferta-direccion"].value;
  const sector = ofertaForm["oferta-sector"].value;
  const provincia = ofertaForm["oferta-provincia"].value;
  const preciooriginal = ofertaForm["oferta-preciooriginal"].value;
  const preciooferta = ofertaForm["oferta-preciooferta"].value;

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
    .child("Ofertas/" + Date.parse(dateTime) + imagensubir.name)
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
            .collection("Ofertas")
            .doc()
            .set({
              Titulo: title,
              Habitaciones: habitaciones,
              Baños: baños,
              Tipo: tipo,
              Direccion: direccion,
              Sector: sector,
              Provincia: provincia,
              PrecioOriginal: preciooriginal,
              PrecioOferta: preciooferta,
              Url: downloadURL,
              FechaRegistro: Date.parse(dateTime),
            });
          window.location.href = "./Ofertas.html";
        });
    }
  );
});
