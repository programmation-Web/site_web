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