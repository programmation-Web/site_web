/* ========================================
   BOUTIQUE.JS - EcoRevive
   ======================================== */

// ========== DONNÉES DES PRODUITS ==========
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
        image: "images/veste-femme.png"
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
        image: "images/rayon-homme.png"
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
        image: "images/ensemble-enfant.png"
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
        image: "images/botte-hivers.png"
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
        image: "images/rayon-femme-hivers.png"
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
        image: "images/rayon-ete-vintage.jpg"
    },
    {
        id: 7,
        titre: "Machine à coudre",
        prix: 45,
        prixOriginal: 50,
        taille: "Unique",
        description: "Machine à coudre fonctionnelle",
        qualite: "Excellent",
        rabais: 10,
        image: "images/machine-coudre.png"
    },
    {
        id: 8,
        titre: "Casquette homme",
        prix: 25,
        prixOriginal: 10,
        taille: "Unique",
        description: "Casquette pour hommes",
        qualite: "Excellent",
        rabais: 10,
        image: "images/casquette.png"
    },
    {
        id: 9,
        titre: "Lit enfant",
        prix: 100,
        prixOriginal: 150,
        taille: "Simple",
        description: "quantite limitée",
        qualite: "Excellent",
        rabais: 30,
        image: "images/lit-enfant.png"
    },
    {
        id: 10,
        titre: "Chaussure ete",
        prix: 12,
        prixOriginal: 45,
        taille: "44",
        description: "Couleurs vives et matières confortables...",
        qualite: "Très bon",
        rabais: 73,
        image: "images/tenis-ete.png"
    }
];

// ========== GESTION DU PANIER ==========
let panier = [];

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

// ========== AFFICHAGE DES PRODUITS ==========
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
        <div class="image-produit" onclick="agrandirImage(this)">
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

// ========== GESTION DU PANIER ==========
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

function retirerDuPanier(idProduit) {
    panier = panier.filter(item => item.id !== idProduit);
    sauvegarderPanier();
    mettreAJourCompteurPanier();
    afficherContenuPanier();
    calculerTotal();
}

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

function mettreAJourCompteurPanier() {
    const nombreArticlesPanier = panier.reduce((total, item) => total + item.quantite, 0);

    const compteurElements = document.querySelectorAll('.compteur-panier');
    compteurElements.forEach(element => {
        element.textContent = nombreArticlesPanier;
        element.style.display = nombreArticlesPanier > 0 ? 'flex' : 'none';
    });
}

