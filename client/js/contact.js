function setError(inputId, message) {
  const error = document.getElementById(inputId + "-error");

  if (inputId === "sujet") {
    document.getElementById("sujet").classList.add("error");
  } else if (inputId === "privacy-consent") {
    document.getElementById("privacy-consent").classList.add("error");
  } else {
    document.getElementById(inputId).classList.add("error");
  }

  if (error) {
    error.textContent = message;
  }
}

function clearError(inputId) {
  const error = document.getElementById(inputId + "-error");

  if (error) {
    error.textContent = "";
  }

  if (inputId === "sujet") {
    document.getElementById("sujet").classList.remove("error");
  } else if (inputId === "privacy-consent") {
    document.getElementById("privacy-consent").classList.remove("error");
  } else {
    const el = document.getElementById(inputId);

    if (el) {
      el.classList.remove("error");
    }
  }
}

function updateSubmitButton() {
  const consent = document.getElementById("privacy-consent");
  const submitButton = document.getElementById("submit-button");

  if (!consent || !submitButton) return;

  submitButton.disabled = !consent.checked;
}

function submitForm() {
  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const sujet =
    document.querySelector('input[name="sujet"]:checked')?.value || "";
  const message = document.getElementById("message").value.trim();
  const consent =
    document.getElementById("privacy-consent").checked;
  const privacyVersion = "v0.1";
  const termsVersion = "v0.1";

  clearError("full-name");
  clearError("email");
  clearError("sujet");
  clearError("message");
  clearError("privacy-consent");

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

  if (!consent) {
    setError(
      "privacy-consent",
      "Veuillez prendre connaissance de la Politique de confidentialité et des Conditions d'utilisation."
    );
    valid = false;
  }

  if (!valid) return;

  const subject = encodeURIComponent(
    "[Heads Up Scouting] " + sujet
  );

  const body = encodeURIComponent(
    `Nom : ${name}
    Courriel : ${email}
    Sujet : ${sujet}

    Message :
    ${message}

    ---
    J'ai pris connaissance de la Politique de confidentialité et des Conditions d'utilisation de HeadsUp Scouting.
    
    Politique de confidentialité : ${privacyVersion}
    Conditions d'utilisation : ${termsVersion}

    Envoyé depuis le formulaire contact`
  );

  window.location.href =
    `mailto:info@headsupscouting.com?subject=${subject}&body=${body}`;

  document.getElementById("form-content").style.display = "none";
  document.getElementById("success").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {

  // Champs texte
  ["full-name", "email", "message"].forEach((id) => {
    const el = document.getElementById(id);

    if (!el) return;

    el.addEventListener("input", () => {
      clearError(id);
    });
  });

  // Radios sujet
  document.querySelectorAll('input[name="sujet"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      clearError("sujet");
    });
  });

  // Checkbox consentement
  const consent = document.getElementById("privacy-consent");

  if (consent) {
    consent.addEventListener("change", () => {
      clearError("privacy-consent");
      updateSubmitButton();
    });
  }

  // État initial du bouton
  updateSubmitButton();
});