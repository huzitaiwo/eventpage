const loginPasswordInput = document.getElementById("password");
const toggleLoginPasswordBtn = document.getElementById("show");
const loginForm = document.getElementById("login");
const loginError = document.getElementById("loginError");

toggleLoginPasswordBtn.addEventListener("click", () => {
  if (loginPasswordInput.type === "password") {
    loginPasswordInput.type = "text";
    toggleLoginPasswordBtn.innerHTML = `<img src="/images/visibility_off.svg" alt="" />`;
  } else {
    loginPasswordInput.type = "password";
    toggleLoginPasswordBtn.innerHTML = `<img src="/images/visibility.svg" alt="" />`;
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginError.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("eventAppUser"));

  if (!storedUser) {
    loginError.textContent = "No account found. Please sign up.";
    return;
  }

  if (email !== storedUser.email || password !== storedUser.password) {
    loginError.textContent = "Invalid email or password.";
    return;
  }

  /* ---------------------------
     SAVE LOGIN SESSION
  ---------------------------- */
  // localStorage.setItem("isLoggedIn", "true");

  window.location.href = "index.html";
});
