/* ========================================
   SYSTÈME D'AUTHENTIFICATION - EcoRevive - VERSION CORRIGÉE
   ======================================== */

// État de l'utilisateur connecté
let currentUser = null;

// ========== VÉRIFIER SI L'UTILISATEUR EST CONNECTÉ ==========
async function checkAuthStatus() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) {
            console.error('Erreur de vérification de session:', error);
            return null;
        }
        
        if (session) {
            currentUser = session.user;
            updateUIForLoggedInUser(currentUser);
            return currentUser;
        }
        
        return null;
    } catch (error) {
        console.error('Erreur checkAuthStatus:', error);
        return null;
    }
}

// ========== METTRE À JOUR L'UI POUR UTILISATEUR CONNECTÉ ==========
function updateUIForLoggedInUser(user) {
    const headerActions = document.querySelector('.header-actions');
    if (headerActions && user) {
        // Récupérer le prénom depuis les métadonnées ou l'email
        const firstName = user.user_metadata?.firstName || user.email.split('@')[0];
        
        headerActions.innerHTML = `
            <div class="user-menu">
                <button class="btn-user-menu" onclick="toggleUserDropdown()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    ${firstName}
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <a href="profil.html" class="dropdown-item">Mon profil</a>
                    <a href="profil.html?tab=commandes" class="dropdown-item">Mes commandes</a>
                    <a href="profil.html?tab=reparations" class="dropdown-item">Mes réparations</a>
                    <hr>
                    <a href="#" class="dropdown-item" onclick="handleLogout(event)">Déconnexion</a>
                </div>
            </div>
        `;
    }
}

// ========== TOGGLE DROPDOWN UTILISATEUR ==========
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Fermer le dropdown si on clique ailleurs
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
});

