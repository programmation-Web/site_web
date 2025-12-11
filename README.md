# EcoRevive

## 🌱 Description du site Web

**EcoRevive** est un site Web visant à promouvoir le recyclage et la réutilisation des articles usagés.  
Depuis la page d’accueil, les utilisateurs peuvent accéder facilement à nos services :  

---

## 🏠 Page d'accueil

- **Réparation** : Accès à la page des réparations.  
- **Recycler** : Accès à la page de recyclage pour faire un don.  
- **Magasiner** : Accès à la boutique avec panier disponible à tout moment.  
- **À propos** : Menu déroulant contenant :  
  - Nos Services  
  - Faire un don 
  - Nous contacter
  - Avis

- **Connexion / Inscription** : Les utilisateurs peuvent se connecter ou créer un compte. Certaines actions (réparations, dons) nécessitent une authentification.  
- **Raccourcis** :  
  - “Réserver une réparation” renvoie directement à la page de réparations.  
  - “Magasiner les articles” renvoie à la boutique.  
- **Navigation générale** : Cliquer sur le logo (fleur verte + texte EcoRevive) renvoie à l’accueil depuis n’importe quelle page.  
- **Chatbot** : Agent virtuel intégré pour répondre aux questions fréquentes.  

---

## 🔧 Page de réparation

Étapes pour réserver un service :  

1. Sélectionner le service et déterminer l’urgence.  
2. Saisir les informations personnelles.  
3. Procéder au paiement.  
4. Recevoir une confirmation après validation.  

---

## ♻️ Page de recyclage

Pour faire un don :  

- Décrire le produit.  
- Ajouter des photos si souhaité.  
- Choisir une plage horaire pour la récupération.  
- Apporter l’article au point de service ou demander un ramassage à domicile.  
- Les dons sont gratuits.  
- Dons ≥ 20 $ : possibilité de recevoir un reçu fiscal.  

---

## 🛍️ Page Magasiner : Boutique

- Ajouter ou retirer des articles dans le panier.  
- Finaliser l’achat en saisissant les informations de paiement.  
- Prendre rendez-vous pour un service de réparation.  
- Faire un don (redirige vers la page de recyclage).  
- Rejoindre la communauté via le bouton **Commencer** en bas de page.  

---

## 💻 Technologies utilisées

- **HTML5, CSS, JavaScript**  
- **PostgreSQL 8.2**  
- **Git**  
- **Chatbase (version gratuite)** : agent virtuel avec :  
  - Jusqu’à 300 questions-réponses par mois  
  - Entraînement via le lien du site  
  - Personnalisation du design  
  - Version payante future : ajout de FAQs, plus d’interactions, réponses plus précises  

**Notes supplémentaires :**  

- Gestion du panier et import de photos réalisés en JavaScript pur, sans frameworks externes.  
- Site hébergé sur GitHub.  
- Supabase sera utilisé pour la gestion de la base de données dans une prochaine version.  

---

## 📁 Organisation du code

- **Fichiers HTML** à la racine : `index.html`, `reparation.html`, `faire-un-don.html`, `profil.html`, `boutique.html`.  
- **Dossier `css`** : fichiers CSS.  
- **Dossier `js`** : fichiers JavaScript.  
- **Dossier `images`** : images et logos.  
- **Dossier `projet`** : documents de préparation du projet, présentations, etc.  

### 🔹 Remarques techniques

- Le header et le footer sont intégrés dynamiquement via `component.js`.  
- L’agent conversationnel est intégré via `chatbot.js` sur les pages concernées.  
- Les authentifications et la gestion des données seront gérées via **Supabase**.
