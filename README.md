
Formulaire Cosmique - Formulaire de la Gloire
Un formulaire interactif avec effets psychédéliques, animations cosmiques .
Fonctionnalités
Design & Expérience
Fond étoilé animé avec nébuleuse psychédélique

Terminal cosmique avec effets holographiques et scanlines

Palette de couleurs fun et heartfield (néon psychédélique)

Animations fluides sur tous les éléments interactifs

Design responsive adapté à tous les écrans

Easter Eggs Cachés
Code Konami (↑↑↓↓←→←→BA) : Animation rainbow + son spécial

Clics secrets (7 clics sur le titre) : Indice sur le code Konami

Musique genrée : MP3 local selon le choix de genre
Micro-Party : Mini-animation festive

Fonctionnalités Techniques
Validation en temps réel avec validation Zod-like

Système audio intelligent avec vérification du volume

Sauvegarde des données (MongoDB + fallback localStorage)

Validation complète des champs (nom, email, sujet, message)

Popup de succès cosmique avec effet portail

Structure du Projet
cosmic-formulaire/
├── frontend/                 # Interface utilisateur
│   ├── index.html           # Page principale
│   ├── style.css            # Styles CSS cosmiques
│   └── audio/               # Fichiers audio
│       ├── femme.mp3
│       └── homme.mp3
├── backend/                  # Serveur et base de données
│   ├── server.js            # Serveur principal
│   ├── package.json         # Dépendances Node.js
│   ├── .env                 # Variables d'environnement
│   ├── models/              # Modèles MongoDB
│   │   └── Submission.js
│   ├── controllers/         # Contrôleurs API
│   │   └── submissionController.js
│   ├── routes/              # Routes API
│   │   └── submissions.js
│   └── scripts/             # Scripts utilitaires
│       └── test-connection.js
└── README.md                
