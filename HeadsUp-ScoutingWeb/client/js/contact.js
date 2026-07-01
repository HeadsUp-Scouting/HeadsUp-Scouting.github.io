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
    document.querySelectorAll('.select-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('select-dropdown').classList.remove('open');
    document.querySelector('.select-selected').classList.remove('open');
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

function submitForm() {
    const prenom  = document.getElementById('prenom').value.trim();
    const nom     = document.getElementById('nom').value.trim();
    const email   = document.getElementById('email').value.trim();
    const sujet   = document.getElementById('sujet').value;
    const message = document.getElementById('message').value.trim();

    if (!prenom || !email || !sujet || !message) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Veuillez entrer une adresse courriel valide.');
    return;
    }

    const subject = encodeURIComponent('[Heads Up Scouting] ' + sujet);
    const body = encodeURIComponent(
    `Nom : ${prenom} ${nom}\nCourriel : ${email}\nSujet : ${sujet}\n\nMessage :\n${message}\n\n---\nEnvoyé depuis le formulaire contact`
    );

    window.location.href = `mailto:info@headsupscouting.com?subject=${subject}&body=${body}`;

    document.getElementById('form-content').style.display = 'none';
    document.getElementById('success').style.display = 'block';
}