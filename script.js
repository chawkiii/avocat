document.addEventListener("DOMContentLoaded", function() {
    handleLanguageSwitcher();
    handleNavbar();
    handleNavLinks();
    handleReadMoreLinks();
    handleBurgerMenu();
});

function handleLanguageSwitcher() {
    document.getElementById('language-select').addEventListener('change', function() {
        const selectedLang = this.value;
        changeLanguage(selectedLang);
    });
}

function changeLanguage(lang) {
    // Récupérer les données à partir du fichier JSON
    fetch(`data/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // Mettre à jour les éléments de la page avec les traductions
            document.querySelectorAll('.translation').forEach(element => {
                const key = element.dataset.translationKey;
                if (data[key]) {
                    element.textContent = data[key];
                }
            });
            // Afficher une alerte pour confirmer le changement de langue
            alert(data.alert);
            // Mettre à jour la direction du texte pour les langues qui nécessitent RTL
            document.body.setAttribute('dir', data.dir);
        })
        .catch(error => console.error('Error fetching language data:', error));
}

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
                description.style.opacity = '0';
                descriptionFull.style.maxHeight = '1000px'; // ou la hauteur maximale nécessaire
                this.textContent = document.getElementById('language-select').value === 'ar' ? 'اقرأ أقل' : 'Lire moins';
                document.body.classList.add('no-scroll');
            } else {
                service.classList.remove('full-width');
                service.classList.add('reduced');
                description.style.opacity = '1';
                descriptionFull.style.maxHeight = '0';
                this.textContent = document.getElementById('language-select').value === 'ar' ? 'اقرأ المزيد' : 'Lire la suite';
                document.body.classList.remove('no-scroll');
            }

            // Assurer que le lien "Lire moins" reste en bas
            readMoreContainer.style.display = 'flex';
            readMoreContainer.style.justifyContent = 'center';
        });
    });
}

function handleBurgerMenu() {
    document.querySelector('.burger-container').addEventListener('click', function() {
        document.querySelector('.menu').classList.toggle('active');
    });
}
