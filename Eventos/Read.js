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
      eventosContainer.innerHTML += ` <div class="card" style="width: 18rem;">
      <img src=${evento.Url} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${evento.Titulo}</h5>
        <p class="card-text">${evento.Descripcion}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Tipo: ${evento.Tipo}</li>
        <li class="list-group-item">Direccion: ${evento.Direccion}</li>
        <li class="list-group-item">Sector: ${evento.Sector}</li>
        <li class="list-group-item">Provincia: ${evento.Provincia}</li>
        <li class="list-group-item">Fecha Inicio: ${evento.FechaInicio}</li>
        <li class="list-group-item">Fecha Fin:${evento.FechaFin}</li>
      </ul>
      <div class="card-body">
        <a  data-id="${evento.id}"  class="btn btn-warning btn-edit">Edit</a>
        <a class="btn btn-danger btn-delete " data-id="${evento.id}" >Delete</a>
      </div>
    </div>`;
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
