/* ========================================
   COMPONENTS.JS - EcoRevive
   Templates pour Header et Footer
   ======================================== */

// ========== TEMPLATE HEADER ==========
const headerTemplate = `
<header class="main-header">
    <div class="header-container">
        <div class="header-logo">
            <a href="index.html">
                <img src="images/logo.png" alt="EcoRevive Logo" class="logo-img">
                <span class="logo-text">EcoRevive</span>
            </a>
        </div>

        <nav class="main-nav">
            <ul class="nav-list">
                <li><a href="reparation.html" class="nav-link">Reparation</a></li>
                <li><a href="faire_un_don.html" class="nav-link">Recycler</a></li>
                <li><a href="boutique.html" class="nav-link">Magasiner</a></li>
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle">
                        A Propos
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="index.html#services">Nos services </a></li>
                        <li><a href="faire_un_don.html">Faire un don</a></li>
                        <li><a href="#footer">Nous Contacter</a></li>
                        <li><a href="index.html#Avis">Avis</a></li>
                    </ul>
                </li>
            </ul>
        </nav>

        <div class="header-actions">
            <a href="#signup" class="btn btn-signup">Sign Up</a>
            <a href="#login" class="btn btn-login">Login</a>
        </div>

        <button class="mobile-menu-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>
`;

// ========== TEMPLATE FOOTER ==========
const footerTemplate = `...`; // ton footer reste identique

// ========== MENU MOBILE HAMBURGER ==========
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (!mobileToggle) {
        console.warn('⚠️ Bouton menu mobile non trouvé');
        return;
    }

    // Toggle du menu principal et actions
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileToggle.classList.toggle('active');
        mainNav?.classList.toggle('active');
        headerActions?.classList.toggle('active');
    });

    // Dropdowns en mobile
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Fermer menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-header')) {
            mobileToggle.classList.remove('active');
            mainNav?.classList.remove('active');
            headerActions?.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Fermer menu quand on clique sur un lien (sauf dropdown)
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

    console.log('✅ Menu mobile initialisé avec succès');
}

// ========== CHARGEMENT DES COMPONENTS ==========
function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerTemplate;
        console.log('✅ Header chargé avec succès');
        initMobileMenu();
    } else {
        console.warn('⚠️ Placeholder "header-placeholder" introuvable');
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerTemplate;
        console.log('✅ Footer chargé avec succès');
    } else {
        console.warn('⚠️ Placeholder "footer-placeholder" introuvable');
    }
}

// Auto-load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
