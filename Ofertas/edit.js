var editar = JSON.parse(localStorage.getItem("oferta"));
console.log(editar);
document.getElementById("oferta-title").value = editar.Titulo;
document.getElementById("oferta-habitaciones").value = editar.Habitaciones;
document.getElementById("oferta-baños").value = editar.Baños;
document.getElementById("oferta-tipo").value = editar.Tipo;
document.getElementById("oferta-direccion").value = editar.Direccion;
document.getElementById("oferta-sector").value = editar.Sector;
document.getElementById("oferta-provincia").value = editar.Provincia;
document.getElementById("oferta-preciooriginal").value = editar.PrecioOriginal;
document.getElementById("oferta-preciooferta").value = editar.PrecioOferta;

const db = firebase.firestore();
var storageRef = firebase.storage().ref();
var imagen = document.getElementById("oferta-imagen");
const ofertaForm = document.getElementById("Oferta-form");

const updateOferta = (id, updateOferta) =>
  db.collection("Ofertas").doc(id).update(updateOferta);

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
  if (document.getElementById("oferta-imagen").files.length == 0) {
    const response = await updateOferta(editar.id, {
      Titulo: title,
      Habitaciones: habitaciones,
      Baños: baños,
      Tipo: tipo,
      Direccion: direccion,
      Sector: sector,
      Provincia: provincia,
      PrecioOriginal: preciooriginal,
      PrecioOferta: preciooferta,
    });
    window.location.href = "./Ofertas.html";
  } else {
    var reader = new FileReader();
    var imagensubir = imagen.files[0];
    console.log(imagensubir);
    var uploadTask = storageRef
      .child("Ofertas/" + editar.FechaRegistro + imagensubir.name)
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
            const response = await updateOferta(editar.id, {
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
            });
            window.location.href = "./Ofertas.html";
          });
      }
    );
  }
});
