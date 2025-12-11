/* ========================================
   PAGE FAIRE UN DON - AVEC SUPABASE
   ======================================== */

let articleCount = 1;

document.addEventListener('DOMContentLoaded', function() {
    console.log("🎁 faire_un_don.js chargé");
    
    // Vérifier l'authentification
    checkUserAuthentication();
    
    // Initialiser
    initArticles();
    initCollectionMethod();
    initFormSubmission();
    initDateRestrictions();
});

/* ========================================
   VÉRIFIER L'AUTHENTIFICATION
   ======================================== */
async function checkUserAuthentication() {
    if (typeof getCurrentUser === 'undefined') {
        console.warn("⚠️ getCurrentUser non disponible");
        return;
    }
    
    const user = await getCurrentUser();
    
    if (!user) {
        if (confirm('Vous devez être connecté pour faire un don. Voulez-vous vous connecter maintenant?')) {
            showAuthModal('login');
        } else {
            window.location.href = 'index.html';
        }
    }
}

/* ========================================
   INITIALISER LES ARTICLES
   ======================================== */
function initArticles() {
    const addArticleBtn = document.getElementById('addArticleBtn');
    const articlesContainer = document.getElementById('articlesContainer');
    
    if (addArticleBtn) {
        addArticleBtn.addEventListener('click', function() {
            articleCount++;
            const newArticleHTML = createArticleForm(articleCount);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newArticleHTML;
            articlesContainer.appendChild(tempDiv.firstElementChild);
            
            setTimeout(() => {
                const newArticle = articlesContainer.lastElementChild;
                newArticle.classList.remove('new-article');
            }, 50);
        });
    }
    
    // Gestion upload photos
    document.addEventListener('change', function(e) {
        if (e.target.matches('input[type="file"][name="photos"]')) {
            handlePhotoUpload(e.target);
        }
    });
}

function createArticleForm(number) {
    return `
    <div class="article-form-container new-article" data-article="${number}">
        <form class="article-form">
            <div class="article-header">
                <span class="article-number">Article ${number}</span>
                <h2>Décrivez votre article</h2>
            </div>
            
            <div class="article-content">
                <div class="form-row">
                    <div class="form-group-half">
                        <label for="category-${number}" class="required-field">Catégorie</label>
                        <div class="select-wrapper">
                            <select id="category-${number}" name="category" required>
                                <option value="">Sélectionnez une catégorie</option>
                                <option value="Vêtements">Vêtements</option>
                                <option value="Chaussures">Chaussures</option>
                                <option value="Accessoires">Accessoires</option>
                                <option value="Textiles">Textiles de maison</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group-half">
                        <label for="condition-${number}" class="required-field">État</label>
                        <div class="select-wrapper">
                            <select id="condition-${number}" name="condition" required>
                                <option value="">État de l'article</option>
                                <option value="Neuf avec étiquette">Neuf avec étiquette</option>
                                <option value="Très bon état">Très bon état</option>
                                <option value="Bon état">Bon état</option>
                                <option value="État correct">État correct</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="separator"></div>
                
                <div class="form-group-full">
                    <label for="description-${number}">Description détaillée</label>
                    <textarea 
                        id="description-${number}" 
                        name="description" 
                        rows="3" 
                        placeholder="Décrivez votre article (couleur, matière, particularités...)"
                    ></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group-half">
                        <label for="quantity-${number}">Quantité</label>
                        <input type="number" id="quantity-${number}" name="quantity" min="1" value="1">
                    </div>
                    <div class="form-group-half">
                        <label for="estimated-value-${number}">Valeur estimée (CAD)</label>
                        <input type="number" id="estimated-value-${number}" name="estimated-value" min="0" step="0.01" placeholder="Ex: 25">
                    </div>
                </div>
            </div>
            
            ${number > 1 ? `
            <button type="button" class="remove-article-btn" onclick="removeArticle(${number})">
                🗑️ Supprimer cet article
            </button>
            ` : ''}
        </form>
    </div>
    `;
}

