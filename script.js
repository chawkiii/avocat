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
    const translations = {
        fr: {
            alert: 'La langue a été changée en français.',
            dir: 'ltr',
            readMore: 'Lire la suite',
            readLess: 'Lire moins'
        },
        en: {
            alert: 'Language changed to English.',
            dir: 'ltr',
            readMore: 'Read more',
            readLess: 'Read less'
        },
        ar: {
            alert: 'تم تغيير اللغة إلى العربية.',
            dir: 'rtl',
            readMore: 'اقرأ المزيد',
            readLess: 'اقرأ أقل'
        }
    };

    if (translations[lang]) {
        alert(translations[lang].alert);
        document.body.setAttribute('dir', translations[lang].dir);
        // Changez le contenu textuel ici en utilisant les traductions appropriées
        document.querySelectorAll('.read-more').forEach(link => {
            link.textContent = translations[lang].readMore;
        });
        document.querySelectorAll('.read-less').forEach(link => {
            link.textContent = translations[lang].readLess;
        });
    }
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

            // Ensure the "Lire moins" link remains at the bottom
            readMoreContainer.style.display = 'flex';
            readMoreContainer.style.justifyContent = 'center';
        });
    });
}


function handleBurgerMenu() {
    document.querySelector('.burger').addEventListener('click', function() {
        document.querySelector('.menu').classList.toggle('active');
    });
}
