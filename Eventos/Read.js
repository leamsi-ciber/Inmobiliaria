const db = firebase.firestore();
var storageRef = firebase.storage().ref();

const eventosContainer = document.getElementById("evento-container");

const getEventos = () =>
  db.collection("Eventos").orderby("FechaRegistro", "desc").get();

const getEvento = (id) => db.collection("Eventos").doc(id).get();

const ongetEventos = (callback) =>
  db
    .collection("Eventos")
    .orderBy("FechaRegistro", "desc")
    .onSnapshot(callback);

const deleteEventos = (id) => db.collection("Eventos").doc(id).delete();

window.addEventListener("DOMContentLoaded", async (e) => {
  ongetEventos((querySnapshot) => {
    eventosContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      evento = doc.data();
      evento.id = doc.id;

      /* Aqui es donde se deberia dar cualquier diseño a los datos que se leen*/
      eventosContainer.innerHTML += `<div class="card card-body mt-2">
    <img src=${evento.Url}>
    <h3>Titulo: ${evento.Titulo}</h3>
      <p>Tipo: ${evento.Tipo}</p>
      <p>Direccion: ${evento.Direccion}</p>
      <p>Sector: ${evento.Sector}</p>
      <p>Provincia: ${evento.Provincia}</p>
      <p>Fecha Inicio: ${evento.FechaInicio}</p>
      <p>Fecha Fin:${evento.FechaFin}</p>
      <p>Descripcion: ${evento.Descripcion}</p>
      <div class="regis-ul">
          <button class="btn btn-warning btn-edit"  data-id="${evento.id}" > Editar </button>
          <button class="btn btn-danger btn-delete " data-id="${evento.id}" > Borrar </button>
      </div>
      </div>`;
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("signin");
          loginCheck(user);
        } else {
          console.log("signout");
          loginCheck(user);
        }
      });
      const btnsDelete = document.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteEventos(e.target.dataset.id);
        });
        const btnsEdit = document.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            const query = await getEvento(e.target.dataset.id);
            const edit = query.data();
            edit.id = e.target.dataset.id;
            localStorage.setItem("evento", JSON.stringify(edit));
            window.location.href = "./EventosEditar.html";
          });
        });
      });
    });
  });
});
