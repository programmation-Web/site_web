/* ========================================
   PAGE RÉPARATION - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialiser les fonctionnalités
    initPhotoUpload();
    initFormValidation();
    initDateRestrictions();
    
});

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
        uploadArea.style.borderColor = '#2ecc71';
        uploadArea.style.background = 'rgba(46, 204, 113, 0.1)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.background = '#ffffff';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.background = '#ffffff';
        
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
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation personnalisée
        if (validateForm()) {
            // Collecter les données
            const formData = collectFormData();
            
            // Afficher confirmation
            showConfirmation(formData);
            
            // Réinitialiser le formulaire
            form.reset();
            document.getElementById('photoPreview').innerHTML = '';
        }
    });
    
    // Validation en temps réel du téléphone
    const telephoneInput = document.getElementById('telephone');
    telephoneInput.addEventListener('input', function(e) {
        formatPhoneNumber(e.target);
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
    
    // Validation prénom
    const prenom = document.getElementById('prenom');
    if (prenom.value.trim().length < 2) {
        showError(prenom, 'Le prénom doit contenir au moins 2 caractères');
        isValid = false;
    } else {
        clearError(prenom);
    }
    
    // Validation nom
    const nom = document.getElementById('nom');
    if (nom.value.trim().length < 2) {
        showError(nom, 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    } else {
        clearError(nom);
    }
    
    // Validation courriel
    const courriel = document.getElementById('courriel');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(courriel.value)) {
        showError(courriel, 'Veuillez entrer une adresse courriel valide');
        isValid = false;
    } else {
        clearError(courriel);
    }
    
    // Validation téléphone
    const telephone = document.getElementById('telephone');
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    if (!phoneRegex.test(telephone.value)) {
        showError(telephone, 'Format attendu: (418) 543-4567');
        isValid = false;
    } else {
        clearError(telephone);
    }
    
    // Validation conditions
    const conditions = document.querySelector('input[name="conditions"]');
    if (!conditions.checked) {
        alert('Vous devez accepter les conditions d\'utilisation');
        isValid = false;
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

function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    input.value = value;
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
        heure: document.getElementById('heure').value,
        prenom: document.getElementById('prenom').value,
        nom: document.getElementById('nom').value,
        courriel: document.getElementById('courriel').value,
        telephone: document.getElementById('telephone').value,
        newsletter: document.querySelector('input[name="newsletter"]').checked
    };
}

/* ========================================
   AFFICHAGE DE LA CONFIRMATION
   ======================================== */
function showConfirmation(data) {
    const formattedDate = new Date(data.date).toLocaleDateString('fr-CA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const lieuText = data.lieu === 'atelier' 
        ? 'En atelier (1234 rue des roitelets, Saguenay)' 
        : 'À domicile (frais de déplacement: 20$)';
    
    const message = `
✅ Demande de réparation soumise avec succès!

📋 Résumé de votre demande:
• Type d'objet: ${data.typeObjet}
• Niveau d'urgence: ${data.urgence}
• Lieu: ${lieuText}
• Date: ${formattedDate} à ${data.heure}

👤 Contact: ${data.prenom} ${data.nom}
📧 Courriel: ${data.courriel}
📞 Téléphone: ${data.telephone}

Vous recevrez une confirmation par courriel dans les 24h.
Un technicien vous contactera pour confirmer les détails.
    `;
    
    alert(message);
    
    // Retour en haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
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