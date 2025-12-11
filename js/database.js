/* ========================================
   OPÉRATIONS DE BASE DE DONNÉES - EcoRevive
   ======================================== */

// ========== SOUMETTRE UNE DEMANDE DE RÉPARATION ==========
async function submitReparation(formData) {
    try {
        // Vérifier que l'utilisateur est connecté
        const user = await getCurrentUser();
        if (!user) {
            throw new Error('Vous devez être connecté pour soumettre une demande de réparation');
        }
        
        // Préparer les données
        const reparationData = {
            idUser: user.id,
            typeObjet: formData.typeObjet,
            descProbleme: formData.description,
            niveauUrgence: formData.urgence,
            lieuRep: formData.lieu,
            date_heure: `${formData.date}T${formData.heure}:00`,
            photoObjet: formData.photos || null // JSON array si photos uploadées
        };
        
        // Insérer dans la base de données
        const { data, error } = await supabaseClient
            .from('reparation')
            .insert([reparationData])
            .select();
        
        if (error) throw error;
        
        console.log('✅ Réparation créée:', data);
        return { success: true, data: data[0] };
        
    } catch (error) {
        console.error('❌ Erreur lors de la soumission de réparation:', error);
        return { success: false, error: error.message };
    }
}

// ========== SOUMETTRE UN DON ==========
async function submitDon(formData) {
    try {
        // Vérifier que l'utilisateur est connecté
        const user = await getCurrentUser();
        if (!user) {
            throw new Error('Vous devez être connecté pour faire un don');
        }
        
        // Préparer les données du don
        const donData = {
            idUser: user.id,
            catObjet: formData.categorie || 'Vêtements',
            etatObjet: formData.etat || 'Bon état',
            qteObjet: parseInt(formData.quantite) || 1,
            valeurEstime: parseFloat(formData.valeurEstimee) || null,
            lieuCollecte: formData.lieuCollecte,
            dateCollecte: formData.dateCollecte ? new Date(formData.dateCollecte).toISOString() : null
        };
        
        // Insérer dans la base de données
        const { data, error } = await supabaseClient
            .from('don')
            .insert([donData])
            .select();
        
        if (error) throw error;
        
        console.log('✅ Don créé:', data);
        return { success: true, data: data[0] };
        
    } catch (error) {
        console.error('❌ Erreur lors de la soumission du don:', error);
        return { success: false, error: error.message };
    }
}

// ========== CRÉER UN ARTICLE ==========
async function createArticle(articleData) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error('Vous devez être connecté pour créer un article');
        }
        
        const newArticle = {
            catArticle: articleData.categorie,
            prix: parseFloat(articleData.prix),
            taille: articleData.taille || null
        };
        
        const { data, error } = await supabaseClient
            .from('article')
            .insert([newArticle])
            .select();
        
        if (error) throw error;
        
        console.log('✅ Article créé:', data);
        return { success: true, data: data[0] };
        
    } catch (error) {
        console.error('❌ Erreur création article:', error);
        return { success: false, error: error.message };
    }
}

// ========== CRÉER UNE COMMANDE ==========
async function createCommande(commandeData) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error('Vous devez être connecté pour passer une commande');
        }
        
        // Créer la commande
        const { data: commande, error: commandeError } = await supabaseClient
            .from('commande')
            .insert([
                {
                    idUser: user.id,
                    modePaiement: commandeData.modePaiement || 'carte'
                }
            ])
            .select();
        
        if (commandeError) throw commandeError;
        
        const idCommande = commande[0].idCommande;
        
        // Créer les articles de la commande
        const articlesCommande = commandeData.articles.map(article => ({
            idCommande: idCommande,
            idArticle: article.idArticle,
            qte: article.quantite
        }));
        
        const { data: articles, error: articlesError } = await supabaseClient
            .from('articleCommande')
            .insert(articlesCommande)
            .select();
        
        if (articlesError) throw articlesError;
        
        console.log('✅ Commande créée:', { commande: commande[0], articles });
        return { success: true, data: { commande: commande[0], articles } };
        
    } catch (error) {
        console.error('❌ Erreur création commande:', error);
        return { success: false, error: error.message };
    }
}

