const db = firebase.firestore();

const ofertasContainer = document.getElementById("ofertas-container");
const btnFiltro = document.getElementById("btn-filtro");

const getoferta = (id) => db.collection("Ofertas").doc(id).get();
const ongetOfertas = (callback) =>
  db
    .collection("Ofertas")
    .orderBy("FechaRegistro", "desc")
    .onSnapshot(callback);

const deleteOferta = (id) => db.collection("Ofertas").doc(id).delete();

window.addEventListener("DOMContentLoaded", async (e) => {
  getData();
});

btnFiltro.addEventListener("click", (e) => {
  const valor = document.getElementById("oferta-filtro").value;
  if (valor != "") {
    filtro(valor);
  } else {
    getData();
  }
});

function getData() {
  ongetOfertas((querySnapshot) => {
    ofertasContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      oferta = doc.data();
      oferta.id = doc.id;
      /* Aqui es donde se deberia dar cualquier diseño a los datos que se leen*/
      ofertasContainer.innerHTML += `
                <div class="card m-2 p-1 border-secondary" >
                <img src=${oferta.Url} class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${oferta.Titulo}</h5>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Habitaciones: ${oferta.Habitaciones}</li>
                <li class="list-group-item">Baños: ${oferta.Baños}</li>
                  <li class="list-group-item">Tipo: ${oferta.Tipo}</li>
                  <li class="list-group-item">Direccion: ${oferta.Direccion}</li>
                  <li class="list-group-item">Sector: ${oferta.Sector}</li>
                  <li class="list-group-item">Provincia: ${oferta.Provincia}</li>
                  <li class="list-group-item">Precio Original: $${oferta.PrecioOriginal}</li>
                  <li class="list-group-item">Precio Oferta: $${oferta.PrecioOferta}</li>
                </ul>
                <div class="card-body">
                  <a  data-id="${oferta.id}"  class="btn btn-warning btn-edit regis-ul">Editar</a>
                  <a style ="color:white" class="btn btn-danger btn-delete regis-ul" data-id="${oferta.id}" >Borrar</a>
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
          await deleteOferta(e.target.dataset.id);
        });
        const btnsEdit = document.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            const query = await getoferta(e.target.dataset.id);
            const edit = query.data();
            edit.id = e.target.dataset.id;
            localStorage.setItem("oferta", JSON.stringify(edit));
            window.location.href = "./OfertasEditar.html";
          });
        });
      });
    });
  });
}

function filtro(valor) {
  valor = document.getElementById("oferta-filtro").value;
  const ongetFiltro = (callback) =>
    db
      .collection("Ofertas")
      .where("Tipo", "==", valor)
      .orderBy("FechaRegistro", "desc")
      .onSnapshot(callback);

  ongetFiltro((querySnapshot) => {
    ofertasContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      oferta = doc.data();
      oferta.id = doc.id;
      /* Aqui es donde se deberia dar cualquier diseño a los datos que se leen*/
      ofertasContainer.innerHTML += `
                <div class="card m-2 p-1 border-secondary" >
                <img src=${oferta.Url} class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${oferta.Titulo}</h5>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Habitaciones: ${oferta.Habitaciones}</li>
                <li class="list-group-item">Baños: ${oferta.Baños}</li>
                  <li class="list-group-item">Tipo: ${oferta.Tipo}</li>
                  <li class="list-group-item">Direccion: ${oferta.Direccion}</li>
                  <li class="list-group-item">Sector: ${oferta.Sector}</li>
                  <li class="list-group-item">Provincia: ${oferta.Provincia}</li>
                  <li class="list-group-item">Precio Original: $${oferta.PrecioOriginal}</li>
                  <li class="list-group-item">Precio Oferta: $${oferta.PrecioOferta}</li>
                </ul>
                <div class="card-body ">
                  <a  data-id="${oferta.id}"  class="btn btn-warning btn-edit regis-ul">Editar</a>
                  <a style ="color:white" class="btn btn-danger btn-delete regis-ul" data-id="${oferta.id}" >Borrar</a>
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
          await deleteOferta(e.target.dataset.id);
        });
        const btnsEdit = document.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            const query = await getoferta(e.target.dataset.id);
            const edit = query.data();
            edit.id = e.target.dataset.id;
            localStorage.setItem("oferta", JSON.stringify(edit));
            window.location.href = "./OfertasEditar.html";
          });
        });
      });
    });
  });
}
