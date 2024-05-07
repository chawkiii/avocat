// Création des éléments HTML pour la Cradle
function createCradle() {
    const cradle = document.createElement('div');
    cradle.classList.add('cradle');

    for (let i = 0; i < 5; i++) {
        const ball = document.createElement('div');
        const ballInner = document.createElement('b');
        ball.appendChild(ballInner);
        cradle.appendChild(ball);
    }

    return cradle;
}

// Ajout de la Cradle au DOM
const cradleContainer = document.getElementById('cradle');
cradleContainer.appendChild(createCradle());

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});



// Fonction pour animer les boules à l'extrémité
function animateEndBalls() {
    const endBalls = document.querySelectorAll('.cradle div:first-child, .cradle div:last-child');

    endBalls.forEach(ball => {
        let angle = 0;
        let direction = 1;

        // Animation de la boule
        const animate = () => {
            angle += 1 * direction;
            ball.style.transform = `rotate(${angle}deg)`;

            if (angle === 15 || angle === -15) {
                direction *= -1;
            }

            requestAnimationFrame(animate);
        };

        animate();
    });
}

// Appel de la fonction pour démarrer l'animation des boules à l'extrémité
animateEndBalls();
