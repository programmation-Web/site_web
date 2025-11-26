// Gestion de la section articles
document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.getElementById('articlesContainer');
    const addArticleBtn = document.getElementById('addArticleBtn');
    let articleCount = 1;

    // Fonction pour créer un formulaire d'article
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
                                    <option value="vetements">Vêtements</option>
                                    <option value="chaussures">Chaussures</option>
                                    <option value="accessoires">Accessoires</option>
                                    <option value="textiles">Textiles de maison</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group-half">
                            <label for="condition-${number}" class="required-field">État</label>
                            <div class="select-wrapper">
                                <select id="condition-${number}" name="condition" required>
                                    <option value="">État de l'article</option>
                                    <option value="neuf">Neuf avec étiquette</option>
                                    <option value="tres-bon">Très bon état</option>
                                    <option value="bon">Bon état</option>
                                    <option value="correct">État correct</option>
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
                            placeholder="Ex: Manteau d'hiver noir, taille M, marque XYZ, très peu porté..." 
                            required
                        ></textarea>
                    </div>
                    
                    <div class="separator"></div>
                    
                    <div class="form-row">
                        <div class="form-group-half">
                            <label for="quantity-${number}">Quantité</label>
                            <input 
                                type="number" 
                                id="quantity-${number}" 
                                name="quantity" 
                                value="1" 
                                min="1" 
                                max="100"
                            >
                        </div>
                        
                        <div class="form-group-half">
                            <label for="estimated-value-${number}">Valeur estimée (CAD)</label>
                            <input 
                                type="number" 
                                id="estimated-value-${number}" 
                                name="estimated-value" 
                                placeholder="Ex: 25" 
                                min="0" 
                                step="0.01"
                            >
                        </div>
                    </div>
                    
                    <div class="separator"></div>
                    
                    <div class="photos-section">
                        <h3>Photos des articles (optionnel)</h3>
                        <button type="button" class="upload-btn" data-article="${number}">
                            Ajouter des photos
                        </button>
                        <p class="upload-hint">Cliquez pour sélectionner des photos depuis votre appareil</p>
                        
                        <div class="photo-preview-container" id="photo-preview-${number}">
                            <div class="photo-preview-grid" id="photo-grid-${number}">
                                <!-- Les prévisualisations de photos apparaîtront ici -->
                            </div>
                        </div>
                    </div>
                    
                    ${number > 1 ? `
                    <button type="button" class="remove-article-btn" data-article="${number}">
                        Supprimer cet article
                    </button>
                    ` : ''}
                </div>
            </form>
        </div>
        `;
    }

    // Gestion du bouton "Ajouter un autre article"
    addArticleBtn.addEventListener('click', function() {
        articleCount++;
        const newArticleHTML = createArticleForm(articleCount);
        articlesContainer.insertAdjacentHTML('beforeend', newArticleHTML);
        
        // Faire défiler jusqu'au nouvel article
        const newArticle = articlesContainer.lastElementChild;
        newArticle.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Gestion de la suppression d'article (déléguation d'événement)
    articlesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-article-btn')) {
            const articleNumber = e.target.getAttribute('data-article');
            const articleToRemove = document.querySelector(`[data-article="${articleNumber}"]`);
            
            if (articleToRemove) {
                articleToRemove.style.opacity = '0';
                articleToRemove.style.transform = 'translateX(-100%)';
                
                setTimeout(() => {
                    articleToRemove.remove();
                    // Réorganiser les numéros d'articles restants
                    reorganizeArticleNumbers();
                }, 300);
            }
        }
    });

    // Gestion de l'upload de photos (déléguation d'événement)
    articlesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('upload-btn')) {
            const articleNumber = e.target.getAttribute('data-article');
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            fileInput.accept = 'image/*';
            
            fileInput.addEventListener('change', function(event) {
                handlePhotoUpload(event, articleNumber);
            });
            
            fileInput.click();
        }
    });

    // Gestion de la suppression de photos (déléguation d'événement)
    articlesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-photo')) {
            e.target.closest('.photo-preview').remove();
        }
    });

    // Fonction pour gérer l'upload de photos
    function handlePhotoUpload(event, articleNumber) {
        const files = event.target.files;
        const photoGrid = document.getElementById(`photo-grid-${articleNumber}`);
        
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const photoPreview = document.createElement('div');
                    photoPreview.className = 'photo-preview';
                    photoPreview.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="remove-photo">&times;</button>
                    `;
                    photoGrid.appendChild(photoPreview);
                };
                
                reader.readAsDataURL(file);
            }
        }
    }

    // Fonction pour réorganiser les numéros d'articles après suppression
    function reorganizeArticleNumbers() {
        const articles = articlesContainer.querySelectorAll('.article-form-container');
        let currentNumber = 1;
        
        articles.forEach(article => {
            const articleNumber = article.querySelector('.article-number');
            const header = article.querySelector('.article-header h2');
            const uploadBtn = article.querySelector('.upload-btn');
            const removeBtn = article.querySelector('.remove-article-btn');
            
            // Mettre à jour le numéro
            articleNumber.textContent = `Article ${currentNumber}`;
            article.setAttribute('data-article', currentNumber);
            
            if (uploadBtn) {
                uploadBtn.setAttribute('data-article', currentNumber);
            }
            
            if (removeBtn && currentNumber === 1) {
                removeBtn.remove();
            } else if (removeBtn) {
                removeBtn.setAttribute('data-article', currentNumber);
            }
            
            currentNumber++;
        });
        
        articleCount = currentNumber - 1;
    }
});

