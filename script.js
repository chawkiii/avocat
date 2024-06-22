document.addEventListener("DOMContentLoaded", function() {
    generateLanguageData('fr'); // lang fr par defaut
    handleNavbar(); // element nav noir
    activateHomeLink(); // Activer "Accueil" par défaut
    updateActiveNavLink(); // Mettre à jour les liens actifs

    // Ajouter un gestionnaire d'événements pour le changement de langue
    document.getElementById('language-select').addEventListener('change', function() {
        const selectedLang = this.value;
        generateLanguageData(selectedLang);
        updateTextDirection(selectedLang); // Mettre à jour la direction du texte
    });

});



function generateLanguageData(lang) {
    // Charger les données de langue à partir du fichier JSON par défaut
    fetch(`data/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            updatePageWithTranslations(data);
            initializePageFunctionality(); // Appeler après la mise à jour des traductions
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

function updatePageWithTranslations(data) {
    // About section
    const aboutSection = document.getElementById('about');
    aboutSection.querySelector('h2').textContent = data.about_us.title;
    aboutSection.querySelectorAll('.about-content p').forEach((p, index) => {
        p.textContent = data.about_us.content[index];
    });
    aboutSection.querySelector('.cta-button').textContent = data.about_us.contact_button;
        
    // service section
    const serviceSection = document.getElementById('service');    
    serviceSection.querySelector('h2').textContent = data.services.title;
    generateServiceHTML(data.services.services);

    // contact section
    const contactSection = document.getElementById('contact');
    contactSection.querySelector('h2').textContent = data.contact.title;
    contactSection.querySelector('.contact-content p').textContent = data.contact.content;

    // Update placeholders in the contact form
    document.getElementById('name').placeholder = data.contact.form.name_placeholder;
    document.getElementById('email').placeholder = data.contact.form.email_placeholder;
    document.getElementById('phone').placeholder = data.contact.form.phone_placeholder;
    document.getElementById('message').placeholder = data.contact.form.message_placeholder;
    document.querySelector('.submitButton').value = data.contact.form.submit_button;

    // footer section
    const contactDetails = document.querySelector('footer .contact-details');
    contactDetails.querySelectorAll('p').forEach((p, index) => {
        p.textContent = data.footer.contact_details[index];
    });
    const copyright = document.querySelector('footer p[data-translation-key="footer.copyright"]');
    copyright.textContent = data.footer.copyright;
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

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navbarHeight = document.querySelector('.menu').offsetHeight;
    let activeSectionId = null;

    // Trouver la section active (celle qui est la plus proche du haut de la fenêtre)
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
            activeSectionId = section.id;
        }
    });

    // Mettre à jour les classes des liens de navigation
    sections.forEach(section => {
        const navLink = document.querySelector(`nav a[href="#${section.id}"]`);
        if (section.id === activeSectionId) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });

    // Condition pour ajouter ou retirer la classe 'active' du lien "Accueil"
    const homeLink = document.querySelector('nav a[data-translation-key="menu.home"]');
    const aboutSection = document.getElementById('about');
    
    if (window.scrollY < aboutSection.offsetTop - navbarHeight) {
        homeLink.classList.add('active');
    } else {
        homeLink.classList.remove('active');
    }
}

// Fonction pour activer "Accueil" par défaut
function activateHomeLink() {
    const homeLink = document.querySelector('nav a[data-translation-key="menu.home"]');
    homeLink.classList.add('active');
}

function handleNavLinks() {
    // Sélectionnez tous les éléments de navigation, y compris le bouton CTA dans la section #about
    const navLinks = document.querySelectorAll('nav a[data-translation-key], .cta-button');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let target;
            target = document.querySelector(this.getAttribute('href'));

            

            // Calculer la position de la cible
            const navbarHeight = document.querySelector('.menu').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight + 20;

            // Faites défiler la fenêtre jusqu'à la position de la cible avec un effet de défilement fluide
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Mettre à jour l'élément de navigation actif
            updateActiveNavLink();
        });
    });
}
// Function to generate HTML for services based on the provided data
function generateServiceHTML(serviceData) {
    const serviceContainer = document.querySelector('.service-container');
    serviceContainer.innerHTML = ''; // Clear the container to avoid duplication
    
    if (serviceData && serviceData.length > 0) { // Check if serviceData is defined and not empty
        serviceData.forEach((service, index) => {
            // Create the service element
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service', 'reduced', `article${index + 1}`);
            serviceElement.dataset.index = index; // Store index

            // Create the service title
            const titleElement = document.createElement('h3');
            titleElement.textContent = service.title;
            serviceElement.appendChild(titleElement);

            // Create the image of the service
            const imageElement = document.createElement('img');
            imageElement.src = service.image; 
            imageElement.alt = service.title;
            serviceElement.appendChild(imageElement);

            // Create the short description of the service
            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('service-description');
            const p = document.createElement('p');
            p.textContent = service.description_short;
            descriptionElement.appendChild(p);
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

            // Create the "Read more" link
            const readMoreContainer = document.createElement('div');
            readMoreContainer.classList.add('read-more-container');
            const readMoreLink = document.createElement('a');
            readMoreLink.classList.add('read-more');
            // Set the initial text content based on the current selected language
            readMoreLink.textContent = document.getElementById('language-select').value === 'fr' ? 'Lire la suite' : document.getElementById('language-select').value === 'en' ? 'Read more' : 'اقرأ المزيد';
            readMoreContainer.appendChild(readMoreLink);
            serviceElement.appendChild(readMoreContainer);

            // Add the service to the page
            serviceContainer.appendChild(serviceElement);
        });
        
    }
}

function handleReadMoreLinks() {
    // Gestion des liens "Lire la suite" pour les services
    document.querySelectorAll(".read-more").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const service = this.closest(".service");
            const descriptionFull = service.querySelector('.service-description-full');
            const description = service.querySelector('.service-description');
            const readMoreContainer = this.closest('.read-more-container');
            const index = parseInt(service.dataset.index) + 1;

            if (service.classList.contains('reduced')) {
                service.classList.remove('reduced');
                service.classList.add(`article${index}`, 'full-width');
                this.textContent = document.getElementById('language-select').value === 'fr' ? 'Lire moins' : document.getElementById('language-select').value === 'en' ? 'Read less' : 'اقرأ أقل';
                document.body.classList.add('no-scroll');
            } else {
                service.classList.remove(`article${index}`, 'full-width');
                service.classList.add('reduced');
                this.textContent = document.getElementById('language-select').value === 'fr' ? 'Lire la suite' : document.getElementById('language-select').value === 'en' ? 'Read more' : 'اقرأ المزيد';
                document.body.classList.remove('no-scroll');
            }
        });
    });
}

function handleBurgerMenu() {
    document.querySelector('.burger-container').addEventListener('click', function() {
        document.querySelector('.menu').classList.toggle('active');
    });
}

// Function to update text direction based on selected language
function updateTextDirection(lang) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.body.style.direction = dir;
}