// ========== MODAL D'AUTHENTIFICATION ==========
function showAuthModal(mode = 'login') {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.id = 'authModal';
    
    const isLogin = mode === 'login';
    
    modal.innerHTML = `
        <div class="auth-modal-overlay" onclick="closeAuthModal()"></div>
        <div class="auth-modal-content">
            <button class="auth-close-btn" onclick="closeAuthModal()">×</button>
            
            <div class="auth-header">
                <img src="images/logo.png" alt="EcoRevive" class="auth-logo">
                <h2>${isLogin ? 'Connexion' : 'Créer un compte'}</h2>
                <p>${isLogin ? 'Connectez-vous à votre compte EcoRevive' : 'Rejoignez la communauté EcoRevive'}</p>
            </div>
            
            <form id="authForm" class="auth-form">
                ${!isLogin ? `
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">Prénom *</label>
                            <input type="text" id="firstName" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Nom *</label>
                            <input type="text" id="lastName" name="lastName" required>
                        </div>
                    </div>
                ` : ''}
                
                <div class="form-group">
                    <label for="email">Adresse courriel *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Mot de passe *</label>
                    <input type="password" id="password" name="password" required minlength="6">
                    <small class="form-hint">Au moins 6 caractères</small>
                </div>
                
                ${!isLogin ? `
                    <div class="form-group">
                        <label for="phone">Téléphone</label>
                        <input type="tel" id="phone" name="phone" placeholder="(418) 555-0123">
                    </div>
                    
                    <div class="form-group">
                        <label for="address">Adresse</label>
                        <input type="text" id="address" name="address" placeholder="123 Rue Principale">
                    </div>
                ` : ''}
                
                ${!isLogin ? `
                    <div class="form-group checkbox-group">
                        <label>
                            <input type="checkbox" name="terms" required>
                            <span>J'accepte les <a href="#" target="_blank">conditions d'utilisation</a> et la <a href="#" target="_blank">politique de confidentialité</a> *</span>
                        </label>
                    </div>
                ` : ''}
                
                <div id="authError" class="auth-error" style="display: none;"></div>
                
                <button type="submit" class="btn-auth-submit">
                    ${isLogin ? 'Se connecter' : 'Créer mon compte'}
                </button>
            </form>
            
            <div class="auth-divider">
                <span>ou</span>
            </div>
            
            <button type="button" class="btn-auth-google" onclick="handleGoogleAuth()">
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuer avec Google
            </button>
            
            <div class="auth-footer">
                ${isLogin 
                    ? '<p>Pas encore de compte ? <a href="#" onclick="showAuthModal(\'signup\'); return false;">Créer un compte</a></p>'
                    : '<p>Vous avez déjà un compte ? <a href="#" onclick="showAuthModal(\'login\'); return false;">Se connecter</a></p>'
                }
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
    
    // Ajouter l'écouteur pour le formulaire
    document.getElementById('authForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin(e);
        } else {
            handleSignup(e);
        }
    });
    
    // Animation d'entrée
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// ========== FERMER MODAL ==========
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ========== GESTION INSCRIPTION - VERSION CORRIGÉE ==========
async function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const phone = formData.get('phone');
    const address = formData.get('address');
    
    // Afficher le loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Création en cours...';
    submitBtn.disabled = true;
    
    try {
        // Créer le compte avec Supabase Auth
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    firstName: firstName,
                    lastName: lastName
                }
            }
        });
        
        if (authError) throw authError;
        
        console.log('✅ Utilisateur Auth créé:', authData.user);
        
        // CORRECTION: Créer l'enregistrement dans la table userAccount avec le bon mapping
        // idUser = clé primaire qui correspond directement à auth.users.id
        const { data: userData, error: dbError } = await supabaseClient
            .from('userAccount')
            .insert([
                {
                    idUser: authData.user.id,  // CORRECTION: utiliser idUser au lieu de authUserId
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone || null,
                    addresse: address || null  // Note: gardé tel quel si c'est le nom de la colonne
                }
            ])
            .select();
        
        if (dbError) {
            console.error('❌ Erreur DB:', dbError);
            throw new Error('Erreur lors de la création du profil: ' + dbError.message);
        }
        
        console.log('✅ UserAccount créé:', userData);
        
        // Succès
        showSuccessMessage('Compte créé avec succès! Vérifiez votre courriel pour confirmer votre compte.');
        closeAuthModal();
        
        // Mettre à jour l'UI si l'utilisateur est automatiquement connecté
        if (authData.session) {
            currentUser = authData.user;
            updateUIForLoggedInUser(currentUser);
        }
        
    } catch (error) {
        console.error('❌ Erreur inscription:', error);
        showAuthError(error.message || 'Une erreur est survenue lors de la création du compte');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// ========== GESTION CONNEXION ==========
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Connexion...';
    submitBtn.disabled = true;
    
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        currentUser = data.user;
        updateUIForLoggedInUser(currentUser);
        
        showSuccessMessage('Connexion réussie! Bienvenue sur EcoRevive.');
        closeAuthModal();
        
    } catch (error) {
        console.error('Erreur connexion:', error);
        showAuthError(error.message || 'Identifiants incorrects');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// ========== CONNEXION GOOGLE ==========
async function handleGoogleAuth() {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
        
        if (error) throw error;
        
    } catch (error) {
        console.error('Erreur Google Auth:', error);
        showAuthError('Erreur lors de la connexion avec Google');
    }
}

// ========== DÉCONNEXION ==========
async function handleLogout(e) {
    e.preventDefault();
    
    try {
        const { error } = await supabaseClient.auth.signOut();
        
        if (error) throw error;
        
        currentUser = null;
        
        // Restaurer les boutons d'authentification
        const headerActions = document.querySelector('.header-actions');
        if (headerActions) {
            headerActions.innerHTML = `
                <a href="#" class="btn btn-signup" onclick="showAuthModal('signup'); return false;">Sign Up</a>
                <a href="#" class="btn btn-login" onclick="showAuthModal('login'); return false;">Login</a>
            `;
        }
        
        showSuccessMessage('Déconnexion réussie');
        
        // Rediriger vers la page d'accueil
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Erreur déconnexion:', error);
        alert('Erreur lors de la déconnexion');
    }
}

// ========== MESSAGES D'ERREUR ET SUCCÈS ==========
function showAuthError(message) {
    const errorDiv = document.getElementById('authError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-toast';
    successDiv.innerHTML = `
        <div class="success-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// ========== RÉCUPÉRER L'UTILISATEUR CONNECTÉ ==========
async function getCurrentUser() {
    if (currentUser) return currentUser;
    return await checkAuthStatus();
}

// ========== OBTENIR LES INFORMATIONS COMPLÈTES DE L'UTILISATEUR - VERSION CORRIGÉE ==========
async function getUserProfile() {
    try {
        const user = await getCurrentUser();
        if (!user) return null;
        
        // CORRECTION: utiliser idUser directement au lieu de authUserId
        const { data, error } = await supabaseClient
            .from('userAccount')
            .select('*')
            .eq('idUser', user.id)  // CORRECTION: clé primaire = auth.users.id
            .single();
        
        if (error) {
            console.error('Erreur récupération profil:', error);
            
            // Si l'utilisateur n'existe pas dans userAccount, le créer
            if (error.code === 'PGRST116') { // Aucune ligne trouvée
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
                    return null;
                }
                
                console.log('✅ UserAccount créé:', newUser);
                return newUser;
            }
            
            return null;
        }
        
        return data;
        
    } catch (error) {
        console.error('Erreur récupération profil:', error);
        return null;
    }
}

// ========== INITIALISATION AU CHARGEMENT DE LA PAGE ==========
document.addEventListener('DOMContentLoaded', async () => {
    // Vérifier le statut d'authentification
    await checkAuthStatus();
    
    // Mettre à jour les liens Sign Up et Login
    const signupBtn = document.querySelector('.btn-signup');
    const loginBtn = document.querySelector('.btn-login');
    
    if (signupBtn && !currentUser) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('signup');
        });
    }
    
    if (loginBtn && !currentUser) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    // Écouter les changements d'état d'authentification
    supabaseClient.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
            currentUser = session.user;
            updateUIForLoggedInUser(currentUser);
        } else if (event === 'SIGNED_OUT') {
            currentUser = null;
            window.location.href = 'index.html';
        }
    });
});

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showAuthModal,
        closeAuthModal,
        getCurrentUser,
        getUserProfile,
        handleLogout
    };
}
