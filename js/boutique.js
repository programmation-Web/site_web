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
// ========== TRAITER LA COMMANDE AVEC SUPABASE ==========
async function traiterCommande(e) {
    e.preventDefault();

    const formulaire = e.target;

    // Collecter les données du formulaire
    const donnees = {
        prenom: formulaire.prenom.value,
        nom: formulaire.nom.value,
        email: formulaire.email.value,
        telephone: formulaire.telephone.value,
        adresse: formulaire.adresse.value,
        ville: formulaire.ville.value,
        province: formulaire.province.value,
        codePostal: formulaire.codePostal.value,
        modePaiement: formulaire.querySelector('input[name="modePaiement"]:checked').value
    };

    // Calculer le total
    const total = panier.reduce((acc, item) => acc + (item.prix * item.quantite), 0);

    // Désactiver le bouton de soumission
    const submitBtn = formulaire.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Traitement en cours...';
    submitBtn.disabled = true;

    try {
        console.log("=== DÉBUT TRAITEMENT COMMANDE ===");
        
        // Vérifier l'utilisateur
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            throw new Error("Vous devez être connecté pour passer une commande");
        }
        
        const user = session.user;
        const userId = user.id;
        
        console.log("✅ Utilisateur:", user.email);
        
        // Vérifier/créer userAccount
        let { data: userAccount } = await supabaseClient
            .from('userAccount')
            .select('*')
            .eq('idUser', userId)
            .maybeSingle();
        
        if (!userAccount) {
            console.log("⚠️ Création userAccount");
            const { data: newAccount } = await supabaseClient
                .from('userAccount')
                .insert([{
                    idUser: userId,
                    userName: user.email,
                    email: user.email,
                    firstName: donnees.prenom,
                    lastName: donnees.nom,
                    phone: donnees.telephone,
                    addresse: `${donnees.adresse}, ${donnees.ville}, ${donnees.province} ${donnees.codePostal}`
                }])
                .select()
                .single();
            userAccount = newAccount;
        }
        
        console.log("✅ UserAccount ID:", userAccount.idUser);
        
        // Créer la commande dans la table 'commande'
        const commandeData = {
            idUser: userAccount.idUser,
            modePaiement: donnees.modePaiement
        };
        
        console.log("📤 Création commande:", commandeData);
        
        const { data: commande, error: commandeError } = await supabaseClient
            .from('commande')
            .insert([commandeData])
            .select()
            .single();
        
        if (commandeError) {
            console.error("❌ Erreur commande:", commandeError);
            throw new Error("Erreur lors de la création de la commande: " + commandeError.message);
        }
        
        console.log("✅ Commande créée:", commande);
        
        const idCommande = commande.idCommande;
        
        // Pour chaque article du panier, créer un articleCommande
        // Note: Les articles du panier doivent d'abord exister dans la table 'article'
        // Pour ce démo, on va créer les articles puis les lier à la commande
        
        for (const item of panier) {
            // Vérifier si l'article existe déjà dans la BD
            let { data: existingArticle } = await supabaseClient
                .from('article')
                .select('idArticle')
                .eq('catArticle', 'Vêtement')  // Vous pouvez adapter selon vos catégories
                .eq('prix', item.prix)
                .eq('taille', item.taille || 'M')
                .maybeSingle();
            
            let idArticle;
            
            if (!existingArticle) {
                // Créer l'article dans la table 'article'
                const articleData = {
                    catArticle: 'Vêtement',  // À adapter selon votre logique
                    prix: parseFloat(item.prix),
                    taille: item.taille || 'M'
                };
                
                const { data: newArticle, error: articleError } = await supabaseClient
                    .from('article')
                    .insert([articleData])
                    .select()
                    .single();
                
                if (articleError) {
                    console.error("❌ Erreur création article:", articleError);
                    throw new Error("Erreur lors de la création de l'article");
                }
                
                idArticle = newArticle.idArticle;
                console.log("✅ Article créé:", idArticle);
            } else {
                idArticle = existingArticle.idArticle;
                console.log("✅ Article existant:", idArticle);
            }
            
            // Créer l'entrée dans articleCommande
            const articleCommandeData = {
                idCommande: idCommande,
                idArticle: idArticle,
                qte: item.quantite
            };
            
            const { error: acError } = await supabaseClient
                .from('articleCommande')
                .insert([articleCommandeData]);
            
            if (acError) {
                console.error("❌ Erreur articleCommande:", acError);
                throw new Error("Erreur lors de l'ajout de l'article à la commande");
            }
            
            console.log("✅ Article ajouté à la commande");
        }
        
        console.log("=== COMMANDE COMPLÈTE ===");
        
        // Afficher la confirmation
        afficherConfirmationCommande(donnees, total, idCommande);

        // Vider le panier
        panier = [];
        sauvegarderPanier();
        mettreAJourCompteurPanier();

        formulaire.reset();
        
    } catch (error) {
        console.error("=== ERREUR COMMANDE ===");
        console.error(error);
        
        alert(`❌ Erreur lors du traitement de la commande

${error.message}

Veuillez réessayer ou nous contacter si le problème persiste.`);
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function afficherConfirmationCommande(donnees, total, idCommande) {
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
            <p>Numéro de commande: <strong>#${idCommande}</strong></p>
            <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; font-size: 0.9rem; color: #1e40af;">
                    🎉 Votre commande a été enregistrée avec succès dans notre système!
                </p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="btn-fermer-confirmation">Fermer</button>
        </div>
    `;
    
    // Styles pour le modal
    const style = document.createElement('style');
    style.textContent = `
        .modal-confirmation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .contenu-modal-confirmation {
            background: white;
            padding: 40px;
            border-radius: 16px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .icone-succes {
            width: 80px;
            height: 80px;
            background: #10b981;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            margin: 0 auto 20px;
        }
        .contenu-modal-confirmation h2 {
            color: #1f2937;
            margin-bottom: 15px;
        }
        .contenu-modal-confirmation p {
            color: #6b7280;
            margin: 10px 0;
        }
        .btn-fermer-confirmation {
            margin-top: 20px;
            padding: 12px 32px;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-fermer-confirmation:hover {
            background: #059669;
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

console.log("✅ Fonction traiterCommande() avec Supabase chargée");

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

async function passerCommande(panier) {
    // Vérifier que l'utilisateur est connecté
    const user = await getCurrentUser();
    
    if (!user) {
        // Afficher le modal de connexion
        showAuthModal('login');
        return;
    }
    
    // Préparer les données de la commande
    const commandeData = {
        modePaiement: 'carte', // ou récupérer du formulaire
        articles: panier.map(item => ({
            idArticle: item.idArticle,
            quantite: item.quantite
        }))
    };
    
    // Créer la commande
    const result = await createCommande(commandeData);
    
    if (result.success) {
        alert('✅ Commande passée avec succès!');
        // Vider le panier
        // Rediriger vers page de confirmation
    } else {
        alert(`❌ Erreur: ${result.error}`);
    }
}