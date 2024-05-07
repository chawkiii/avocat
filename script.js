/* Création des éléments HTML pour la Cradle */
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

/* Ajout de la Cradle au DOM */
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

/* Fonction pour animer les boules à l'extrémité */
function animateEndBalls() {
    const balls = document.querySelectorAll('.cradle div');
    const firstBall = balls[0];
    const fifthBall = balls[balls.length - 1];
    let angle = 0;
    let direction = 1;

    /* Animation des boules */
    const animate = () => {
        angle += 1 * direction;
        balls.forEach((ball, index) => {
            if (index === 0 && angle === 15) {
                /* La première boule touche la deuxième, arrête son animation et lance l'animation de la cinquième boule */
                ball.style.animation = 'none';
                fifthBall.style.animation = 'bounce 2s infinite alternate';
            } else if (index === balls.length - 1 && angle === -15) {
                /* La cinquième boule touche la quatrième, arrête son animation et lance l'animation de la première boule */
                ball.style.animation = 'none';
                firstBall.style.animation = 'bounce 2s infinite alternate';
            }
        });

        if (angle >= 15 || angle <= -15) {
            direction *= -1; /* Inverser la direction de l'angle lorsque celui-ci atteint 15 ou -15 degrés */
        }

        requestAnimationFrame(animate);
    };

    animate();
}
animateEndBalls();

// Fonction pour gérer le mouvement des boules et détecter les collisions
function moveBalls() {
    const balls = document.querySelectorAll('.cradle div');
    let angles = [0, -10, 0, 0, 0]; // Positions initiales des boules
    let directions = [1, 1, 0, 0, 1]; // Directions de mouvement des boules (1 pour la droite, -1 pour la gauche)

    // Fonction pour déplacer les boules et détecter les collisions
    const move = () => {
        // Parcourir chaque boule
        balls.forEach((ball, index) => {
            // Déplacer la boule selon sa direction
            angles[index] += 1 * directions[index];
            ball.style.transform = `rotate(${angles[index]}deg)`;

            // Détecter les collisions avec les boules voisines
            if (index > 0 && index < 4) {
                const prevBall = balls[index - 1];
                const prevAngle = angles[index - 1];
                // Vérifier si la boule courante touche la boule précédente
                if (angles[index] >= 15 && prevAngle >= 15) {
                    directions[index] = 0; // Arrêter le mouvement de la boule courante
                    directions[index - 1] = 1; // Permettre le mouvement de la boule précédente
                }
            }
        });

        // Répéter le mouvement avec une nouvelle frame
        requestAnimationFrame(move);
    };

    // Démarrer le mouvement initial
    move();
}


// Appeler la fonction pour gérer le mouvement des boules
moveBalls();
