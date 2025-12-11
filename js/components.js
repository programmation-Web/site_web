/* ========================================
   COMPONENTS.JS - EcoRevive

   ========================================
  */

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

        <!-- Navigation desktop -->
        <nav class="main-nav">
            <ul class="nav-list">

                <li><a href="reparation.html" class="nav-link">Réparation</a></li>
                <li><a href="recyclage.html" class="nav-link">Recycler</a></li>
                <li><a href="boutique.html" class="nav-link">Magasiner</a></li>

                <!-- Dropdown -->
                <li class="dropdown">
                    <a class="nav-link dropdown-toggle">
                        À propos
                        <svg width="16" height="16"><path d="M5 6l3 3 3-3"></path></svg>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="mission.html" class="nav-link">Notre mission</a></li>
                        <li><a href="impact.html" class="nav-link">Notre impact</a></li>
                        <li><a href="contact.html" class="nav-link">Nous contacter</a></li>
                    </ul>
                </li>

            </ul>
        </nav>

        <!-- Actions (connexion / s'inscrire) -->
        <div class="header-actions">
            <a href="login.html" class="btn-login">Connexion</a>
            <a href="signup.html" class="btn-signup">S'inscrire</a>
        </div>

        <!-- Menu hamburger -->
        <button class="mobile-menu-toggle" aria-label="Ouvrir le menu">
            <span></span><span></span><span></span>
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
            <p>Donner une seconde vie à vos objets.</p>
        </div>

        <div class="footer-section">
            <h4>Navigation</h4>
            <ul>
                <li><a href="reparation.html">Réparation</a></li>
                <li><a href="faire-un-don.html">Recycler</a></li>
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

    <p class="footer-copy">© 2025 EcoRevive. Tous droits réservés.</p>
</footer>
`;


// ========== INSERTION ==========
document.getElementById("header-placeholder").innerHTML = headerTemplate;
document.getElementById("footer-placeholder").innerHTML = footerTemplate;


function initMobileMenu() {

    const headerRoot = document.getElementById("header-placeholder");
    if (!headerRoot) return;

    const header = headerRoot.querySelector(".main-header");
    const toggle = header.querySelector(".mobile-menu-toggle");
    const nav = header.querySelector(".main-nav");
    const actions = header.querySelector(".header-actions");
    const dropdowns = header.querySelectorAll(".dropdown");

    if (!toggle || !nav || !actions) return;

    // ========== PLACE ACTIONS INSIDE NAV ON MOBILE ==========
    function relocateActions() {
        if (window.innerWidth <= 768) {
            if (!nav.contains(actions)) {
                nav.appendChild(actions);
            }
        } else {
            // Reposition actions back to the right on desktop
            const container = header.querySelector(".header-container");
            if (!container.contains(actions)) {
                container.appendChild(actions);
            }
        }
    }
    relocateActions();
    window.addEventListener("resize", relocateActions);

    // ========== OPEN / CLOSE PANEL ==========
    function openMenu() {
        toggle.classList.add("active");
        nav.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        toggle.classList.remove("active");
        nav.classList.remove("active");
        dropdowns.forEach(d => d.classList.remove("active"));
        document.body.style.overflow = "";
    }

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (toggle.classList.contains("active")) closeMenu();
        else openMenu();
    });

    // ========== DROPDOWNS (mobile click only) ==========
    dropdowns.forEach(drop => {
        const t = drop.querySelector(".dropdown-toggle");
        if (!t) return;

        t.addEventListener("click", (ev) => {
            if (window.innerWidth > 768) return;
            ev.preventDefault();
            drop.classList.toggle("active");
        });
    });

    // ========== OUTSIDE CLICK CLOSE ==========
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".main-header")) closeMenu();
    });

    // ========== ESCAPE CLOSE ==========
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}


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
