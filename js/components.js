// ========================================
// COMPONENTS.JS - EcoRevive
// ========================================

// ====== TEMPLATE HEADER ======
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
            <li><a href="index.html#services">Nos services</a></li>
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
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
`;

// ========== TEMPLATE FOOTER ==========
const footerTemplate = `
<footer class="main-footer">
    <div class="footer-container" id="footer">
        <!-- Section À propos -->
        <div class="footer-section footer-about">
            <div class="footer-logo">
                <img src="images/logo.png" alt="EcoRevive Logo" class="footer-logo-img">
                <h3 class="footer-brand">EcoRevive</h3>
            </div>
            <p class="footer-description">
                Votre plateforme locale pour une mode durable à Saguenay. 
                Réparez, recyclez, revendez en toute simplicité
            </p>
            <div class="footer-social">
                <a href="#" class="social-link" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </a>
                <a href="#" class="social-link" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
                <a href="#" class="social-link" aria-label="Twitter/X">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
            </div>
        </div>

        <!-- Section Services -->
        <div class="footer-section">
            <h4 class="footer-title">Services</h4>
            <ul class="footer-links">
                <li><a href="reparation.html">Réparation de vêtements</a></li>
                <li><a href="boutique.html">Marché d'occasion</a></li>
                <li><a href="#techniciens">Réseau de techniciens</a></li>
                <li><a href="#partenaires">Partenariats magasins</a></li>
            </ul>
        </div>

        <!-- Section Support -->
        <div class="footer-section">
            <h4 class="footer-title">Support</h4>
            <ul class="footer-links">
                <li><a href="#aide">Centre d'aide</a></li>
                <li><a href="#fonctionnement">Comment ça marche</a></li>
                <li><a href="#retour">Politique de retour</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>

        <!-- Section Contact -->
        <div class="footer-section footer-contact">
            <h4 class="footer-title">Contact</h4>
            <ul class="footer-contact-info">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <a href="https://www.google.com/maps/dir/?api=1&destination=555+boulevard+de+l+universite+Chicoutimi" target="_blank" rel="noopener">
                    Saguenay, Québec
                  </a>
                </li>
                <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <a href="tel:4185550123">(418) 555-0123</a>
                </li>
                <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <a href="mailto:contact@ecorevive.ca">contact@ecorevive.ca</a>
                </li>
            </ul>
        </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
        <div class="footer-bottom-container">
            <p class="copyright">© 2025 EcoRevive. Tous droits réservés.</p>
            <div class="footer-legal">
                <a href="#politique">Politique de confidentialité</a>
                <a href="#conditions">Conditions d'utilisation</a>
                <a href="#mentions">Mentions légales</a>
            </div>
        </div>
    </div>
</footer>
`;

// ====== INITIALISATION DU MENU MOBILE ======
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (!mobileToggle) return;

    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');
    const dropdowns = document.querySelectorAll('.dropdown');

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileToggle.classList.toggle('active');
        mainNav?.classList.toggle('active');
        headerActions?.classList.toggle('active');
    });

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdowns.forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                dropdown.classList.toggle('active');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-header')) {
            mobileToggle.classList.remove('active');
            mainNav?.classList.remove('active');
            headerActions?.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

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

// ====== INITIALISATION BOUTONS AUTH SUPABASE ======
async function initAuthButtons() {
    // Vérifier si Supabase est disponible
    if (!window.supabase) {
        console.warn("Supabase non disponible - boutons auth non initialisés");
        return;
    }

    try {
        const btnLogin = document.querySelector('.btn-login');
        const btnSignup = document.querySelector('.btn-signup');
        const btnLogout = document.querySelector('.btn-logout');

        // Vérifie si l'utilisateur est connecté
        const { data: { session } } = await window.supabase.auth.getSession();

        if (session) {
            if (btnLogin) btnLogin.style.display = 'none';
            if (btnSignup) btnSignup.style.display = 'none';
            if (btnLogout) btnLogout.style.display = 'inline-block';
        } else {
            if (btnLogin) btnLogin.style.display = 'inline-block';
            if (btnSignup) btnSignup.style.display = 'inline-block';
            if (btnLogout) btnLogout.style.display = 'none';
        }

        btnLogout?.addEventListener('click', async () => {
            const { error } = await window.supabase.auth.signOut();
            if (!error) {
                window.location.href = "index.html";
            } else {
                console.error("Erreur de déconnexion:", error.message);
            }
        });
    } catch (error) {
        console.error("Erreur lors de l'initialisation des boutons auth:", error);
    }
}

// ====== CHARGEMENT DES COMPOSANTS (INDÉPENDANT DE SUPABASE) ======
function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Charger le header
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerTemplate;
        initMobileMenu();
    }

    // Charger le footer (TOUJOURS, peu importe Supabase)
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerTemplate;
        console.log("✅ Footer chargé avec succès");
    }

    // Initialiser l'authentification séparément
    initAuthButtons();
}

// ====== AUTO LOAD (NE DÉPEND PLUS DE SUPABASE) ======
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Chargement des composants...");
    loadComponents();
});