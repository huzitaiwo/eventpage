const signupForm = document.getElementById("signup");
const errorMsg = document.getElementById("errorMsg");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm");

const togglePasswordBtn = document.getElementById("show");
const toggleConfirmPasswordBtn = document.getElementById("showConfirm");

const imageInput = document.getElementById("profileImage");

/* ---------------------------
   SHOW / HIDE PASSWORD
---------------------------- */
togglePasswordBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordBtn.innerHTML = `<img src="/images/visibility_off.svg" alt="" />`;
  } else {
    passwordInput.type = "password";
    togglePasswordBtn.innerHTML = `<img src="/images/visibility.svg" alt="" />`;
  }
});

toggleConfirmPasswordBtn.addEventListener("click", () => {
  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    toggleConfirmPasswordBtn.innerHTML = `<img src="/images/visibility_off.svg" alt="" />`;
  } else {
    confirmPasswordInput.type = "password";
    toggleConfirmPasswordBtn.innerHTML = `<img src="/images/visibility.svg" alt="" />`;
  }
});

/* ---------------------------
   IMAGE VALIDATION
---------------------------- */
function validateImage(file) {
  if (!file) return null;

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return "Only image files are allowed (jpg, png, webp).";
  }

  if (file.size > maxSize) {
    return "Image must be less than 5MB.";
  }

  return null;
}

/* ---------------------------
   FORM SUBMIT
---------------------------- */
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const imageFile = imageInput.files[0];

  // Confirm password check
  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  // Image validation
  const imageError = validateImage(imageFile);
  if (imageError) {
    errorMsg.textContent = imageError;
    return;
  }

  /* ---------------------------
     SAVE IMAGE AS BASE64
  ---------------------------- */
  if (imageFile) {
    const reader = new FileReader();

    reader.onload = function () {
      saveUserToLocalStorage(username, email, reader.result);
      redirectToHome();
    };

    reader.readAsDataURL(imageFile);
  } else {
    saveUserToLocalStorage(username, email, null);
    redirectToHome();
  }
});

/* ---------------------------
   LOCAL STORAGE
---------------------------- */
function saveUserToLocalStorage(username, email, image) {
  const userData = {
    username,
    email,
    image,
  };

  localStorage.setItem("eventAppUser", JSON.stringify(userData));
}

/* ---------------------------
   REDIRECT
---------------------------- */
function redirectToHome() {
  window.location.href = "index.html";
}
