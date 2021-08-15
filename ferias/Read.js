const db = firebase.firestore();

const feriasContainer = document.getElementById("ferias-container");

const getFerias = () => db.collection("Ferias").get();

const getFeria = (id) => db.collection("Ferias").doc(id).get();

const ongetFerias = (callback) =>
  db.collection("Ferias").orderBy("FechaRegistro", "desc").onSnapshot(callback);
const deleteFeria = (id) => db.collection("Ferias").doc(id).delete();

window.addEventListener("DOMContentLoaded", async (e) => {
  ongetFerias((querySnapshot) => {
    feriasContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      feria = doc.data();
      feria.id = doc.id;
      /* Aqui es donde se deberia dar cualquier diseño a los datos que se leen*/
      feriasContainer.innerHTML += `<div class="card card-body mt-2">
                <img src=${feria.Url}>
                <h3>Titulo: ${feria.Titulo}</h3>
                <p>Direccion: ${feria.Direccion}</p>
                <p>Sector: ${feria.Sector}</p>
                <p>Provincia: ${feria.Provincia}</p>
                <p>Fecha Inicio:${feria.FechaInicio}</p>
                <p>Fecha Fin:${feria.FechaFin}</p>
                <p>Descripcion: ${feria.Descripcion}</p>
                <div>
                    <button class="btn btn-warning btn-edit"  data-id="${feria.id}" > Editar </button>
                    <button class="btn btn-danger btn-delete " data-id="${feria.id}" > Borrar </button>
                </div>
                </div>`;

      const btnsDelete = document.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteFeria(e.target.dataset.id);
        });
        const btnsEdit = document.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            const query = await getFeria(e.target.dataset.id);
            const edit = query.data();
            edit.id = e.target.dataset.id;
            localStorage.setItem("feria", JSON.stringify(edit));
            window.location.href = "./FeriasEditar.html";
          });
        });
      });
    });
  });
});
