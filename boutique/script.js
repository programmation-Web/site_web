

//Entete
//menu deroulant

const selectMenu = document.querySelector(".menu-deroulant");

selectMenu.addEventListener("change", function () {
    const cible = this.value;
    if (cible) {
        const section = document.querySelector(cible);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }
});


// Données des produits
const produits = [
    {
        id: 1,
        titre: "Veste en jean vintage",
        prix: 35,
        prixOriginal: 120,
        taille: "M",
        description: "Magnifique veste en jean vintage, style années 90...",
        qualite: "Très bon",
        rabais: 72,
        image:"../images/veste.jpg"
    },
    {
        id: 2,
        titre: "Chemise homme classique",
        prix: 18,
        prixOriginal: 65,
        taille: "L",
        description: "Magnifique chemise pour tous les jours...",
        qualite: "Excellent",
        rabais: 71,
        image: "../images/rayon-homme.jpg"
    },
    {
        id: 3,
        titre: "Ensemble T-shirt et pantalon enfant",
        prix: 12,
        prixOriginal: 45,
        taille: "M",
        description: "Couleurs vives et matières confortables...",
        qualite: "Très bon",
        rabais: 73,
        image: "../images/ensmble-enfant.jpg"
    },
    {
        id: 4,
        titre: "Bottes d'hiver",
        prix: 55,
        prixOriginal: 150,
        taille: "38",
        description: "Imperméables et chaudes, parfaites pour l'hiver...",
        qualite: "Très bon",
        rabais: 72,
        image: "../images/botte-hivers.jpg"
    },
    {
        id: 5,
        titre: "Manteau d'hiver femme",
        prix: 75,
        prixOriginal: 250,
        taille: "S",
        description: "Très chaud et élégant pour les hivers du Québec...",
        qualite: "Excellent",
        rabais: 70,
        image: "../images/rayon-femme-hivers.jpg"
    },
    {
        id: 6,
        titre: "Robe d'été vintage",
        prix: 28,
        prixOriginal: 90,
        taille: "M",
        description: "Jolie robe d'été à motifs floraux, style années 80...",
        qualite: "Bon",
        rabais: 69,
        image: "../images/rayon-ete-vintage.jpg"
    }
];

// Gestion du panier
let panier = [];
let nombreArticlesPanier = 0;

// Charger le panier depuis le localStorage
function chargerPanier() {
    const panierStocke = localStorage.getItem('panier');
    if (panierStocke) {
        panier = JSON.parse(panierStocke);
        mettreAJourCompteurPanier();
    }
}

// Sauvegarder le panier dans le localStorage
function sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(panier));
}

// Initialiser la grille de produits
function initialiserProduits() {
    const grilleProduits = document.getElementById('grilleProduits');
    if (!grilleProduits) return;
    
    grilleProduits.innerHTML = '';
    
    produits.forEach(produit => {
        const carteProduit = creerCarteProduit(produit);
        grilleProduits.appendChild(carteProduit);
    });
}

// Créer une carte produit
function creerCarteProduit(produit) {
    const carte = document.createElement('div');
    carte.className = 'carte-produit';
    
    carte.innerHTML = `
        <div class="image-produit">
            <img src="${produit.image}" alt="${produit.titre}">
        </div>
        <div class="info-produit">
            <div class="entete-produit">
                <div>
                    <div class="prix-produit">${produit.prix}$</div>
                    <div class="prix-original">${produit.prixOriginal}$</div>
                </div>
                <div class="rabais-produit">-${produit.rabais}%</div>
            </div>
            <div class="titre-produit">${produit.titre}</div>
            <div class="description-produit">${produit.description}</div>
            <div class="evaluation-produit">${produit.qualite}</div>
            <div class="taille-produit">Taille: ${produit.taille}</div>
            <div class="actions-produit">
                <button class="btn-ajouter" onclick="ajouterAuPanier(${produit.id})">Ajouter au panier</button>
                <button class="btn-favori" onclick="basculerFavori(this)">♥</button>
            </div>
        </div>
    `;
    
    return carte;
}