// ========== AFFICHAGE DU PANIER ==========
function afficherContenuPanier() {
    const conteneurPanier = document.getElementById('contenuPanier');
    if (!conteneurPanier) return;

    if (panier.length === 0) {
        conteneurPanier.innerHTML = '<div class="panier-vide"><p>Votre panier est vide</p></div>';
        return;
    }

    conteneurPanier.innerHTML = panier.map(item => `
        <div class="article-panier">
            <div class="image-article-panier">
                <img src="${item.image}" alt="${item.titre}">
            </div>
            <div class="info-article-panier">
                <div class="titre-article-panier">${item.titre}</div>
                <div>Taille: ${item.taille}</div>
                <div class="prix-article-panier">${item.prix}$</div>
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

function calculerTotal() {
    const sousTotal = panier.reduce((total, item) => total + (item.prix * item.quantite), 0);
    const taxes = sousTotal * 0.15; // 15% de taxes
    const total = sousTotal + taxes;

    const totalPanier = document.getElementById('totalPanier');
    if (totalPanier) {
        totalPanier.innerHTML = `
            <div class="ligne-total">
                <span>Sous-total:</span>
                <span id="sousTotal">${sousTotal.toFixed(2)}$</span>
            </div>
            <div class="ligne-total">
                <span>Taxes (15%):</span>
                <span id="taxes">${taxes.toFixed(2)}$</span>
            </div>
            <div class="ligne-total total-final">
                <span>Total:</span>
                <span id="total">${total.toFixed(2)}$</span>
            </div>
        `;
    }

    return { sousTotal, taxes, total };
}

// ========== MODALS ==========
function ouvrirPanier() {
    const modal = document.getElementById('modalPanier');
    if (modal) {
        afficherContenuPanier();
        calculerTotal();
        modal.classList.add('actif');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function fermerPanier() {
    const modal = document.getElementById('modalPanier');
    if (modal) {
        modal.classList.remove('actif');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function allerAuCheckout() {
    if (panier.length === 0) {
        afficherNotification('Votre panier est vide!', 'erreur');
        return;
    }

    fermerPanier();
    const modalCheckout = document.getElementById('modalCheckout');
    if (modalCheckout) {
        modalCheckout.classList.add('actif');
        modalCheckout.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        afficherRecapitulatifCheckout();
    }
}

function fermerCheckout() {
    const modal = document.getElementById('modalCheckout');
    if (modal) {
        modal.classList.remove('actif');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ========== CHECKOUT ==========
function afficherRecapitulatifCheckout() {
    const recapitulatif = document.getElementById('recapitulatifCommande');
    if (!recapitulatif) return;

    const { sousTotal, taxes, total } = calculerTotal();

    recapitulatif.innerHTML = `
        <h3>Récapitulatif de la commande</h3>
        <div class="liste-articles-checkout">
            ${panier.map(item => `
                <div class="article-checkout">
                    <div class="info-article-checkout">
                        <span>${item.titre}</span>
                        <span>x${item.quantite}</span>
                    </div>
                    <span>${(item.prix * item.quantite).toFixed(2)}$</span>
                </div>
            `).join('')}
        </div>
        <div class="totaux-checkout">
            <div class="ligne-total">
                <span>Sous-total:</span>
                <span>${sousTotal.toFixed(2)}$</span>
            </div>
            <div class="ligne-total">
                <span>Taxes (15%):</span>
                <span>${taxes.toFixed(2)}$</span>
            </div>
            <div class="ligne-total total-commande">
                <span>Total:</span>
                <span>${total.toFixed(2)}$</span>
            </div>
        </div>
    `;
}

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

    const { total } = calculerTotal();

    console.log('Commande traitée:', {
        client: donnees,
        articles: panier,
        total: total
    });

    afficherConfirmationCommande(donnees, total);

    // Vider le panier
    panier = [];
    sauvegarderPanier();
    mettreAJourCompteurPanier();

    formulaire.reset();
}

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

// ========== UTILITAIRES ==========
function agrandirImage(element) {
    const img = element.querySelector('img');
    if (!img) return;

    // Vérifier si un modal d'image existe déjà
    let modalImage = document.getElementById('modalImage');

    if (modalImage) {
        // Fermer le modal existant
        fermerModalImage();
        return;
    }

    // Créer le modal pour l'image
    modalImage = document.createElement('div');
    modalImage.id = 'modalImage';
    modalImage.className = 'modal-image';
    modalImage.innerHTML = `
        <div class="modal-image-contenu">
            <button class="btn-fermer-image" onclick="fermerModalImage()">×</button>
            <img src="${img.src}" alt="${img.alt}">
        </div>
    `;

    document.body.appendChild(modalImage);
    document.body.style.overflow = 'hidden';

    // Ajouter animation d'entrée
    setTimeout(() => {
        modalImage.style.opacity = '1';
    }, 10);

    // Fermer en cliquant sur le fond
    modalImage.addEventListener('click', function (e) {
        if (e.target === modalImage) {
            fermerModalImage();
        }
    });
}

function fermerModalImage() {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.style.opacity = '0';
        setTimeout(() => {
            modalImage.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function basculerFavori(bouton) {
    bouton.style.color = bouton.style.color === 'red' ? '#6b7280' : 'red';
}

function afficherNotification(message, type = 'succes') {
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'erreur' ? 'notification-erreur' : ''}`;
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

function basculerMenuMobile() {
    const menuNav = document.querySelector('.menu-nav');
    if (menuNav) {
        menuNav.style.display = menuNav.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Validation
function validerEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validerTelephone(telephone) {
    const regex = /^[0-9\s\-\+\(\)]{10,}$/;
    return regex.test(telephone);
}

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', function () {
    // Charger le panier
    chargerPanier();

    // Initialiser les produits
    initialiserProduits();

    // Formulaire de checkout
    const formulaireCheckout = document.getElementById('formulaireCheckout');
    if (formulaireCheckout) {
        formulaireCheckout.addEventListener('submit', traiterCommande);
    }

    // Fermer les modaux en cliquant à l'extérieur
    window.addEventListener('click', function (event) {
        const modalPanier = document.getElementById('modalPanier');
        const modalCheckout = document.getElementById('modalCheckout');

        if (event.target === modalPanier) {
            fermerPanier();
        }
        if (event.target === modalCheckout) {
            fermerCheckout();
        }
    });

    // Fermer le modal d'image avec la touche Échap
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            fermerModalImage();
        }
    });

    // Observer pour animations
    const observateur = new IntersectionObserver(function (entrees) {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.style.opacity = '1';
                entree.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observer les cartes pour les animations
    document.querySelectorAll('.carte-produit').forEach(carte => {
        carte.style.opacity = '0';
        carte.style.transform = 'translateY(20px)';
        carte.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observateur.observe(carte);
    });
});

// Gestion responsive du menu
window.addEventListener('resize', function () {
    const menuNav = document.querySelector('.menu-nav');
    if (menuNav && window.innerWidth > 768) {
        menuNav.style.display = 'flex';
    }
});