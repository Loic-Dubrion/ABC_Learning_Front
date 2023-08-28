// Importation de la fonction permettant de combiner plusieurs reducers en un seul
import { combineReducers } from '@reduxjs/toolkit';

// Importation des reducers individuels pour chaque tranche de l'état de l'application
import cardRectoReducer from './cardRectoSlice';
import cardVersoReducer from './cardVersoSlice';
import menuReducer from './menuSlice';
import authReducer from './authSlice';
import sequencesReducer from './sequencesSlice';
import sequenceReducer from './sequenceDetailSlice';

// Utilisation de `combineReducers` pour fusionner nos différents reducers en un seul
// Chaque reducer sera responsable d'une tranche spécifique de l'état global de l'application
const rootReducer = combineReducers({
  cardRecto: cardRectoReducer, 
  cardVerso: cardVersoReducer, 
  menu: menuReducer,
  auth: authReducer,
  sequences: sequencesReducer,
  sequenceDetail: sequenceReducer,
});

// Définition d'un type pour l'état global de l'application
// Le type utilise `ReturnType` pour automatiquement déduire la forme de l'état à partir de `rootReducer`
export type RootState = ReturnType<typeof rootReducer>;

// Exportation du reducer combiné pour être utilisé dans le magasin Redux de l'application
export default rootReducer;
