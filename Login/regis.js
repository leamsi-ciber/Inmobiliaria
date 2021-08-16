const regisContainer = document.getElementById("Registro-login");

var error = document.getElementById("error");

regisContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = regisContainer["email"].value;
  const password = regisContainer["pass"].value;
  var entrar = auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      console.log(user);
      document.getElementById("error-reg").style.color = "green";
      document.getElementById("error-reg").innerHTML += "Email agregado";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("error-reg").style.color = "red";
      document.getElementById("error-reg").innerHTML +=
        "Email registrado previamente";
      // ..
    });
});
