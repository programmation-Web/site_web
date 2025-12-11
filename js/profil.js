/* ========================================
   PROFIL.JS - Gestion du profil utilisateur
   ======================================== */

let currentUserData = null;

document.addEventListener('DOMContentLoaded', async function() {
    console.log("👤 profil.js chargé");
    
    // Vérifier l'authentification
    await checkAuthentication();
    
    // Charger les données
    await loadUserProfile();
    
    // Initialiser les onglets
    initTabs();
    
    // Gérer les paramètres URL
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab) {
        const tabBtn = document.querySelector(`[data-tab="${tab}"]`);
        if (tabBtn) {
            tabBtn.click();
        }
    }
    
    // Charger les statistiques et données
    await loadAllData();
});

/* ========================================
   VÉRIFIER L'AUTHENTIFICATION
   ======================================== */
async function checkAuthentication() {
    const user = await getCurrentUser();
    
    if (!user) {
        alert("Vous devez être connecté pour accéder à votre profil");
        window.location.href = 'index.html';
        return;
    }
    
    console.log("✅ Utilisateur connecté:", user.email);
}

/* ========================================
   CHARGER LE PROFIL UTILISATEUR
   ======================================== */
async function loadUserProfile() {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) return;
        
        const user = session.user;
        
        // Récupérer les données du profil
        let { data: userAccount } = await supabaseClient
            .from('userAccount')
            .select('*')
            .eq('idUser', user.id)
            .maybeSingle();
        
        if (!userAccount) {
            // Créer le profil s'il n'existe pas
            const { data: newAccount } = await supabaseClient
                .from('userAccount')
                .insert([{
                    idUser: user.id,
                    userName: user.email,
                    email: user.email,
                    firstName: user.user_metadata?.firstName || user.email.split('@')[0],
                    lastName: user.user_metadata?.lastName || ''
                }])
                .select()
                .single();
            userAccount = newAccount;
        }
        
        currentUserData = userAccount;
        
        // Afficher les données
        displayUserInfo(userAccount);
        
    } catch (error) {
        console.error("❌ Erreur chargement profil:", error);
    }
}

function displayUserInfo(user) {
    // Hero section
    document.getElementById('userName').textContent = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Utilisateur';
    document.getElementById('userEmail').textContent = user.email || '';
    
    // Informations détaillées
    document.getElementById('profileFirstName').textContent = user.firstName || '-';
    document.getElementById('profileLastName').textContent = user.lastName || '-';
    document.getElementById('profileEmail').textContent = user.email || '-';
    document.getElementById('profilePhone').textContent = user.phone || '-';
    document.getElementById('profileAddress').textContent = user.addresse || '-';
}

/* ========================================
   INITIALISER LES ONGLETS
   ======================================== */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Retirer les classes active
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Ajouter la classe active
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Charger les données de l'onglet si nécessaire
            if (targetTab === 'reparations' && !document.getElementById('reparationsList').dataset.loaded) {
                loadReparations();
            } else if (targetTab === 'commandes' && !document.getElementById('commandesList').dataset.loaded) {
                loadCommandes();
            } else if (targetTab === 'dons' && !document.getElementById('donsList').dataset.loaded) {
                loadDons();
            }
        });
    });
}

/* ========================================
   CHARGER TOUTES LES DONNÉES
   ======================================== */
async function loadAllData() {
    await Promise.all([
        loadReparations(),
        loadCommandes(),
        loadDons()
    ]);
    
    updateStatistics();
}

/* ========================================
   UTILITAIRE: Formater UUID
   ======================================== */
function formatId(id) {
    if (!id) return 'N/A';
    const idStr = String(id);
    return idStr.slice(0, 8);
}

/* ========================================
   CHARGER LES RÉPARATIONS
   ======================================== */
