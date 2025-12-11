/* ========================================
   PAGE RÉPARATION - JAVASCRIPT - 
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier que l'utilisateur est connecté
    checkUserAuthentication();
    
    // Initialiser les fonctionnalités
    initPhotoUpload();
    initFormValidation();
    initDateRestrictions();
});

/* ========================================
   VÉRIFIER L'AUTHENTIFICATION
   ======================================== */
async function checkUserAuthentication() {
    const user = await getCurrentUser();
    
    if (!user) {
        // Afficher un message et rediriger vers l'accueil
        if (confirm('Vous devez être connecté pour accéder à cette page. Voulez-vous vous connecter maintenant?')) {
            showAuthModal('login');
        } else {
            window.location.href = 'index.html';
        }
    }
}

/* ========================================
   UPLOAD DE PHOTOS
   ======================================== */
function initPhotoUpload() {
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    const uploadArea = document.getElementById('uploadArea');
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#4CAF50';
        uploadArea.style.background = 'rgba(76, 175, 80, 0.1)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.background = '#fafafa';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.background = '#fafafa';
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    // Click pour sélectionner
    photoInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });
    
    function handleFiles(files) {
        photoPreview.innerHTML = '';
        
        Array.from(files).forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    const imgWrapper = document.createElement('div');
                    imgWrapper.style.position = 'relative';
                    imgWrapper.style.display = 'inline-block';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '8px';
                    img.style.border = '2px solid #e0e0e0';
                    
                    // Bouton de suppression
                    const removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '×';
                    removeBtn.type = 'button';
                    removeBtn.style.position = 'absolute';
                    removeBtn.style.top = '-8px';
                    removeBtn.style.right = '-8px';
                    removeBtn.style.width = '24px';
                    removeBtn.style.height = '24px';
                    removeBtn.style.borderRadius = '50%';
                    removeBtn.style.background = '#e74c3c';
                    removeBtn.style.color = 'white';
                    removeBtn.style.border = 'none';
                    removeBtn.style.cursor = 'pointer';
                    removeBtn.style.fontSize = '18px';
                    removeBtn.style.lineHeight = '1';
                    
                    removeBtn.addEventListener('click', () => {
                        imgWrapper.remove();
                    });
                    
                    imgWrapper.appendChild(img);
                    imgWrapper.appendChild(removeBtn);
                    photoPreview.appendChild(imgWrapper);
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
}

/* ========================================
   RESTRICTIONS DE DATE
   ======================================== */
function initDateRestrictions() {
    const dateInput = document.getElementById('date');
    
    // Date minimum = aujourd'hui
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    
    dateInput.setAttribute('min', minDate);
    
    // Date maximum = 3 mois à l'avance
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxYyyy = maxDate.getFullYear();
    const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
    const maxDd = String(maxDate.getDate()).padStart(2, '0');
    const maxDateStr = `${maxYyyy}-${maxMm}-${maxDd}`;
    
    dateInput.setAttribute('max', maxDateStr);
}

/* ========================================
   VALIDATION DU FORMULAIRE
   ======================================== */
function initFormValidation() {
    const form = document.getElementById('reparationForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Vérifier que l'utilisateur est connecté
        const user = await getCurrentUser();
        if (!user) {
            showAuthModal('login');
            return;
        }
        
        // Validation personnalisée
        if (validateForm()) {
            // Collecter les données
            const formData = collectFormData();
            
            // Afficher confirmation et soumettre
            await submitReparation(formData);
        }
    });
}

function validateForm() {
    let isValid = true;
    
    // Validation type d'objet
    const typeObjet = document.getElementById('typeObjet');
    if (typeObjet.value === '') {
        showError(typeObjet, 'Veuillez sélectionner un type d\'objet');
        isValid = false;
    } else {
        clearError(typeObjet);
    }
    
    // Validation description
    const description = document.getElementById('description');
    if (description.value.trim().length < 10) {
        showError(description, 'La description doit contenir au moins 10 caractères');
        isValid = false;
    } else {
        clearError(description);
    }
    
    // Validation date
    const dateInput = document.getElementById('date');
    if (!dateInput.value) {
        showError(dateInput, 'Veuillez sélectionner une date');
        isValid = false;
    } else {
        clearError(dateInput);
    }
    
    // Validation heure
    const heureInput = document.getElementById('heure');
    if (!heureInput.value) {
        showError(heureInput, 'Veuillez sélectionner une heure');
        isValid = false;
    } else {
        clearError(heureInput);
    }
    
    return isValid;
}