// Gestion des sections supplémentaires
document.addEventListener('DOMContentLoaded', function() {
    // Définir la date minimale (aujourd'hui + 2 jours)
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);
    
    const minDateString = minDate.toISOString().split('T')[0];
    
    // Appliquer la date minimale aux champs de date
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.min = minDateString;
        input.value = minDateString; // Date par défaut
    });
    
    // Gestion des options de collecte
    const collectionOptions = document.querySelectorAll('.collection-option input[type="radio"]');
    
    collectionOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Retirer la sélection visuelle de toutes les options
            document.querySelectorAll('.option-card').forEach(card => {
                card.style.borderColor = '#e9ecef';
                card.style.background = 'white';
            });
            
            // Appliquer la sélection visuelle à l'option choisie
            if (this.checked) {
                const card = this.closest('.collection-option').querySelector('.option-card');
                card.style.borderColor = 'var(--accent-color)';
                card.style.background = 'rgba(143, 185, 150, 0.05)';
            }
        });
    });
    
    // Validation des champs de date
    const dateFields = document.querySelectorAll('input[type="date"]');
    dateFields.forEach(field => {
        field.addEventListener('change', function() {
            validateDateField(this);
        });
    });
    
    function validateDateField(field) {
        const selectedDate = new Date(field.value);
        const minDate = new Date(field.min);
        
        clearFieldError(field);
        
        if (selectedDate < minDate) {
            showFieldError(field, `Veuillez choisir une date à partir du ${formatDate(minDate)}`);
            return false;
        }
        
        // Vérifier si c'est un week-end
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            showFieldError(field, 'Les collectes ne sont pas disponibles les week-ends');
            return false;
        }
        
        return true;
    }
    
    function formatDate(date) {
        return date.toLocaleDateString('fr-CA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#e74c3c';
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '#e9ecef';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Validation du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        clearFieldError(field);
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Ce champ est obligatoire');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Veuillez entrer une adresse email valide');
                return false;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                showFieldError(field, 'Veuillez entrer un numéro de téléphone valide');
                return false;
            }
        }
        
        return true;
    }
});
// Gestion de la soumission finale
document.addEventListener('DOMContentLoaded', function() {
    const finalSubmitBtn = document.getElementById('finalSubmitBtn');
    const termsCheckbox = document.getElementById('terms-conditions');

    finalSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validation des conditions obligatoires
        if (!termsCheckbox.checked) {
            alert('Veuillez accepter les conditions d\'utilisation pour soumettre votre don.');
            termsCheckbox.focus();
            return;
        }
        
        // Validation du mode de collecte
        const collectionMethod = document.querySelector('input[name="collection-method"]:checked');
        if (!collectionMethod) {
            alert('Veuillez sélectionner un mode de collecte.');
            return;
        }
        
        // Validation des champs de date et horaire selon le mode choisi
        if (collectionMethod.value === 'home') {
            const collectionDate = document.getElementById('collection-date');
            const timeSlot = document.getElementById('time-slot');
            
            if (!collectionDate.value || !timeSlot.value) {
                alert('Veuillez remplir la date et le créneau horaire pour la collecte à domicile.');
                return;
            }
        } else if (collectionMethod.value === 'dropoff') {
            const dropoffLocation = document.getElementById('dropoff-location');
            const dropoffDate = document.getElementById('dropoff-date');
            const dropoffTime = document.getElementById('dropoff-time');
            
            if (!dropoffLocation.value || !dropoffDate.value || !dropoffTime.value) {
                alert('Veuillez remplir tous les champs pour le dépôt en point de collecte.');
                return;
            }
        }
        
        // Validation des articles
        const articles = document.querySelectorAll('.article-form-container');
        if (articles.length === 0) {
            alert('Veuillez ajouter au moins un article à donner.');
            return;
        }
        
        // Validation des informations de contact
        const requiredContactFields = ['firstName', 'lastName', 'email', 'phone', 'address'];
        let contactValid = true;
        
        requiredContactFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field.value.trim()) {
                contactValid = false;
                showFieldError(field, 'Ce champ est obligatoire');
            }
        });
        
        if (!contactValid) {
            alert('Veuillez remplir tous les champs obligatoires des informations de contact.');
            return;
        }
        
        // Si tout est valide, soumettre le formulaire
        submitDonation();
    });

    function submitDonation() {
        // Afficher l'animation de chargement
        finalSubmitBtn.innerHTML = 'Soumission en cours...';
        finalSubmitBtn.disabled = true;
        
        // Simuler l'envoi des données
        setTimeout(() => {
            showSuccessMessage();
            finalSubmitBtn.innerHTML = 'Soumettre mon don';
            finalSubmitBtn.disabled = false;
        }, 2000);
    }

    function showSuccessMessage() {
        // Créer un overlay de succès
        const successOverlay = document.createElement('div');
        successOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        successOverlay.innerHTML = `
            <div style="
                background: white;
                padding: 3rem;
                border-radius: 16px;
                text-align: center;
                max-width: 500px;
                margin: 2rem;
                border: 3px solid var(--accent-color);
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: var(--accent-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    color: white;
                    margin: 0 auto 1.5rem;
                ">✓</div>
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Don Soumis avec Succès !</h2>
                <p style="margin-bottom: 2rem; line-height: 1.6; color: var(--dark-color);">
                    Merci pour votre générosité ! Votre don a été enregistré et notre équipe 
                    vous contactera dans les 24 heures pour organiser la collecte.
                </p>
                <button onclick="this.closest('div').parentElement.remove()" style="
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='var(--secondary-color)'" 
                   onmouseout="this.style.background='var(--primary-color)'">Fermer</button>
            </div>
        `;
        
        document.body.appendChild(successOverlay);
        
        // Fermer en cliquant à l'extérieur
        successOverlay.addEventListener('click', function(e) {
            if (e.target === successOverlay) {
                document.body.removeChild(successOverlay);
            }
        });
    }
});
