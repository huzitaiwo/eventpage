// Get stored user
const user = JSON.parse(localStorage.getItem("eventAppUser"));

// if (user) {
//   console.log(user);
// }

// Protect page
// const isLoggedIn = localStorage.getItem("isLoggedIn");
// if (!isLoggedIn) {
//   window.location.href = "login.html";
// }

if (user) {
  // Output username
  document.getElementById("welcome").textContent = `Welcome, ${user.username}`;

  // Output email
  document.getElementById("userEmail").textContent = `${user.email}`;

  // Output image
  const userImage = document.getElementById("profile");

  if (user.image) {
    userImage.src = user.image;
  } else {
    userImage.src = "default-avatar.png";
  }
}

// LOGOUT
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});
