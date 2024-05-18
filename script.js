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
    const navbarHeight = document.querySelector('.menu').offsetHeight;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const navLink = document.querySelector(`nav a[href="#${section.id}"]`);
        if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
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
            const readMoreContainer = this.closest('.read-more-container');
            
            if (service.classList.contains('reduced')) {
                service.classList.remove('reduced');
                service.classList.add('full-width');
                description.style.display = 'none';
                descriptionFull.style.display = 'flex';
                this.textContent = "Lire moins";
                document.body.style.overflow = 'hidden'; // Prevent scrolling of the main page
            } else {
                service.classList.remove('full-width');
                service.classList.add('reduced');
                description.style.display = 'block';
                descriptionFull.style.display = 'none';
                this.textContent = "Lire la suite";
                document.body.style.overflow = ''; // Re-enable scrolling of the main page
            }

            // Ensure the "Lire moins" link remains at the bottom
            readMoreContainer.style.display = 'flex';
            readMoreContainer.style.justifyContent = 'center';
        });
    });
}
