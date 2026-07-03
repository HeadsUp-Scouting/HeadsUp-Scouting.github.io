function setError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "-error");

  input.classList.add("error");
  error.textContent = message;
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "-error");

  input.classList.remove("error");
  error.textContent = "";
}

function submitBeta() {
  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const org = document.getElementById("org").value.trim();

  // Reset des erreurs
  clearError("full-name");
  clearError("email");
  clearError("org");

  let valid = true;

  // Validation du nom
  if (!name) {
    setError("full-name", "Veuillez entrer votre nom.");
    valid = false;
  }

  // Validation du courriel
  if (!email) {
    setError("email", "Veuillez entrer votre courriel.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Veuillez entrer une adresse courriel valide.");
    valid = false;
  }

  if (!valid) return;

  const subject = encodeURIComponent("[HeadsUp Scouting] Demande d'accès POC");
  const body = encodeURIComponent(
    `Nom : ${name}\nCourriel : ${email}${
      org ? "\nOrganisation : " + org : ""
    }\n\n---\nEnvoyé depuis le formulaire "Request-access"`
  );

  window.location.href = `mailto:info@headsupscouting.com?subject=${subject}&body=${body}`;

  document.getElementById("form-card").style.display = "none";
  document.getElementById("success").style.display = "block";
}

// Efface automatiquement les erreurs lorsqu'on modifie un champ
document.addEventListener("DOMContentLoaded", () => {
  ["full-name", "email", "org"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      clearError(id);
    });
  });
});