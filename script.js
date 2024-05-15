document.addEventListener("DOMContentLoaded", function() {
    handleNavbar();
    handleNavLinks();
    handleReadMoreLinks();
});

function handleNavbar() {
    const navBar = document.querySelector('.menu');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
        // Changer le lien actif au défilement
        updateActiveNavLink();
    });
}

function handleNavLinks() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navbarHeight = document.querySelector('.menu').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight + 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            updateActiveNavLink();
        });
    });
}

function updateActiveNavLink() {
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
}

function handleReadMoreLinks() {
    document.querySelectorAll(".read-more").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const service = this.closest(".service");
            const descriptionFull = service.querySelector('.service-description-full');
            const description = service.querySelector('.service-description');
            if (service.classList.contains('reduced')) {
                service.classList.remove('reduced');
                service.classList.add('full-width');
                description.style.display = 'none';
                descriptionFull.style.display = 'flex'; // Afficher la description complète
                this.textContent = "Lire moins";
            } else {
                service.classList.remove('full-width');
                service.classList.add('reduced');
                description.style.display = 'block';
                descriptionFull.style.display = 'none'; // Cacher la description complète
                this.textContent = "Lire la suite";
            }
        });
    });
}
