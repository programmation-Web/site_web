/* ========================================
   FOOTER JAVASCRIPT - EcoRevive
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ANNÉE DYNAMIQUE ==========
    // Mettre à jour automatiquement l'année dans le copyright
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} EcoRevive. Tous droits réservés.`;
    }

    // ========== SMOOTH SCROLL POUR LES LIENS INTERNES ==========
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"], .footer-legal a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si c'est un lien vers une ancre sur la même page
            if (href.startsWith('#') && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========== ANIMATION AU SCROLL ==========
    // Animer le footer quand il entre dans le viewport
    const footer = document.querySelector('.main-footer');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const footerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('footer-visible');
                
                // Animer les sections une par une
                const footerSections = entry.target.querySelectorAll('.footer-section');
                footerSections.forEach((section, index) => {
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    if (footer) {
        // Préparer les sections pour l'animation
        const footerSections = footer.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s ease';
        });
        
        footerObserver.observe(footer);
    }

    // ========== VALIDATION EMAIL NEWSLETTER ==========
    // Si vous avez un formulaire newsletter dans le footer
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Validation simple
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(email)) {
                // Succès
                showNewsletterMessage('Merci pour votre inscription !', 'success');
                emailInput.value = '';
            } else {
                // Erreur
                showNewsletterMessage('Veuillez entrer une adresse email valide.', 'error');
            }
        });
    }

    function showNewsletterMessage(message, type) {
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `newsletter-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            margin-top: 0.5rem;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.9rem;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            animation: slideDown 0.3s ease;
        `;

        newsletterForm.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }

    // ========== HOVER EFFECT SUR LES ICÔNES SOCIALES ==========
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========== LIENS EXTERNES - OUVRIR DANS UN NOUVEL ONGLET ==========
    const externalLinks = document.querySelectorAll('.footer-links a, .footer-contact-info a');
    
    externalLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Si c'est un lien externe (commence par http ou https)
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ========== AJOUT D'ANIMATIONS CSS ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }

        .footer-visible {
            animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // ========== BACK TO TOP BUTTON ==========
    // Créer un bouton "Retour en haut" (optionnel)
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Retour en haut');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #4CAF50;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(backToTopButton);

    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Action du bouton
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Effet hover sur le bouton
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#45a049';
        this.style.transform = 'scale(1.1)';
    });

    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#4CAF50';
        this.style.transform = 'scale(1)';
    });

});