// ========== RÉCUPÉRER LES RÉPARATIONS D'UN UTILISATEUR ==========
async function getUserReparations() {
    try {
        const user = await getCurrentUser();
        if (!user) return { success: false, error: 'Non connecté' };
        
        const { data, error } = await supabaseClient
            .from('reparation')
            .select('*')
            .eq('idUser', user.id)
            .order('date_heure', { ascending: false });
        
        if (error) throw error;
        
        return { success: true, data };
        
    } catch (error) {
        console.error('❌ Erreur récupération réparations:', error);
        return { success: false, error: error.message };
    }
}

// ========== RÉCUPÉRER LES DONS D'UN UTILISATEUR ==========
async function getUserDons() {
    try {
        const user = await getCurrentUser();
        if (!user) return { success: false, error: 'Non connecté' };
        
        const { data, error } = await supabaseClient
            .from('don')
            .select('*')
            .eq('idUser', user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        return { success: true, data };
        
    } catch (error) {
        console.error('❌ Erreur récupération dons:', error);
        return { success: false, error: error.message };
    }
}

// ========== RÉCUPÉRER LES COMMANDES D'UN UTILISATEUR ==========
async function getUserCommandes() {
    try {
        const user = await getCurrentUser();
        if (!user) return { success: false, error: 'Non connecté' };
        
        const { data, error } = await supabaseClient
            .from('commande')
            .select(`
                *,
                articleCommande (
                    *,
                    article (*)
                )
            `)
            .eq('idUser', user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        return { success: true, data };
        
    } catch (error) {
        console.error('❌ Erreur récupération commandes:', error);
        return { success: false, error: error.message };
    }
}

// ========== RÉCUPÉRER TOUS LES ARTICLES DISPONIBLES ==========
async function getAvailableArticles(filters = {}) {
    try {
        let query = supabaseClient
            .from('article')
            .select('*');
        
        // Appliquer les filtres si fournis
        if (filters.categorie) {
            query = query.eq('catArticle', filters.categorie);
        }
        
        if (filters.tailleMin) {
            query = query.gte('taille', filters.tailleMin);
        }
        
        if (filters.prixMax) {
            query = query.lte('prix', filters.prixMax);
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        
        return { success: true, data };
        
    } catch (error) {
        console.error('❌ Erreur récupération articles:', error);
        return { success: false, error: error.message };
    }
}

// ========== UPLOAD D'IMAGE VERS SUPABASE STORAGE ==========
async function uploadImage(file, bucket = 'images') {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error('Vous devez être connecté pour uploader une image');
        }
        
        // Créer un nom de fichier unique
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        // Upload vers Supabase Storage
        const { data, error } = await supabaseClient.storage
            .from(bucket)
            .upload(fileName, file);
        
        if (error) throw error;
        
        // Obtenir l'URL publique
        const { data: urlData } = supabaseClient.storage
            .from(bucket)
            .getPublicUrl(fileName);
        
        console.log('✅ Image uploadée:', urlData.publicUrl);
        return { success: true, url: urlData.publicUrl, path: fileName };
        
    } catch (error) {
        console.error('❌ Erreur upload image:', error);
        return { success: false, error: error.message };
    }
}

// ========== METTRE À JOUR LE PROFIL UTILISATEUR ==========
async function updateUserProfile(updates) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error('Vous devez être connecté pour modifier votre profil');
        }
        
        const { data, error } = await supabaseClient
            .from('userAccount')
            .update(updates)
            .eq('idUser', user.id)
            .select();
        
        if (error) throw error;
        
        console.log('✅ Profil mis à jour:', data);
        return { success: true, data: data[0] };
        
    } catch (error) {
        console.error('❌ Erreur mise à jour profil:', error);
        return { success: false, error: error.message };
    }
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        submitReparation,
        submitDon,
        createArticle,
        createCommande,
        getUserReparations,
        getUserDons,
        getUserCommandes,
        getAvailableArticles,
        uploadImage,
        updateUserProfile
    };
}
