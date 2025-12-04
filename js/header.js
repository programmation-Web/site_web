/* ========================================
   HEADER JAVASCRIPT - EcoRevive
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    const body = document.body;
    const header = document.querySelector('.main-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // ========== MENU MOBILE ========== 
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            headerActions.classList.toggle('active');
            this.classList.toggle('active');
            body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Fermer le menu mobile quand on clique en dehors
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.main-header') && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            headerActions.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // ========== DROPDOWN MOBILE ==========
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });

    // ========== LIEN ACTIF ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.color = 'var(--primary-green)';
            link.style.fontWeight = '600';
        }
    });

    // ========== SCROLL HEADER ==========
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        header.style.boxShadow = scrollY > 50
            ? '0 4px 12px rgba(0, 0, 0, 0.1)'
            : '0 2px 4px rgba(0, 0, 0, 0.05)';
    });

    // ========== RESIZE ==========
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            headerActions.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // ========== ANIMATION BURGER ==========
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
