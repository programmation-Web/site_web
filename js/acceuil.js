// Utilitaire pour détecter si un élément est visible dans le viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animation des cartes de services
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        if (isElementInViewport(card) && !card.classList.contains('animate')) {
            card.classList.add('animate');
        }
    });
}

// Animation des statistiques (compteur animé)
function animateNumbers() {
    const numbers = document.querySelectorAll('.impact-number');

    numbers.forEach(stat => {
        if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
            const text = stat.innerText;
            const finalNumber = parseFloat(text.replace(/[^0-9.]/g, ''));

            // Déterminer le format de la statistique
            const isTonnes = text.includes('tonnes');
            const isDollar = text.includes('$');
            const isPercent = text.includes('%');

            let currentNumber = 0;
            const duration = 2000; // 2 secondes
            const interval = 50; // Mise à jour toutes les 50ms
            const steps = duration / interval;
            const increment = finalNumber / steps;

            const counter = setInterval(() => {
                currentNumber += increment;

                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(counter);
                    stat.classList.add('animated');
                }

                // Formater selon le type de statistique
                if (isTonnes) {
                    stat.innerText = currentNumber.toFixed(1) + ' tonnes';
                } else if (isDollar) {
                    stat.innerText = Math.round(currentNumber) + '$';
                } else if (isPercent) {
                    stat.innerText = Math.round(currentNumber) + '%';
                } else {
                    stat.innerText = Math.round(currentNumber).toLocaleString();
                }
            }, interval);
        }
    });
}

// Gestion du header au scroll (masquer/afficher)
let lastScroll = 0;
const header = document.querySelector('.entete');

function handleScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Défilement vers le bas - cacher le header
        if (header) {
            header.classList.add('header-hidden');
        }
    } else {
        // Défilement vers le haut - montrer le header
        if (header) {
            header.classList.remove('header-hidden');
        }
    }

    lastScroll = currentScroll;

    // Déclencher les animations
    animateServiceCards();
    animateNumbers();
}

// Gestion des événements
window.addEventListener('scroll', handleScroll);

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier immédiatement les éléments visibles
    animateServiceCards();
    animateNumbers();
});