async function loadReparations() {
    const container = document.getElementById('reparationsList');
    container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Chargement...</p></div>';
    
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) return;
        
        const { data: reparations, error } = await supabaseClient
            .from('reparation')
            .select('*')
            .eq('idUser', session.user.id)
            .order('date_heure', { ascending: false });
        
        if (error) throw error;
        
        container.dataset.loaded = 'true';
        
        if (!reparations || reparations.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3>Aucune réparation</h3>
                    <p>Vous n'avez pas encore demandé de réparation</p>
                    <a href="reparation.html" class="btn-add">
                        <i class="fas fa-plus"></i>
                        Demander une réparation
                    </a>
                </div>
            `;
            document.getElementById('repairsBadge').textContent = '0';
            return;
        }
        
        // Afficher les réparations
        container.innerHTML = reparations.map(rep => createReparationCard(rep)).join('');
        
        // Mettre à jour le badge
        document.getElementById('repairsBadge').textContent = reparations.length;
        document.getElementById('totalRepairs').textContent = reparations.length;
        
    } catch (error) {
        console.error("❌ Erreur chargement réparations:", error);
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Erreur de chargement</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function createReparationCard(rep) {
    const date = new Date(rep.date_heure);
    const formattedDate = date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('fr-CA', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const status = rep.statut || 'En attente';
    const statusClass = status === 'Terminé' ? 'status-completed' : 
                       status === 'En cours' ? 'status-confirmed' : 'status-pending';
    
    return `
        <div class="item-card">
            <div class="item-header">
                <div class="item-title">
                    <h3>${rep.typeObjet}</h3>
                    <span class="item-id">Réparation #${formatId(rep.idReparation)}</span>
                </div>
                <span class="item-status ${statusClass}">
                    <i class="fas fa-circle"></i>
                    ${status}
                </span>
            </div>
            <div class="item-details">
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <div class="detail-content">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">${formattedDate}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <div class="detail-content">
                        <div class="detail-label">Heure</div>
                        <div class="detail-value">${formattedTime}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="detail-content">
                        <div class="detail-label">Urgence</div>
                        <div class="detail-value">${rep.niveauUrgence}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="detail-content">
                        <div class="detail-label">Lieu</div>
                        <div class="detail-value">${rep.lieuRep === 'atelier' ? 'En atelier' : 'À domicile'}</div>
                    </div>
                </div>
            </div>
            ${rep.descProbleme ? `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
                    <div class="detail-label">Description</div>
                    <p style="margin: 8px 0 0 0; color: var(--text-dark);">${rep.descProbleme}</p>
                </div>
            ` : ''}
        </div>
    `;
}

/* ========================================
   CHARGER LES COMMANDES
   ======================================== */
async function loadCommandes() {
    const container = document.getElementById('commandesList');
    container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Chargement...</p></div>';
    
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) return;
        
        const { data: commandes, error } = await supabaseClient
            .from('commande')
            .select(`
                *,
                articleCommande (
                    qte,
                    article (
                        catArticle,
                        prix,
                        taille
                    )
                )
            `)
            .eq('idUser', session.user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        container.dataset.loaded = 'true';
        
        if (!commandes || commandes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <h3>Aucune commande</h3>
                    <p>Vous n'avez pas encore passé de commande</p>
                    <a href="boutique.html" class="btn-add">
                        <i class="fas fa-plus"></i>
                        Commander maintenant
                    </a>
                </div>
            `;
            document.getElementById('ordersBadge').textContent = '0';
            return;
        }
        
        // Afficher les commandes
        container.innerHTML = commandes.map(cmd => createCommandeCard(cmd)).join('');
        
        // Mettre à jour le badge
        document.getElementById('ordersBadge').textContent = commandes.length;
        document.getElementById('totalOrders').textContent = commandes.length;
        
    } catch (error) {
        console.error("❌ Erreur chargement commandes:", error);
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Erreur de chargement</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function createCommandeCard(cmd) {
    const date = new Date(cmd.created_at);
    const formattedDate = date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Calculer le nombre d'articles et le total
    const totalArticles = cmd.articleCommande?.reduce((sum, ac) => sum + (ac.qte || 0), 0) || 0;
    const totalPrix = cmd.articleCommande?.reduce((sum, ac) => {
        return sum + ((ac.article?.prix || 0) * (ac.qte || 1));
    }, 0) || 0;
    
    return `
        <div class="item-card">
            <div class="item-header">
                <div class="item-title">
                    <h3>Commande #${formatId(cmd.idCommande)}</h3>
                    <span class="item-id">${formattedDate}</span>
                </div>
                <span class="item-status status-confirmed">
                    <i class="fas fa-check-circle"></i>
                    Confirmée
                </span>
            </div>
            <div class="item-details">
                <div class="detail-item">
                    <i class="fas fa-box"></i>
                    <div class="detail-content">
                        <div class="detail-label">Articles</div>
                        <div class="detail-value">${totalArticles} article${totalArticles > 1 ? 's' : ''}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <div class="detail-content">
                        <div class="detail-label">Total</div>
                        <div class="detail-value">${totalPrix.toFixed(2)} $</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-credit-card"></i>
                    <div class="detail-content">
                        <div class="detail-label">Paiement</div>
                        <div class="detail-value">${cmd.modePaiement || 'Carte'}</div>
                    </div>
                </div>
            </div>
            ${cmd.articleCommande && cmd.articleCommande.length > 0 ? `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
                    <div class="detail-label" style="margin-bottom: 10px;">Détails des articles</div>
                    ${cmd.articleCommande.map(ac => `
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 0.9rem;">
                            <span>${ac.article?.catArticle || 'Article'} (${ac.article?.taille || 'N/A'})</span>
                            <span>Qté: ${ac.qte} × ${ac.article?.prix?.toFixed(2) || '0.00'} $ = ${((ac.article?.prix || 0) * ac.qte).toFixed(2)} $</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

/* ========================================
   CHARGER LES DONS
   ======================================== */
async function loadDons() {
    const container = document.getElementById('donsList');
    container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Chargement...</p></div>';
    
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) return;
        
        const { data: dons, error } = await supabaseClient
            .from('don')
            .select('*')
            .eq('idUser', session.user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        container.dataset.loaded = 'true';
        
        if (!dons || dons.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-gift"></i>
                    </div>
                    <h3>Aucun don</h3>
                    <p>Vous n'avez pas encore fait de don</p>
                    <a href="faire_un_don.html" class="btn-add">
                        <i class="fas fa-plus"></i>
                        Faire un don
                    </a>
                </div>
            `;
            document.getElementById('donsBadge').textContent = '0';
            return;
        }
        
        // Afficher les dons
        container.innerHTML = dons.map(don => createDonCard(don)).join('');
        
        // Mettre à jour le badge
        document.getElementById('donsBadge').textContent = dons.length;
        document.getElementById('totalDons').textContent = dons.length;
        
    } catch (error) {
        console.error("❌ Erreur chargement dons:", error);
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Erreur de chargement</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function createDonCard(don) {
    const date = don.dateCollecte ? new Date(don.dateCollecte) : new Date(don.created_at);
    const formattedDate = date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `
        <div class="item-card">
            <div class="item-header">
                <div class="item-title">
                    <h3>${don.catObjet}</h3>
                    <span class="item-id">Don #${formatId(don.idDon)}</span>
                </div>
                <span class="item-status status-completed">
                    <i class="fas fa-heart"></i>
                    Enregistré
                </span>
            </div>
            <div class="item-details">
                <div class="detail-item">
                    <i class="fas fa-box"></i>
                    <div class="detail-content">
                        <div class="detail-label">Quantité</div>
                        <div class="detail-value">${don.qteObjet} article${don.qteObjet > 1 ? 's' : ''}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-star"></i>
                    <div class="detail-content">
                        <div class="detail-label">État</div>
                        <div class="detail-value">${don.etatObjet}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <div class="detail-content">
                        <div class="detail-label">Valeur estimée</div>
                        <div class="detail-value">${don.valeurEstime?.toFixed(2) || '0.00'} $</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="detail-content">
                        <div class="detail-label">Collecte</div>
                        <div class="detail-value">${don.lieuCollecte || 'À définir'}</div>
                    </div>
                </div>
            </div>
            ${don.dateCollecte ? `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
                    <div class="detail-label">Date de collecte prévue</div>
                    <p style="margin: 8px 0 0 0; color: var(--text-dark);">${formattedDate}</p>
                </div>
            ` : ''}
        </div>
    `;
}

/* ========================================
   METTRE À JOUR LES STATISTIQUES
   ======================================== */
function updateStatistics() {
    // Calculer l'impact CO2 (estimation: 2.5 kg CO2 par article donné ou réparé)
    const totalRepairs = parseInt(document.getElementById('totalRepairs').textContent) || 0;
    const totalDons = parseInt(document.getElementById('totalDons').textContent) || 0;
    const impactCO2 = (totalRepairs + totalDons) * 2.5;
    
    document.getElementById('impactCO2').textContent = `${impactCO2.toFixed(1)} kg`;
}

/* ========================================
   ÉDITER LE PROFIL
   ======================================== */
document.addEventListener('click', function(e) {
    if (e.target.closest('#editProfileBtn')) {
        alert('Fonctionnalité d\'édition du profil à venir!\n\nVous pourrez bientôt modifier vos informations personnelles.');
    }
});

console.log("✅ profil.js corrigé chargé");