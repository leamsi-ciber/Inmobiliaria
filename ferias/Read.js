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
      feriasContainer.innerHTML += `
      <div class="card m-2 p-1 border-secondary" >
      <img src=${feria.Url} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${feria.Titulo}</h5>
        <p class="card-text"> <b>Descripcion: </b> ${feria.Descripcion}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Direccion: ${feria.Direccion}</li>
        <li class="list-group-item">Sector: ${feria.Sector}</li>
        <li class="list-group-item">Provincia: ${feria.Provincia}</li>
        <li class="list-group-item">Fecha Inicio: ${feria.FechaInicio}</li>
        <li class="list-group-item">Fecha Fin: ${feria.FechaFin}</li>
      </ul>
      <div class="card-body">
        <button  data-id="${feria.id}"  class="btn btn-warning btn-edit regis-ul">Editar</button>
        <button  class="btn btn-danger btn-delete regis-ul" data-id="${feria.id}" >Borrar</button>
      </div>
    </div>
    `;
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
