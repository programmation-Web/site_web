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
                <img src="images/logo.png" alt="EcoRevive" style="width: 32px; height: 32px;">
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


// ========== INSERTION ==========
document.getElementById("header-placeholder").innerHTML = headerTemplate;
document.getElementById("footer-placeholder").innerHTML = footerTemplate;


// ========== MENU MOBILE (Version robuste & stable) ==========
function initMobileMenu() {

    const headerRoot = document.getElementById("header-placeholder");
    if (!headerRoot) return;

    const header = headerRoot.querySelector(".main-header");
    const toggle = header.querySelector(".mobile-menu-toggle");
    const nav = header.querySelector(".main-nav");
    const actions = header.querySelector(".header-actions");
    const dropdowns = header.querySelectorAll(".dropdown");

    if (!toggle || !nav) return;

    // ========== OPEN / CLOSE PANEL ==========

    function openMenu() {
        toggle.classList.add("active");
        nav.classList.add("active");
        actions.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        toggle.classList.remove("active");
        nav.classList.remove("active");
        actions.classList.remove("active");
        dropdowns.forEach(d => d.classList.remove("active"));
        document.body.style.overflow = "";
    }

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (toggle.classList.contains("active")) closeMenu();
        else openMenu();
    });

    // ========== DROPDOWNS (mobile uniquement) ==========
    dropdowns.forEach(drop => {
        const t = drop.querySelector(".dropdown-toggle");
        if (!t) return;

        t.addEventListener("click", (ev) => {
            if (window.innerWidth > 768) return; // Desktop : hover only
            ev.preventDefault();
            drop.classList.toggle("active");
        });
    });

    // ========== CLOSE WHEN CLICK OUTSIDE ==========
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".main-header")) closeMenu();
    });

    // ========== ESCAPE CLOSE ==========
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    // ========== AUTO-RESET ON RESIZE ==========
    let timer;
    window.addEventListener("resize", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 120);
    });
}

initMobileMenu();
