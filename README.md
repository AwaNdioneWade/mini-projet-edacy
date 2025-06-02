
## Description
L'application permet à un utilisateur de s'inscrire, se connecter, puis de gérer une liste de produits (ajout, modification, suppression, visualisation). L'accès à la gestion des produits est protégé par une authentification.

## Fonctionnalités principales
- Inscription et connexion sécurisées (avec token)
- Ajout, modification et suppression de produits
- Interface responsive

## Technologies utilisées
- React (frontend)
- React Router (navigation)
- React Toastify (notifications)
- Fetch API ou Axios (requêtes HTTP)
- CSS-in-JS (styles intégrés dans les composants)

## Installation et lancement
1. Cloner le projet
   git clone https://github.com/AwaNdioneWade/mini-projet-edacy.git
   cd mini-projet-edacy/frontend
   
2. Installer les dépendances
   npm install
   
3. Lancer l'application
   npm start
   
   L'application sera accessible sur http://localhost:3000

Le backend (API) doit être lancé séparément sur http://localhost:5000 pour que l'authentification et la gestion des produits fonctionnent.

## Structure des dossiers principaux

frontend/
  src/
    pages/
      Connexion.js      # Page de connexion
      Inscription.js    # Page d'inscription
      Produits.js       # Page de gestion des produits (privée)
    components/
      PrivateRoute.js   # Composant de protection des routes privées
    App.js              # Définition des routes principales
    index.js            # Point d'entrée React


## Utilisation rapide
- Inscription : Créez un compte via la page d'inscription
- Connexion : Connectez-vous avec vos identifiants
- Gestion des produits : Ajoutez, modifiez ou supprimez des produits
- Déconnexion : Bouton disponible sur la page des produits