// Ajouter un produit au panier
function ajouterAuPanier(idProduit) {
    const produit = produits.find(p => p.id === idProduit);
    if (!produit) return;
    
    const articleExistant = panier.find(item => item.id === idProduit);
    
    if (articleExistant) {
        articleExistant.quantite++;
    } else {
        panier.push({
            ...produit,
            quantite: 1
        });
    }
    
    sauvegarderPanier();
    mettreAJourCompteurPanier();
    afficherNotification(`${produit.titre} ajouté au panier!`);
}

// Retirer un produit du panier
function retirerDuPanier(idProduit) {
    panier = panier.filter(item => item.id !== idProduit);
    sauvegarderPanier();
    mettreAJourCompteurPanier();
    afficherContenuPanier();
    calculerTotal();
}

// Modifier la quantité d'un produit
function modifierQuantite(idProduit, nouvelleQuantite) {
    const article = panier.find(item => item.id === idProduit);
    if (article) {
        if (nouvelleQuantite <= 0) {
            retirerDuPanier(idProduit);
        } else {
            article.quantite = nouvelleQuantite;
            sauvegarderPanier();
            mettreAJourCompteurPanier();
            afficherContenuPanier();
            calculerTotal();
        }
    }
}

// Mettre à jour le compteur du panier
function mettreAJourCompteurPanier() {
    nombreArticlesPanier = panier.reduce((total, item) => total + item.quantite, 0);
    
    const compteurElements = document.querySelectorAll('.compteur-panier');
    compteurElements.forEach(element => {
        element.textContent = nombreArticlesPanier;
        element.style.display = nombreArticlesPanier > 0 ? 'flex' : 'none';
    });
}

// Afficher le contenu du panier
function afficherContenuPanier() {
    const conteneurPanier = document.getElementById('contenuPanier');
    if (!conteneurPanier) return;
    
    if (panier.length === 0) {
        conteneurPanier.innerHTML = '<p class="panier-vide">Votre panier est vide</p>';
        return;
    }
    
    conteneurPanier.innerHTML = panier.map(item => `
        <div class="article-panier">
            <img src="${item.image}" alt="${item.titre}" class="image-article-panier">
            <div class="info-article-panier">
                <h3>${item.titre}</h3>
                <p>Taille: ${item.taille}</p>
                <p class="prix-article">${item.prix}$</p>
            </div>
            <div class="controles-quantite">
                <button onclick="modifierQuantite(${item.id}, ${item.quantite - 1})" class="btn-quantite">-</button>
                <span class="affichage-quantite">${item.quantite}</span>
                <button onclick="modifierQuantite(${item.id}, ${item.quantite + 1})" class="btn-quantite">+</button>
            </div>
            <div class="actions-article">
                <span class="sous-total-article">${(item.prix * item.quantite).toFixed(2)}$</span>
                <button onclick="retirerDuPanier(${item.id})" class="btn-retirer">Retirer</button>
            </div>
        </div>
    `).join('');
}

// Calculer le total du panier
function calculerTotal() {
    const sousTotal = panier.reduce((total, item) => total + (item.prix * item.quantite), 0);
    const taxes = sousTotal * 0.15; // 15% de taxes
    const total = sousTotal + taxes;
    
    const elementsTotal = {
        sousTotal: document.getElementById('sousTotal'),
        taxes: document.getElementById('taxes'),
        total: document.getElementById('total')
    };
    
    if (elementsTotal.sousTotal) elementsTotal.sousTotal.textContent = `${sousTotal.toFixed(2)}$`;
    if (elementsTotal.taxes) elementsTotal.taxes.textContent = `${taxes.toFixed(2)}$`;
    if (elementsTotal.total) elementsTotal.total.textContent = `${total.toFixed(2)}$`;
    
    return { sousTotal, taxes, total };
}

// Ouvrir le modal du panier
function ouvrirPanier() {
    const modalPanier = document.getElementById('modalPanier');
    if (modalPanier) {
        modalPanier.style.display = 'flex';
        afficherContenuPanier();
        calculerTotal();
    }
}

// Fermer le modal du panier
function fermerPanier() {
    const modalPanier = document.getElementById('modalPanier');
    if (modalPanier) {
        modalPanier.style.display = 'none';
    }
}