function handlePhotoUpload(input) {
    const files = input.files;
    const articleNumber = input.id.split('-')[1];
    const previewContainer = document.getElementById(`preview-${articleNumber}`);
    
    if (!previewContainer) return;
    
    previewContainer.innerHTML = '';
    
    Array.from(files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const photoPreview = document.createElement('div');
                photoPreview.className = 'photo-preview-item';
                photoPreview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview ${index + 1}">
                    <button type="button" class="remove-photo-btn" onclick="removePhoto(this)">×</button>
                `;
                previewContainer.appendChild(photoPreview);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

function removeArticle(number) {
    const articleContainer = document.querySelector(`[data-article="${number}"]`);
    if (articleContainer) {
        articleContainer.style.opacity = '0';
        articleContainer.style.transform = 'scale(0.9)';
        setTimeout(() => {
            articleContainer.remove();
        }, 300);
    }
}

function removePhoto(button) {
    const photoItem = button.closest('.photo-preview-item');
    if (photoItem) {
        photoItem.style.opacity = '0';
        setTimeout(() => {
            photoItem.remove();
        }, 300);
    }
}

/* ========================================
   INITIALISER MODE DE COLLECTE
   ======================================== */
function initCollectionMethod() {
    const collectionRadios = document.querySelectorAll('input[name="collection-method"]');
    
    collectionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Masquer tous les champs spécifiques
            document.querySelectorAll('.schedule-fields').forEach(field => {
                field.style.display = 'none';
            });
            
            // Afficher les champs correspondants
            if (this.value === 'home') {
                const homeFields = document.querySelector('.home-schedule');
                if (homeFields) homeFields.style.display = 'block';
            } else if (this.value === 'dropoff') {
                const dropoffFields = document.querySelector('.dropoff-schedule');
                if (dropoffFields) dropoffFields.style.display = 'block';
            }
        });
    });
}

/* ========================================
   INITIALISER RESTRICTIONS DE DATE
   ======================================== */
function initDateRestrictions() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('min', minDate);
    });
}

/* ========================================
   INITIALISER SOUMISSION DU FORMULAIRE
   ======================================== */
function initFormSubmission() {
    const submitBtn = document.getElementById('finalSubmitBtn');
    
    if (!submitBtn) {
        console.error("❌ Bouton de soumission non trouvé");
        return;
    }
    
    submitBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        console.log("📝 Soumission du don");
        
        // Vérifier l'utilisateur
        const user = await getCurrentUser();
        if (!user) {
            alert("Vous devez être connecté pour faire un don");
            showAuthModal('login');
            return;
        }
        
        // Collecter les données
        const donData = collectDonData();
        
        // Valider
        if (!validateDonData(donData)) {
            return;
        }
        
        // Soumettre
        await submitDon(donData, user);
    });
}

/* ========================================
   SOUMETTRE LE DON
   ======================================== */
async function submitDon(donData, user) {
    const submitBtn = document.getElementById('finalSubmitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    try {
        console.log("=== DÉBUT SOUMISSION DON ===");
        
        // Vérifier/créer userAccount
        let { data: userAccount } = await supabaseClient
            .from('userAccount')
            .select('*')
            .eq('idUser', user.id)
            .maybeSingle();
        
        if (!userAccount) {
            console.log("⚠️ Création userAccount");
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
        
        const userId = userAccount.idUser;
        console.log("✅ UserId:", userId);
        
        // Calculer valeur estimée totale
        const estimatedValue = calculateEstimatedValue(donData.articles);
        
        // Préparer les données pour la base de données
        const donRecord = {
            idUser: userId,
            catObjet: donData.articles[0]?.category || 'Vêtements',  // Catégorie principale
            etatObjet: donData.articles[0]?.condition || 'Bon état',  // État principal
            qteObjet: donData.articles.reduce((sum, a) => sum + parseInt(a.quantity || 1), 0),  // Quantité totale
            valeurEstime: estimatedValue,
            lieuCollecte: donData.collectionMethod === 'home' ? 'Domicile' : (donData.dropoffLocation || 'Point de collecte'),
            dateCollecte: donData.collectionDate ? new Date(donData.collectionDate).toISOString() : null
        };
        
        console.log("📤 Données don:", donRecord);
        
        // Insérer dans Supabase
        const { data, error } = await supabaseClient
            .from('don')
            .insert([donRecord])
            .select()
            .single();
        
        if (error) {
            console.error("❌ Erreur Supabase:", error);
            throw new Error("Erreur lors de l'enregistrement: " + error.message);
        }
        
        console.log("✅ Don enregistré:", data);
        
        // Message de succès
        showDonSuccessNotification(donData, estimatedValue);
        
        // Réinitialiser le formulaire
        resetForm();
        
        // Retour en haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error("=== ERREUR ===");
        console.error(error);
        showErrorNotification(error.message);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/* ========================================
   COLLECTER LES DONNÉES
   ======================================== */
function collectDonData() {
    // Collecter les articles
    const articles = [];
    const articleForms = document.querySelectorAll('.article-form');
    
    articleForms.forEach((form, index) => {
        const category = form.querySelector('[name="category"]')?.value;
        const condition = form.querySelector('[name="condition"]')?.value;
        const description = form.querySelector('[name="description"]')?.value || '';
        const quantity = form.querySelector('[name="quantity"]')?.value || '1';
        const estimatedValue = form.querySelector('[name="estimated-value"]')?.value || '0';
        
        if (category && condition) {
            articles.push({ 
                category, 
                condition, 
                description, 
                quantity,
                estimatedValue: parseFloat(estimatedValue) || 0
            });
        }
    });
    
    // Mode de collecte
    const collectionMethod = document.querySelector('input[name="collection-method"]:checked')?.value;
    const collectionDate = document.getElementById('collection-date')?.value || document.getElementById('dropoff-date')?.value;
    const timeSlot = document.getElementById('time-slot')?.value || document.getElementById('dropoff-time')?.value;
    const dropoffLocation = document.getElementById('dropoff-location')?.value;
    
    // Reçu fiscal
    const wantsTaxReceipt = document.getElementById('tax-receipt')?.checked || false;
    
    // Cases à cocher finales
    const termsAccepted = document.getElementById('terms-conditions')?.checked || false;
    const newsletter = document.getElementById('newsletter')?.checked || false;
    
    return {
        articles,
        collectionMethod,
        collectionDate,
        timeSlot,
        dropoffLocation,
        wantsTaxReceipt,
        termsAccepted,
        newsletter
    };
}

/* ========================================
   VALIDER LES DONNÉES
   ======================================== */
function validateDonData(donData) {
    if (donData.articles.length === 0) {
        alert('❌ Veuillez ajouter au moins un article');
        return false;
    }
    
    if (!donData.collectionMethod) {
        alert('❌ Veuillez sélectionner un mode de collecte (domicile ou point de collecte)');
        return false;
    }
    
    if (!donData.collectionDate) {
        alert('❌ Veuillez sélectionner une date de collecte');
        return false;
    }
    
    if (!donData.termsAccepted) {
        alert('❌ Vous devez accepter les conditions d\'utilisation');
        return false;
    }
    
    return true;
}

/* ========================================
   CALCULER VALEUR ESTIMÉE
   ======================================== */
function calculateEstimatedValue(articles) {
    // Utiliser les valeurs saisies par l'utilisateur ou valeurs par défaut
    const defaultValues = {
        'Neuf avec étiquette': 30,
        'Très bon état': 20,
        'Bon état': 15,
        'État correct': 10
    };
    
    return articles.reduce((total, article) => {
        // Utiliser la valeur saisie ou la valeur par défaut
        const value = article.estimatedValue > 0 
            ? article.estimatedValue 
            : (defaultValues[article.condition] || 10);
        const quantity = parseInt(article.quantity) || 1;
        return total + (value * quantity);
    }, 0);
}

/* ========================================
   RÉINITIALISER LE FORMULAIRE
   ======================================== */
function resetForm() {
    // Réinitialiser tous les formulaires d'articles
    const articleForms = document.querySelectorAll('.article-form');
    articleForms.forEach(form => form.reset());
    
    // Décocher les radios
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);
    
    // Décocher les checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    // Masquer les champs de planification
    document.querySelectorAll('.schedule-fields').forEach(field => {
        field.style.display = 'none';
    });
}

/* ========================================
   NOTIFICATIONS
   ======================================== */
function showDonSuccessNotification(donData, estimatedValue) {
    const collectionText = donData.collectionMethod === 'home' 
        ? 'Collecte à domicile' 
        : `Dépôt au point de collecte`;
    
    const formattedDate = new Date(donData.collectionDate).toLocaleDateString('fr-CA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    alert(`✅ Don enregistré avec succès!

🎁 Nombre d'articles: ${donData.articles.length}
💰 Valeur estimée: ${estimatedValue.toFixed(2)} $
📦 Mode de collecte: ${collectionText}
📅 Date: ${formattedDate}
⏰ Créneau: ${donData.timeSlot}

Merci pour votre générosité! 🌱
Vous recevrez une confirmation par courriel dans les 24h.
Notre équipe vous contactera pour organiser la collecte.`);
}

function showErrorNotification(message) {
    alert(`❌ Erreur lors de l'enregistrement

${message}

Veuillez réessayer ou nous contacter si le problème persiste.`);
}

console.log("✅ faire_un_don.js chargé avec support Supabase");