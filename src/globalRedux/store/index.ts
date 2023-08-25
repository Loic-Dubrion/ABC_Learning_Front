// Importation de la fonction qui permet de configurer le magasin Redux
import { configureStore } from '@reduxjs/toolkit';

// Importation du reducer combiné (c'est l'aggrégation de tous vos reducers)
import rootReducer from '../store/reducers';

// Configuration et création du magasin Redux
// Le reducer principal est votre `rootReducer`
const store = configureStore({
  reducer: rootReducer
});

// Exportation d'un type pour le dispatch pour une utilisation simplifiée avec TypeScript
// Il permet de déduire automatiquement les actions possibles lors de l'utilisation de dispatch
export type AppDispatch = typeof store.dispatch;

// Exportation par défaut du magasin Redux configuré pour être utilisé dans toute l'application
export default store;