// Ouvrir la page de checkout
function allerAuCheckout() {
    if (panier.length === 0) {
        afficherNotification('Votre panier est vide!');
        return;
    }
    
    fermerPanier();
    const modalCheckout = document.getElementById('modalCheckout');
    if (modalCheckout) {
        modalCheckout.style.display = 'flex';
        afficherRecapitulatifCommande();
    }
}

// Afficher le récapitulatif de la commande
function afficherRecapitulatifCommande() {
    const recapitulatif = document.getElementById('recapitulatifCommande');
    if (!recapitulatif) return;
    
    const { sousTotal, taxes, total } = calculerTotal();
    
    recapitulatif.innerHTML = `
        <h3>Récapitulatif de la commande</h3>
        ${panier.map(item => `
            <div class="ligne-recapitulatif">
                <span>${item.titre} (x${item.quantite})</span>
                <span>${(item.prix * item.quantite).toFixed(2)}$</span>
            </div>
        `).join('')}
        <hr>
        <div class="ligne-recapitulatif">
            <span>Sous-total:</span>
            <span>${sousTotal.toFixed(2)}$</span>
        </div>
        <div class="ligne-recapitulatif">
            <span>Taxes (15%):</span>
            <span>${taxes.toFixed(2)}$</span>
        </div>
        <div class="ligne-recapitulatif total-commande">
            <span><strong>Total:</strong></span>
            <span><strong>${total.toFixed(2)}$</strong></span>
        </div>
    `;
}

// Fermer le modal de checkout
function fermerCheckout() {
    const modalCheckout = document.getElementById('modalCheckout');
    if (modalCheckout) {
        modalCheckout.style.display = 'none';
    }
}

// Traiter la commande
function traiterCommande(event) {
    event.preventDefault();
    
    const formulaire = event.target;
    const donneesFormulaire = new FormData(formulaire);
    const donnees = Object.fromEntries(donneesFormulaire);
    
    // Validation
    if (!validerEmail(donnees.email)) {
        afficherNotification('Veuillez entrer une adresse courriel valide', 'erreur');
        return;
    }
    
    if (!validerTelephone(donnees.telephone)) {
        afficherNotification('Veuillez entrer un numéro de téléphone valide', 'erreur');
        return;
    }
    
    // Simuler le traitement de la commande
    const { total } = calculerTotal();
    
    console.log('Commande traitée:', {
        client: donnees,
        articles: panier,
        total: total
    });
    
    // Afficher la confirmation
    afficherConfirmationCommande(donnees, total);
    
    // Vider le panier
    panier = [];
    sauvegarderPanier();
    mettreAJourCompteurPanier();
    
    // Réinitialiser le formulaire
    formulaire.reset();
}

