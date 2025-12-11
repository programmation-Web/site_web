# EcoRevive

## Description du site Web

**EcoRevive** est un site Web dont l’objectif est de favoriser le recyclage et la réutilisation des articles usagés.  
Depuis la page d’accueil, l’utilisateur peut accéder à nos services en sélectionnant l’une des options suivantes :

---

## Page d'accueil

- **Réparation** : Redirige vers la page des réparations.  
- **Recycler** : Redirige vers la page de recyclage, où l’utilisateur peut faire un don.  
- **Magasiner** : Redirige vers la page de la boutique. Le panier est accessible à tout moment pour suivre les achats.  
- **A propos** : Un menu déroulant apparaît au survol, permettant de choisir parmi trois options :  
  - Notre mission  
  - Notre impact  
  - Nous contacter  

- **Login / Sign up** : Les utilisateurs peuvent se connecter ou s’inscrire. Pour des raisons de sécurité, l’accès au compte nécessite une authentification. Les actions telles que les réparations ou les dons nécessitent également une authentification préalable.  

- **Raccourcis** :  
  - Vers le bas de la page, “Réserver une réparation” renvoie directement à la page de réparations.  
  - “Magasiner les articles” renvoie directement à la boutique.  
- **Navigation** : Depuis n’importe quelle page, cliquer sur le logo en haut à gauche (une fleur verte sur fond blanc suivie du mot EcoRevive) permet de revenir à la page d’accueil.  
- **Chatbot** : Un agent virtuel intégré répond aux questions fréquemment posées par les utilisateurs.  

---

## Page de réparation

Le client renseigne le service souhaité en fonction de son lieu de résidence et de la disponibilité de nos employés.  
Les étapes sont les suivantes :  

1. Déterminer l’urgence du service.  
2. Saisir les informations personnelles.  
3. Procéder au paiement.  
4. Après vérification réussie via la passerelle de paiement, le client reçoit une confirmation de sa commande.  

---

## Page de recyclage

Le client souhaitant faire un don doit :  

- Décrire le produit qu’il souhaite offrir.  
- Téléverser éventuellement des photos.  
- Choisir une plage horaire pour la récupération.  
- Choisir entre apporter l’article à un point de service ou demander un ramassage à domicile par nos employés.  
- Tous les dons sont gratuits.  
- Pour les dons d’une valeur égale ou supérieure à 20 $, le client peut demander un reçu fiscal.  

---

## Page Magasiner : Boutique

- Le client peut sélectionner un ou plusieurs articles, ajouter ou retirer des éléments de son panier.  
- Une fois les achats terminés, il finalise la transaction en saisissant les informations de sa carte bancaire.  
- Il peut prendre rendez-vous avec un technicien pour un service de réparation.  
- Il peut également faire un don, ce qui le redirige vers la page de recyclage.  
- Il peut rejoindre notre communauté en cliquant sur le bouton **Commencer** en bas de la page.  

---

## Technologies utilisées

- **HTML5, CSS, JavaScript**  
- **PostgreSQL 8.2**  
- **Git**  
- **Chatbase** (version gratuite) : utilisé pour intégrer un agent virtuel capable de répondre aux questions des utilisateurs.  
  - Fonctionnalités actuelles : entraînement de l’agent via le lien du site, prise en charge jusqu’à 300 questions-réponses par mois, personnalisation du design du chat.  
  - Version payante future : ajouter des FAQs, augmenter le nombre d’interactions mensuelles, paramétrer le style des réponses pour plus de précision et concision.  

- **Notes supplémentaires :**  
  - La gestion du panier et l’import des photos ont été implémentés en JavaScript pur, sans frameworks externes.  
  - Le site est actuellement hébergé sur GitHub.  
  - Dans une prochaine version, nous utiliserons **Supabase** pour gérer la base de données.
