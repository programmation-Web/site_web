// ====== TEMPLATE HEADER ======
const headerTemplate = `
<header class="main-header">
    <div class="header-container">
        <div class="header-logo">
            <a href="/">
                <img src="logo.svg" alt="EcoRevive Logo" class="logo-img">
                <span class="logo-text">EcoRevive</span>
            </a>
        </div>

        <nav class="main-nav">
            <ul class="nav-list">
                <li><a href="#reparation" class="nav-link">Reparation</a></li>
                <li><a href="#recycler" class="nav-link">Recycler</a></li>
                <li><a href="#magasiner" class="nav-link">Magasiner</a></li>
                <li class="dropdown">
                    <a href="#apropos" class="nav-link dropdown-toggle">
                        A Propos
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#services">Nos services</a></li>
                        <li><a href="#don">Faire un don</a></li>
                        <li><a href="#contact">Nous Contacter</a></li>
                        <li><a href="#avis">Avis</a></li>
                    </ul>
                </li>
            </ul>
        </nav>

        <div class="header-actions">
            <a href="#signup" class="btn btn-signup">Sign Up</a>
            <a href="#login" class="btn btn-login">Login</a>
        </div>

        <button class="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>
`;

// ====== TEMPLATE FOOTER ======
const footerTemplate = `
<footer style="background-color: #2c3e50; color: white; padding: 3rem 2rem 1.5rem;">
    <div style="max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                <img src="logo.svg" alt="EcoRevive" style="width: 32px; height: 32px;">
                <span style="font-size: 1.25rem; font-weight: 600;">EcoRevive</span>
            </div>
            <p style="color: #bdc3c7; line-height: 1.6;">Votre plateforme locale pour une mode durable à Saguenay. Réparez, recyclez, revendez en toute simplicité</p>
        </div>

        <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Services</h3>
            <ul style="list-style: none; padding: 0; color: #bdc3c7;">
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">Réparation de vêtements</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">Marché d'occasion</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">Réseau de techniciens</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">Partenariats magasins</a></li>
            </ul>
        </div>

        <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Support</h3>
            <ul style="list-style: none; padding: 0; color: #bdc3c7;">
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">Centre d'aide</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">Comment ça marche</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">Politique de retour</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">FAQ</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #bdc3c7; text-decoration: none;">Contact</a></li>
            </ul>
        </div>

        <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Contact</h3>
            <ul style="list-style: none; padding: 0; color: #bdc3c7;">
                <li style="margin-bottom: 0.5rem;">📍 Saguenay, Québec</li>
                <li style="margin-bottom: 0.5rem;">📞 (418) 555-0123</li>
                <li style="margin-bottom: 0.5rem;">✉️ contact@ecorevive.ca</li>
            </ul>
        </div>
    </div>

    <div style="max-width: 1400px; margin: 2rem auto 0; padding-top: 1.5rem; border-top: 1px solid #34495e; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <p style="color: #bdc3c7; margin: 0;">© 2025 EcoRevive. Tous droits réservés.</p>
        <div style="display: flex; gap: 1.5rem;">
            <a href="#" style="color: #bdc3c7; text-decoration: none; font-size: 0.9rem;">Politique de confidentialité</a>
            <a href="#" style="color: #bdc3c7; text-decoration: none; font-size: 0.9rem;">Conditions d'utilisation</a>
            <a href="#" style="color: #bdc3c7; text-decoration: none; font-size: 0.9rem;">Mentions légales</a>
        </div>
    </div>
</footer>
`;

// ====== MOBILE MENU INIT ======
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (!mobileToggle) return;

    // Toggle menu mobile
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileToggle.classList.toggle('active');
        mainNav?.classList.toggle('active');
        headerActions?.classList.toggle('active');
    });

    // Dropdowns mobile
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                // fermer les autres dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                dropdown.classList.toggle('active');
            }
        });
    });

    // Fermer le menu si clic en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-header')) {
            mobileToggle.classList.remove('active');
            mainNav?.classList.remove('active');
            headerActions?.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Fermer menu au clic sur un lien (sauf dropdown)
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mobileToggle.classList.remove('active');
                mainNav?.classList.remove('active');
                headerActions?.classList.remove('active');
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    });
}

// ====== LOAD COMPONENTS ======
function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerTemplate;
        initMobileMenu();
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerTemplate;
    }
}

// ====== AUTO LOAD ======
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}