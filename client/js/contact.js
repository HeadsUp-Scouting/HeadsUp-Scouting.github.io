function toggleDropdown() {
    const dropdown = document.getElementById('select-dropdown');
    const selected = document.querySelector('.select-selected');
    dropdown.classList.toggle('open');
    selected.classList.toggle('open');
}

function selectOption(el) {
  document.getElementById('select-label').textContent = el.textContent;
  document.getElementById('select-label').style.color = 'var(--text)';
  document.getElementById('sujet').value = el.dataset.value;

  document.querySelectorAll('.select-option')
    .forEach(o => o.classList.remove('selected'));

  el.classList.add('selected');

  document.getElementById('select-dropdown').classList.remove('open');
  document.querySelector('.select-selected').classList.remove('open');

  // IMPORTANT
  clearError("sujet");
}

// Ferme le dropdown si on clique ailleurs
document.addEventListener('click', function(e) {
    if (!document.getElementById('custom-select').contains(e.target)) {
    document.getElementById('select-dropdown').classList.remove('open');
    document.querySelector('.select-selected').classList.remove('open');
    }
});


function updateCount(el) {
    document.getElementById('char-count').textContent = el.value.length;
}

function setError(inputId, message) {
  const error = document.getElementById(inputId + "-error");
  if (inputId === "sujet") {
    document.getElementById("custom-select").classList.add("error");
  } else {
    document.getElementById(inputId).classList.add("error");
  }
  error.textContent = message;
}

function clearError(inputId) {
  const error = document.getElementById(inputId + "-error");
  if (error) error.textContent = "";

  if (inputId === "sujet") {
    const select = document.getElementById("custom-select");
    select.classList.remove("error");
  } else {
    const el = document.getElementById(inputId);
    if (el) el.classList.remove("error");
  }
}

function submitForm() {
    const name     = document.getElementById('full-name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const sujet   = document.getElementById('sujet').value;
    const message = document.getElementById('message').value.trim();

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

    const subject = encodeURIComponent('[Heads Up Scouting] ' + sujet);
    const body = encodeURIComponent(
    `Nom : ${name} \nCourriel : ${email}\nSujet : ${sujet}\n\nMessage :\n${message}\n\n---\nEnvoyé depuis le formulaire contact`
    );

    window.location.href = `mailto:info@headsupscouting.com?subject=${subject}&body=${body}`;

    document.getElementById('form-content').style.display = 'none';
    document.getElementById('success').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
  ["full-name", "email", "message"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("input", () => {
      clearError(id);
    });
  });
});