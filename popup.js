const overlay = document.getElementById("overlay");
const closePopupBtn = document.getElementById("closePopup");

const newUser = JSON.parse(localStorage.getItem("eventAppUser"));

document.querySelectorAll(".attend").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".cards");

    const eventData = {
      title: card.dataset.title,
      location: card.dataset.location,
      time: card.dataset.time,
    };

    showPopup(eventData);
  });
});

function showPopup(event) {
  // User details
  document.getElementById("popupUsername").textContent = newUser.username;
  document.getElementById("popupEmail").textContent = newUser.email;
  document.getElementById("popupUserImage").src =
    newUser.image || "default-avatar.png";

  // Event details
  document.getElementById("popupEventName").textContent = event.title;
  document.getElementById("popupEventLocation").textContent = event.location;
  document.getElementById("popupEventTime").textContent = event.time;

  // QR Code
  const qrData = `Event: ${event.title} | User: ${user.username}`;
  document.getElementById("qrCode").src =
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  overlay.classList.add("active");
}

// Close popup
closePopupBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

// Optional: click outside popup closes it
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});
