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

function updateSubmitButton() {
  const consent = document.getElementById("privacy-consent");
  const button = document.querySelector(".btn-submit");

  button.disabled = !consent.checked;
}

function submitBeta() {
  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const org = document.getElementById("org").value.trim();
  const consent = document.getElementById("privacy-consent").checked;
  const privacyVersion = "v0.1";
  const termsVersion = "v0.1";

  // Reset des erreurs
  clearError("full-name");
  clearError("email");
  clearError("org");
  clearError("privacy-consent");

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

  // Validation du consentement
  if (!consent) {
    setError(
      "privacy-consent",
      "Veuillez prendre connaissance de la Politique de confidentialité et des Conditions d'utilisation."
    );
    valid = false;
  }

  if (!valid) return;

  const subject = encodeURIComponent(
    "[HeadsUp Scouting] Demande d'accès POC"
  );

  const body = encodeURIComponent(
    `Nom : ${name}
    Courriel : ${email}
    Organisation : ${org}

  ---
  J'ai pris connaissance de la Politique de confidentialité et des Conditions d'utilisation de HeadsUp Scouting.

  Politique de confidentialité : ${privacyVersion}
  Conditions d'utilisation : ${termsVersion}

  Envoyé depuis le formulaire de demande d'accès`
  );

  window.location.href =
    `mailto:info@headsupscouting.com?subject=${subject}&body=${body}`;

  document.getElementById("form-card").style.display = "none";
  document.getElementById("success").style.display = "block";
}

// Efface automatiquement les erreurs lorsqu'on modifie un champ
document.addEventListener("DOMContentLoaded", () => {

  // Champs texte
  ["full-name", "email", "org"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      clearError(id);
    });
  });

  // Checkbox de consentement
  const consent = document.getElementById("privacy-consent");

  consent.addEventListener("change", () => {
    clearError("privacy-consent");
    updateSubmitButton();
  });

  // État initial du bouton
  updateSubmitButton();
});