function setError(inputId, message) {
  const error = document.getElementById(inputId + "-error");

  if (inputId === "sujet") {
    document.getElementById("sujet").classList.add("error");
  } else {
    document.getElementById(inputId).classList.add("error");
  }

  error.textContent = message;
}

function clearError(inputId) {
  const error = document.getElementById(inputId + "-error");
  if (error) error.textContent = "";

  if (inputId === "sujet") {
    document.getElementById("sujet").classList.remove("error");
  } else {
    const el = document.getElementById(inputId);
    if (el) el.classList.remove("error");
  }
}

function submitForm() {
  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const sujet =
    document.querySelector('input[name="sujet"]:checked')?.value || "";
  const message = document.getElementById("message").value.trim();

  clearError("full-name");
  clearError("email");
  clearError("sujet");
  clearError("message");

  let valid = true;

  if (!name) {
    setError("full-name", "Veuillez entrer votre nom.");
    valid = false;
  }

  if (!email) {
    setError("email", "Veuillez entrer votre courriel.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Veuillez entrer une adresse courriel valide.");
    valid = false;
  }

  if (!sujet) {
    setError("sujet", "Veuillez sélectionner un sujet.");
    valid = false;
  }

  if (!message) {
    setError("message", "Veuillez entrer un message.");
    valid = false;
  }

  if (!valid) return;

  const subject = encodeURIComponent("[Heads Up Scouting] " + sujet);

  const body = encodeURIComponent(
     `Nom : ${name}\nCourriel : ${email}\nSujet : ${sujet}\n\nMessage :\n${message}\n\n---\nEnvoyé depuis le formulaire contact`
  );

  window.location.href = `mailto:info@headsupscouting.com?subject=${subject}&body=${body}`;

  document.getElementById("form-content").style.display = "none";
  document.getElementById("success").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  // Champs texte
  ["full-name", "email", "message"].forEach((id) => {
    const el = document.getElementById(id);

    if (!el) return;

    el.addEventListener("input", () => clearError(id));
  });

  // Radios sujet
  document.querySelectorAll('input[name="sujet"]').forEach((radio) => {
    radio.addEventListener("change", () => clearError("sujet"));
  });
});