// Afficher la confirmation de commande
function afficherConfirmationCommande(donnees, total) {
    fermerCheckout();
    
    const modal = document.createElement('div');
    modal.className = 'modal-confirmation';
    modal.innerHTML = `
        <div class="contenu-modal-confirmation">
            <div class="icone-succes">✓</div>
            <h2>Commande confirmée!</h2>
            <p>Merci ${donnees.prenom} pour votre achat!</p>
            <p>Un courriel de confirmation a été envoyé à <strong>${donnees.email}</strong></p>
            <p>Montant total: <strong>${total.toFixed(2)}$</strong></p>
            <p>Numéro de commande: <strong>#${Date.now()}</strong></p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn-fermer-confirmation">Fermer</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Basculer les favoris
function basculerFavori(bouton) {
    bouton.style.color = bouton.style.color === 'red' ? '#6b7280' : 'red';
}

// Afficher une notification
function afficherNotification(message, type = 'succes') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('afficher');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('afficher');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Faire défiler vers une section
function faireDefilerVers(idSection) {
    const section = document.getElementById(idSection);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Validation des formulaires
function validerEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validerTelephone(telephone) {
    const regex = /^[0-9\s\-\+\(\)]{10,}$/;
    return regex.test(telephone);
}

// Gestion du formulaire de réparation
function gererFormulaireReparation(event) {
    event.preventDefault();
    
    const formulaire = event.target;
    const donneesFormulaire = new FormData(formulaire);
    const donnees = Object.fromEntries(donneesFormulaire);
    
    console.log('Demande de réparation soumise:', donnees);
    
    afficherNotification('Merci! Votre demande de réparation a été reçue. Vous recevrez une confirmation par courriel dans les 24h.');
    
    formulaire.reset();
}

// Gestion du formulaire de don
function gererFormulaireDon(event) {
    event.preventDefault();
    
    const formulaire = event.target;
    const donneesFormulaire = new FormData(formulaire);
    const donnees = Object.fromEntries(donneesFormulaire);
    
    console.log('Don soumis:', donnees);
    
    afficherNotification('Merci pour votre générosité! Nous vous contacterons très bientôt pour organiser la collecte.');
    
    formulaire.reset();
}

// Basculer le menu mobile
function basculerMenuMobile() {
    const menuNav = document.querySelector('.menu-nav');
    if (menuNav) {
        menuNav.style.display = menuNav.style.display === 'none' ? 'flex' : 'none';
    }
}

// Rechercher des produits
function rechercherProduits(requete) {
    const produitsFiltres = produits.filter(p => 
        p.titre.toLowerCase().includes(requete.toLowerCase()) ||
        p.description.toLowerCase().includes(requete.toLowerCase())
    );
    return produitsFiltres;
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Charger le panier
    chargerPanier();
    
    // Initialiser les produits
    initialiserProduits();
    
    // Gestionnaires d'événements pour les liens de navigation
    document.querySelectorAll('.lien-nav').forEach(lien => {
        lien.addEventListener('click', function() {
            document.querySelectorAll('.lien-nav').forEach(l => l.style.borderBottom = 'none');
            this.style.borderBottom = '2px solid var(--couleur-primaire)';
        });
    });
    
    // Défilement fluide pour tous les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(ancre => {
        ancre.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#' && document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                faireDefilerVers(this.getAttribute('href').substring(1));
            }
        });
    });
    
    // Formulaire de réparation
    const formulaireReparation = document.getElementById('formulaireReparation');
    if (formulaireReparation) {
        formulaireReparation.addEventListener('submit', gererFormulaireReparation);
    }
    
    // Formulaire de don
    const formulaireDon = document.getElementById('formulaireDon');
    if (formulaireDon) {
        formulaireDon.addEventListener('submit', gererFormulaireDon);
    }
    
    // Formulaire de checkout
    const formulaireCheckout = document.getElementById('formulaireCheckout');
    if (formulaireCheckout) {
        formulaireCheckout.addEventListener('submit', traiterCommande);
    }
    
    // Fermer les modaux en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        const modalPanier = document.getElementById('modalPanier');
        const modalCheckout = document.getElementById('modalCheckout');
        
        if (event.target === modalPanier) {
            fermerPanier();
        }
        if (event.target === modalCheckout) {
            fermerCheckout();
        }
    });
});

// Observer d'intersection pour les animations
const optionsObservateur = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observateur = new IntersectionObserver(function(entrees) {
    entrees.forEach(entree => {
        if (entree.isIntersecting) {
            entree.target.style.opacity = '1';
            entree.target.style.transform = 'translateY(0)';
        }
    });
}, optionsObservateur);

// Observer les cartes pour les animations
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.carte-service, .carte-produit, .carte-temoignage').forEach(carte => {
        carte.style.opacity = '0';
        carte.style.transform = 'translateY(20px)';
        carte.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observateur.observe(carte);
    });
});

// Gestion responsive du menu
window.addEventListener('resize', function() {
    const menuNav = document.querySelector('.menu-nav');
    if (menuNav && window.innerWidth > 768) {
        menuNav.style.display = 'flex';
    }
});

// Animation parallax au défilement
window.addEventListener('scroll', function() {
    const defilementY = window.scrollY;
    const elementsParallax = document.querySelectorAll('.image-hero img');
    
    elementsParallax.forEach(el => {
        el.style.transform = `translateY(${defilementY * 0.5}px)`;
    });
});