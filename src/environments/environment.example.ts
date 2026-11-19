// Modèle à copier en environment.ts et environment.development.ts
// puis à remplir avec la config de votre projet Firebase (console Firebase > Paramètres du projet).
export const environment = {
  firebaseConfig: {
    apiKey: 'VOTRE_API_KEY',
    authDomain: 'VOTRE_PROJET.firebaseapp.com',
    databaseURL: 'https://VOTRE_PROJET-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'VOTRE_PROJET',
    storageBucket: 'VOTRE_PROJET.firebasestorage.app',
    messagingSenderId: 'VOTRE_SENDER_ID',
    appId: 'VOTRE_APP_ID',
  },
};
