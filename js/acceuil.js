

// Animation au défilement
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
const serviceCards = document.querySelectorAll('.service-card');
function animateServiceCards() {
    serviceCards.forEach(card => {
        if (isElementInViewport(card)) {
            card.classList.add('animate');
        }
    });
}

// Animation des statistiques
function animateNumbers() {
    document.querySelectorAll('.impact-number').forEach(stat => {
        if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
            const finalNumber = parseFloat(stat.innerText.replace(/[^0-9.]/g, ''));
            let currentNumber = 0;
            const duration = 2000; // 2 secondes
            const interval = 50; // Update every 50ms
            const steps = duration / interval;
            const increment = finalNumber / steps;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(counter);
                    stat.classList.add('animated');
                }
                // Formatter le nombre selon son format original
                if (stat.innerText.includes('tonnes')) {
                    stat.innerText = currentNumber.toFixed(1) + ' tonnes';
                } else if (stat.innerText.includes('$')) {
                    stat.innerText = Math.round(currentNumber) + '$';
                } else {
                    stat.innerText = Math.round(currentNumber).toLocaleString();
                }
            }, interval);
        }
    });
}

// Menu fixe lors du défilement
let lastScroll = 0;
const header = document.querySelector('.entete');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Défilement vers le bas - cacher le header
        header.classList.add('header-hidden');
    } else {
        // Défilement vers le haut - montrer le header
        header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
    animateServiceCards();
    animateNumbers();
});


    
   

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    animateServiceCards();
    animateNumbers();
});
