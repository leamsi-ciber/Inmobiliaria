const auth = firebase.auth();
const logout = document.querySelector(".logout");
var logeado = false;
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
    location.reload();
  });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("signin");
    loginCheck(user);
  } else {
    console.log("signout");
    loginCheck(user);
  }
});

const loginCheck = (user) => {
  const loggedOutLinks = document.querySelectorAll(".login-ul");
  const loggedInLinks = document.querySelectorAll(".regis-ul");
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "inline-block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
    logeado = true;
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "inline-block"));
    logeado = false;
  }
};
