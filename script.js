document.addEventListener("DOMContentLoaded", function() {
    // Générer les données de langue par défaut (français) au chargement de la page
    generateLanguageData('fr');

    // Ajouter un gestionnaire d'événements pour le changement de langue
    document.getElementById('language-select').addEventListener('change', function() {
        const selectedLang = this.value;
        generateLanguageData(selectedLang);
    });
});

function generateLanguageData(lang) {
    // Charger les données de langue à partir du fichier JSON par défaut
    fetch(`data/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            console.log('Language data generated for', lang);
            updatePageWithTranslations(data);
            initializePageFunctionality();
        })
        .catch(error => console.error('Error generating language data:', error));
}

function initializePageFunctionality() {
    // Initialiser les autres fonctionnalités de la page
    handleNavbar();
    handleNavLinks();
    handleReadMoreLinks();
    handleBurgerMenu();
}



// Function to generate HTML for services based on the provided data
function generateServiceHTML(serviceData) {
    const serviceContainer = document.querySelector('#service .service-container');
    serviceContainer.innerHTML = ''; // Clear the container to avoid duplication

    if (serviceData && serviceData.length > 0) { // Check if serviceData is defined and not empty
        serviceData.forEach(service => {
            // Create the service element
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service');

            // Create the service title
            const titleElement = document.createElement('h3');
            titleElement.textContent = service.title;
            serviceElement.appendChild(titleElement);

            // Create the short description of the service
            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('service-description');
            if (Array.isArray(service.description_short)) {
                service.description_short.forEach(paragraph => {
                    const p = document.createElement('p');
                    p.textContent = paragraph;
                    descriptionElement.appendChild(p);
                });
            } else {
                // If service.description_short is a string, create a paragraph with its content
                const p = document.createElement('p');
                p.textContent = service.description_short;
                descriptionElement.appendChild(p);
            }
            serviceElement.appendChild(descriptionElement);


            // Create the full description of the service
            const fullDescriptionElement = document.createElement('div');
            fullDescriptionElement.classList.add('service-description-full');
            service.description_long.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                fullDescriptionElement.appendChild(p);
            });
            serviceElement.appendChild(fullDescriptionElement);

            // Create the image of the service
            const imageElement = document.createElement('img');
            imageElement.src = service.image; // Make sure your JSON data contains correct paths to the images
            imageElement.alt = service.title;
            serviceElement.appendChild(imageElement);

            // Create the "Read more" link
            const readMoreContainer = document.createElement('div');
            readMoreContainer.classList.add('read-more-container');
            const readMoreLink = document.createElement('a');
            readMoreLink.classList.add('read-more');
            readMoreLink.textContent = document.getElementById('language-select').value === 'ar' ? 'اقرأ المزيد' : 'Lire la suite';
            readMoreContainer.appendChild(readMoreLink);
            serviceElement.appendChild(readMoreContainer);

            // Add the service to the page
            serviceContainer.appendChild(serviceElement);
        });
    } else {
        // Add a fallback message or action if no service data is available
        serviceContainer.textContent = "No service data available.";
    }
}




function updatePageWithTranslations(data) {
    document.querySelectorAll('.translation').forEach(element => {
        const key = element.dataset.translationKey;
        if (data[key]) {
            element.textContent = data[key];
        }
    });
    document.body.setAttribute('dir', data.dir || 'ltr');

    // Générer les services à partir des données JSON
    generateServiceHTML(data.services.services);

    // Mettre à jour les autres sections avec les données de langue
    const aboutSection = document.getElementById('about');
    aboutSection.querySelector('h2').textContent = data.about_us.title;
    aboutSection.querySelectorAll('.about-content p').forEach((p, index) => {
        p.textContent = data.about_us.content[index];
    });

    const contactSection = document.getElementById('contact');
    contactSection.querySelector('h2').textContent = data.contact.title;
    contactSection.querySelectorAll('.contact-content p').forEach((p, index) => {
        p.textContent = data.contact.content[index];
    });

    // Mettre à jour les détails de contact dans le pied de page
    const contactDetails = document.querySelector('footer .contact-details');
    contactDetails.querySelectorAll('p').forEach((p, index) => {
        p.textContent = data.footer.contact_details[index];
    });

    // Mettre à jour le texte de droits d'auteur dans le pied de page
    document.querySelector('footer p[data-translation-key="footer.copyright"]').textContent = data.footer.copyright;
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


