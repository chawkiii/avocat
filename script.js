// Gestion de la barre de navigation
const navBar = document.querySelector('.menu');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }

    // Changer le lien actif au défilement
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const navLink = document.querySelector(`nav a[href="#${section.id}"]`);
        if (rect.top <= 50 && rect.bottom >= 50) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
});

// Ajuster la position de défilement lors du clic sur un lien de la barre de navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const navbarHeight = document.querySelector('.menu').offsetHeight; // Hauteur de la barre de navigation
        const targetPosition = target.offsetTop - navbarHeight + 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Changer le lien actif au clic
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Gestion des sections "Lire la suite" / "Lire moins"
document.addEventListener("DOMContentLoaded", function() {
    const readMoreLinks = document.querySelectorAll(".read-more");

    readMoreLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const service = this.closest(".service");
            const descriptionFull = service.querySelector('.service-description-full');

            // Inverser la visibilité du texte et de "Lire la suite" / "Lire moins"
            if (service.classList.contains('reduced')) {
                service.classList.remove('reduced');
                service.classList.add('full-width');
                descriptionFull.style.display = 'flex'; // Afficher la description complète
                this.textContent = "Lire moins";
            } else {
                service.classList.remove('full-width');
                service.classList.add('reduced');
                descriptionFull.style.display = 'none'; // Cacher la description complète
                this.textContent = "Lire la suite";
            }
        });

        // Initialiser l'état réduit au chargement de la page
        const service = link.closest(".service");
        service.classList.add('reduced');
        link.textContent = "Lire la suite"; // Initialise le texte du lien à "Lire la suite"
    });
});
