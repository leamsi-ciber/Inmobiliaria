const db = firebase.firestore();

const ofertasContainer = document.getElementById("ofertas-container");

const getoferta = (id) => db.collection("Ofertas").doc(id).get();

const ongetOfertas = (callback) =>
  db
    .collection("Ofertas")
    .orderBy("FechaRegistro", "desc")
    .onSnapshot(callback);

const deleteOferta = (id) => db.collection("Ofertas").doc(id).delete();

window.addEventListener("DOMContentLoaded", async (e) => {
  ongetOfertas((querySnapshot) => {
    ofertasContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      oferta = doc.data();
      oferta.id = doc.id;
      /* Aqui es donde se deberia dar cualquier diseño a los datos que se leen*/
      ofertasContainer.innerHTML += `<div class="card card-body mt-2">
               <img src=${oferta.Url}>
                <h3>Titulo: ${oferta.Titulo}</h3>
                <p>Habitaciones: ${oferta.Habitaciones}</p>
                <p>Baños: ${oferta.Baños}</p>
                <p>Tipo: ${oferta.Tipo}</p>
                <p>Direccion: ${oferta.Direccion}</p>
                <p>Sector: ${oferta.Sector}</p>
                <p>Provincia: ${oferta.Provincia}</p>
                <p>Precio Original:${oferta.PrecioOriginal}</p>
                <p>Precio Oferta${oferta.PrecioOferta}</p>
                <div>
                    <button class="btn btn-warning btn-edit regis-ul"  data-id="${oferta.id}" > Editar </button>
                    <button class="btn btn-danger btn-delete regis-ul" data-id="${oferta.id}" > Borrar </button>
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
});