function showError(input, message) {
    clearError(input);
    
    input.style.borderColor = '#e74c3c';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function clearError(input) {
    input.style.borderColor = '#e0e0e0';
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

/* ========================================
   COLLECTE DES DONNÉES DU FORMULAIRE
   ======================================== */
function collectFormData() {
    return {
        typeObjet: document.getElementById('typeObjet').value,
        description: document.getElementById('description').value,
        urgence: document.querySelector('input[name="urgence"]:checked').value,
        lieu: document.querySelector('input[name="lieu"]:checked').value,
        date: document.getElementById('date').value,
        heure: document.getElementById('heure').value
    };
}

/* ========================================
   SOUMETTRE LA RÉPARATION - VERSION CORRIGÉE
   ======================================== */
async function submitReparation(formData) {
    // Bouton de soumission - état de chargement
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    try {
        // Vérifier l'utilisateur
        const user = await getCurrentUser();
        if (!user) {
            throw new Error('Vous devez être connecté pour soumettre une réparation');
        }
        
        console.log('👤 User authentifié:', user);
        
        // CORRECTION 1: Récupérer l'idUser depuis userAccount en utilisant le bon champ
        // La table userAccount utilise 'idUser' comme clé primaire qui correspond à auth.users.id
        const { data: userAccount, error: userError } = await supabaseClient
            .from('userAccount')
            .select('idUser, email, firstName, lastName')
            .eq('idUser', user.id)  
            .single();
        
        if (userError) {
            console.error('❌ Erreur requête userAccount:', userError);
            
            // Si l'utilisateur n'existe pas dans userAccount, le créer
            if (userError.code === 'PGRST116') { // Aucune ligne trouvée
                console.log('⚠️ Utilisateur non trouvé dans userAccount, création...');
                
                const { data: newUser, error: createError } = await supabaseClient
                    .from('userAccount')
                    .insert([{
                        idUser: user.id,
                        email: user.email,
                        firstName: user.user_metadata?.firstName || user.email.split('@')[0],
                        lastName: user.user_metadata?.lastName || ''
                    }])
                    .select()
                    .single();
                
                if (createError) {
                    console.error('❌ Erreur création userAccount:', createError);
                    throw new Error('Erreur lors de la création de votre profil');
                }
                
                console.log('✅ UserAccount créé:', newUser);
                
                // Utiliser le nouvel utilisateur créé
                const userId = newUser.idUser;
                await insertReparation(userId, formData);
            } else {
                throw new Error('Erreur lors de la récupération de votre profil: ' + userError.message);
            }
        } else if (!userAccount) {
            throw new Error('Votre profil n\'a pas été trouvé');
        } else {
            // Utilisateur trouvé, procéder à l'insertion
            console.log('✅ UserAccount trouvé:', userAccount);
            await insertReparation(userAccount.idUser, formData);
        }
        
        // Afficher message de succès
        showSuccessNotification(formData);
        
        // Réinitialiser le formulaire
        document.getElementById('reparationForm').reset();
        document.getElementById('photoPreview').innerHTML = '';
        
        // Retour en haut de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('❌ Erreur:', error);
        showErrorNotification(error.message);
    } finally {
        // Restaurer le bouton
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/* ========================================
   FONCTION AUXILIAIRE POUR INSÉRER LA RÉPARATION
   ======================================== */
async function insertReparation(userId, formData) {
    // Préparer les données pour Supabase
    const reparationData = {
        idUser: userId,
        typeObjet: formData.typeObjet,
        descProbleme: formData.description,
        niveauUrgence: formData.urgence,
        lieuRep: formData.lieu,
        date_heure: `${formData.date}T${formData.heure}:00`
    };
    
    console.log('📤 Envoi de la réparation:', reparationData);
    
    // Insérer dans Supabase
    const { data, error } = await supabaseClient
        .from('reparation')
        .insert([reparationData])
        .select();
    
    if (error) {
        console.error('❌ Erreur Supabase:', error);
        throw new Error('Erreur lors de l\'enregistrement: ' + error.message);
    }
    
    console.log('✅ Réparation enregistrée:', data);
    return data;
}

/* ========================================
   NOTIFICATIONS
   ======================================== */
function showSuccessNotification(formData) {
    const formattedDate = new Date(formData.date).toLocaleDateString('fr-CA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const lieuText = formData.lieu === 'atelier' 
        ? 'En atelier (1234 rue des roitelets, Saguenay)' 
        : 'À domicile (frais de déplacement: 20$)';
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="notification-body">
                <h3>✅ Demande enregistrée avec succès!</h3>
                <div class="notification-details">
                    <p><strong>Type d'objet:</strong> ${formData.typeObjet}</p>
                    <p><strong>Urgence:</strong> ${formData.urgence}</p>
                    <p><strong>Date:</strong> ${formattedDate} à ${formData.heure}</p>
                    <p><strong>Lieu:</strong> ${lieuText}</p>
                </div>
                <p class="notification-footer">
                    Vous recevrez une confirmation par courriel dans les 24h.<br>
                    Un technicien vous contactera pour confirmer les détails.
                </p>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Ajouter les styles
    const style = document.createElement('style');
    style.textContent = `
        .success-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            border-left: 5px solid #4CAF50;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            gap: 15px;
            padding: 20px;
        }
        
        .notification-icon {
            font-size: 32px;
            color: #4CAF50;
            flex-shrink: 0;
        }
        
        .notification-body h3 {
            margin: 0 0 15px 0;
            color: #2c3e50;
            font-size: 1.1rem;
        }
        
        .notification-details {
            background: #f8f9fa;
            padding: 12px;
            border-radius: 8px;
            margin: 10px 0;
        }
        
        .notification-details p {
            margin: 5px 0;
            font-size: 0.9rem;
            color: #555;
        }
        
        .notification-footer {
            margin-top: 10px;
            font-size: 0.85rem;
            color: #666;
            line-height: 1.5;
        }
        
        .notification-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 20px;
            padding: 5px;
            transition: color 0.2s;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        @media (max-width: 640px) {
            .success-notification {
                left: 10px;
                right: 10px;
                max-width: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Auto-fermer après 10 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 10000);
}

function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon" style="color: #e74c3c;">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="notification-body">
                <h3>❌ Erreur lors de l'envoi</h3>
                <p>${message}</p>
                <p class="notification-footer">Veuillez réessayer ou nous contacter si le problème persiste.</p>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        border-left: 5px solid #e74c3c;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-fermer après 8 secondes
    setTimeout(() => {
        notification.remove();
    }, 8000);
}

/* ========================================
   UTILITAIRES
   ======================================== */

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
