/* ========================================
   HEADER JAVASCRIPT - EcoRevive
   ======================================== */


document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MENU MOBILE ==========
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');
    const body = document.body;

    // Toggle menu mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle classes active
            mainNav.classList.toggle('active');
            headerActions.classList.toggle('active');
            
            // Animation du burger
            this.classList.toggle('active');
            
            // Empêcher le scroll quand le menu est ouvert
            if (mainNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }

    // Fermer le menu mobile quand on clique en dehors
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-header')) {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                headerActions.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });

    // ========== DROPDOWN MOBILE ==========
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Sur mobile seulement
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });

    // ========== ACTIVE LINK ==========
    // Mettre en évidence le lien actif selon la page courante
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = 'var(--primary-green)';
            link.style.fontWeight = '600';
        }
    });

    // ========== SCROLL BEHAVIOR ==========
    // Ajouter une ombre au header lors du scroll
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.window.scrollY;
        
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });

    // ========== FERMER MENU SUR RESIZE ==========
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                headerActions.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });

    // ========== ANIMATION BURGER ==========
    // CSS pour l'animation du burger (à ajouter dans le CSS si nécessaire)
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);

});
