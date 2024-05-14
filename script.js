// navbar scroll bg change et changement du lien actif sur défilement
const navBar = document.querySelector('.menu');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }

    // Change active link on scroll
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

        // Change active link on click
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const readMoreLinks = document.querySelectorAll(".read-more");

    readMoreLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const service = this.closest(".service");
            const description = service.querySelector(".service-description");
            const moreText = service.querySelector(".service-more");

            // Inverser la visibilité du texte et de "Lire la suite" / "Lire moins"
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
                moreText.style.display = "none";
                this.textContent = "Lire moins";
            } else {
                description.style.display = "none";
                moreText.style.display = "block";
                this.textContent = "Lire la suite";
            }
        });

        // Au chargement de la page, afficher le texte complet et masquer "Lire la suite"
        const service = link.closest(".service");
        const description = service.querySelector(".service-description");
        const moreText = service.querySelector(".service-more");
        description.style.display = "block";
        moreText.style.display = "none";
    });
});
