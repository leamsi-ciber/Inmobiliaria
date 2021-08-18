const formContainer = document.getElementById("Form-login");

formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = formContainer["email"].value;
  const password = formContainer["pass"].value;
  var entrar = auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      document.getElementById("error-log").style.color = "green";
      document.getElementById("error-log").innerHTML = "Login correcto";
      // ...
      window.history.back();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("error-log").style.color = "red";
      document.getElementById("error-log").innerHTML =
        "Email o contraseña incorrecta";
      // ..
    });
});
