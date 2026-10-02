
function getLanguage() {
  return window.location.pathname.toLowerCase().includes("_en")
    ? "en"
    : "fr";
}

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
  const lang = getLanguage();

  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const org = document.getElementById("org").value.trim();
  const consent = document.getElementById("privacy-consent").checked;

  const privacyVersion = "v0.1";
  const termsVersion = "v0.1";

  // Textes selon la langue
  const messages = {
    fr: {
      nameRequired: "Veuillez entrer votre nom.",
      emailRequired: "Veuillez entrer votre courriel.",
      emailInvalid: "Veuillez entrer une adresse courriel valide.",
      consentRequired:
        "Veuillez prendre connaissance de la Politique de confidentialité et des Conditions d'utilisation.",
      subject: "[HeadsUp Scouting] Demande d'accès POC",
      name: "Nom",
      email: "Courriel",
      org: "Organisation",
      consent:
        "J'ai pris connaissance de la Politique de confidentialité et des Conditions d'utilisation de HeadsUp Scouting.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      footer: "Envoyé depuis le formulaire de demande d'accès"
    },

    en: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      consentRequired:
        "Please review the Privacy Policy and Terms of Use.",
      subject: "[HeadsUp Scouting] POC Access Request",
      name: "Name",
      email: "Email",
      org: "Organization",
      consent:
        "I have read and acknowledge the HeadsUp Scouting Privacy Policy and Terms of Use.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      footer: "Sent from the access request form"
    }
  };

  const t = messages[lang];

  // Reset des erreurs
  clearError("full-name");
  clearError("email");
  clearError("org");
  clearError("privacy-consent");

  let valid = true;

  // Validation du nom
  if (!name) {
    setError("full-name", t.nameRequired);
    valid = false;
  }

  // Validation du courriel
  if (!email) {
    setError("email", t.emailRequired);
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", t.emailInvalid);
    valid = false;
  }

  // Validation du consentement
  if (!consent) {
    setError("privacy-consent", t.consentRequired);
    valid = false;
  }

  if (!valid) return;

  const subject = encodeURIComponent(t.subject);

  const body = encodeURIComponent(
`${t.name} : ${name}
 ${t.email} : ${email}
 ${t.org} : ${org}

---
${t.consent}

${t.privacy} : ${privacyVersion}
${t.terms} : ${termsVersion}

${t.footer}`
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