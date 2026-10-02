function getLanguage() {
  return document.documentElement.lang.startsWith("en")
    ? "en"
    : "fr";
}

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
  const lang = getLanguage();

  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const sujet =
    document.querySelector('input[name="sujet"]:checked')?.value || "";
  const message = document.getElementById("message").value.trim();
  const consent =
    document.getElementById("privacy-consent").checked;

  const privacyVersion = "v0.1";
  const termsVersion = "v0.1";

  // Textes selon la langue
  const messages = {
    fr: {
      nameRequired: "Veuillez entrer votre nom.",
      emailRequired: "Veuillez entrer votre courriel.",
      emailInvalid: "Veuillez entrer une adresse courriel valide.",
      subjectRequired: "Veuillez sélectionner un sujet.",
      messageRequired: "Veuillez entrer un message.",
      consentRequired:
        "Veuillez prendre connaissance de la Politique de confidentialité et des Conditions d'utilisation.",
      subjectPrefix: "[HeadsUp Scouting] ",
      name: "Nom",
      email: "Courriel",
      subject: "Sujet",
      message: "Message",
      consent:
        "J'ai pris connaissance de la Politique de confidentialité et des Conditions d'utilisation de HeadsUp Scouting.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      footer: "Envoyé depuis le formulaire contact"
    },

    en: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      subjectRequired: "Please select a subject.",
      messageRequired: "Please enter a message.",
      consentRequired:
        "Please review the Privacy Policy and Terms of Use.",
      subjectPrefix: "[HeadsUp Scouting] ",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      consent:
        "I have read and acknowledge the HeadsUp Scouting Privacy Policy and Terms of Use.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      footer: "Sent from the contact form"
    }
  };

  const t = messages[lang];

  // Reset des erreurs
  clearError("full-name");
  clearError("email");
  clearError("sujet");
  clearError("message");
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

  // Validation du sujet
  if (!sujet) {
    setError("sujet", t.subjectRequired);
    valid = false;
  }

  // Validation du message
  if (!message) {
    setError("message", t.messageRequired);
    valid = false;
  }

  // Validation du consentement
  if (!consent) {
    setError("privacy-consent", t.consentRequired);
    valid = false;
  }

  if (!valid) return;

  const subject = encodeURIComponent(
    t.subjectPrefix + sujet
  );

  const body = encodeURIComponent(
`${t.name} : ${name}
${t.email} : ${email}
${t.subject} : ${sujet}

${t.message} :
${message}

---
${t.consent}

${t.privacy} : ${privacyVersion}
${t.terms} : ${termsVersion}

${t.footer}`
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