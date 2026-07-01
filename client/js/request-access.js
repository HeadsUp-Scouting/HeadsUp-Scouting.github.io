function submitBeta() {
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const org   = document.getElementById('org').value.trim();

    if (!name || !email) {
    alert('Veuillez entrer votre nom et votre courriel.');
    return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Veuillez entrer une adresse courriel valide.');
    return;
    }

    const subject = encodeURIComponent('[HeadsUp Scouting] Demande d\'accès POC');
    const body = encodeURIComponent(
    `Nom : ${name}\nCourriel : ${email}${org ? '\nOrganisation : ' + org : ''}\n\n---\nEnvoyé depuis le formulaire "Request-access"`
    );

    window.location.href = `mailto:info@headsupscouting.com?subject=${subject}&body=${body}`;

    document.getElementById('form-card').style.display = 'none';
    document.getElementById('success').style.display = 'block';
}