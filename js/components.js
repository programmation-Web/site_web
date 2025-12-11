/* ========================================
   COMPONENTS.JS - EcoRevive
   Templates pour Header et Footer
   ======================================== */

// ========== TEMPLATE HEADER ==========
const headerTemplate = `
<header class="main-header">
    <div class="header-container">

        <!-- Logo -->
        <div class="header-logo">
            <a href="index.html">
                <img src="images/logo.png" alt="EcoRevive Logo" class="logo-img">
                <span class="logo-text">EcoRevive</span>
            </a>
        </div>

        <!-- Navigation -->
        <nav class="main-nav" id="mainNav">
            <ul>
                <li><a href="reparation.html">Réparation</a></li>
                <li><a href="recyclage.html">Recycler</a></li>
                <li><a href="boutique.html">Magasiner</a></li>

                <!-- Sous-menu À propos -->
                <li class="has-submenu">
                    <a href="#">À propos</a>
                    <ul class="submenu">
                        <li><a href="mission.html">Notre mission</a></li>
                        <li><a href="impact.html">Notre impact</a></li>
                        <li><a href="contact.html">Nous contacter</a></li>
                    </ul>
                </li>
            </ul>
        </nav>

        <!-- Boutons Login / Signup -->
        <div class="header-actions">
            <a href="signup.html" class="btn btn-signup">S'inscrire</a>
            <a href="login.html" class="btn btn-login">Se connecter</a>
        </div>

        <!-- Bouton Hamburger -->
        <button class="hamburger" id="hamburgerBtn">
            <span></span>
            <span></span>
            <span></span>
        </button>

    </div>
</header>
`;

// ========== TEMPLATE FOOTER ==========
const footerTemplate = `
<footer class="main-footer">
    <div class="footer-container">
        <div class="footer-section">
            <h3>EcoRevive</h3>
            <p>Recyclons mieux, réparons plus, consommons intelligemment.</p>
        </div>

        <div class="footer-section">
            <h4>Liens rapides</h4>
            <ul>
                <li><a href="reparation.html">Réparation</a></li>
                <li><a href="recyclage.html">Recycler</a></li>
                <li><a href="boutique.html">Magasiner</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h4>À propos</h4>
            <ul>
                <li><a href="mission.html">Notre mission</a></li>
                <li><a href="impact.html">Notre impact</a></li>
                <li><a href="contact.html">Nous contacter</a></li>
            </ul>
        </div>
    </div>

    <div class="footer-bottom">
        <p>© 2024 EcoRevive. Tous droits réservés.</p>
    </div>
</footer>
`;

// ========== INJECTION DANS LA PAGE ==========
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-component");
    const footerContainer = document.getElementById("footer-component");

    if (headerContainer) headerContainer.innerHTML = headerTemplate;
    if (footerContainer) footerContainer.innerHTML = footerTemplate;

    // Active les fonctionnalités une fois que le header est injecté
    initMenuInteractions();
});

// ========== FONCTIONS MENU ==========
function initMenuInteractions() {
    const hamburger = document.getElementById("hamburgerBtn");
    const nav = document.getElementById("mainNav");

    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            nav.classList.toggle("active");
        });
    }

    // Sous-menu mobile
    const submenuParents = document.querySelectorAll(".has-submenu > a");

    submenuParents.forEach(parent => {
        parent.addEventListener("click", (e) => {
            const width = window.innerWidth;

            // Active sur mobile seulement
            if (width <= 900) {
                e.preventDefault();
                const submenu = parent.nextElementSibling;
                submenu.classList.toggle("open");
            }
        });
    });
}
